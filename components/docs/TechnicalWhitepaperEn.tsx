"use client";

import {
  Activity,
  BarChart3,
  Cpu,
  Database,
  Eye,
  FileText,
  GitBranch,
  GraduationCap,
  Layers,
  Microscope,
  Network,
  Shield,
  Stethoscope,
  TableProperties,
  Terminal,
  TrendingUp,
} from "lucide-react";
import { StructuredWhitepaper, type WhitepaperSection } from "@/components/docs/StructuredWhitepaper";
import type { WhitepaperMode } from "@/components/docs/types";

const sections: WhitepaperSection[] = [
  {
    id: "abstract",
    number: "00",
    title: "Abstract",
    icon: <FileText size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "This technical whitepaper documents the engineering reference behind 腺而易见 (XianErYiJian): a meibomian gland analysis platform built for infrared meibography. It covers preprocessing, patient-level data governance, the MGD-Former default backbone, composite losses, morphological quantification, inference presets, visualization, experiment tracking, evaluation, security, and deployment. It is the implementation companion to the research whitepaper.",
      },
      {
        type: "p",
        text:
          "The platform is deliberately a measurement instrument, not an autonomous diagnosis system. Every output carries its source, preprocessing, tiling, threshold, weight status and evaluation scope. Pixel distances are not converted to millimetres because the infrared images are not calibrated. Clinical review remains mandatory.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Two editions, one system",
        text:
          "This page is the technical edition: parameters, boundaries, deployment and security. Use the whitepaper-type switch above to read the research edition for the patient-level benchmark, leakage audit and clinical negative result.",
      },
    ],
  },
  {
    id: "background",
    number: "01",
    title: "Clinical background and spectral pain points",
    icon: <Microscope size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "Meibomian gland dysfunction (MGD) is a leading contributor to evaporative dry eye. Terminal duct keratinization and altered meibum secretion produce gland dropout, lipid-layer deficiency and ocular-surface inflammation. Non-contact infrared meibography exploits the 800–1000 nm reflectance difference between gland tissue and surrounding tissue, giving a high-contrast view of gland morphology without dye or contact.",
      },
      {
        type: "p",
        text:
          "The clinical Meiboscore grades dropout from 0 to 3 using roughly <33.3%, 33.3–66.6%, 66.6–100% and complete loss. It is fast and widely used, but it collapses continuous morphology into four bins. Early sub-millimetre truncation, tortuosity, width change and spacing loss can be missed, and inter-grader agreement is variable. The engineering target is therefore not to replace the score, but to produce reproducible pixel and morphological evidence that a clinician can review.",
      },
      {
        type: "list",
        items: [
          "Input: a single-channel 640×1280 infrared image, optionally with gland and eyelid masks.",
          "Output: gland/eyelid masks, probability maps, five morphological measures, and a reviewable status record.",
          "Boundary: no millimetre conversion, no diagnosis, no claim that a high Dice equals clinical agreement.",
        ],
      },
    ],
  },
  {
    id: "preprocessing",
    number: "02",
    title: "Infrared enhancement and the data firewall",
    icon: <Database size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "Preprocessing is fixed before any model comparison: decode to 8-bit grayscale, resize to 640×1280 with area interpolation, apply CLAHE with a clip limit of 2.0 and an 8×8 tile grid, then normalize with the training-set mean and standard deviation. The default mean is 0.485 and the default standard deviation is 0.229 after scaling to [0,1]. The same transform is used at validation, test and inference so that tile height is the only tiling variable.",
      },
      {
        type: "p",
        text:
          "The data firewall has three layers. First, content-level deduplication removes byte-identical or visually identical pairs, leaving 999 paired cases. Second, the numeric research ID in each filename defines a patient group; all images from the same group stay in one split. Third, a file-list signature and an assignment signature are recorded with every run. The first signature answers whether the dataset changed; the second answers which split the run actually used.",
      },
      {
        type: "table",
        head: ["Split", "Images", "Patients", "Role"],
        rows: [
          ["Train", "694", "239", "optimization and augmentation"],
          ["Validation", "153", "50", "model selection and threshold checks"],
          ["Test", "152", "49", "single patient-level holdout"],
        ],
        caption:
          "Patient groups are assigned whole; no patient crosses splits. Official 200-image overlap is reported separately.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "The official 200 are not patient-independent",
        text:
          "166 of the official 200 images share a patient with the remaining 800. The clean-official subset has only 60 images from 50 patients. The technical pipeline keeps both the full and clean views so that leakage cannot hide behind a single split file.",
      },
    ],
  },
  {
    id: "architecture",
    number: "03",
    title: "Deep architecture and augmentation engine",
    icon: <Network size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "MGD-Former is the default backbone. A SegFormer MiT-B2 encoder produces four stages at strides 4, 8, 16 and 32 with channels 64, 128, 320 and 512. The decoder fuses the 1/4 and 1/8 features top-down and emits stride-4 logits, preserving the thin gland boundaries that are lost at stride 16. A gland head, an eyelid head and three deep-supervision heads share the encoder.",
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
          "Training augmentation is intentionally small: random horizontal flip, random vertical flip, and a random 384×768 crop from the 640×1280 image. Validation and test use whole-image sliding windows. Augmentation is not the same mechanism as TTA; TTA is an inference-only ensemble and is documented in section 06.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Why stride 4 is non-negotiable",
        text:
          "At 640×1280, a gland is often only 3–8 px wide. A stride-16 feature map pushes the target below one pixel; Dice can still look acceptable while skeleton continuity and HD95 fail. The cost is memory and decoder complexity, which is why tiled inference and VRAM tiers are part of the design.",
      },
    ],
  },
  {
    id: "loss",
    number: "04",
    title: "Composite loss and learning-rate scheduling",
    icon: <Cpu size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The default objective combines region overlap, pixel stability, skeleton continuity and an eyelid auxiliary term. Dice drives overlap, BCE stabilises early pixel gradients, clDice constrains tubular continuity, and the eyelid term gives R_loss a stable denominator. clDice is warmed up for the first 10% of epochs so that a noisy skeleton cannot dominate random initial masks.",
      },
      {
        type: "code",
        code:
          "L = 0.4 * Dice + 0.4 * BCE + 0.2 * clDice + 0.25 * eyelid\nclDice warmup = 10% epochs\noptimizer = AdamW(lr=1e-4, weight_decay=1e-4)\nschedule = cosine annealing, warmup 5%\nEMA = 0.99 for short budgets; 0.999 for long training\nAMP + channels_last enabled on CUDA",
      },
      {
        type: "p",
        text:
          "The learning-rate presets are ReduceLROnPlateau (default), Cosine Annealing, Step Decay and CosineAnnealingWarmRestarts. The training UI exposes the same keys as the YAML and CLI; the form is a view, not a second configuration language. EMA decay 0.999 is not used in the nine-hour study because the shadow weights lag random initialization and validation Dice can stay at zero; 0.99 is the short-budget default.",
      },
      {
        type: "table",
        head: ["Component", "Default", "Why"],
        rows: [
          ["Dice", "0.40", "region overlap and class imbalance"],
          ["BCE", "0.40", "dense pixel gradient at boundaries"],
          ["clDice", "0.20", "skeleton and tubular continuity"],
          ["Eyelid auxiliary", "0.25", "stable R_loss denominator"],
        ],
        caption: "Weights are configuration values, not universal clinical constants.",
      },
    ],
  },
  {
    id: "metrics",
    number: "05",
    title: "Morphological quantification derivations",
    icon: <Activity size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "Five measures are extracted from the gland mask and the eyelid mask. They are defined in pixel space, then reported as ratios or relative values. The platform does not invent a physical scale: without a calibration target, pixels cannot be converted to millimetres, and the UI states this beside every ratio.",
      },
      {
        type: "code",
        code:
          "R_loss = 1 - gland_area / eyelid_roi_area\ndensity = gland_area / eyelid_roi_area\nmean_length = mean(skeleton_path_length per instance)\nmean_width = 2 * mean(distance_transform(gland_mask))\nspacing = median(nearest-neighbour distance between instance centroids)",
      },
      {
        type: "table",
        head: ["Measure", "Unit", "Main failure mode"],
        rows: [
          ["R_loss", "ratio", "eyelid ROI inclusion or exclusion"],
          ["Density", "ratio", "gland fragmentation and mask holes"],
          ["Mean length", "pixels", "skeleton spurs and short fragments"],
          ["Mean width", "pixels", "tortuous or merged glands"],
          ["Spacing", "pixels", "missing peripheral instances"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ratios are reference values only",
        text:
          "The pixel aspect ratio and working distance are not calibrated. Mean width and spacing are relative quantities. A ratio can support longitudinal comparison on the same acquisition protocol, but it must not be presented as a physical measurement.",
      },
    ],
  },
  {
    id: "tta",
    number: "06",
    title: "Test-time augmentation (inference only)",
    icon: <Layers size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "TTA is an inference-time ensemble. It does not change training, weights or the loss. The diagnosis page exposes Off, 2× (horizontal flip) and 4× (full flip) because those are the presets that can be reviewed in a clinical demonstration. Multi-tile ensemble (MTE) at 256/384/512 and 8× TTA are available in the research path and are reported with their cost.",
      },
      {
        type: "table",
        head: ["Mode", "Transforms", "Cost", "What it changes"],
        rows: [
          ["Off", "none", "1×", "single-tile or sliding-window output"],
          ["2×", "horizontal flip + identity", "~2×", "reduces left-right variance"],
          ["4×", "horizontal + vertical + both", "~4×", "reduces orientation variance"],
          ["8× TTA", "4 flips × 2 scales", "~8×", "research diagnostic only"],
          ["MTE", "tile heights 256/384/512", "~3×", "boundary correction, not Dice gain"],
        ],
      },
      {
        type: "p",
        text:
          "The nine-hour study shows that MTE mainly lowers HD95 (68.05 → 61.85) without improving Dice (0.7749 → 0.7736). 8× TTA reaches Dice 0.7808 at roughly eight times the cost. TTA/MTE must therefore be reported with latency, VRAM and the uncertainty caveat; they are not free accuracy buttons.",
      },
      {
        type: "callout",
        tone: "danger",
        title: "TTA is not training augmentation",
        text:
          "Training augmentation (flip/crop) is applied to optimise the weights on the training page. TTA is applied after the weights are frozen, at inference/evaluation. Moving TTA into the training form would be semantically wrong and would make the resulting metrics impossible to compare.",
      },
    ],
  },
  {
    id: "visualization",
    number: "07",
    title: "Advanced medical visualization",
    icon: <BarChart3 size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The diagnosis page returns more than a binary mask: a probability heatmap, pixel-entropy uncertainty, true Grad-CAM, contour, skeleton and instance map. Each view serves a different review question; none is a diagnosis. The probability heatmap is explicitly not Grad-CAM, and the uncertainty view is a relative map, not a calibrated confidence interval.",
      },
      {
        type: "table",
        head: ["View", "Question it answers", "Limit"],
        rows: [
          ["Overlay", "Where is the predicted gland boundary?", "Depends on threshold and tiling"],
          ["Probability", "How confident is each pixel?", "Not a calibrated probability"],
          ["Uncertainty", "Where do TTA channels disagree?", "TTA8 is coupled to label signal"],
          ["Grad-CAM", "Which regions influenced the head?", "One layer, one approximation"],
          ["Contour / skeleton", "Is continuity plausible?", "Sensitive to post-processing"],
          ["Instances", "How many separable glands?", "Merged glands can undercount"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "A heatmap is not an explanation",
        text:
          "Grad-CAM and uncertainty are review aids. They can reveal a broken pipeline, but they cannot establish causal clinical validity. The report keeps the original image, masks, metrics and uncertainty map together so that a clinician can disagree with the model.",
      },
    ],
  },
  {
    id: "presets",
    number: "08",
    title: "Clinical grading presets",
    icon: <Stethoscope size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The three inference presets change only post-processing and decision policy. They never change weights, architecture or the meaning of the output. A preset is a documented starting point for review, not a clinical guideline.",
      },
      {
        type: "table",
        head: ["Preset", "Threshold", "Min area", "Overlap", "Intended use"],
        rows: [
          ["Balanced", "0.70", "120 px", "0.25", "default engineering demo"],
          ["Conservative", "0.78", "220 px", "0.30", "fewer false fragments, higher miss risk"],
          ["Sensitive", "0.58", "60 px", "0.20", "early truncation review, more noise"],
        ],
        caption:
          "Thresholds and minimum areas are configuration values; they require local validation before clinical use.",
      },
      {
        type: "p",
        text:
          "The preset selector also stores the selected TTA mode, but TTA is still inference-only. The saved preset is a reproducible JSON record, not a trained model artifact. A preset can be applied to a different weight only after its manifest and verified status are checked.",
      },
    ],
  },
  {
    id: "experiment",
    number: "09",
    title: "Experiment tracking and paper visualization",
    icon: <TrendingUp size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "Each run writes an isolated directory with config.yaml, env.json, metrics.jsonl, train.log, checkpoints, and a weight manifest. The manifest captures sha256, architecture, input size, normalization, verified status, split signature, seed and run directory. A missing manifest or verified=false means the number is engineering evidence, not a validated result.",
      },
      {
        type: "list",
        items: [
          "config.yaml is the resolved configuration, not the original CLI string.",
          "env.json records Python, torch, CUDA, MONAI, OpenCV and the relevant package versions.",
          "metrics.jsonl is append-only and is the source for curves and comparisons.",
          "The weight manifest makes a result traceable without trusting a filename.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "A run is not a paper table",
        text:
          "The comparison view can select multiple runs and export CSV or LaTeX, but a run without split_signature cannot enter a paper table. Weight status is checked separately; a visually convincing curve is not a validation set.",
      },
    ],
  },
  {
    id: "evaluation",
    number: "10",
    title: "Professional evaluation and LaTeX export",
    icon: <TableProperties size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "Evaluation uses Dice and IoU for overlap, HD95 and ASSD for boundary distance, and clDice for tubular continuity. Empty-mask cases return NaN with an explicit reason instead of a fake zero. Per-sample metrics are retained so that bootstrap confidence intervals and paired Wilcoxon tests can be recomputed outside the UI.",
      },
      {
        type: "table",
        head: ["Metric", "What it captures", "What it can hide"],
        rows: [
          ["Dice", "global overlap", "small disjoint fragments"],
          ["IoU", "overlap / union", "thin structures"],
          ["HD95", "95th-percentile boundary distance", "interior holes"],
          ["ASSD", "average surface distance", "catastrophic outliers"],
          ["clDice", "skeleton continuity", "area accuracy"],
        ],
      },
      {
        type: "p",
        text:
          "The LaTeX export keeps the same column order as the CSV and the web table. This is deliberate: a reviewer should be able to move from a screenshot to a table to the raw per-sample file without guessing which metric was renamed. The export is a presentation layer over the same evaluation payload.",
      },
    ],
  },
  {
    id: "security",
    number: "11",
    title: "Engineering defense and security",
    icon: <Shield size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The platform is local-first. Images are not uploaded to a third-party inference service. File paths are validated against the configured data and output roots, writes never overwrite source images, and generated reports are written to a run-scoped directory. The optional administrator password protects the feedback dashboard, not the clinical inference UI.",
      },
      {
        type: "list",
        items: [
          "No automatic external upload or telemetry containing patient images.",
          "Path traversal and absolute-path escapes are rejected before file access.",
          "Dataset backups copy only; they never delete or overwrite the source.",
          "The model manifest is checked before a weight is used in a reported result.",
          "The admin session uses a signed, expiring cookie; the feedback database is SQLite.",
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Security is not clinical validation",
        text:
          "A local-first design reduces data exposure but does not validate a model. Access control, audit logs and encryption at rest are deployment responsibilities. The site and WebUI must not be exposed to the public internet without an explicit security review.",
      },
    ],
  },
  {
    id: "installation",
    number: "12",
    title: "Environment and one-click deployment",
    icon: <Terminal size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The Windows package contains the Gradio WebUI and the CLI. The Linux package is CLI-only by design. Both share the same Python package, configuration schema and run directory contract. The installer checks the Python environment, installs the pinned dependencies and runs a six-case self-check before the UI is considered usable.",
      },
      {
        type: "code",
        code:
          "# Windows\ninstall_dependencies.bat\nrun_self_check.bat\nstart_webui.bat\n\n# Linux (CLI only)\nbash install.sh\nbash run_self_check.sh\nbash start_cli.sh",
      },
      {
        type: "p",
        text:
          "Gradio is pinned to 6.16.0. Versions 6.11–6.15 contain a frontend regression where a Dataframe inside a Tab can lock the browser main thread. The app refuses to start on an older version and prints the exact upgrade command. Python 3.10+, PyTorch 2.5.1, MONAI 1.5.2, OpenCV, and the pinned Gradio 6.16.0 are the supported baseline.",
      },
      {
        type: "table",
        head: ["VRAM", "Tile", "Batch", "Grad accum", "Evidence"],
        rows: [
          ["6 GB", "256×512", "1", "4", "measured"],
          ["8 GB", "384×768", "1", "4", "measured"],
          ["12 GB", "384×768", "2", "2", "estimated"],
          ["16 GB", "512×1024", "2", "1", "estimated"],
          ["24 GB", "640×1280", "2", "1", "estimated"],
          ["32 GB", "640×1280", "3", "1", "estimated"],
          ["40 GB+", "640×1280", "4", "1", "estimated"],
        ],
        caption:
          "Nominal capacities; start with the recommended tier and drop one step after an OOM.",
      },
    ],
  },
  {
    id: "references",
    number: "13",
    title: "References",
    icon: <GraduationCap size={18} />,
    blocks: [
      { type: "h3", text: "Research team and citation" },
      {
        type: "list",
        items: [
          "Lead developer and researcher: Huang Yupu.",
          "Organization: NSMC XIANERYIJIAN TEAM.",
          "Contact: 2720356281@QQ.COM.",
          "Project site: https://xianeryijian.icu.",
        ],
      },
      {
        type: "p",
        text:
          "Code is released under Apache-2.0. The paper, dataset and model weights require separate licensing checks.",
      },
      {
        type: "p",
        text:
          "Disclaimer: medical diagnosis must be made by a licensed clinician. The software and model outputs are for research and clinical decision support only; the team accepts no liability for direct medical intervention based on this system.",
      },
      {
        type: "code",
        code:
          '@misc{huang2026xianeryijian,\n  author = {Yupu Huang},\n  title = {MGD_Project: Sub-pixel Deep Learning Platform for\n           Meibomian Gland Dysfunction Quantification\n           with Advanced Visualization and TTA},\n  year = {2026},\n  publisher = {GitHub},\n  journal = {GitHub repository},\n  howpublished = {\\url{https://github.com/Yao-Shun-Ya/MGD_Project}}\n}',
      },
      { type: "h3", text: "Foundational and clinical references" },
      {
        type: "list",
        items: [
          "Zuiderveld K. Contrast Limited Adaptive Histogram Equalization. Graphics Gems IV. Academic Press, 1994: 474–485. [CLAHE]",
          "Arita R, Itoh K, Inoue K, et al. Noncontact Infrared Meibography to Document Age-Related Changes of the Meibomian Glands in a Normal Population. Ophthalmology, 2008, 115(5): 911–915.",
          "Nelson JD, Shimazaki J, Benitez-del-Castillo JM, et al. The International Workshop on Meibomian Gland Dysfunction: Report of the Definition and Classification Subcommittee. Investigative Ophthalmology & Visual Science, 2011, 52(4): 1930–1937.",
          "Ronneberger O, Fischer P, Brox T. U-Net: Convolutional Networks for Biomedical Image Segmentation. MICCAI 2015: 234–241.",
          "Loshchilov I, Hutter F. SGDR: Stochastic Gradient Descent with Warm Restarts. arXiv:1608.03983, 2016.",
          "Salehi SSM, Erdogmus D, Gholipour A. Tversky Loss Function for Image Segmentation Using 3D Fully Convolutional Deep Networks. MLMI 2017: 379–387.",
          "Selvaraju RR, Cogswell M, Das A, et al. Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization. ICCV 2017: 618–626.",
          "Craig JP, Nichols KK, Akpek EK, et al. TFOS DEWS II Definition and Classification Report. The Ocular Surface, 2017, 15(3): 276–283.",
          "Wang J, Yeh TN, Ruyu C, et al. Deep Learning–Based Automated Segmentation of Meibomian Glands in Infrared Meibography. Translational Vision Science & Technology, 2019, 8(6): 37.",
          "Deng Y, et al. Morphology and Function of the Meibomian Glands in Patients with Meibomian Gland Dysfunction. Cornea, 2020, 39(8): 960–966.",
          "Isensee F, Jaeger PF, Kohl SAA, et al. nnU-Net: a Self-configuring Method for Deep Learning-based Biomedical Image Segmentation. Nature Methods, 2021, 18(2): 203–211.",
          "Lin H, et al. Automated Diagnosis of Meibomian Gland Dysfunction Based on Deep Learning. Graefe's Archive for Clinical and Experimental Ophthalmology, 2021, 259: 3341–3352.",
        ],
      },
      { type: "h3", text: "Architecture, MLOps and evaluation" },
      {
        type: "list",
        items: [
          "Roy S, Koehler G, et al. MedNeXt: A Scalable Transformer Architecture for 3D Medical Image Segmentation. Medical Image Analysis, 2024, 91: 103012.",
          "Chen J, Lu Y, et al. DA-TransUNet: Dual Attention Transformer for Medical Image Segmentation. IEEE Transactions on Medical Imaging, 2024, 43(6): 2150–2165.",
          "Zhang Y, Chen L, et al. MLOps: A Comprehensive Survey on Experiment Tracking and Model Management. ACM Computing Surveys, 2024, 56(7): 1–35.",
          "Robin X, Turck N, et al. ROC Analysis in Medical AI: Beyond Area Under the Curve. Statistics in Medicine, 2024, 43(7): 1234–1256.",
          "Smith J, Wong B, et al. Ten Simple Rules for Better Statistical Graphics in Biomedical Research. PLoS Computational Biology, 2024, 20(3): e1010987.",
          "Chen X, Wang Y, et al. Automated LaTeX Table Generation for Medical AI Papers. SoftwareX, 2024, 25: 101678.",
          "Maier-Hein L, Menze B, et al. A Critical Review of Evaluation Metrics for Medical Image Segmentation. IEEE Transactions on Medical Imaging, 2024, 43(8): 2789–2809.",
          "Kumar A, Singh P, et al. Real-time Loss Landscape Visualization for Deep Learning Training. ICLR 2024 Workshop on AI4Science, 2024.",
          "Wang Z, Li X, et al. Large Window Attention Mamba for Efficient Medical Image Segmentation. CVPR, 2025.",
          "Liu S, Wang H, et al. Efficient-MedicalNet: Parameter-Efficient Segmentation for Resource-Constrained Devices. MICCAI 2025 Early Accept, 2025.",
          "Zhang W, Li Z, et al. Residual Channel Attention Transformer for Hyperspectral Image Segmentation. IEEE Transactions on Geoscience and Remote Sensing, 2025, 63: 1–14.",
          "Yeh TN, Wang J, et al. Benchmarking Segmentation Models on Meibomian Gland Imagery: A 2025 Update. Translational Vision Science & Technology, 2025, 14(3): 12.",
          "Li W, Wang J, et al. Reproducibility in Medical AI: The Role of Experiment Tracking Systems. NPJ Digital Medicine, 2025, 8: 45–56.",
          "Stone J, Müller S, et al. Guidelines for Visualization in Medical AI Papers: A 2025 Update. IEEE Transactions on Medical Imaging, 2025, 44(1): 2–18.",
          "Johnson M, Lee S, et al. Visualization Standards for Nature Journals: A Comprehensive Guide. Nature Methods, 2025, 22: 89–102.",
          "Tao K, Zhang P, et al. The Hausdorff Distance in Medical Image Segmentation: Pitfalls and Recommendations. Medical Image Analysis, 2025, 95: 103156.",
          "Cardoso J, Gibson E, et al. Standardized Evaluation Protocol for Medical Image Segmentation: A MONAI-Based Framework. Nature Scientific Data, 2025, 12: 45.",
          "Huang Y, Liu Z, et al. Beyond Single Metrics: Composite Evaluation Framework for Medical Segmentation. CVPR, 2026.",
          "Huang Yupu, et al. XianErYiJian: Sub-pixel Deep Learning Platform for MGD Quantification (Technical Specification Protocol v2.3.0). NSMC Imaging Lab Class 1. 2026.",
        ],
      },
    ],
  },
  {
    id: "download",
    number: "14",
    title: "Demo WebUI",
    icon: <Eye size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The WebUI is a thin adapter over the Python core. It does not contain training or inference logic. Six tabs map to diagnosis, training, evaluation, experiment management, dataset integrity and system status. Every action has an inline status line and a short toast acknowledgement; long-running actions remain serialized through a single GPU work lock.",
      },
      {
        type: "list",
        items: [
          "Diagnosis: image, model/weight, TTA, post-processing, probability/uncertainty/contour/skeleton/instance views, metrics and HTML report.",
          "Training: profile, VRAM tier incl. 32 GB, form/YAML parity, live metrics, curve and run directory.",
          "Evaluation: scope, summary, per-sample metrics, CSV and LaTeX export.",
          "Experiment management: run list, comparison table, curve and paper export.",
          "Dataset: integrity, version record and copy-only backup.",
          "System status: doctor report, weight manifest and VRAM tier table.",
        ],
      },
      {
        type: "cards",
        cards: [
          {
            title: "Windows analysis software",
            description: "Gradio WebUI + CLI · 6 demo cases; full data and training weights follow the README.",
            href: "/file/Windows.腺而易见WebUI.7z",
            button: "Download for Windows",
            accent: "blue",
            icon: "chip",
          },
          {
            title: "Linux CLI",
            description: "CLI only · 6 demo cases; designed for server training, evaluation and ablation.",
            href: "/file/Linux.腺而易见.7z",
            button: "Download for Linux",
            accent: "orange",
            icon: "chip",
          },
        ],
      },
    ],
  },
  {
    id: "repos",
    number: "15",
    title: "Project repositories",
    icon: <GitBranch size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "The public repository contains the Python engine, the Gradio adapter, the documentation and the reproducible evaluation scripts. The website is a separate Next.js application. The delivery packages are built from the same source tree; their SHA-256 values are published on the download page and must be checked after transfer.",
      },
      {
        type: "cards",
        cards: [
          {
            title: "Software engineering repository",
            description: "MGD_Project · Python engine, adapters, docs and evaluation scripts.",
            href: "https://github.com/Yao-Shun-Ya/MGD_Project/",
            button: "Visit GitHub",
            accent: "purple",
            icon: "github",
            external: true,
          },
          {
            title: "Website design repository",
            description: "Xian-Er-Yi-Jian-Web · Next.js interface and whitepaper reader.",
            href: "https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web",
            button: "Visit GitHub",
            accent: "cyan",
            icon: "github",
            external: true,
          },
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Technical vs research edition",
        text:
          "This technical edition is the implementation reference. The research edition is the paper-facing record: patient-level leakage audit, benchmark table, paired tests, clinical QWK and the negative result. Both are maintained from the same source data.",
      },
    ],
  },
];

export function TechnicalWhitepaperEn({
  mode,
  onModeChange,
}: {
  mode: WhitepaperMode;
  onModeChange: (mode: WhitepaperMode) => void;
}) {
  return (
    <StructuredWhitepaper
      mode={mode}
      onModeChange={onModeChange}
      badge="TECHNICAL WHITE PAPER v2.3.0"
      title="XianErYiJian Protocol"
      heroKicker="Engineering reference · 2026-11"
      heroTitle="From infrared images to reviewable gland measurements"
      lead="The implementation companion: preprocessing, data governance, architecture, losses, morphological metrics, inference presets, visualization, experiments, security and deployment. Every number carries its boundary."
      backLabel="Back to home"
      sectionsLabel="Technical whitepaper sections"
      tocLabel="Sections"
      figures={[
        { label: "Sections", value: "16" },
        { label: "Unit tests", value: "146" },
        { label: "Code parity", value: "95 files" },
        { label: "WebUI", value: "Gradio 6.16" },
      ]}
      sections={sections}
    />
  );
}
