"use client";

import {
  Activity,
  BookOpen,
  Database,
  FileText,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { StructuredWhitepaper, type WhitepaperSection } from "@/components/docs/StructuredWhitepaper";
import type { WhitepaperMode } from "@/components/docs/types";

const sections: WhitepaperSection[] = [
  {
    id: "abstract",
    number: "00",
    title: "摘要",
    icon: <FileText size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "本白皮书报告公开 MGD-1K 数据集上的患者级睑板腺分割与量化基准。完成内容级去重后，999 对样本来自 338 个患者标识，按患者独立划分为 694 / 153 / 152 张（239 / 50 / 49 名患者）。默认 MGD-Former 在 9 小时单次 holdout 上达到 Dice 0.7749、clDice 0.8156、HD95 68.05 px。",
      },
      {
        type: "p",
        text:
          "核心结论不是“某个架构胜出”，而是一组混杂因素：官方 200 例测试清单与训练患者重叠；只改变分块高度就能让同一组权重从 0.370 变到 0.655；像素 Dice 并不能转化为临床 Meiboscore 一致性（QWK 0.131）。因此，泄漏、分块敏感性、TTA/MTE 成本与临床阴性结果被作为一等结果记录，而不是附录备注。",
      },
      {
        type: "callout",
        tone: "warn",
        title: "引用任何 Dice 前先读这一段",
        text:
          "以下数字来自一次患者级 holdout，不是 5 折交叉验证。权重仍为 verified=false。这是一份可复现的工程与方法学记录，不是临床验证结论。",
      },
    ],
  },
  {
    id: "clinical",
    number: "01",
    title: "临床问题与任务",
    icon: <Activity size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "干眼影响约 15–30% 成人，其中相当比例与睑板腺功能障碍（MGD）相关。MGD 涉及终末导管角化与睑脂分泌改变，导致腺体缺失、脂质层缺陷与眼表炎症。非接触红外睑板腺成像利用 800–1000 nm 波段的反射/吸收差异，在不接触、不使用染料的情况下显示腺体形态。",
      },
      {
        type: "p",
        text:
          "临床 Meiboscore 按腺体缺失程度分为 0–3 级：0（<33.3%）、1（33.3–66.6%）、2（66.6–100%）、3（完全缺失）。它快速、通用，但把连续形态压缩成四个箱；早期亚毫米级截断、迂曲、宽度变化与间距损失可能被漏掉。本研究的目标不是替代分级，而是把腺体形态变成可复核、可追溯的像素与形态学证据。",
      },
      {
        type: "list",
        items: [
          "输入：单通道红外睑板腺影像，统一缩放至 640×1280。",
          "输出：腺体/眼睑 mask、概率图，以及五项形态学指标。",
          "边界：不做诊断、不替代临床复核、不把像素距离换算成毫米。",
        ],
      },
    ],
  },
  {
    id: "data",
    number: "02",
    title: "数据、患者划分与泄漏",
    icon: <Database size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "MGD-1K 提供 1,000 张 LipiView II 红外图像、320 名受试者、腺体/眼睑 mask 与六轮专家 Meiboscore。内容级去重后剩 999 对可用样本。文件名中的数字研究 ID 定义患者组，剩余 338 个 ID。分组按最大 Meiboscore 分层后整组分配到 train/val/test。",
      },
      {
        type: "table",
        head: ["划分", "图像", "患者", "Meiboscore 0/1/2/3"],
        rows: [
          ["Train", "694", "239", "119 / 432 / 117 / 26"],
          ["Val", "153", "50", "26 / 92 / 28 / 7"],
          ["Test", "152", "49", "35 / 87 / 23 / 7"],
        ],
        caption: "患者级 holdout；任何患者不跨划分。",
      },
      {
        type: "p",
        text:
          "运行同时记录两个签名：文件清单签名 6bdacfb0… 标识 999 个 stem，分配签名 7a6fd581… 对有序划分做哈希。前者回答“数据集有没有变”，后者回答“这次运行实际用了哪套分配”。",
      },
      {
        type: "stats",
        items: [
          { label: "官方测试患者", value: "166 / 200", note: "200 张清单" },
          { label: "同患者重叠", value: "326 / 800", note: "剩余图像" },
          { label: "训练集重叠", value: "116 / 166", note: "患者级训练集" },
          { label: "clean-official", value: "60 / 50", note: "图像 / 患者" },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "不要把官方 200 例当成患者独立",
        text:
          "官方 200 例来自 166 名患者；其余 800 张中有 326 张来自同一批患者。即使采用患者级训练划分，训练集仍包含 116/166 名官方测试患者。clean-official 只有 60 张 / 50 名患者。泄漏对照为 0.7243 对 0.6870：在这个预算下没有观察到膨胀，但风险是真实存在的。",
      },
    ],
  },
  {
    id: "benchmark",
    number: "03",
    title: "2026-11 患者级 benchmark",
    icon: <Zap size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "9 小时单次患者级 holdout，152 张图像 / 49 名患者。所有模型共享预处理、划分、损失、分块（384×768，重叠 0.25）与阈值 0.7。差异仍包括 epoch 预算与预训练，因此这是一次受控预算下的可比性检查，不是架构排名。",
      },
      {
        type: "table",
        head: ["模型", "Dice", "IoU", "clDice", "HD95 (px)", "Epochs"],
        rows: [
          ["AttentionUNet", "0.7771", "0.6452", "0.8349", "118.44", "15"],
          ["MGD-Former", "0.7749", "0.6372", "0.8156", "68.05", "45"],
          ["MGD-PriorNet", "0.7640", "0.6283", "0.8539", "154.03", "~12"],
          ["UNet", "0.7119", "0.5644", "0.8531", "148.03", "30"],
        ],
        caption:
          "WRCANet 未纳入：8 GB 卡单 epoch 约 38 min，预算内只跑 1 epoch，val Dice 0.006。",
      },
      {
        type: "table",
        head: ["对比", "平均 Δ", "95% CI", "p", "结论"],
        rows: [
          ["MGD-Former − AttentionUNet", "-0.0022", "跨 0", "0.016", "可比，不宣称胜出"],
          ["MGD-Former − UNet", "+0.0630", "[+0.0516, +0.0749]", "5.4e-20", "显著更好"],
          ["MGD-Former − MGD-PriorNet", "+0.0109", "接近 0", "0.714", "不显著"],
        ],
        caption: "逐样本 Dice，配对 Wilcoxon；1,000 次 bootstrap。",
      },
      {
        type: "callout",
        tone: "info",
        title: "MTE 与 TTA 必须连同成本一起报告",
        text:
          "MTE（256/384/512）Dice 0.7736，不高于单块 0.7749，但 HD95 从 68.05 降到 61.85：它是边界修正，不是精度增益。8× TTA Dice 0.7808，成本约 8 倍。",
      },
    ],
  },
  {
    id: "architecture",
    number: "04",
    title: "架构：MGD-Former 与基线",
    icon: <ShieldCheck size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "MGD-Former 使用 SegFormer MiT-B2 编码器，四个 stage 的 stride 为 4/8/16/32，通道 64/128/320/512。解码器自顶向下融合 1/4 与 1/8 特征，最终输出 stride-4 logits。腺体头与眼睑头共享编码器，三个深监督头稳定训练。ADE20K 预训练编码器本地加载 323 个 tensor（97.29% 覆盖）。",
      },
      {
        type: "table",
        head: ["路线", "关键结构", "参数", "定位"],
        rows: [
          ["MGD-Former", "MiT-B2 + 1/4 & 1/8 融合 + stride-4", "~27M", "默认主干"],
          ["UNet", "MONAI 五级，InstanceNorm + PReLU", "31.2M", "经典强基线"],
          ["AttentionUNet", "U-Net + attention gate", "~34M", "边界定位基线"],
          ["MGD-PriorNet", "FCAS + ASAB + APG-DD", "1.5M", "小参数先验模型"],
          ["WRCANet", "8×10 RCAB + 三级头", "~19M", "预算反例"],
        ],
      },
      {
        type: "p",
        text:
          "stride 4 不是为了把模型做大。640×1280 下腺体往往只有 3–8 px 宽；stride 16 会把目标压到一像素以下，断裂会先出现在 HD95 与骨架连续性，而不是 Dice。代价是显存与解码器复杂度，所以分块推理和显存档位是设计的一部分。",
      },
    ],
  },
  {
    id: "training",
    number: "05",
    title: "训练配方与预算",
    icon: <BookOpen size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "默认损失为 Dice + BCE + clDice + 眼睑辅助项。Dice 负责重叠，BCE 稳定像素梯度，clDice 约束骨架连续性（10% warmup），眼睑项稳定 R_loss 分母。",
      },
      {
        type: "code",
        code:
          "L = 0.4 * Dice + 0.4 * BCE + 0.2 * clDice + 0.25 * eyelid\nclDice warmup = 10% epochs\noptimizer = AdamW(lr=1e-4, weight_decay=1e-4)\nschedule = cosine annealing, warmup 5%\nEMA = 0.99（短预算），AMP + channels_last",
      },
      {
        type: "p",
        text:
          "9 小时预算下 EMA 0.999 会严重滞后：数百步后 shadow weights 仍由随机初始化主导，val Dice 可能一直是 0。本研究使用 0.99；0.999 留给长训练。数据增强只有随机水平/垂直翻转与 384×768 随机裁剪；验证和推理使用整图滑窗。",
      },
      {
        type: "table",
        head: ["模型", "Batch", "显存峰值", "吞吐", "Epoch"],
        rows: [
          ["MGD-Former", "4", "~3.6 GB", "4.2–4.9 样本/秒", "143–159 s"],
          ["UNet", "4", "~1.6 GB", "~5.9 样本/秒", "118 s"],
          ["AttentionUNet", "4", "~4.2 GB", "~1.6 样本/秒", "440 s"],
          ["WRCANet", "2×2", "~3.05 GB", "—", "~38 min"],
          ["MGD-PriorNet", "4", "~4.3 GB", "~2.1 样本/秒", "327 s"],
        ],
        caption: "RTX 4060 Laptop 8 GB；所有数字都带测量条件。",
      },
    ],
  },
  {
    id: "inference",
    number: "06",
    title: "推理：滑窗、MTE、TTA",
    icon: <Activity size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "默认分块 384×768，重叠 0.25。重叠区域用二维高斯权重融合，中心权重高、边界平滑过渡。阈值 0.7，最小面积 120 px；三档预设只改变阈值、最小面积与重叠，不改变权重。",
      },
      {
        type: "code",
        code:
          "W(x, y) = exp(-((x-xc)^2 + (y-yc)^2) / (2*sigma^2))\nP(x, y) = sum_m W_m * P_m / sum_m W_m\n\nMTE: average P_256, P_384, P_512\n8x TTA: 4 flips x 2 scales (1.0, 1.125)",
      },
      {
        type: "p",
        text:
          "MTE 主要改善 HD95（68.05 → 61.85），不改善 Dice。8× TTA 把 Dice 推到 0.7808，成本约 8 倍。不确定性图上，多块方差 AUROC 0.639、熵 0.483、TTA8 1.000；TTA8 与标签信号耦合，不能当作分诊证据。",
      },
    ],
  },
  {
    id: "evaluation",
    number: "07",
    title: "评估与临床边界",
    icon: <ShieldCheck size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "像素层指标为 Dice 与 IoU；边界层为 HD95 与 ASSD；管状连续性为 clDice。空 mask 样本返回 NaN 并记录原因，而不是伪造 0。每个结果携带 split_signature、权重 manifest、tiling、TTA 与阈值。",
      },
      {
        type: "p",
        text:
          "临床层将 R_loss 映射为 Meiboscore，并与六轮专家评分比较。本轮得到 accuracy 0.164、MAE 1.105、QWK 0.131：高 Dice 没有转化为临床一致性。下睑/上睑 Dice 为 0.7905 对 0.7584，与“下睑更难”的常见假设相反，因此必须分开报告。",
      },
      {
        type: "callout",
        tone: "danger",
        title: "最重要的阴性结果",
        text:
          "QWK 0.131 意味着 R_loss → Meiboscore 阈值与眼睑分母需要重新校准。在完成之前，像素指标和演示权重不能作为临床结论；论文与站点都保留这条限制。",
      },
    ],
  },
  {
    id: "reproducibility",
    number: "08",
    title: "复现契约",
    icon: <Database size={18} />,
    blocks: [
      {
        type: "p",
        text:
          "每个 run 写出隔离目录：config.yaml、env.json、metrics.jsonl、train.log、checkpoints 与权重 manifest。manifest 记录 sha256、架构、输入尺寸、归一化、verified、split signature、seed 与 run_dir。缺失 manifest 或 verified=false 意味着这是工程证据，不是已验证结果。",
      },
      {
        type: "stats",
        items: [
          { label: "单元测试", value: "146", note: "pytest" },
          { label: "代码对齐", value: "95 文件", note: "SHA-256 0 diff" },
          { label: "启动器", value: "6", note: "Windows ASCII+CRLF / Linux LF" },
          { label: "演示病例", value: "6", note: "3 上睑 / 3 下睑" },
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
    title: "参考文献",
    icon: <BookOpen size={18} />,
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
          "代码以 Apache-2.0 发布；论文、数据与模型权重的许可需单独确认。诊断必须由有资质的临床医生完成。",
      },
    ],
  },
];

export function ResearchWhitepaperZh({
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
      badge="RESEARCH WHITE PAPER v2.3.0"
      title="XianErYiJian Protocol"
      heroKicker="Research edition · 2026-11"
      heroTitle="公开数据上的睑板腺分割：患者级泄漏、分块敏感性与临床阴性结果"
      lead="这不是排行榜声明，而是一份可复现的研究记录：官方测试集与训练患者重叠、分块高度改变同一组权重的表现、像素 Dice 无法转化为临床一致性。"
      backLabel="返回控制台"
      sectionsLabel="科研白皮书章节"
      tocLabel="章节"
      figuresLabel="关键数字"
      pdfs={[
        { label: "英文 PDF · 38 页", href: "/Paper/en/main.pdf" },
        { label: "中文 PDF · 34 页", href: "/Paper/zh/main.pdf" },
      ]}
      figures={[
        { label: "默认主干", value: "MGD-Former" },
        { label: "测试集", value: "152 / 49" },
        { label: "权重状态", value: "verified=false" },
        { label: "单元测试", value: "146" },
      ]}
      sections={sections}
    />
  );
}
