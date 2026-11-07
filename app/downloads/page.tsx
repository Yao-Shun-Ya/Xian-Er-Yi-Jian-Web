"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DownloadCard } from "@/components/downloads/DownloadCard";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "@/lib/theme/provider";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type TabKey = "windows" | "linux" | "weights";

const hashes: Record<TabKey, string> = {
  windows:
    "D3473B3D23F8C0DD39D5D55CC8CE07F0919E63B71F86C28E9CC3F59A8F055615",
  linux:
    "C095A75169E7EA179B6BE7CC168935137A73A32D8313B8DCB1BD9B38C7C50182",
  weights:
    "FEC7DDAEF22EE5FC19C13546E10DA229A63B935F861AC0B57B6229C7C360B1EC",
};

const items: Record<
  TabKey,
  {
    label: string;
    title: string;
    subtitle: string;
    fileName: string;
    size: string;
    platform: string;
    badge: "verified" | "draft";
    note: string;
    accent: "blue" | "emerald" | "amber";
    animationSpeed: number;
    colors: number[][];
    containerClassName: string;
    buttonText: string;
    includes: string[];
    caveat: string;
  }
> = {
  windows: {
    label: "Windows",
    title: "Windows WebUI",
    subtitle:
      "Gradio WebUI + 交互式 CLI，解压后运行 install_dependencies.bat 即可。包内带 6 例真实演示数据。",
    fileName: "Windows.腺而易见WebUI.7z",
    size: "0.91 MB",
    platform: "Windows 10 / 11",
    badge: "verified",
    note: "WebUI + CLI · 6 demo cases",
    accent: "blue",
    animationSpeed: 5.1,
    colors: [
      [59, 130, 246],
      [34, 197, 94],
    ],
    containerClassName: "bg-blue-900",
    buttonText: "下载 Windows 版",
    includes: [
      "install_dependencies.bat",
      "run_self_check.bat",
      "start_webui.bat",
      "start_training_cli.bat",
    ],
    caveat:
      "包内 models_weights 为空；直接推理需把权重放入 models_weights/<arch>/。完整 999 例数据与训练权重单独下载。",
  },
  linux: {
    label: "Linux",
    title: "Linux CLI",
    subtitle:
      "训练、评估、消融与报告的命令行交付端。Linux 只承诺 CLI，不安装 Gradio。",
    fileName: "Linux.腺而易见.7z",
    size: "0.91 MB",
    platform: "Linux x86_64",
    badge: "verified",
    note: "train / eval / ablation · 6 demo cases",
    accent: "emerald",
    animationSpeed: 4.5,
    colors: [
      [34, 197, 94],
      [6, 182, 212],
    ],
    containerClassName: "bg-emerald-900",
    buttonText: "下载 Linux 版",
    includes: ["install.sh", "run_self_check.sh", "start_cli.sh"],
    caveat:
      "Linux .sh 入口与 Windows CLI 共用同一 mgd.verify_pipeline / interactive 路径；建议先在目标 Linux 主机跑一次 bash run_self_check.sh。",
  },
  weights: {
    label: "Weights",
    title: "Demo weights",
    subtitle:
      "MGD_UNet_v1.0.0.pth 演示权重，用于跑通推理链路与 UI 展示，不作为论文精度依据。",
    fileName: "MGD_UNet_v1.0.0.pth",
    size: "99.1 MB",
    platform: "PyTorch checkpoint",
    badge: "draft",
    note: "verified=false · engineering demo",
    accent: "amber",
    animationSpeed: 3,
    colors: [
      [251, 191, 36],
      [249, 115, 22],
    ],
    containerClassName: "bg-amber-900",
    buttonText: "获取演示权重",
    includes: [
      "MGD_UNet_v1.0.0.pth",
      "MGD_UNet_v1.0.0.pth.manifest.json",
      "weights are verified=false",
    ],
    caveat:
      "演示权重没有独立测试集验证，不能写进论文表格。正式结果请使用 run 目录中带 manifest 的权重。",
  },
};

const tabOrder: TabKey[] = ["windows", "linux", "weights"];

const lightColors: Record<TabKey, number[][]> = {
  windows: [
    [14, 116, 144],
    [15, 118, 110],
  ],
  linux: [
    [15, 118, 110],
    [14, 116, 144],
  ],
  weights: [
    [180, 83, 9],
    [161, 98, 7],
  ],
};

function CopyHash({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();
  const timer = useRef<number | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-mono text-slate-400 transition-colors hover:border-blue-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      aria-label={t("downloads.copyHash")}
    >
      <span className="max-w-[220px] truncate">{value.slice(0, 20)}…</span>
      {copied ? (
        <Check size={12} className="text-emerald-400" aria-hidden="true" />
      ) : (
        <Copy size={12} aria-hidden="true" />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? t("downloads.copied") : ""}
      </span>
    </button>
  );
}

export default function DownloadsPage() {
  const [active, setActive] = useState<TabKey>("windows");
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const { t } = useI18n();
  const dark = resolvedTheme === "dark";
  const text = {
    windows: {
      title: t("downloads.windows.title"),
      subtitle: t("downloads.windows.subtitle"),
      note: t("downloads.windows.note"),
      button: t("downloads.windows.button"),
      includes: [
        t("downloads.windows.includes1"),
        t("downloads.windows.includes2"),
        t("downloads.windows.includes3"),
        t("downloads.windows.includes4"),
      ],
      caveat: t("downloads.windows.caveat"),
    },
    linux: {
      title: t("downloads.linux.title"),
      subtitle: t("downloads.linux.subtitle"),
      note: t("downloads.linux.note"),
      button: t("downloads.linux.button"),
      includes: [
        t("downloads.linux.includes1"),
        t("downloads.linux.includes2"),
        t("downloads.linux.includes3"),
      ],
      caveat: t("downloads.linux.caveat"),
    },
    weights: {
      title: t("downloads.weights.title"),
      subtitle: t("downloads.weights.subtitle"),
      note: t("downloads.weights.note"),
      button: t("downloads.weights.button"),
      includes: [
        t("downloads.weights.includes1"),
        t("downloads.weights.includes2"),
        t("downloads.weights.includes3"),
      ],
      caveat: t("downloads.weights.caveat"),
    },
  }[active];
  const refs = useRef<Record<TabKey, HTMLButtonElement | null>>({
    windows: null,
    linux: null,
    weights: null,
  });
  const item = items[active];

  const onTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabOrder.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + tabOrder.length) % tabOrder.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = tabOrder.length - 1;
    else return;
    event.preventDefault();
    const next = tabOrder[nextIndex];
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <main
      id="main-content"
      className="min-h-screen overflow-x-hidden bg-[#020617] font-sans text-slate-200 selection:bg-blue-500/40"
    >
      <SiteNav />

      <section className="relative overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32">
        <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
          <SparklesCore
            key={dark ? "downloads-sparkles-dark" : "downloads-sparkles-light"}
            id="downloads-sparkles"
            background="transparent"
            minSize={0.5}
            maxSize={1.3}
            particleDensity={dark ? 70 : 45}
            particleColor={dark ? "#3b82f6" : "#0e7490"}
            className="h-full w-full"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.18),transparent_58%)]"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] text-slate-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            {t("downloads.back")}
          </Link>

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-blue-300">
                <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                {t("downloads.kicker")}
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
                {t("downloads.title")}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                {t("downloads.lead")}
              </p>
            </div>
            <Link
              href="/docs"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-slate-300 transition-colors hover:border-blue-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              {t("downloads.docs")}
              <ExternalLink size={13} aria-hidden="true" />
            </Link>
          </div>

          <div
            role="tablist"
            aria-label={t("downloads.tabs")}
            className="mt-10 inline-flex flex-wrap items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
          >
            {tabOrder.map((key, index) => {
              const selected = active === key;
              return (
                <button
                  key={key}
                  ref={(node) => {
                    refs.current[key] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`download-tab-${key}`}
                  aria-selected={selected}
                  aria-controls={`download-panel-${key}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(key)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={cn(
                    "relative rounded-xl px-5 py-2.5 text-[12px] font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                    selected ? "text-white" : "text-slate-500 hover:text-slate-200",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={reduced ? undefined : "download-tab-pill"}
                      className="absolute inset-0 rounded-xl border border-blue-400/30 bg-blue-500/15 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative z-10">{items[key].label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`download-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`download-tab-${active}`}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <DownloadCard
              title={text.title}
              subtitle={text.subtitle}
              fileName={item.fileName}
              size={item.size}
              platform={item.platform}
              badge={item.badge}
              note={text.note}
              accent={item.accent}
              animationSpeed={item.animationSpeed}
              colors={dark ? item.colors : lightColors[active]}
              containerClassName={item.containerClassName}
              buttonText={text.button}
            />

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                  {t("downloads.file")}
                </p>
                <p className="mt-2 break-all font-mono text-[11px] leading-5 text-slate-300">
                  {item.fileName}
                </p>
                <p className="mono mt-3 text-[10px] text-slate-500">
                  {item.size} · {item.platform}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                    {t("downloads.hash")}
                  </p>
                  <CopyHash value={hashes[active]} />
                </div>
                <p className="mt-3 break-all font-mono text-[10px] leading-5 text-slate-400">
                  {hashes[active]}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                  {t("downloads.includes")}
                </p>
                <ul className="mt-3 space-y-2">
                  {text.includes.map((entry) => (
                    <li
                      key={entry}
                      className="flex items-start gap-2 font-mono text-[10px] leading-5 text-slate-400"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] p-5">
                <p className="mono text-[9px] uppercase tracking-[0.16em] text-amber-300/80">
                  {t("downloads.boundary")}
                </p>
                <p className="mt-3 text-[12px] leading-6 text-slate-400">
                  {text.caveat}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            {t("downloads.note")}
          </p>
          <a
            href="https://github.com/Yao-Shun-Ya/MGD_Project"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            MGD_Project
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
