"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type DictionaryKey } from "./dictionary";
import {
  formatDate,
  formatNumber,
  localeTag,
  normalizeLocale,
  persistLocale,
  readPreviewLocale,
  readStoredLocale,
  type Locale,
} from "./config";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: DictionaryKey, vars?: Record<string, string | number>) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (
    value: number | Date,
    options?: Intl.DateTimeFormatOptions,
  ) => string;
  localeTag: string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : `{${key}}`,
  );
}

export function I18nProvider({
  children,
  initialLocale = "zh",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(
    normalizeLocale(initialLocale),
  );

  useEffect(() => {
    const stored = readPreviewLocale() ?? readStoredLocale();
    if (stored && stored !== locale) setLocaleState(stored);
    document.documentElement.lang = localeTag(stored ?? locale);
    // One-shot persisted-locale sync.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((next: Locale) => {
    const normalized = normalizeLocale(next);
    setLocaleState(normalized);
    persistLocale(normalized);
    document.documentElement.lang = localeTag(normalized);
  }, []);

  const t = useCallback(
    (key: DictionaryKey, vars?: Record<string, string | number>) => {
      const dict = dictionaries[locale] ?? dictionaries.zh;
      const fallback = dictionaries.zh[key] ?? key;
      return interpolate(dict[key] ?? fallback, vars);
    },
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      formatNumber: (number, options) => formatNumber(locale, number, options),
      formatDate: (date, options) => formatDate(locale, date, options),
      localeTag: localeTag(locale),
    }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>");
  return context;
}
