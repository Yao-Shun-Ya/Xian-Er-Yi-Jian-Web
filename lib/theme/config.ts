export type ThemeMode = "light" | "dark" | "auto";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "xeyj-theme";
export const THEME_COOKIE = "xeyj-theme";
export const AUTO_LIGHT_START_HOUR = 6;
export const AUTO_DARK_START_HOUR = 18;

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark" || value === "auto";
}

export function normalizeThemeMode(value: string | null | undefined): ThemeMode {
  return isThemeMode(value) ? value : "auto";
}

export function resolveAutoTheme(date: Date = new Date()): ResolvedTheme {
  const hour = date.getHours();
  return hour >= AUTO_LIGHT_START_HOUR && hour < AUTO_DARK_START_HOUR
    ? "light"
    : "dark";
}

export function resolveTheme(
  mode: ThemeMode,
  date: Date = new Date(),
): ResolvedTheme {
  return mode === "auto" ? resolveAutoTheme(date) : mode;
}

export function msUntilNextThemeBoundary(date: Date = new Date()): number {
  const next = new Date(date);
  const hour = date.getHours();

  if (hour < AUTO_LIGHT_START_HOUR) {
    next.setHours(AUTO_LIGHT_START_HOUR, 0, 0, 0);
  } else if (hour < AUTO_DARK_START_HOUR) {
    next.setHours(AUTO_DARK_START_HOUR, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(AUTO_LIGHT_START_HOUR, 0, 0, 0);
  }

  return Math.max(1_000, next.getTime() - date.getTime());
}

export function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
  } catch {
    return null;
  }
}

export function writeCookie(name: string, value: string, maxAge = 60 * 60 * 24 * 365) {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
  } catch {
    /* ignore */
  }
}

export function readPreviewThemeMode(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  try {
    const value = new URLSearchParams(window.location.search).get("theme");
    return isThemeMode(value) ? value : null;
  } catch {
    return null;
  }
}

export function readStoredThemeMode(): ThemeMode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemeMode(stored)) return stored;
  } catch {
    /* localStorage can be unavailable */
  }
  const cookie = readCookie(THEME_COOKIE);
  return isThemeMode(cookie) ? cookie : null;
}

export function persistThemeMode(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    /* ignore */
  }
  writeCookie(THEME_COOKIE, mode);
}
