"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
import { useI18n } from "@/lib/i18n/provider";
import type { DictionaryKey } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

type SectionKey = "home" | "research" | "feedback";
type PageKey = "home" | "docs" | "downloads";

const homeSections: { key: SectionKey; labelKey: DictionaryKey; href: string }[] = [
  { key: "home", labelKey: "nav.home", href: "/" },
  { key: "research", labelKey: "nav.research", href: "/#capabilities" },
  { key: "feedback", labelKey: "nav.feedback", href: "/#feedback" },
];

const pageLinks: { key: "docs" | "downloads"; labelKey: DictionaryKey; href: string }[] = [
  { key: "docs", labelKey: "nav.docs", href: "/docs" },
  { key: "downloads", labelKey: "nav.downloads", href: "/downloads" },
];

const routeTabs: { key: PageKey; labelKey: DictionaryKey; href: string }[] = [
  { key: "home", labelKey: "nav.home", href: "/" },
  { key: "docs", labelKey: "nav.docs", href: "/docs" },
  { key: "downloads", labelKey: "nav.downloads", href: "/downloads" },
];

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M3.2 16c4.1-6.2 8.4-9.3 12.8-9.3S24.7 9.8 28.8 16c-4.1 6.2-8.4 9.3-12.8 9.3S7.3 22.2 3.2 16Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="16" cy="16" r="3.1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M16 4.2v3.1M16 24.7v3.1M4.2 16h3.1M24.7 16h3.1"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function GithubMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function PillTabs<T extends string>({
  items,
  active,
  layoutId,
  ariaLabel,
  onSelect,
}: {
  items: { key: T; label: string; href: string }[];
  active: T;
  layoutId: string;
  ariaLabel: string;
  onSelect?: (key: T) => void;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="relative flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md"
    >
      {items.map((item) => {
        const isActive = active === item.key;
        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => onSelect?.(item.key)}
            aria-current={
              isActive
                ? layoutId === "page-pill"
                  ? "page"
                  : "location"
                : undefined
            }
            className={cn(
              "relative rounded-full px-4 py-2 text-[12px] font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
              isActive ? "text-white" : "text-slate-400 hover:text-slate-100",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={reduced ? undefined : layoutId}
                className="absolute inset-0 rounded-full border border-blue-400/30 bg-blue-500/15 shadow-[0_0_24px_rgba(59,130,246,0.22)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("home");
  const frame = useRef(0);
  const isHome = pathname === "/";
  const activePage: PageKey =
    pathname === "/docs" ? "docs" : pathname === "/downloads" ? "downloads" : "home";

  useEffect(() => {
    setOpen(false);
    if (pathname === "/") setActiveSection("home");
  }, [pathname]);

  useEffect(() => {
    const update = () => {
      frame.current = 0;
      setScrolled(window.scrollY > 16);
      if (!isHome) return;
      const feedback = document.getElementById("feedback");
      const capabilities = document.getElementById("capabilities");
      const threshold = window.innerHeight * 0.55;
      if (feedback && feedback.getBoundingClientRect().top < threshold) {
        setActiveSection("feedback");
      } else if (capabilities && capabilities.getBoundingClientRect().top < threshold) {
        setActiveSection("research");
      } else {
        setActiveSection("home");
      }
    };
    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-white/[0.08] bg-slate-950/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          : "border-transparent bg-slate-950/45 backdrop-blur-xl",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-black"
      >
        {t("nav.skip")}
      </a>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 rounded-lg text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          <span className="text-blue-400 transition-colors group-hover:text-cyan-300">
            <LogoMark />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-[14px] font-bold tracking-[0.08em] text-white">
              {locale === "zh" ? "腺而易见" : "XianErYiJian"}
            </span>
            <span className="mono hidden text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:block">
              MGD / v2.3.0
            </span>
          </span>
        </Link>

        <nav aria-label={t("nav.main")} className="hidden items-center gap-3 lg:flex">
          {isHome ? (
            <>
              <PillTabs
                items={homeSections.map((item) => ({
                  ...item,
                  label: t(item.labelKey),
                }))}
                active={activeSection}
                layoutId="home-section-pill"
                ariaLabel={t("nav.section")}
                onSelect={setActiveSection}
              />
              <span className="h-6 w-px bg-white/10" aria-hidden="true" />
              <div className="flex items-center gap-0.5">
                {pageLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {t(link.labelKey)}
                    <ArrowUpRight
                      size={12}
                      className="opacity-35 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-70"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <PillTabs
              items={routeTabs.map((item) => ({
                ...item,
                label: t(item.labelKey),
              }))}
              active={activePage}
              layoutId="page-pill"
              ariaLabel={t("nav.pages")}
            />
          )}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <a
            href="https://github.com/Yao-Shun-Ya/MGD_Project"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
            className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-[11px] font-medium text-slate-400 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 sm:inline-flex"
          >
            <GithubMark />
            <span className="hidden lg:inline">MGD_Project</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-blue-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-mobile-nav"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="min-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-slate-950/95 px-5 pb-5 pt-3 backdrop-blur-2xl lg:hidden"
          >
            {isHome ? (
              <>
                <p className="mono px-2 pb-2 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  {t("nav.section")}
                </p>
                <nav aria-label={t("nav.section")} className="grid gap-1">
                  {homeSections.map((item) => {
                    const isActive = activeSection === item.key;
                    return (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center rounded-xl border px-4 py-3 text-sm transition-colors",
                          isActive
                            ? "border-blue-400/25 bg-blue-500/10 text-white"
                            : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    );
                  })}
                </nav>
                <p className="mono px-2 pb-2 pt-4 text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  {t("nav.pages")}
                </p>
                <nav aria-label={t("nav.pages")} className="grid gap-1">
                  {pageLinks.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm text-slate-400 transition-colors hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                    >
                      {t(item.labelKey)}
                      <ArrowUpRight size={13} className="opacity-40" aria-hidden="true" />
                    </Link>
                  ))}
                </nav>
              </>
            ) : (
              <nav aria-label={t("nav.pages")} className="grid gap-1">
                {routeTabs.map((item) => {
                  const isActive = activePage === item.key;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center rounded-xl border px-4 py-3 text-sm transition-colors",
                        isActive
                          ? "border-blue-400/25 bg-blue-500/10 text-white"
                          : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                  );
                })}
              </nav>
            )}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 px-4 py-2.5">
              <span className="text-sm text-slate-400">{t("nav.theme")}</span>
              <ThemeToggle />
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 px-4 py-2.5">
              <span className="text-sm text-slate-400">{t("nav.language")}</span>
              <LanguageToggle />
            </div>
            <a
              href="https://github.com/Yao-Shun-Ya/MGD_Project"
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400 transition-colors hover:border-blue-400/30 hover:text-white"
            >
              <span className="flex items-center gap-2">
                <GithubMark />
                MGD_Project
              </span>
              <span className="mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                GitHub
              </span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
