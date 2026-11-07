"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  msUntilNextThemeBoundary,
  normalizeThemeMode,
  persistThemeMode,
  readPreviewThemeMode,
  readStoredThemeMode,
  resolveAutoTheme,
  resolveTheme,
  type ResolvedTheme,
  type ThemeMode,
} from "./config";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: ResolvedTheme, mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themeMode = mode;
  root.style.colorScheme = theme;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({
  children,
  initialMode = "auto",
  initialTheme = "dark",
}: {
  children: React.ReactNode;
  initialMode?: ThemeMode;
  initialTheme?: ResolvedTheme;
}) {
  const [mode, setModeState] = useState<ThemeMode>(normalizeThemeMode(initialMode));
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(initialTheme);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(initialTheme);
  const transitionTimer = useRef<number | null>(null);
  const boundaryTimer = useRef<number | null>(null);
  const mounted = useRef(false);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    persistThemeMode(next);
  }, []);

  useEffect(() => {
    const preview = readPreviewThemeMode();
    const stored = preview ?? readStoredThemeMode();
    if (stored && stored !== mode) setModeState(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => {
      const next = media.matches ? "dark" : "light";
      setSystemTheme(next);
      document.documentElement.dataset.systemTheme = next;
    };
    syncSystemTheme();
    media.addEventListener?.("change", syncSystemTheme);

    return () => media.removeEventListener?.("change", syncSystemTheme);
    // One-shot persisted-mode sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const nextTheme = resolveTheme(mode);
    setResolvedTheme(nextTheme);

    if (mounted.current) {
      const root = document.documentElement;
      root.classList.add("theme-switching");
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => {
        root.classList.remove("theme-switching");
      }, 280);
    }
    applyTheme(nextTheme, mode);
    mounted.current = true;

    if (boundaryTimer.current) {
      window.clearTimeout(boundaryTimer.current);
      boundaryTimer.current = null;
    }

    if (mode !== "auto") return;

    const schedule = () => {
      boundaryTimer.current = window.setTimeout(() => {
        const timeTheme = resolveAutoTheme();
        setResolvedTheme(timeTheme);
        applyTheme(timeTheme, "auto");
        schedule();
      }, msUntilNextThemeBoundary());
    };
    schedule();

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const timeTheme = resolveAutoTheme();
      setResolvedTheme(timeTheme);
      applyTheme(timeTheme, "auto");
      if (boundaryTimer.current) window.clearTimeout(boundaryTimer.current);
      schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (boundaryTimer.current) window.clearTimeout(boundaryTimer.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mode]);

  useEffect(() => {
    return () => {
      if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
      if (boundaryTimer.current) window.clearTimeout(boundaryTimer.current);
    };
  }, []);

  const value = useMemo(
    () => ({ mode, resolvedTheme, systemTheme, setMode }),
    [mode, resolvedTheme, systemTheme, setMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside <ThemeProvider>");
  return context;
}
