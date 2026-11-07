"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity,
  ArrowLeft,
  BookOpen,
  Database,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/nav/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhitepaperModeSwitch } from "@/components/docs/WhitepaperModeSwitch";
import type { WhitepaperMode } from "@/components/docs/types";

type Block =
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
  | { type: "stats"; items: { label: string; value: string; note: string }[] };

type Section = {
  id: string;
  number: string;
  title: string;
  icon: ReactNode;
  blocks: Block[];
};

const sections: Section[] = [
  {
    id: "abstract",
    number: "00",
    title: "Abstract",
    icon: <FileText size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "This whitepaper reports a patient-level meibomian gland segmentation and quantification benchmark on the public MGD-1K dataset. After content-level deduplication, 999 paired cases from 338 patient identifiers are split by patient into 694 / 153 / 152 images (239 / 50 / 49 patients). The default MGD-Former reaches Dice 0.7749, clDice 0.8156 and HD95 68.05 px on a nine-hour single holdout.",
      },
      {
        type: "p",
        text:
          "The main result is not an architecture winner. It is a set of confounds: the official 200-case test list overlaps training patients; tile height alone can move the same weights from 0.370 to 0.655; and pixel Dice barely translates into clinical Meiboscore agreement (QWK 0.131). Leakage, tiling sensitivity, TTA/MTE cost and the clinical negative result are therefore treated as primary results.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Read this before quoting a Dice",
        text:
          "All numbers below come from one patient-level holdout, not 5-fold cross-validation. Weights remain verified=false. This is a reproducible engineering and methodology record, not a clinical validation.",
      },
    ],
  },
  {
    id: "clinical",
    number: "01",
    title: "Clinical problem and task",
    icon: <Activity size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "Dry eye disease affects roughly 15–30% of adults and a substantial fraction is associated with meibomian gland dysfunction (MGD). MGD involves terminal duct keratinization and altered meibum secretion, leading to gland dropout, lipid-layer deficiency and ocular surface inflammation. Non-contact infrared meibography visualizes gland morphology using 800–1000 nm reflectance and absorption differences.",
      },
      {
        type: "p",
        text:
          "The clinical Meiboscore (0–3) grades dropout: 0 (<33.3%), 1 (33.3–66.6%), 2 (66.6–100%) and 3 (complete loss). It is fast and widely used, but insensitive to early sub-millimetre truncation, tortuosity and spacing changes. The task here is not to replace grading, but to turn gland morphology into reviewable, traceable pixel and morphological evidence.",
      },
      {
        type: "list",
        items: [
          "Input: single-channel infrared meibography, resized to 640×1280.",
          "Output: gland and eyelid masks, probability maps, and five morphological measures.",
          "Boundary: no diagnosis, no replacement for clinician review, and no conversion of pixel distance to millimetres.",
        ],
      },
    ],
  },
  {
    id: "data",
    number: "02",
    title: "Data, patient split and leakage",
    icon: <Database size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "MGD-1K provides 1,000 LipiView II infrared images from 320 subjects, gland/eyelid masks and six expert Meiboscore rounds. Content-level deduplication leaves 999 usable pairs. The numeric research ID in each filename defines a patient group; 338 IDs remain. Groups are stratified by maximum Meiboscore and assigned whole to train/val/test.",
      },
      {
        type: "table",
        head: ["Split", "Images", "Patients", "Meiboscore 0/1/2/3"],
        rows: [
          ["Train", "694", "239", "119 / 432 / 117 / 26"],
          ["Val", "153", "50", "26 / 92 / 28 / 7"],
          ["Test", "152", "49", "35 / 87 / 23 / 7"],
        ],
        caption: "Patient-level holdout; no patient crosses splits.",
      },
      {
        type: "p",
        text:
          "Two signatures are recorded: the file-list signature 6bdacfb0… identifies the 999 stems, while the assignment signature 7a6fd581… hashes the ordered split. The first answers whether the dataset changed; the second answers which assignment a run actually used.",
      },
      {
        type: "stats",
        items: [
          { label: "Official test patients", value: "166 / 200", note: "200-image list" },
          { label: "Same-patient overlap", value: "326 / 800", note: "remaining images" },
          { label: "Training overlap", value: "116 / 166", note: "patient-level training" },
          { label: "clean-official", value: "60 / 50", note: "images / patients" },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Do not treat the official 200 as patient-independent",
        text:
          "The official 200 come from 166 patients; 326 of the remaining 800 images come from the same patients. Even the patient-level training split still contains 116/166 official test patients. clean-official has only 60 images / 50 patients. The leaky control was 0.7243 vs 0.6870: no inflation at this budget, but the risk is real.",
      },
    ],
  },
  {
    id: "benchmark",
    number: "03",
    title: "The 2026-11 patient-level benchmark",
    icon: <Zap size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "A nine-hour single patient-level holdout on 152 images / 49 patients. Every model shares preprocessing, split, loss, tiling (384×768, overlap 0.25) and threshold 0.7. Differences still include epoch budget and pretraining, so this is a controlled-budget comparability check, not an architecture ranking.",
      },
      {
        type: "table",
        head: ["Model", "Dice", "IoU", "clDice", "HD95 (px)", "Epochs"],
        rows: [
          ["AttentionUNet", "0.7771", "0.6452", "0.8349", "118.44", "15"],
          ["MGD-Former", "0.7749", "0.6372", "0.8156", "68.05", "45"],
          ["MGD-PriorNet", "0.7640", "0.6283", "0.8539", "154.03", "~12"],
          ["UNet", "0.7119", "0.5644", "0.8531", "148.03", "30"],
        ],
        caption:
          "WRCANet is excluded: ~38 min/epoch on 8 GB, one epoch in budget, val Dice 0.006.",
      },
      {
        type: "table",
        head: ["Comparison", "Mean Δ", "95% CI", "p", "Conclusion"],
        rows: [
          ["MGD-Former − AttentionUNet", "-0.0022", "crosses 0", "0.016", "comparable, not superior"],
          ["MGD-Former − UNet", "+0.0630", "[+0.0516, +0.0749]", "5.4e-20", "clearly better"],
          ["MGD-Former − MGD-PriorNet", "+0.0109", "near 0", "0.714", "not significant"],
        ],
        caption: "Per-sample Dice, paired Wilcoxon; 1,000 bootstrap resamples.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Report MTE and TTA with their cost",
        text:
          "MTE (256/384/512) gives Dice 0.7736, not above the single tile 0.7749, but HD95 drops from 68.05 to 61.85; it is boundary correction, not an accuracy gain. 8× TTA gives Dice 0.7808 at roughly 8× cost.",
      },
    ],
  },
  {
    id: "architecture",
    number: "04",
    title: "Architecture: MGD-Former and baselines",
    icon: <ShieldCheck size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "MGD-Former uses a SegFormer MiT-B2 encoder with stages at stride 4/8/16/32 and channels 64/128/320/512. The decoder fuses 1/4 and 1/8 features top-down and emits stride-4 logits. Gland and eyelid heads share the encoder; three deep-supervision heads stabilise training. The ADE20K-pretrained encoder loads 323 tensors locally (97.29% coverage).",
      },
      {
        type: "table",
        head: ["Route", "Key structure", "Params", "Role"],
        rows: [
          ["MGD-Former", "MiT-B2 + 1/4 & 1/8 fusion + stride-4", "~27M", "default backbone"],
          ["UNet", "MONAI five-level, InstanceNorm + PReLU", "31.2M", "classic strong baseline"],
          ["AttentionUNet", "U-Net + attention gate", "~34M", "boundary localisation baseline"],
          ["MGD-PriorNet", "FCAS + ASAB + APG-DD", "1.5M", "tiny prior model"],
          ["WRCANet", "8×10 RCAB + three-level head", "~19M", "budget counterexample"],
        ],
      },
      {
        type: "p",
        text:
          "Stride 4 is not about a bigger model. At 640×1280, glands are only 3–8 px wide; stride 16 pushes the target below a pixel, and breaks appear before Dice does, concentrating in HD95 and skeleton continuity. The cost is memory and decoder complexity, so tiled inference and VRAM tiers are part of the design.",
      },
    ],
  },
  {
    id: "training",
    number: "05",
    title: "Training recipe and budget",
    icon: <BookOpen size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "The default loss is Dice + BCE + clDice + eyelid auxiliary. Dice handles overlap, BCE stabilises pixel gradients, clDice constrains skeleton continuity (10% warmup), and the eyelid term stabilises the R_loss denominator.",
      },
      {
        type: "code",
        code:
          "L = 0.4 * Dice + 0.4 * BCE + 0.2 * clDice + 0.25 * eyelid\nclDice warmup = 10% epochs\noptimizer = AdamW(lr=1e-4, weight_decay=1e-4)\nschedule = cosine annealing, warmup 5%\nEMA = 0.99 (short budget), AMP + channels_last",
      },
      {
        type: "p",
        text:
          "EMA 0.999 lags badly under a nine-hour budget: after hundreds of steps the shadow weights are still dominated by random initialization and val Dice can stay at zero. This run uses 0.99; 0.999 is reserved for long training. Augmentation is random horizontal/vertical flip plus random 384×768 crop; validation and inference use whole-image sliding windows.",
      },
      {
        type: "table",
        head: ["Model", "Batch", "Peak VRAM", "Throughput", "Epoch"],
        rows: [
          ["MGD-Former", "4", "~3.6 GB", "4.2–4.9 samples/s", "143–159 s"],
          ["UNet", "4", "~1.6 GB", "~5.9 samples/s", "118 s"],
          ["AttentionUNet", "4", "~4.2 GB", "~1.6 samples/s", "440 s"],
          ["WRCANet", "2×2", "~3.05 GB", "—", "~38 min"],
          ["MGD-PriorNet", "4", "~4.3 GB", "~2.1 samples/s", "327 s"],
        ],
        caption: "RTX 4060 Laptop 8 GB; all numbers carry measurement conditions.",
      },
    ],
  },
  {
    id: "inference",
    number: "06",
    title: "Inference: sliding window, MTE, TTA",
    icon: <Activity size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "Default tiling is 384×768 with overlap 0.25. Overlaps are fused with 2D Gaussian weights so centres dominate and boundaries transition smoothly. Threshold is 0.7 and minimum area 120 px; the three presets only change threshold, minimum area and overlap, never the weights.",
      },
      {
        type: "code",
        code:
          "W(x, y) = exp(-((x-xc)^2 + (y-yc)^2) / (2*sigma^2))\nP(x, y) = sum_m W_m * P_m / sum_m W_m\n\nMTE: average P_256, P_384, P_512\n8x TTA: 4 flips x 2 scales (1.0, 1.125)",
      },
      {
        type: "p",
        text:
          "MTE mainly improves HD95 (68.05 → 61.85) without improving Dice. 8× TTA pushes Dice to 0.7808 at roughly 8× cost. On uncertainty maps, multi-tile variance AUROC is 0.639, entropy 0.483 and TTA8 1.000; TTA8 is coupled to the label-signal, so it is not triage evidence.",
      },
    ],
  },
  {
    id: "evaluation",
    number: "07",
    title: "Evaluation and the clinical boundary",
    icon: <ShieldCheck size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "Pixel metrics are Dice and IoU; boundary metrics are HD95 and ASSD; tubular continuity is clDice. Empty-mask cases return NaN with a recorded reason rather than a fake zero. Every result carries split_signature, weight manifest, tiling, TTA and threshold.",
      },
      {
        type: "p",
        text:
          "At the clinical layer, R_loss is mapped to Meiboscore and compared with six expert rounds. This round gives accuracy 0.164, MAE 1.105 and QWK 0.131: high Dice does not translate into clinical agreement. Lower/upper eyelid Dice is 0.7905 vs 0.7584, contrary to the usual “lower is harder” assumption, so they must be reported separately.",
      },
      {
        type: "callout",
        tone: "danger",
        title: "The most important negative result",
        text:
          "QWK 0.131 means the R_loss → Meiboscore thresholds and eyelid denominator need recalibration. Until that is done, pixel metrics and demo weights cannot be presented as clinical conclusions; the paper and site keep this limitation visible.",
      },
    ],
  },
  {
    id: "reproducibility",
    number: "08",
    title: "Reproducibility contracts",
    icon: <Database size={17} />,
    blocks: [
      {
        type: "p",
        text:
          "Each run writes an isolated directory with config.yaml, env.json, metrics.jsonl, train.log, checkpoints and a weight manifest. The manifest records sha256, architecture, input size, normalization, verified, split signature, seed and run_dir. Missing manifest or verified=false means the number is engineering evidence, not a validated result.",
      },
      {
        type: "stats",
        items: [
          { label: "Unit tests", value: "146", note: "pytest" },
          { label: "Code parity", value: "95 files", note: "SHA-256 0 diff" },
          { label: "Launchers", value: "6", note: "Windows ASCII+CRLF / Linux LF" },
          { label: "Demo cases", value: "6", note: "3 upper / 3 lower" },
        ],
      },
      {
        type: "code",
        code:
          "python -m pytest mgd/tests -q\npython -m mgd.verify_pipeline --epochs 1 --samples 6\nmgd-train --profile quick --vram auto\nmgd-eval --model MGD-Former --scope test --strict-weights",
      },
    ],
  },
  {
    id: "references",
    number: "09",
    title: "References",
    icon: <BookOpen size={17} />,
    blocks: [
      {
        type: "list",
        items: [
          "Saha RK, et al. Automated quantification of meibomian gland dropout in infrared meibography using deep learning. The Ocular Surface. 2022;26:283–294.",
          "Li L, et al. Development and multicenter validation of an AI driven model for quantitative meibomian gland evaluation. npj Digital Medicine. 2025;8:403.",
          "Yu Z, et al. Quantitative evaluation of meibomian gland dysfunction via deep learning-based infrared image segmentation. Frontiers in Artificial Intelligence. 2025;8:1642361.",
          "Ronneberger O, Fischer P, Brox T. U-Net: Convolutional Networks for Biomedical Image Segmentation. MICCAI. 2015.",
          "Isensee F, et al. nnU-Net: a Self-configuring Method for Deep Learning-based Biomedical Image Segmentation. Nature Methods. 2021.",
          "Shit S, et al. clDice — A Novel Topology-Preserving Loss Function for Tubular Structure Segmentation. CVPR. 2021.",
          "Buglakova E, et al. Tiling artifacts and trade-offs of feature normalization in the segmentation of large biological images. arXiv:2503.19545. 2025.",
          "Maganti S, Gowda SN. A Decision-Aware Evaluation Protocol for Uncertainty in Medical Image Segmentation. arXiv:2610.21616. 2026.",
        ],
      },
      {
        type: "p",
        text:
          "Code: Apache-2.0. Paper, data and model-weight licensing must be confirmed separately. Diagnosis must be made by a licensed clinician.",
      },
    ],
  },
];

const calloutTones = {
  info: "border-blue-500/25 bg-blue-500/[0.06] text-blue-300",
  warn: "border-amber-500/25 bg-amber-500/[0.06] text-amber-300",
  danger: "border-red-500/25 bg-red-500/[0.06] text-red-300",
  success: "border-emerald-500/25 bg-emerald-500/[0.06] text-emerald-300",
};

function Blocks({ blocks }: { blocks: Block[] }) {
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
            <ul key={index} className="my-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-400">
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
            <pre key={index} className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-slate-900 p-4 text-[11px] leading-6 text-slate-300">
              <code className="mono">{block.code}</code>
            </pre>
          );
        }
        return (
          <div key={index} className="my-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-4">
            {block.items.map((item) => (
              <div key={item.label} className="bg-slate-950 px-4 py-4">
                <p className="mono text-[9px] uppercase tracking-[0.12em] text-slate-500">{item.label}</p>
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

export function ResearchWhitepaperEn({
  mode,
  onModeChange,
}: {
  mode: WhitepaperMode;
  onModeChange: (mode: WhitepaperMode) => void;
}) {
  const [active, setActive] = useState("abstract");
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
  }, []);

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
              <span className="text-sm font-medium">Back to home</span>
            </Link>
            <div className="hidden h-9 w-px bg-white/10 xl:block" aria-hidden="true" />
            <WhitepaperModeSwitch mode={mode} onChange={onModeChange} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="mono rounded border border-blue-500/20 bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-400">
              RESEARCH WHITE PAPER v2.3.0
            </div>
            <h1 className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-lg font-bold italic text-transparent">
              XianErYiJian Protocol
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-4 lg:hidden">
        <details className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between px-1 text-sm font-medium text-slate-300">
            Sections
            <span className="mono text-[10px] text-slate-500">{sections.length}</span>
          </summary>
          <nav className="mt-3 grid gap-1 border-t border-white/10 pt-3">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={(event) => {
                  scrollTo(section.id);
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
                className="flex items-start gap-2 rounded-lg px-2 py-2 text-left text-[12px] text-slate-400 hover:bg-white/5 hover:text-white"
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
            <nav className="space-y-1">
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
                <Zap size={14} className="text-yellow-500" /> Key figures
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Default backbone</span>
                  <span className="mono font-bold text-emerald-400">MGD-Former</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Test set</span>
                  <span className="mono text-slate-300">152 / 49</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Weights</span>
                  <span className="mono text-slate-300">verified=false</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Unit tests</span>
                  <span className="mono text-slate-300">146</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main id="main-content" className="min-w-0 flex-1 space-y-20 text-left">
          <header className="max-w-4xl">
            <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-blue-300">
              <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
              Research edition · 2026-11
            </div>
            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
              Meibomian gland segmentation on a public benchmark
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
              Patient-level leakage, tiling confounds, and uncertainty-guided review.
              A reproducible record, not a leaderboard claim.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Paper/en/main.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-blue-400/30 hover:text-white"
              >
                <FileText size={14} /> English PDF · 38 pages
              </a>
              <a
                href="/Paper/zh/main.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-blue-400/30 hover:text-white"
              >
                <FileText size={14} /> Chinese PDF · 34 pages
              </a>
            </div>
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
