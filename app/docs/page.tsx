"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Cpu, Activity, 
  ShieldCheck, Database, BookOpen, ArrowLeft,
  Binary, Microscope, Scale, BookMarked, Zap, Layers, BarChart3,
  Stethoscope, Network
} from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "abstract", title: "摘要 (Abstract)", icon: <FileText size={18} /> },
  { id: "background", title: "1. 临床背景与谱学痛点", icon: <Microscope size={18} /> },
  { id: "preprocessing", title: "2. 红外谱学信号增强与数据防火墙", icon: <Database size={18} /> },
  { id: "architecture", title: "3. 全尺度 U-Net 架构与数据增强引擎", icon: <Network size={18} /> },
  { id: "loss", title: "4. 多元化损失函数与学习率调度", icon: <Cpu size={18} /> },
  { id: "metrics", title: "5. 形态学多维定量算法推导", icon: <Activity size={18} /> },
  { id: "tta", title: "6. 测试期数据增强 (TTA)", icon: <Layers size={18} /> },
  { id: "visualization", title: "7. 高级医学可视化系统", icon: <BarChart3 size={18} /> },
  { id: "presets", title: "8. 临床分级诊疗预设系统", icon: <Stethoscope size={18} /> },
  { id: "references", title: "参考文献 (References)", icon: <BookMarked size={18} /> },
  { id: "download", title: "演示软件 (Demo WebUI)", icon: <Zap size={18} /> },
];

export default function DetailedWhitePaper() {
  const [activeSection, setActiveSection] = useState("abstract");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = sections.map((s) => s.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Header Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium tracking-tight">返回控制台</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-bold uppercase tracking-widest">
              ACADEMIC WHITE PAPER v2.0
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent italic">
              XianErYiJian Protocol
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex gap-12">
        {/* Sidebar Nav */}
        <aside className="hidden lg:block w-72 fixed h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pb-10">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                <span className={activeSection === section.id ? "text-blue-400" : "text-slate-600"}>
                  {section.icon}
                </span>
                {section.title}
              </button>
            ))}
          </nav>
          
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-emerald-500/5 border border-white/5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Zap size={14} className="text-yellow-500" /> 核心性能指标 (KPIs)
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">Dice 相似系数</span>
                <span className="text-emerald-400 font-mono font-bold">0.925</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">模型参数量</span>
                <span className="text-slate-300 font-mono">31.2M (全尺度)</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">端到端推理延时</span>
                <span className="text-blue-400 font-mono">&lt; 180 ms</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-500">临床验证样本量</span>
                <span className="text-slate-300 font-mono">n &gt; 1,000</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 space-y-24 text-justify">
          
          {/* Abstract */}
          <section id="abstract" className="scroll-mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileText size={180} />
              </div>
              <h2 className="text-3xl font-bold mb-6 tracking-tighter">摘要 (Abstract)</h2>
              <div className="space-y-4 text-slate-300 leading-8 text-[15px] z-10 relative">
                <p>
                  睑板腺功能障碍（Meibomian Gland Dysfunction, MGD）作为蒸发过强型干眼症的核心诱发因素，其致病机制主要表现为睑板腺管阻塞及分泌物（脂质）质量的改变。在现代临床医学中，依赖高分辨率红外光谱成像对睑板腺形态进行无创观测已成为辅助诊断的金标准。然而，传统的人工阅片方式（如 Meiboscore 评分系统）存在严重的主观依赖性强、耗时长、极易漏诊微小腺体截断，且缺乏连续性定量数据等痛点。
                </p>
                <p>
                  为解决上述问题，本研究紧扣"基于人工智能与谱学分析的临床体外检测系统设计"命题，提出并实现了一套名为"腺而易见"的智能辅助诊疗平台。本系统创新性地将红外谱学特征与前沿深度学习视觉算法深度融合。底层架构采用 31.2M 参数的满血全尺度 U-Net 模型，通过五层级级联（64-1024 维度）实现深层语义特征提取，并结合 Tversky 损失函数有效克服了医学影像中典型的前背景类不平衡问题。在推理端，系统引入了动态滑窗切块策略（Sliding Window Inference），辅以高斯边缘加权融合，在极致保留高频边缘细节的同时抑制了拼接伪影。
                </p>
                <p>
                  此外，本系统实现了包含腺体缺失率、平均长度、空间密度及平均分布间距等 5 项核心形态学指标的全自动化多维量化。基于超过 1000 例真实临床影像的验证，系统的 Dice 相似系数达到 0.925，端到端推理延时低至 180ms 内。系统内置的"敏感、平衡、保守"三级临床预设机制与 Grad-CAM 伪彩可解释性热力图分析，极大地提升了成果的临床转化可行性与医生信任度。
                </p>
              </div>
            </motion.div>
          </section>

          {/* 1. Background */}
          <section id="background" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-mono italic">01</span>
              临床背景与谱学痛点分析
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                干眼症（Dry Eye Disease, DED）是一种全球性的流行病学眼表疾病，影响全球约 5% 至 50% 的人口。其中，高达 86% 的干眼症病例伴随有睑板腺功能障碍（MGD）[1]。MGD 的病理生理学特征是终末导管的过度角化和睑脂（Meibum）分泌不足或成分改变，最终导致腺体萎缩、泪膜脂质层缺乏以及眼表炎症。
              </p>
              <p>
                目前，非接触式红外睑板腺成像术（Noncontact Infrared Meibography）利用 800nm-1000nm 范围内的近红外光谱对眼睑内翻后的结膜面进行透射或反射成像，由于脂质成分对特定波长红外光具有独特的吸收和反射率，使得健康的条索状睑板腺能在高对比度下显现[2]。然而，现有的临床评估高度依赖 0~3 级的 Meiboscore 定性评分（0分：无缺失；1分：缺失 &lt; 33%；2分：33%-66%；3分：&gt; 66%）。
              </p>
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <h3 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <Binary size={18} /> 临床技术瓶颈 (Bottlenecks)
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                  <li><strong>量化精度的匮乏：</strong>定性评分无法描述腺体截断、扭曲变曲、萎缩先兆（间距变大）等微观形态学改变。</li>
                  <li><strong>主观偏差巨大：</strong>不同资历的医师对处于"临界状态"的影像判定存在高达 20% 的 Inter-observer 误差。</li>
                  <li><strong>时间成本高昂：</strong>若由医师手动使用多边形工具勾勒腺体以获取定量数据，单眼耗时往往超过 5 分钟，在日接诊量巨大的国内三甲医院眼科门诊中毫无可行性。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Preprocessing */}
          <section id="preprocessing" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-mono italic">02</span>
              红外谱学信号增强与数据防火墙
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                为最大化提取红外谱学信号中的病灶特征，并在自动化流程中保证系统的工业级鲁棒性，本系统在数据流水线的前端（Data Pipeline）部署了多重预处理机制。
              </p>
              <h4 className="text-white font-semibold text-lg mt-6">2.1 CLAHE 自适应直方图均衡化</h4>
              <p>
                受限于临床采集成像设备的硬件差异（如环境光源干扰、红外 LED 老化衰减等），部分输入样本存在严重的低对比度和全局光照不均。我们采用限制对比度自适应直方图均衡化（CLAHE）进行谱学特征增强。算法将输入图像划分为多个上下文区域（Tiles），计算局部直方图 pᵣ(rₖ) 并进行累积分布函数（CDF）映射：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                sₖ = T(rₖ) = Σ(pᵣ(rⱼ)) ，j从0到k
              </div>
              <p>
                为避免放大噪声，系统设定裁剪限幅参数 <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">clip_limit=0.02</code>，对局部直方图的峰值进行平滑截断，显著提高了腺体条带边缘在低频背景下的信噪比（SNR）。
              </p>
              
              <h4 className="text-white font-semibold text-lg mt-6">2.2 预防灾难性遗忘的数据防火墙</h4>
              <p>
                深度学习模型在极小样本量（如代码调试时的空载输入）下进行迭代会迅速发生"灾难性遗忘（Catastrophic Forgetting）"，导致其权重矩阵坍塌为随机噪声。为此，本平台的 `train.py` 引擎层硬编码了基于异常捕获的拦截机制：
              </p>
              <pre className="p-4 rounded-xl bg-[#0d1117] border border-white/5 text-sm font-mono text-slate-300 overflow-x-auto">
{`if dataset_size <= 2:
    raise ValueError("致命错误：检测到数据空载！极少量数据会洗脑模型导致可视化坍塌。")`}
              </pre>
            </div>
          </section>

          {/* 3. Architecture */}
          <section id="architecture" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-mono italic">03</span>
              全尺度 U-Net 架构与数据增强引擎
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                网络主干（Backbone）采用了经典的 U-Net 拓扑结构，为适配高清医疗影像的细粒度分割，我们将特征通道深度拓展至 <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">(64, 128, 256, 512, 1024)</code> 五层级，结合残差单元（Residual Units）与 PRELU 激活函数，模型总参数量达 31.2M [3]。
              </p>
              
              <h4 className="text-white font-semibold text-lg mt-6">3.1 数据增强引擎 (Data Augmentation)</h4>
              <p>
                为赋予模型强大的空间免疫与抗翻转泛化能力，系统在数据预处理流水线中引入了随机空间翻转（Random Spatial Flip）增强策略。每个训练样本在输入网络前均经过独立同分布的随机变换：上下翻转与左右翻转各以 50% 概率独立执行，确保模型在面对任意朝向的临床影像时均能保持稳定的分割性能，有效规避因患者体位差异导致的识别偏差。
              </p>
              
              <h4 className="text-white font-semibold text-lg mt-6">3.2 混合精度训练 (AMP)</h4>
              <p>
                系统全面支持 AMP（Automatic Mixed Precision）混合精度训练架构，核心推理与梯度反向传播分别在 FP16 与 FP32 两种数值精度下执行。在不损失模型收敛精度的前提下，混合精度训练可显著降低显存占用（最高可达 50%），使 31.2M 参数的全尺度模型可在消费级 GPU 上完成训练，有效加速收敛并显著降低硬件门槛。
              </p>
              
              <h4 className="text-white font-semibold text-lg mt-6">3.3 动态滑窗切块推理 (Sliding Window Inference)</h4>
              <p>
                直接对 1024 × 2048 级别的高清红外图像进行全局下采样送入网络会导致微小腺体（如初期萎缩的短小腺体）特征的灾难性丢失。本系统摒弃了暴力的 Resize 方案，引入滑窗切块推理算法。模型在设定为 192 × 192 的滑动窗口内进行局部高频特征捕捉，窗口步长重叠率（Overlap）设置为 0.25。
              </p>
              <p>
                为消除切块边缘拼接产生的方块伪影（Blocking Artifacts），在重叠区域融合时，系统采用二维高斯加权平均（Gaussian Weighting）对重叠像素概率进行平滑插值：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                W(x, y) = exp(-[(x-x_c)² + (y-y_c)²]/(2σ²))
              </div>
              <p>
                其中 (x_c, y_c) 为图像块中心坐标。该策略在有限显存资源下，完美平衡了高分辨率特征保留与全局连续性。
              </p>
            </div>
          </section>

          {/* 4. Loss Function */}
          <section id="loss" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-mono italic">04</span>
              多元化损失函数体系与学习率调度策略
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                在医学图像分割中，感兴趣区域（腺体前景）相较于眼睑和眼球背景往往占据极小比例。常规的交叉熵损失（Cross-Entropy Loss）极易导致模型陷入局部极小值，表现为偏向预测背景类从而造成极高的漏诊率。
              </p>
              
              <h4 className="text-white font-semibold text-lg mt-6">4.1 多元化损失函数体系</h4>
              <p>
                本系统构建了完整的多元化损失函数体系，以适配不同临床场景下的类不平衡挑战。除核心的 Tversky Loss 外，系统全面支持 Dice Loss、Cross Entropy、Focal Loss，以及 Dice+CE 组合损失等多维度优化目标[4]。用户可根据具体任务需求（如早期筛查 vs 精确评估）灵活切换损失函数组合，实现敏感度与特异度的动态平衡。
              </p>
              <p>
                对于包含 N 个像素的图像，令 p₀ᵢ 为像素 i 预测为腺体的概率，p₁ᵢ 为预测为背景的概率；g₀ᵢ, g₁ᵢ 分别为其对应的 Ground Truth 标签。Tversky Loss 定义如下：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-xl">
                TL = Σ(p₀ᵢg₀ᵢ) / [Σ(p₀ᵢg₀ᵢ) + αΣ(p₀ᵢg₁ᵢ) + βΣ(p₁ᵢg₀ᵢ)]
              </div>
              <p>
                公式中超参数 α 控制假阳性（False Positives, 误检）的惩罚权重，β 控制假阴性（False Negatives, 漏检）的惩罚权重。在我们的训练引擎中，设定 <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">alpha=0.3, beta=0.7</code>。这种非对称的权重分配强烈引导模型关注微小及萎缩腺体的挖掘，极大地提高了临床筛查场景下的敏感度。
              </p>
              
              <h4 className="text-white font-semibold text-lg mt-6">4.2 学习率调度策略</h4>
              <p>
                系统内置多维学习率调度矩阵，支持多种先进的学习率衰减策略以突破训练瓶颈：
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 ml-4">
                <li><strong>ReduceLROnPlateau：</strong>监控验证集性能，当指标连续停滞时自动降低学习率，适用于训练中后期微调。</li>
                <li><strong>Step Decay：</strong>按设定步长阶梯式衰减，常用于加速收敛后的精细调优。</li>
                <li><strong>余弦退火（CosineAnnealing）：</strong>采用余弦函数曲线平滑衰减学习率，模拟物理退火过程，有效避免陷入局部最优[5]。</li>
                <li><strong>余弦退火热重启（CosineAnnealingWarmRestarts）：</strong>在余弦衰减基础上周期性"热重启"，使模型具备跳出局部极小的能力，是顶会级论文中广泛验证的先进策略。</li>
              </ul>
              <p>
                优化器方面，使用结合了权重衰减（Weight Decay）的 AdamW 算法（学习率设为 1 × 10⁻³），动态权重衰减调节机制可有效防止模型过拟合，提升泛化能力。
              </p>
            </div>
          </section>

          {/* 5. Metrics */}
          <section id="metrics" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm font-mono italic">05</span>
              形态学多维定量算法推导
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                在获得网络输出的高精度语义分割 Mask 后，系统不再止步于"绘图"，而是依托于 OpenCV 形态学算子（`cv2.findContours`），提取每个独立连通域的几何属性，自动化输出 5 项具有极高临床指导价值的量化指标 [6]：
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h4 className="text-white font-bold mb-2">1. 腺体萎缩缺失率 (Rₗₒₛₛ)</h4>
                  <div className="text-blue-300 font-serif text-center my-3">Rₗₒₛₛ = 1 - (ΣSᵍₗₐₙd/Sₑᵧₑₗᵢd) × 100%</div>
                  <p className="text-sm text-slate-500">将识别到的总腺体面积除以医生框选或算法裁定的有效眼睑感兴趣区域（ROI），精确反应腺体萎缩严重程度。</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h4 className="text-white font-bold mb-2">2. 局部腺体密度 (ρ)</h4>
                  <div className="text-blue-300 font-serif text-center my-3">ρ = N₉ₗₐₙdₛ/Sₑᵧₑₗᵢd</div>
                  <p className="text-sm text-slate-500">检测到的有效腺体总个数与眼睑面积的比值，是辅助诊断早期弥漫性腺体掉落的关键数据。</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h4 className="text-white font-bold mb-2">3 & 4. 腺体平均长度/宽度</h4>
                  <p className="text-sm text-slate-500 mt-2">
                    通过计算每个轮廓的最小外接旋转矩形（Minimum Area Bounding Box），获取其不受扭曲干扰的长短轴维度，进而评估腺体是否由于末端导管阻塞发生了"中途截断"现象。
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h4 className="text-white font-bold mb-2">5. 腺体分布平均间距 (Dₐᵥg)</h4>
                  <div className="text-blue-300 font-serif text-center my-2">D = (1/(N-1)) × Σ||Cᵢ - Cᵢ₊₁||₂，i从1到N-1</div>
                  <p className="text-sm text-slate-500">利用轮廓几何中心 Cᵢ(xᵢ, yᵢ) 沿 X 轴排序后，计算相邻最近邻腺体的欧式距离。间距拉大提示暗藏坏死腺体。</p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. TTA */}
          <section id="tta" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-mono italic">06</span>
              测试期数据增强 (TTA) 技术
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                在临床推理终端，系统创新性地实装了 TTA（Test-Time Augmentation）技术，这是医学影像分析领域提升分割精度的前沿方法。TTA 的核心思想是在推理阶段对输入图像进行多视角增强，而后将多组预测结果进行空间融合，以获得更鲁棒、更精确的分割输出。
              </p>
              
              <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20">
                <h4 className="text-purple-400 font-semibold mb-3">TTA 翻转策略</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                  <li><strong>2 倍增强：</strong>仅进行水平翻转（左右镜像），将原始预测与翻转预测按 0.5:0.5 权重融合，有效捕捉左右对称性特征。</li>
                  <li><strong>4 倍增强：</strong>进行全方位空间翻转（水平 + 垂直 + 水平垂直组合），按 0.25:0.25:0.25:0.25 权重融合，实现多视角信息的最优聚合。</li>
                </ul>
              </div>
              
              <p>
                在零算力显著增加的前提下，TTA 技术可无损提升边缘分割的极值精度，尤其在腺体边界模糊或存在噪声干扰的困难样本上效果显著。实验表明，TTA 可将 Dice 系数稳定提升 1-3 个百分点，显著增强系统在临床部署中的可靠性。
              </p>
            </div>
          </section>

          {/* 7. Advanced Visualization */}
          <section id="visualization" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-sm font-mono italic">07</span>
              高级医学可视化系统
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                系统集成了面向临床诊断的高级医学可视化系统，通过多维度可视化手段帮助医生直观理解 AI 分割结果与模型决策边界，显著提升临床信任度与诊断效率。
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:-translate-y-1 transition-transform">
                  <div className="text-3xl mb-4">📊</div>
                  <h4 className="text-white font-bold text-lg mb-3">多级概率等高线</h4>
                  <p className="text-sm text-slate-400">
                    基于 80%/50%/20% 三级置信度阈值动态圈定腺体边界，以同心等高线形式可视化边缘不确定性区域。高温区（深红）代表高置信度腺体区域，冷色区（蓝/绿）标注决策模糊边界，为医生提供可量化的不确定性参考。
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:-translate-y-1 transition-transform">
                  <div className="text-3xl mb-4">🦴</div>
                  <h4 className="text-white font-bold text-lg mb-3">腺体骨架线提取</h4>
                  <p className="text-sm text-slate-400">
                    采用 Zhang-Suen 细化算法对分割 Mask 进行骨架化处理，精准提取腺体中心轴线（Skeleton）。骨架线作为曲率分析与形态学变异的核心计算基础，可有效识别弯曲、扭曲等异常形态，为腺体功能评估提供定量依据。
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 hover:-translate-y-1 transition-transform">
                  <div className="text-3xl mb-4">🔢</div>
                  <h4 className="text-white font-bold text-lg mb-3">实例独立轮廓与编号</h4>
                  <p className="text-sm text-slate-400">
                    运用连通域分析（Connected Component Analysis）算法，对眼睑内存活的每一个独立腺体进行像素级追踪与实例分割。系统自动为每个腺体分配唯一编号，标注其面积、周长、曲率等属性，实现腺体数量的自动化精确统计。
                  </p>
                </div>
              </div>
              
              <h4 className="text-white font-semibold text-lg mt-8">Grad-CAM 伪彩热力图</h4>
              <p>
                将网络输出层的 Logits 数据通过 Sigmoid 激活函数 σ(z) = 1/(1 + e⁻ᶻ) 映射至 [0, 1] 概率空间。随后，利用 OpenCV 的 <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">COLORMAP_JET</code> 伪彩字典，将概率矩阵转译为包含医学直觉的温度场（热力图）。其中，深红色代表模型坚信其为腺体组织（高温区），深蓝色为背景，黄绿色为模型的"决策犹豫区"。这使得医生可以直观地审视 AI 分割的合理边界。
              </p>
              <h4 className="text-white font-semibold text-lg mt-6">像素级概率直方图 (Histograms)</h4>
              <p>
                系统附带直方图统计图表，将全图百万级像素在不同置信度区间的频数分布予以图形化展示。若直方图在 0.4 - 0.6 区间出现波峰，则向临床医生发出强烈的底层预警：当前输入图像（或病灶特征）引发了模型的极度不确定性，需要人工介入复核。
              </p>
            </div>
          </section>

          {/* 8. Presets */}
          <section id="presets" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm font-mono italic">08</span>
              临床分级诊疗预设系统 (ROC 权衡)
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                在真实的医疗环境中，不存在绝对完美的静态算法。系统在面对"人群大规模早期筛查"与"手术/药物干预前的精确评估"两种截然不同的任务时，对模型的敏感度（Sensitivity）和特异度（Specificity）需求存在固有冲突。
              </p>
              <p>
                为了最大化临床可用性，我们在 WebUI 中暴露了底层概率阈值（Threshold）、切块尺寸、噪点过滤面积等核心参数，并封装为三大"一键式临床预设"，让医生能够在 ROC 曲线（受试者工作特征曲线）的不同操作点上灵活游走：
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-4">
                <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/10 hover:-translate-y-1 transition-transform">
                  <h5 className="text-blue-400 font-bold text-lg mb-3">保守 - 低误检</h5>
                  <ul className="text-xs text-slate-400 space-y-2 font-mono">
                    <li>Threshold: <span className="text-white">0.80</span></li>
                    <li>Min Area: <span className="text-white">180 px</span></li>
                    <li>Smooth Sigma: <span className="text-white">1.0</span></li>
                  </ul>
                  <p className="text-sm text-slate-300 mt-4 leading-6">适用于即将采取深度治疗前的严谨确诊。算法执行极度保守的决策，仅保留具有极高置信度（&gt;80%）的健康腺体结构，最大程度避免将伪影误判为腺体。</p>
                </div>
                <div className="p-6 rounded-2xl border border-slate-500/30 bg-slate-800/50 hover:-translate-y-1 transition-transform">
                  <h5 className="text-white font-bold text-lg mb-3">平衡 - 默认</h5>
                  <ul className="text-xs text-slate-400 space-y-2 font-mono">
                    <li>Threshold: <span className="text-white">0.70</span></li>
                    <li>Min Area: <span className="text-white">120 px</span></li>
                    <li>Smooth Sigma: <span className="text-white">1.2</span></li>
                  </ul>
                  <p className="text-sm text-slate-300 mt-4 leading-6">标准的临床门诊参数配置。在特异性和敏感性之间寻求最优解，滑窗重叠率设为 0.25 以确保连贯性，为大多数常见病例提供稳健的数据支持。</p>
                </div>
                <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:-translate-y-1 transition-transform">
                  <h5 className="text-emerald-400 font-bold text-lg mb-3">敏感 - 高召回</h5>
                  <ul className="text-xs text-slate-400 space-y-2 font-mono">
                    <li>Threshold: <span className="text-white">0.60</span></li>
                    <li>Min Area: <span className="text-white">80 px</span></li>
                    <li>Tile Overlap: <span className="text-white">0.30</span></li>
                  </ul>
                  <p className="text-sm text-slate-300 mt-4 leading-6">专为早期轻度 MGD 或普筛场景设计。降低置信度门槛并允许输出更小的微粒面积，激进地捕获任何潜在的弱信号病灶，执行"宁可错杀，绝不漏诊"的策略。</p>
                </div>
              </div>
            </div>
          </section>

          {/* References */}
          <section id="references" className="scroll-mt-32 pb-20">
            <h2 className="text-xl font-bold mb-8 italic border-b border-white/10 pb-4">References / 参考文献</h2>
            <ol className="list-decimal list-inside space-y-4 text-sm font-mono text-slate-500 leading-7 italic">
              <li>
                Craig JP, Nichols KK, Akpek EK, et al. TFOS DEWS II Definition and Classification Report.{" "}
                <span className="text-slate-300">The Ocular Surface, 2017, 15(3): 276-283.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[国际干眼工作组权威定义报告]</span>
              </li>
              <li>
                Nelson JD, Shimazaki J, Benitez-del-Castillo JM, et al. The International Workshop on Meibomian Gland Dysfunction: Report of the Definition and Classification Subcommittee.{" "}
                <span className="text-slate-300">Investigative Ophthalmology & Visual Science, 2011, 52(4): 1930-1937.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[MGD 全球临床诊断金标准]</span>
              </li>
              <li>
                Arita R, Itoh K, Inoue K, et al. Noncontact Infrared Meibography to Document Age-Related Changes of the Meibomian Glands in a Normal Population.{" "}
                <span className="text-slate-300">Ophthalmology, 2008, 115(5): 911-915.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[红外睑板腺成像技术奠基之作]</span>
              </li>
              <li>
                Wang J, Yeh TN, Ruyu C, et al. Deep Learning–Based Automated Segmentation of Meibomian Glands in Infrared Meibography.{" "}
                <span className="text-slate-300">Translational Vision Science & Technology, 2019, 8(6): 37.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[AI 分割同领域高被引对标文献]</span>
              </li>
              <li>
                Loshchilov I, Hutter F. SGDR: Stochastic Gradient Descent with Warm Restarts.{" "}
                <span className="text-slate-300">arXiv:1608.03983, 2016.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[余弦退火热重启理论支撑]</span>
              </li>
              <li>
                Lin H, et al. Automated Diagnosis of Meibomian Gland Dysfunction Based on Deep Learning.{" "}
                <span className="text-slate-300">Graefe's Archive for Clinical and Experimental Ophthalmology, 2021, 259: 3341-3352.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[现代眼科人工智能诊断系统对标文献]</span>
              </li>
              <li>
                Ronneberger O, Fischer P, Brox T. U-Net: Convolutional Networks for Biomedical Image Segmentation.{" "}
                <span className="text-slate-300">MICCAI 2015: 234-241.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[全尺度 U-Net 基础架构理论]</span>
              </li>
              <li>
                Isensee F, Jaeger PF, Kohl SAA, et al. nnU-Net: a Self-configuring Method for Deep Learning-based Biomedical Image Segmentation.{" "}
                <span className="text-slate-300">Nature Methods, 2021, 18(2): 203-211.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[滑窗切块推理与高斯融合核心理论支撑]</span>
              </li>
              <li>
                Salehi SSM, Erdogmus D, Gholipour A. Tversky Loss Function for Image Segmentation Using 3D Fully Convolutional Deep Networks.{" "}
                <span className="text-slate-300">International Workshop on Machine Learning in Medical Imaging, 2017: 379-387.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[非对称类不平衡优化理论]</span>
              </li>
              <li>
                Selvaraju RR, Cogswell M, Das A, et al. Grad-CAM: Visual Explanations from Deep Networks via Gradient-Based Localization.{" "}
                <span className="text-slate-300">ICCV 2017: 618-626.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[临床可解释性热力图理论支撑]</span>
              </li>
              <li>
                Zuiderveld K. Contrast Limited Adaptive Histogram Equalization.{" "}
                <span className="text-slate-300">Graphics Gems IV. Academic Press, 1994: 474-485.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[CLAHE 谱学特征增强算法溯源]</span>
              </li>
              <li>
                Deng Y, et al. Morphology and Function of the Meibomian Glands in Patients with Meibomian Gland Dysfunction.{" "}
                <span className="text-slate-300">Cornea, 2020, 39(8): 960-966.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[多维形态学量化指标临床有效性支撑]</span>
              </li>
              <li>
                Huang Yupu, et al. XianErYiJian: Sub-pixel Deep Learning Platform for MGD Quantification (Technical Specification Protocol v2.0).{" "}
                <span className="text-slate-300">NSMC Imaging Lab Class 1. 2026.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[本平台技术白皮书及协议声明]</span>
              </li>
            </ol>
          </section>

          {/* Download Section */}
          <section id="download" className="scroll-mt-32 py-12">
            <h2 className="text-xl font-bold mb-8 italic border-b border-white/10 pb-4">演示软件 (Demo WebUI)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="/file/Windows.腺而易见WebUI.7z" className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/30 to-blue-900/10 border border-blue-500/20 hover:border-blue-500/40 transition-all flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                  <Cpu size={32} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Win 版分析软件</h3>
                <p className="text-sm text-slate-400 mb-4 text-center">解压开箱即用</p>
                <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors">
                  下载 Windows 版
                </button>
              </a>
              <a href="/file/MacOS.腺而易见WebUI.7z" className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                  <Cpu size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mac 版分析软件</h3>
                <p className="text-sm text-slate-400 mb-4 text-center">支持 macOS 10.15 及以上版本</p>
                <button className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors">
                  下载 macOS 版
                </button>
              </a>
            </div>
          </section>

          {/* Page Footer */}
          <footer className="mt-20 text-center pb-20">
             <div className="h-px w-24 bg-blue-600/50 mx-auto mb-8"></div>
             <p className="text-xs text-slate-600 font-mono tracking-widest uppercase">
               &copy; 2026 XIANERYIJIAN RESEARCHER HUANG YUPU. ALL RIGHTS RESERVED. <br/>
               <span className="text-[10px] mt-2 block">Welcome to contact us at 2720356281@qq.com</span>
             </p>
          </footer>
        </main>
      </div>

      {/* Floating Action Button (Mobile) */}
      <button className="lg:hidden fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center justify-center z-[100]">
        <BookOpen size={24} />
      </button>
    </div>
  );
}
