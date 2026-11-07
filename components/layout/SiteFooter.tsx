"use client";

import Link from "next/link";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { useI18n } from "@/lib/i18n/provider";

export function SiteFooter() {
  const { t, locale } = useI18n();
  return (
    <footer className="relative mt-auto flex min-h-[320px] flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-[var(--footer-bg)] py-8 md:min-h-[360px] md:py-12">
      <div
        className="pointer-events-none absolute inset-0 z-10 flex h-full w-full select-none items-center justify-center px-4"
        aria-hidden="true"
      >
        <div className="h-40 w-full md:h-52">
          <TextHoverEffect text="XIANERYIJIAN PROJECT" variant="outline" />
        </div>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-6">
        <div className="mt-8 flex flex-col items-center justify-between gap-6 md:mt-10 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-xl font-bold tracking-widest text-white">
              {locale === "zh" ? "腺而易见" : "XianErYiJian"}
            </p>
            <p className="mono mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              {t("footer.team")}
            </p>
          </div>

          <div className="mono flex flex-col items-center gap-3 text-[10px] uppercase tracking-widest text-slate-500 md:items-end">
            <div className="relative z-30 flex gap-6">
              <Link
                href="/docs"
                className="pointer-events-auto transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {t("footer.docs")}
              </Link>
              <Link
                href="/downloads"
                className="pointer-events-auto transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {t("footer.downloads")}
              </Link>
              <Link
                href="/#feedback"
                className="pointer-events-auto transition-colors hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {t("footer.collaboration")}
              </Link>
            </div>
            <p>© {new Date().getFullYear()} HUANG YUPU. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-30 flex h-full w-full select-none items-center justify-center px-4"
        aria-hidden="true"
      >
        <div className="h-40 w-full md:h-52">
          <TextHoverEffect text="XIANERYIJIAN PROJECT" variant="glow" />
        </div>
      </div>
    </footer>
  );
}
