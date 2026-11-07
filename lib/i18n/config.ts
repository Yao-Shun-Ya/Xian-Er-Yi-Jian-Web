export type Locale = "zh" | "en";

export const LOCALE_COOKIE = "xeyj-lang";
export const LOCALE_STORAGE_KEY = "xeyj-lang";

export function normalizeLocale(input?: string | null): Locale {
  const value = (input ?? "").trim().toLowerCase();
  if (value.startsWith("zh")) return "zh";
  if (value.startsWith("en")) return "en";
  if (value.includes("zh")) return "zh";
  if (value.includes("en")) return "en";
  return "zh";
}

export function localeTag(locale: Locale): string {
  return locale === "zh" ? "zh-CN" : "en-US";
}

export function formatNumber(
  locale: Locale,
  value: number,
  options?: Intl.NumberFormatOptions,
): string {
  try {
    return new Intl.NumberFormat(localeTag(locale), options).format(value);
  } catch {
    return String(value);
  }
}

export function formatDate(
  locale: Locale,
  value: number | Date,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
  try {
    return new Intl.DateTimeFormat(localeTag(locale), options).format(
      value instanceof Date ? value : new Date(value),
    );
  } catch {
    return String(value);
  }
}

export function readPreviewLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = new URLSearchParams(window.location.search).get("lang");
    if (value === "zh" || value === "en") return value;
  } catch {
    /* ignore */
  }
  return null;
}

export function readStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "zh" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LOCALE_COOKIE}=`));
    if (match) {
      const value = decodeURIComponent(match.split("=").slice(1).join("="));
      if (value === "zh" || value === "en") return value;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function persistLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  } catch {
    /* ignore */
  }
}
