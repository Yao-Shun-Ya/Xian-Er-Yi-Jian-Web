"use client";

import { Microscope, Wrench } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import type { WhitepaperMode } from "./types";

const options: {
  mode: WhitepaperMode;
  icon: typeof Wrench;
  labelKey: "docs.mode.technical" | "docs.mode.research";
  hintKey: "docs.mode.technicalHint" | "docs.mode.researchHint";
}[] = [
  {
    mode: "technical",
    icon: Wrench,
    labelKey: "docs.mode.technical",
    hintKey: "docs.mode.technicalHint",
  },
  {
    mode: "research",
    icon: Microscope,
    labelKey: "docs.mode.research",
    hintKey: "docs.mode.researchHint",
  },
];

export function WhitepaperModeSwitch({
  mode,
  onChange,
}: {
  mode: WhitepaperMode;
  onChange: (mode: WhitepaperMode) => void;
}) {
  const { t } = useI18n();
  const activeHint = t(
    mode === "technical" ? "docs.mode.technicalHint" : "docs.mode.researchHint",
  );

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {t("docs.mode.label")}
      </span>
      <div
        role="group"
        aria-label={t("docs.mode.label")}
        className="inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
      >
        {options.map((option) => {
          const active = mode === option.mode;
          const Icon = option.icon;
          return (
            <button
              key={option.mode}
              type="button"
              onClick={() => onChange(option.mode)}
              aria-pressed={active}
              title={t(option.hintKey)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                active
                  ? "border-blue-400/45 bg-blue-500/20 text-white shadow-[0_0_22px_rgba(59,130,246,0.20)]"
                  : "border-transparent text-slate-500 hover:bg-white/[0.05] hover:text-slate-200",
              )}
            >
              <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
              {t(option.labelKey)}
            </button>
          );
        })}
      </div>
      <span className="max-w-[380px] text-[12px] leading-5 text-slate-400">
        {activeHint}
      </span>
    </div>
  );
}
