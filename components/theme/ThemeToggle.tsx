"use client";

import { Clock3, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme/provider";
import { useI18n } from "@/lib/i18n/provider";
import type { ThemeMode } from "@/lib/theme/config";
import { cn } from "@/lib/utils";

const options: {
  mode: ThemeMode;
  icon: typeof Sun;
}[] = [
  { mode: "light", icon: Sun },
  { mode: "dark", icon: Moon },
  { mode: "auto", icon: Clock3 },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, setMode, systemTheme } = useTheme();
  const { t } = useI18n();

  return (
    <div
      role="group"
      aria-label="主题选择"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 backdrop-blur-md",
        className,
      )}
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = mode === option.mode;
        const label =
          option.mode === "light"
            ? t("theme.light")
            : option.mode === "dark"
              ? t("theme.dark")
              : t("theme.auto");
        const title =
          option.mode === "auto"
            ? `${label} · ${t("theme.autoHint")} · ${
                systemTheme === "dark"
                  ? t("theme.systemDark")
                  : t("theme.systemLight")
              }`
            : label;
        return (
          <button
            key={option.mode}
            type="button"
            onClick={() => setMode(option.mode)}
            aria-pressed={active}
            aria-label={title}
            title={title}
            className={cn(
              "relative inline-flex size-8 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              active
                ? "border-blue-400/30 bg-blue-500/15 text-white shadow-[0_0_18px_rgba(59,130,246,0.18)]"
                : "border-transparent text-slate-500 hover:text-slate-200",
            )}
          >
            <Icon
              size={14}
              strokeWidth={1.8}
              className={cn(
                "relative z-10 transition-transform duration-200",
                active && "scale-105",
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}
