import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/lib/theme/provider";
import {
  normalizeThemeMode,
  resolveTheme,
  THEME_COOKIE,
} from "@/lib/theme/config";
import { themeInitScript } from "@/lib/theme/script";
import { I18nProvider } from "@/lib/i18n/provider";
import {
  LOCALE_COOKIE,
  localeTag,
  normalizeLocale,
} from "@/lib/i18n/config";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "腺而易见 (XianErYiJian)",
  description:
    "面向睑板腺 (MGD) 红外影像的 MGD-Former 分割与形态学定量分析平台",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialMode = normalizeThemeMode(cookieStore.get(THEME_COOKIE)?.value);
  const initialTheme = resolveTheme(initialMode);
  const initialLocale = normalizeLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <html
      lang={localeTag(initialLocale)}
      data-theme={initialTheme}
      data-theme-mode={initialMode}
      className={initialTheme === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-300`}
      >
        <ThemeProvider initialMode={initialMode} initialTheme={initialTheme}>
          <I18nProvider initialLocale={initialLocale}>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
