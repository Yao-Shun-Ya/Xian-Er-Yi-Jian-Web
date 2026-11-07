"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Download, ShieldCheck, TriangleAlert } from "lucide-react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { handleDownload } from "@/lib/download";
import { cn } from "@/lib/utils";

type Accent = "blue" | "emerald" | "amber";

const accents: Record<
  Accent,
  { card: string; button: string; dot: string; label: string }
> = {
  blue: {
    card: "border-blue-500/25 bg-blue-950/25 hover:border-blue-400/60",
    button:
      "bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-300",
    dot: "bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]",
    label: "text-blue-300",
  },
  emerald: {
    card: "border-emerald-500/25 bg-emerald-950/20 hover:border-emerald-400/60",
    button:
      "bg-emerald-600 text-white hover:bg-emerald-500 focus-visible:ring-emerald-300",
    dot: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]",
    label: "text-emerald-300",
  },
  amber: {
    card: "border-amber-500/25 bg-amber-950/15 hover:border-amber-400/60",
    button:
      "bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-300",
    dot: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]",
    label: "text-amber-300",
  },
};

export function DownloadCard({
  title,
  subtitle,
  fileName,
  size,
  platform,
  badge,
  note,
  accent,
  animationSpeed,
  colors,
  containerClassName,
  buttonText,
}: {
  title: string;
  subtitle: string;
  fileName: string;
  size: string;
  platform: string;
  badge: "verified" | "draft";
  note: string;
  accent: Accent;
  animationSpeed: number;
  colors: number[][];
  containerClassName: string;
  buttonText: string;
}) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const tone = accents[accent];
  const showEffect = hovered && !reduced;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col gap-6 overflow-hidden rounded-3xl border p-7 transition-all duration-300 md:flex-row md:items-center md:justify-between md:p-8",
        tone.card,
      )}
    >
      <AnimatePresence>
        {showEffect ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <CanvasRevealEffect
              animationSpeed={animationSpeed}
              containerClassName={containerClassName}
              colors={colors}
              dotSize={2}
            />
            <div className="absolute inset-0 bg-black/55 [mask-image:radial-gradient(420px_at_center,white,transparent)]" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 min-w-0">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "mono inline-flex items-center gap-1.5 rounded border px-2 py-1 text-[9px] uppercase tracking-[0.14em]",
              badge === "verified"
                ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-300"
                : "border-amber-400/25 bg-amber-400/10 text-amber-300",
            )}
          >
            {badge === "verified" ? (
              <ShieldCheck size={11} aria-hidden="true" />
            ) : (
              <TriangleAlert size={11} aria-hidden="true" />
            )}
            {badge === "verified" ? "VERIFIED" : "DRAFT"}
          </span>
          <span className="mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
            {platform}
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
          {subtitle}
        </p>
        <p className="mono mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] tracking-wide text-slate-500">
          <span className="text-slate-300">{fileName}</span>
          <span aria-hidden="true">/</span>
          <span>{size}</span>
          <span aria-hidden="true">/</span>
          <span>{note}</span>
        </p>
      </div>

      <div className="relative z-10 shrink-0">
        <button
          type="button"
          onClick={() => handleDownload(fileName)}
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617] md:w-auto",
            tone.button,
          )}
        >
          <Download size={15} aria-hidden="true" />
          {buttonText}
        </button>
      </div>
    </div>
  );
}
