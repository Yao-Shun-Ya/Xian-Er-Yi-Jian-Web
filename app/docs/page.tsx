"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { TechnicalWhitepaperZh } from "@/components/docs/ChineseWhitepaper";
import { TechnicalWhitepaperEn } from "@/components/docs/TechnicalWhitepaperEn";
import { ResearchWhitepaperZh } from "@/components/docs/ResearchWhitepaperZh";
import { ResearchWhitepaperEn } from "@/components/docs/EnglishWhitepaper";
import type { WhitepaperMode } from "@/components/docs/types";

export default function DocsPage() {
  const { locale } = useI18n();
  const [mode, setMode] = useState<WhitepaperMode>("technical");

  if (mode === "technical") {
    return locale === "en" ? (
      <TechnicalWhitepaperEn mode={mode} onModeChange={setMode} />
    ) : (
      <TechnicalWhitepaperZh mode={mode} onModeChange={setMode} />
    );
  }

  return locale === "en" ? (
    <ResearchWhitepaperEn mode={mode} onModeChange={setMode} />
  ) : (
    <ResearchWhitepaperZh mode={mode} onModeChange={setMode} />
  );
}
