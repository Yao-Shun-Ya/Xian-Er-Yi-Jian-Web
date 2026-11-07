"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, Cpu, FileText, GitBranch, Zap } from "lucide-react";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhitepaperModeSwitch } from "@/components/docs/WhitepaperModeSwitch";
import type { WhitepaperMode } from "@/components/docs/types";

export type WhitepaperBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  | {
      type: "callout";
      tone: "info" | "warn" | "danger" | "success";
      title: string;
      text: string;
    }
  | { type: "code"; code: string }
  | { type: "stats"; items: { label: string; value: string; note: string }[] }
  | {
      type: "cards";
      cards: {
        title: string;
        description: string;
        href: string;
        button: string;
        accent: "blue" | "orange" | "purple" | "cyan";
        icon: "chip" | "github";
        external?: boolean;
      }[];
    };

export type WhitepaperSection = {
  id: string;
  number: string;
  title: string;
  icon: ReactNode;
  blocks: WhitepaperBlock[];
};

export type WhitepaperFigure = {
  label: string;
  value: string;
  note?: string;
};

const calloutTones = {
  info: "border-blue-500/25 bg-blue-500/[0.06] text-blue-300",
  warn: "border-amber-500/25 bg-amber-500/[0.06] text-amber-300",
  danger: "border-red-500/25 bg-red-500/[0.06] text-red-300",
  success: "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-300",
};

const cardTones = {
  blue: {
    card: "from-blue-900/30 to-blue-900/10 border-blue-500/20 hover:border-blue-500/40",
    icon: "bg-blue-500/20 text-blue-400",
    button: "bg-blue-600 hover:bg-blue-500",
  },
  orange: {
    card: "from-orange-900/30 to-orange-900/10 border-orange-500/20 hover:border-orange-500/40",
    icon: "bg-orange-500/20 text-orange-400",
    button: "bg-orange-600 hover:bg-orange-500",
  },
  purple: {
    card: "from-purple-900/30 to-purple-900/10 border-purple-500/20 hover:border-purple-500/40",
    icon: "bg-purple-500/20 text-purple-400",
    button: "bg-purple-600 hover:bg-purple-500",
  },
  cyan: {
    card: "from-cyan-900/30 to-cyan-900/10 border-cyan-500/20 hover:border-cyan-500/40",
    icon: "bg-cyan-500/20 text-cyan-400",
    button: "bg-cyan-600 hover:bg-cyan-500",
  },
};

function Blocks({ blocks }: { blocks: WhitepaperBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <p key={index} className="text-[15px] leading-8 text-slate-400">
              {block.text}
            </p>
          );
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="mt-8 text-lg font-semibold text-white">
              {block.text}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="my-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "table") {
          return (
            <div key={index} className="my-6">
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full min-w-[560px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-slate-300">
                      {block.head.map((cell) => (
                        <th key={cell} className="px-3 py-3 font-medium">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-400">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-white/[0.06] last:border-0">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-3 py-3">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {block.caption ? (
                <p className="mono mt-2 text-[10px] leading-5 text-slate-500">{block.caption}</p>
              ) : null}
            </div>
          );
        }
        if (block.type === "callout") {
          return (
            <div key={index} className={`my-6 rounded-xl border p-5 ${calloutTones[block.tone]}`}>
              <p className="text-[13px] font-semibold">{block.title}</p>
              <p className="mt-2 text-[13px] leading-6 text-slate-400">{block.text}</p>
            </div>
          );
        }
        if (block.type === "code") {
          return (
            <pre
              key={index}
              className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-slate-900 p-4 text-[11px] leading-6 text-slate-300"
            >
              <code className="mono">{block.code}</code>
            </pre>
          );
        }
        if (block.type === "cards") {
          return (
            <div key={index} className="my-6 grid gap-6 md:grid-cols-2">
              {block.cards.map((card) => {
                const tone = cardTones[card.accent];
                const Icon = card.icon === "github" ? GitBranch : Cpu;
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className={`flex flex-col items-center justify-center rounded-2xl border bg-gradient-to-br p-8 text-center transition-all ${tone.card}`}
                  >
                    <div className={`mb-4 flex size-16 items-center justify-center rounded-full ${tone.icon}`}>
                      <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
                    <span
                      className={`mt-4 rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors ${tone.button}`}
                    >
                      {card.button}
                    </span>
                  </a>
                );
              })}
            </div>
          );
        }
        return (
          <div
            key={index}
            className="my-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4"
          >
            {block.items.map((item) => (
              <div key={item.label} className="bg-slate-950 px-4 py-4">
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-slate-500">
                  {item.label}
                </p>
                <p className="mono mt-2 text-xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-[10px] text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

export function StructuredWhitepaper({
  mode,
  onModeChange,
  badge,
  title,
  heroKicker,
  heroTitle,
  lead,
  pdfs = [],
  sections,
  figures,
  backLabel,
  sectionsLabel,
  tocLabel,
  figuresLabel = "Key figures",
}: {
  mode: WhitepaperMode;
  onModeChange: (mode: WhitepaperMode) => void;
  badge: string;
  title: string;
  heroKicker: string;
  heroTitle: string;
  lead: string;
  pdfs?: { label: string; href: string }[];
  sections: WhitepaperSection[];
  figures: WhitepaperFigure[];
  backLabel: string;
  sectionsLabel: string;
  tocLabel: string;
  figuresLabel?: string;
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const sidebarRef = useRef<HTMLDivElement>(null);

  const syncSidebar = (id: string) => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const button = sidebar.querySelector(`[data-section-id="${id}"]`) as HTMLElement | null;
    if (!button) return;
    const sidebarRect = sidebar.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const offset = (buttonRect.top + buttonRect.height / 2) - (sidebarRect.top + sidebarRect.height / 2);
    sidebar.scrollBy({ top: offset, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActive(section.id);
          syncSidebar(section.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    syncSidebar(id);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-950 font-sans text-slate-200 selection:bg-blue-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[150px]" />
      </div>

      <SiteNav />

      <div className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex flex-col gap-5 border-b border-white/[0.06] pb-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="flex flex-wrap items-start gap-4">
            <Link href="/" className="group flex items-center gap-2 pt-1 text-slate-400 hover:text-white">
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">{backLabel}</span>
            </Link>
            <div className="hidden h-9 w-px bg-white/10 xl:block" aria-hidden="true" />
            <WhitepaperModeSwitch mode={mode} onChange={onModeChange} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="mono rounded border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-400">
              {badge}
            </div>
            <h1 className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-lg font-bold italic text-transparent">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-4 lg:hidden">
        <details className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between px-1 text-sm font-medium text-slate-300">
            {tocLabel}
            <span className="mono text-[10px] text-slate-500">{sections.length}</span>
          </summary>
          <nav aria-label={sectionsLabel} className="mt-3 grid gap-1 border-t border-white/10 pt-3">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={(event) => {
                  scrollTo(section.id);
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
                className="flex items-start gap-2 rounded-lg px-2 py-2 text-left text-[12px] text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span className="mono mt-0.5 text-[9px] text-slate-600">{section.number}</span>
                {section.title}
              </button>
            ))}
          </nav>
        </details>
      </div>

      <div className="mx-auto flex max-w-7xl gap-12 px-6 pb-20 pt-4 lg:pt-8">
        <aside className="hidden w-72 shrink-0 lg:block">
          <div ref={sidebarRef} className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 no-scrollbar">
            <nav className="space-y-1" aria-label={sectionsLabel}>
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  data-section-id={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-300 ${
                    active === section.id
                      ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                      : "text-slate-500 hover:bg-white/5 hover:text-slate-300"
                  }`}
                >
                  <span className={active === section.id ? "text-blue-400" : "text-slate-600"}>
                    {section.icon}
                  </span>
                  {section.title}
                </button>
              ))}
            </nav>

            <div className="mt-8 rounded-2xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 p-5">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <Zap size={14} className="text-yellow-500" />
                {figuresLabel}
              </h4>
              <div className="space-y-2">
                {figures.map((figure) => (
                  <div key={figure.label} className="flex justify-between gap-3 text-[11px]">
                    <span className="text-slate-500">{figure.label}</span>
                    <span className="mono text-right text-slate-300">{figure.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main id="main-content" className="min-w-0 flex-1 space-y-20 text-left">
          <header className="max-w-4xl">
            <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-blue-300">
              <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
              {heroKicker}
            </div>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              {heroTitle}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">{lead}</p>
            {pdfs.length ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {pdfs.map((pdf) => (
                  <a
                    key={pdf.href}
                    href={pdf.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-blue-400/30 hover:text-white"
                  >
                    <FileText size={14} /> {pdf.label}
                  </a>
                ))}
              </div>
            ) : null}
          </header>

          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="mb-8 flex items-center gap-3 border-b border-white/10 pb-4 text-2xl font-bold text-white">
                <span className="mono flex size-8 items-center justify-center rounded-lg bg-blue-500/15 text-sm text-blue-300">
                  {section.number}
                </span>
                {section.title}
              </h2>
              <div className="space-y-5">
                <Blocks blocks={section.blocks} />
              </div>
            </section>
          ))}
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
