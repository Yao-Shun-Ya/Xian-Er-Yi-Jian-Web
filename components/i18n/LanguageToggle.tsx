"use client";

import { useI18n } from "@/lib/i18n/provider";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const options: { locale: Locale; label: string }[] = [
  { locale: "zh", label: "中" },
  { locale: "en", label: "EN" },
];

export function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("lang.group")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 backdrop-blur-md",
        className,
      )}
    >
      {options.map((option) => {
        const active = locale === option.locale;
        return (
          <button
            key={option.locale}
            type="button"
            onClick={() => setLocale(option.locale)}
            aria-pressed={active}
            aria-label={option.locale === "zh" ? t("lang.zh") : t("lang.en")}
            title={option.locale === "zh" ? t("lang.zh") : t("lang.en")}
            className={cn(
              "relative inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2 font-mono text-[11px] font-semibold tracking-wide transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              active
                ? "border-blue-400/30 bg-blue-500/15 text-white shadow-[0_0_18px_rgba(59,130,246,0.16)]"
                : "border-transparent text-slate-500 hover:text-slate-200",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
