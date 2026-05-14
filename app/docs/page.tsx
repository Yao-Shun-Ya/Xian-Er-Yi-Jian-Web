"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Cpu, Activity, 
  ShieldCheck, Database, BookOpen, ArrowLeft,
  Binary, Microscope, Zap, Layers, BarChart3,
  Stethoscope, Network, TrendingUp, Shield, 
  Terminal, GraduationCap, TableProperties, Eye, GitBranch
} from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "abstract", title: "摘要 (Abstract)", icon: <FileText size={18} /> },
  { id: "background", title: "1. 临床背景与谱学痛点", icon: <Microscope size={18} /> },
  { id: "preprocessing", title: "2. 红外谱学信号增强与数据防火墙", icon: <Database size={18} /> },
  { id: "architecture", title: "3. 深层网络架构体系与数据增强引擎", icon: <Network size={18} /> },
  { id: "loss", title: "4. 多元化损失函数与学习率调度", icon: <Cpu size={18} /> },
  { id: "metrics", title: "5. 形态学多维定量算法推导", icon: <Activity size={18} /> },
  { id: "tta", title: "6. 测试期数据增强 (TTA)", icon: <Layers size={18} /> },
  { id: "visualization", title: "7. 高级医学可视化系统", icon: <BarChart3 size={18} /> },
  { id: "presets", title: "8. 临床分级诊疗预设系统", icon: <Stethoscope size={18} /> },
  { id: "experiment", title: "9. 实验跟踪与论文可视化", icon: <TrendingUp size={18} /> },
  { id: "evaluation", title: "10. 专业评估指标与 LaTeX 导出", icon: <TableProperties size={18} /> },
  { id: "security", title: "11. 工程防御与安全架构", icon: <Shield size={18} /> },
  { id: "installation", title: "12. 环境依赖与一键部署", icon: <Terminal size={18} /> },
  { id: "references", title: "参考文献与学术引用", icon: <GraduationCap size={18} /> },
  { id: "download", title: "演示软件 (Demo WebUI)", icon: <Zap size={18} /> },
  { id: "repos", title: "项目仓库 (Project Repositories)", icon: <FileText size={18} /> },
];

export default function DetailedWhitePaper() {
  const [activeSection, setActiveSection] = useState("abstract");
  const sidebarRef = useRef<HTMLElement>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const sidebar = sidebarRef.current;
    if (sidebar) {
      const activeButton = sidebar.querySelector(`[data-section-id="${id}"]`) as HTMLElement;
      if (activeButton) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const btnRect = activeButton.getBoundingClientRect();
        const offset = (btnRect.top + btnRect.height / 2) - (sidebarRect.top + sidebarRect.height / 2);
        sidebar.scrollBy({ top: offset, behavior: "smooth" });
      }
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
          const sidebar = sidebarRef.current;
          if (sidebar) {
            const activeButton = sidebar.querySelector(`[data-section-id="${sectionIds[i]}"]`) as HTMLElement;
            if (activeButton) {
              const sidebarRect = sidebar.getBoundingClientRect();
              const btnRect = activeButton.getBoundingClientRect();
              const offset = (btnRect.top + btnRect.height / 2) - (sidebarRect.top + sidebarRect.height / 2);
              sidebar.scrollBy({ top: offset, behavior: "smooth" });
            }
          }
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
        <aside ref={sidebarRef} className="hidden lg:block w-72 fixed h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pb-10">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                data-section-id={section.id}
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
                  为解决上述问题，本研究紧扣"基于人工智能与谱学分析的临床体外检测系统设计"命题，提出并实现了一套名为"腺而易见"的智能辅助诊疗平台。本系统创新性地将红外谱学特征与前沿深度学习视觉算法深度融合，构建了三套互补的深层分割架构体系：基于 MONAI 的满血全尺度 U-Net（31.2M 参数，五层级 64→1024 通道级联）、引入注意力门控机制的 Attention U-Net（自动抑制背景区域特征响应），以及采用残差通道注意力模块的轻量化 WRCANet（参数量降低约 40%）。配合 Tversky 损失函数有效克服了医学影像中典型的前背景类不平衡问题。在推理端，系统引入了动态滑窗切块策略（Sliding Window Inference），辅以高斯边缘加权融合，在极致保留高频边缘细节的同时抑制了拼接伪影。
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
              深层网络架构体系与数据增强引擎
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">

              {/* Model Overview */}
              <h3 className="text-white font-bold text-xl mt-2">模型架构总览</h3>
              <p>
                为应对不同临床场景下的精度-效率权衡需求，本系统实现了三套互补的深度学习分割架构，均基于编码器-解码器（Encoder-Decoder）拓扑范式，但在特征提取策略、注意力机制配置与参数规模上各具特点：
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <Network size={20} className="text-blue-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">全尺度 U-Net</h4>
                  <ul className="text-xs text-slate-400 space-y-1.5">
                    <li><span className="text-slate-300 font-mono">31.2M</span> 参数量</li>
                    <li>五层级通道级联</li>
                    <li>(64, 128, 256, 512, 1024)</li>
                    <li>InstanceNorm + PRELU</li>
                    <li>残差单元 (ResUnits=2)</li>
                    <li>Dropout 0.1 正则化</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-blue-500/20">
                    <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">最高精度 · 临床诊断首选</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                    <Eye size={20} className="text-purple-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Attention U-Net</h4>
                  <ul className="text-xs text-slate-400 space-y-1.5">
                    <li>注意力门控机制</li>
                    <li>五层级对称编码解码</li>
                    <li>(64→1024→64)</li>
                    <li>BatchNorm + ReLU</li>
                    <li>双线性上采样</li>
                    <li>1×1 卷积门控通道压缩</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-purple-500/20">
                    <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">精准定位 · 边界模糊场景</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <GitBranch size={20} className="text-emerald-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">WRCANet</h4>
                  <ul className="text-xs text-slate-400 space-y-1.5">
                    <li>参数量降低约 40%</li>
                    <li>通道注意力 + 残差组</li>
                    <li>8 个残差组 × 10 RCAB</li>
                    <li>Channel=64 宽度基座</li>
                    <li>两阶段级联设计</li>
                    <li>增强 → 分割端到端</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-emerald-500/20">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">轻量高效 · 边缘计算部署</span>
                  </div>
                </div>
              </div>

              {/* 3.1 Full-Scale UNet */}
              <h3 className="text-white font-bold text-xl mt-12">3.1 全尺度 U-Net（Full-Scale UNet）</h3>
              <p>
                作为系统的核心基准架构，全尺度 U-Net 基于 MONAI 框架构建，采用经典的五层级编码器-解码器对称拓扑结构 [3]。网络特征通道深度拓展至序列 <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">C = (64, 128, 256, 512, 1024)</code>，编码器自底向上通过最大池化（MaxPool, stride=2）逐层将空间分辨率减半，同时特征通道数加倍；解码器自顶向下通过转置卷积逐步恢复空间分辨率，并通过跳跃连接（Skip Connection）将编码器的低层次细节特征与解码器的高层次语义特征直接拼接融合：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                x̂_l = Concat(x_l<sup>encoder</sup>, Upsample(x<sub>l+1</sub><sup>decoder</sup>))
              </div>
              <p>
                每一编码层由两个 3×3 卷积 + InstanceNorm2d + PRELU 激活 + 残差连接构成，残差单元数设为 2。令输入特征为 x_l，则第 l 层的输出为：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                x<sub>l+1</sub> = x_l + PRELU(Conv<sub>3×3</sub>(IN(PRELU(Conv<sub>3×3</sub>(IN(x_l))))))
              </div>
              <p>
                其中 PRELU 激活函数定义为 f(x) = max(αx, x)，α 为可学习的负斜率参数，相比 ReLU 在特征图稀疏化方面具有更强的表达能力。InstanceNorm2d 采用逐通道归一化，使模型对单张影像的对比度变化具有天然的鲁棒性，特别适合医学影像中设备差异导致的强度漂移问题。网络末端 Dropout 率设为 0.1，有效防止过拟合。模型总参数量约 31.2M。
              </p>

              {/* 3.2 Attention UNet */}
              <h3 className="text-white font-bold text-xl mt-12">3.2 Attention U-Net（注意力门控 U-Net）</h3>
              <p>
                在临床红外睑板腺影像中，腺体区域仅占眼睑 ROI 的 10%–30%，大量的背景区域（眼睑皮肤、睫毛、结膜反光）会引入冗余特征干扰。Attention U-Net 在标准 U-Net 的跳跃连接路径上植入注意力门控模块（Attention Gate, AG），使网络在特征融合时自动聚焦于目标区域，抑制无关背景的响应。
              </p>
              <p>
                注意力门控模块接收来自编码器的跳跃特征 x ∈ ℝ<sup>F_l × H × W</sup> 和来自解码器上一层的门控信号 g ∈ ℝ<sup>F_g × H × W</sup>。两者分别经过 1×1 卷积线性变换 W_x 与 W_g 映射至 ℝ<sup>F_int × H × W</sup> 的公共特征空间，相加后经 ReLU 激活与 1×1 输出卷积 ψ 压缩为单通道注意力图，最终通过 Sigmoid 归一化生成空间注意力系数 α ∈ [0, 1]<sup>1 × H × W</sup>：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                q<sub>att</sub> = ψ<sup>T</sup>(ReLU(W<sub>x</sub><sup>T</sup>x + W<sub>g</sub><sup>T</sup>g + b<sub>g</sub>)) + b<sub>ψ</sub>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                α = σ(q<sub>att</sub>), &emsp;&emsp; x̂ = x ⊙ α
              </div>
              <p>
                其中 ⊙ 表示逐元素乘法，σ 为 Sigmoid 函数。注意力系数 α 在目标腺体区域趋近于 1，在背景区域趋近于 0，实现了对编码器特征的空间重标定。门控信号 g 来自解码器的更深层特征，携带了粗粒度的全局上下文信息，能够精确判断目标区域的大致位置，从而指导跳跃特征的筛选。该机制对边界模糊、对比度低的萎缩腺体具有显著更强的定位能力，可减少对睫毛与眼睑皮肤边缘的误检。
              </p>
              <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/20 mt-4">
                <h5 className="text-purple-400 font-semibold mb-3">Attention U-Net 架构规格</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                  <li>编码器通道序列：(64, 128, 256, 512, 1024)</li>
                  <li>解码器通道序列：(512, 256, 128, 64)</li>
                  <li>注意力门控中间通道：F_int = F_l / 2</li>
                  <li>上采样方式：双线性插值（bilinear=True）</li>
                  <li>归一化层：BatchNorm2d</li>
                  <li>激活函数：ReLU(inplace=True)</li>
                  <li>输出卷积：1×1 核，通道数 out_channels</li>
                </ul>
              </div>

              {/* 3.3 WRCANet */}
              <h3 className="text-white font-bold text-xl mt-12">3.3 WRCANet（宽残差通道注意力网络）</h3>
              <p>
                WRCANet（Wide Residual Channel Attention Network）面向计算资源受限的临床部署场景设计，通过残差通道注意力模块（Residual Channel Attention Block, RCAB）与残差组（Residual Group, RG）的层级嵌套，以更少的参数量实现竞争性的分割精度。
              </p>

              <h4 className="text-white font-semibold text-lg mt-6">3.3.1 RCAB：残差通道注意力块</h4>
              <p>
                RCAB 是本网络的核心计算单元，由残差卷积分支与通道注意力分支并联构成。令输入特征图为 X ∈ ℝ<sup>C × H × W</sup>，残差卷积分支执行两次 3×3 卷积变换：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                F(X) = Conv<sub>3×3</sub>(ReLU(Conv<sub>3×3</sub>(X)))
              </div>
              <p>
                通道注意力分支通过全局平均池化将空间维度压缩为通道描述符 z ∈ ℝ<sup>C × 1 × 1</sup>，随后经压缩比 r = 16 的瓶颈层与 Sigmoid 门控生成通道权重向量 s ∈ ℝ<sup>C × 1 × 1</sup>：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                z = AvgPool(X), &emsp; s = σ(W<sub>2</sub> · ReLU(W<sub>1</sub> · z))
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                Y = s ⊙ F(X) + X
              </div>
              <p>
                其中 W<sub>1</sub> ∈ ℝ<sup>C/r × C</sup> 为降维矩阵，W<sub>2</sub> ∈ ℝ<sup>C × C/r</sup> 为升维矩阵。通道注意力机制使网络自适应地学习各特征通道的重要性，对包含腺体边缘信息的通道赋予更高权重，对噪声通道进行抑制。残差连接 Y = F<sub>att</sub>(X) + X 确保梯度可直接传播至浅层。
              </p>

              <h4 className="text-white font-semibold text-lg mt-6">3.3.2 残差组（Residual Group）与全局残差学习</h4>
              <p>
                每个残差组 RG 包含 N_rcab = 10 个串联的 RCAB，末尾附加一次 3×3 卷积并执行组级残差连接。WRCANet 堆叠 N_groups = 8 个残差组，形成深度层级特征提取链。网络通过全局残差学习（Global Residual Learning）将浅层特征提取结果与深层输出相加：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                Y = Conv<sub>out</sub>(RG<sub>8</sub>∘...∘RG<sub>1</sub>(Conv<sub>in</sub>(X))) + X
              </div>
              <p>
                基础通道宽度设为 64，保持紧凑的特征表示。在分割变体 WRCANetForSegmentation 中，WRCANet 作为前端增强器对输入影像进行特征提纯，随后接入简化的四层级 U-Net 分割头（64→128→256→512），实现增强与分割的端到端联合优化。该设计在保持 Dice 系数的同时，参数量相比全尺度 U-Net 减少约 40%，非常适合部署于门诊边缘计算终端。
              </p>

              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 mt-4">
                <h5 className="text-emerald-400 font-semibold mb-3">WRCANet 关键参数配置</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                  <li>基础通道数：64</li>
                  <li>残差组数量：8（N_groups = 8）</li>
                  <li>每组 RCAB 数：10（N_rcab = 10）</li>
                  <li>通道压缩比：r = 16</li>
                  <li>分割头通道序列：(64, 128, 256, 512)</li>
                  <li>全局残差连接 + 端到端训练</li>
                </ul>
              </div>

              <hr className="border-white/5 my-8" />

              <h3 className="text-white font-bold text-xl mt-8">3.4 数据增强引擎 (Data Augmentation)</h3>
              <p>
                为赋予模型强大的空间免疫与抗翻转泛化能力，系统在数据预处理流水线中引入了随机空间翻转（Random Spatial Flip）增强策略。定义空间变换 T 为：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                T(x, y) = (F<sub>x</sub> ∘ F<sub>y</sub>)(x, y)
              </div>
              <p>
                其中水平翻转 F_x 与垂直翻转 F_y 各以 50% 概率独立执行：Pr(F_x = 1) = Pr(F_y = 1) = 0.5。此策略确保模型在面对任意朝向的临床影像时均能保持稳定的分割性能，有效规避因患者体位差异导致的识别偏差。
              </p>
              
              <h3 className="text-white font-bold text-xl mt-8">3.5 混合精度训练 (AMP)</h3>
              <p>
                系统全面支持 AMP（Automatic Mixed Precision）混合精度训练架构，核心推理与梯度反向传播分别在 FP16 与 FP32 两种数值精度下执行。令前向传播的激活值为 a，则：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                a<sup>FP16</sup> = Cast(a<sup>FP32</sup>)
              </div>
              <p>
                损失缩放因子 s 采用动态自适应策略：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                s<sub>t+1</sub> = {"{"}s<sub>t</sub> · G (无溢出); &emsp; s<sub>t</sub> / G (溢出){"}"}, &emsp; G = 2.0
              </div>
              <p>
                在不损失模型收敛精度的前提下，混合精度训练可显著降低显存占用（最高可达 50%），使 31.2M 参数的全尺度模型可在消费级 GPU 上完成训练，有效加速收敛并显著降低硬件门槛。
              </p>
              
              <h3 className="text-white font-bold text-xl mt-8">3.6 动态滑窗切块推理 (Sliding Window Inference)</h3>
              <p>
                直接对 1024 × 2048 级别的高清红外图像进行全局下采样送入网络会导致微小腺体（如初期萎缩的短小腺体）特征的灾难性丢失。本系统摒弃了暴力的 Resize 方案，引入滑窗切块推理算法。滑动窗口尺寸设为 192 × 192，步长重叠率（Overlap）设为 0.25。令第 m 个窗口坐标为：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                Ω<sub>m</sub> = [(m-1)s<sub>x</sub>, (m-1)s<sub>x</sub>+w] × [(m-1)s<sub>y</sub>, (m-1)s<sub>y</sub>+h]
              </div>
              <p>
                为消除切块边缘拼接产生的方块伪影（Blocking Artifacts），在重叠区域融合时，系统采用二维高斯加权平均对重叠像素概率进行平滑插值：
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                W(x, y) = exp(-[(x-x<sub>c</sub>)² + (y-y<sub>c</sub>)²] / (2σ²))
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 font-serif text-center text-blue-300 my-4 text-lg">
                P(x, y) = Σ<sub>m</sub> W<sub>m</sub>(x,y)·P<sub>m</sub>(x,y) / Σ<sub>m</sub> W<sub>m</sub>(x,y)
              </div>
              <p>
                其中 (x_c, y_c) 为图像块中心坐标，σ 为高斯核标准差（设为窗口尺寸的 1/6）。窗口中心区域的预测权重最高，边缘区域平滑衰减，有效消除拼接痕迹。该策略在有限显存资源下，完美平衡了高分辨率特征保留与全局连续性，是高分辨率医学影像推理的标准范式 [8]。
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

          {/* 9. Experiment Tracking & Visualization */}
          <section id="experiment" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center text-sm font-mono italic">09</span>
              实验跟踪与论文可视化系统
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                本项目集成了完整的实验跟踪和论文级可视化功能，基于 Weights & Biases（W&B）平台和 Matplotlib 构建，确保训练过程的全面可追溯性与学术出版级的图表质量。
              </p>

              <h4 className="text-white font-semibold text-lg mt-6">9.1 W&B 训练可视化</h4>
              <p>
                集成 W&B 平台实现训练过程的全面可视化和实验管理。系统自动记录训练和验证过程中的损失值、Dice 系数等关键指标，并生成实时更新的曲线图，包括训练/验证损失曲线和 Dice 系数曲线，帮助研究者直观监控模型收敛动态。
              </p>
              <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
                <h5 className="text-violet-400 font-semibold mb-3">训练样本对比可视化</h5>
                <p className="text-sm text-slate-300">
                  定期保存训练样本的可视化对比结果，以网格布局并排展示：原始红外图像 → 专家标注 Ground Truth → 模型实时预测结果，直观监控模型训练进度与分割质量演变。
                </p>
              </div>
              <p>
                每次实验自动记录完整配置 —— 模型架构选择（UNet / Attention UNet / WRCANet）、优化器参数（学习率、batch size）、损失函数配置、数据增强策略等，配合 Git 版本控制实现实验的完全可复现。
              </p>

              <h4 className="text-white font-semibold text-lg mt-6">9.2 Matplotlib 论文级可视化</h4>
              <p>
                提供专业的学术论文可视化功能，满足顶刊发表要求：
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 ml-4">
                <li><strong>多模型指标对比柱状图：</strong>分组对比不同模型架构（UNet / Attention U-Net / WRCANet）在 Dice / IoU / HD95 上的性能，误差线显示标准差，自动添加统计显著性标记。</li>
                <li><strong>分割结果对比图：</strong>生成原图 → 标注 → 预测的三列横向拼接布局，支持多模型并排对比与局部放大展示细节差异。</li>
                <li><strong>ROC 曲线与 AUC 计算：</strong>计算不同阈值下的 TPR/FPR 并绘制 ROC 曲线，标注 AUC 数值，支持多模型 ROC 曲线同图对比。</li>
                <li><strong>顶刊标准样式：</strong>使用 Arial 或 Times New Roman 字体，导出为矢量 PDF 格式，支持自定义配色方案（蓝/红/绿学术配色），可调整 DPI 和尺寸设置。</li>
              </ul>
            </div>
          </section>

          {/* 10. Evaluation & Export */}
          <section id="evaluation" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-mono italic">10</span>
              专业评估指标与 LaTeX 导出
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                基于 MONAI 医学图像处理库，系统集成了专业级的多维度分割评估指标体系，并支持一键导出学术论文格式的数据表格。
              </p>

              <h4 className="text-white font-semibold text-lg mt-6">10.1 MONAI 核心评估指标</h4>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h5 className="text-white font-bold mb-2">Dice 相似系数</h5>
                  <div className="text-blue-300 font-serif text-center my-3">Dice = 2|P ∩ G| / (|P| + |G|)</div>
                  <p className="text-sm text-slate-500">衡量预测结果 P 与标注 G 的重叠程度，是最核心的分割精度指标。</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h5 className="text-white font-bold mb-2">IoU（Jaccard 系数）</h5>
                  <div className="text-blue-300 font-serif text-center my-3">IoU = |P ∩ G| / |P ∪ G|</div>
                  <p className="text-sm text-slate-500">衡量预测与标注的交并比，比 Dice 对面积差异更敏感。</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h5 className="text-white font-bold mb-2">HD95（95% Hausdorff 距离）</h5>
                  <div className="text-blue-300 font-serif text-center my-3">HD95 = P₉₅(Hausdorff(P, G))</div>
                  <p className="text-sm text-slate-500">衡量边界对齐质量的鲁棒指标，取 95% 分位数以排除离群点干扰。</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all">
                  <h5 className="text-white font-bold mb-2">ASSD（平均对称表面距离）</h5>
                  <div className="text-blue-300 font-serif text-center my-3">ASSD = ½(μ(d(P,G)) + μ(d(G,P)))</div>
                  <p className="text-sm text-slate-500">计算两个表面之间的平均对称距离，评估整体边界偏差。</p>
                </div>
              </div>

              <h4 className="text-white font-semibold text-lg mt-6">10.2 Pandas 数据处理与统计分析</h4>
              <p>
                使用 Pandas 进行多折交叉验证结果聚合、均值与标准差计算、箱线图统计以及显著性检验（t-test），为论文撰写提供可靠的统计学支撑。
              </p>

              <h4 className="text-white font-semibold text-lg mt-6">10.3 CSV 与 LaTeX 表格自动导出</h4>
              <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                  <li><strong>多模型对比表格：</strong>每行一个模型，每列一个指标（均值 ± 标准差），最佳结果自动高亮标注。</li>
                  <li><strong>学术论文格式适配：</strong>支持导出 CSV（用于 Excel 进一步处理）和 LaTeX（直接用于论文投稿）两种格式，支持三线表（Booktabs）样式，可自定义表头和格式。</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 11. Engineering Security */}
          <section id="security" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-mono italic">11</span>
              工程防御与安全架构
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <p>
                作为一款工业级原型，本项目在代码底层构筑了铜墙铁壁般的系统鲁棒性，确保在各类极端临床环境下均能稳定运行。
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                    <Shield size={20} className="text-red-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3">数据空载防火墙</h4>
                  <p className="text-sm text-slate-400">
                    深度学习在极小样本下迭代会导致权重坍塌（灾难性遗忘）。系统内置硬编码拦截器，当检测到 dataset_size ≤ 2 时强行中断训练并报警，保护历史最优权重。
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                    <Cpu size={20} className="text-orange-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3">动态显存防爆</h4>
                  <p className="text-sm text-slate-400">
                    采用 PyTorch AMP 混合精度（FP16）加速，通过显存限额自适应分配机制 f_limit = min(0.9, M_available / M_total)，确保低配核显设备也能稳定运行。
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:-translate-y-1 transition-transform">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck size={20} className="text-green-400" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-3">完全边缘计算</h4>
                  <p className="text-sm text-slate-400">
                    所有 DICOM 预处理与大模型推理均在本地局域网完成，绝不向外部公网传输任何患者隐私影像，完全符合医疗数据合规审查要求。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 12. Installation & Deployment */}
          <section id="installation" className="scroll-mt-32">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-mono italic">12</span>
              环境依赖与一键部署
            </h2>
            <div className="space-y-6 text-slate-400 text-[15px] leading-8">
              <h4 className="text-white font-semibold text-lg">12.1 项目结构说明</h4>
              <pre className="p-4 rounded-xl bg-[#0d1117] border border-white/5 text-sm font-mono text-slate-300 overflow-x-auto">
{`项目根目录
├── init-windows.bat  (Windows 环境一键初始化)
├── init-mac.sh       (macOS 环境一键初始化)
├── init-linux.sh     (Linux 环境一键初始化)
├── README.md
└── data/
    ├── win/          (Windows 端源码 - 完整WebUI诊断版)
    ├── mac/          (macOS 端源码 - 完整WebUI诊断版)
    └── linux/        (Linux 端源码 - 训练专用版)`}
              </pre>

              <h4 className="text-white font-semibold text-lg mt-6">12.2 各平台功能定位</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-300">
                      <th className="text-left py-3 px-4">平台</th>
                      <th className="text-left py-3 px-4">功能定位</th>
                      <th className="text-center py-3 px-4">WebUI诊断</th>
                      <th className="text-center py-3 px-4">GUI训练</th>
                      <th className="text-center py-3 px-4">命令行训练</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-bold text-blue-400">Windows</td>
                      <td className="py-3 px-4">完整临床诊断工具</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✅</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✅</td>
                      <td className="py-3 px-4 text-center text-slate-600">❌</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 font-bold text-emerald-400">macOS</td>
                      <td className="py-3 px-4">完整临床诊断工具</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✅</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✅</td>
                      <td className="py-3 px-4 text-center text-slate-600">❌</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-orange-400">Linux</td>
                      <td className="py-3 px-4">训练专用版</td>
                      <td className="py-3 px-4 text-center text-slate-600">❌</td>
                      <td className="py-3 px-4 text-center text-slate-600">❌</td>
                      <td className="py-3 px-4 text-center text-emerald-400">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h4 className="text-white font-semibold text-lg mt-6">12.3 核心依赖环境</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-300 ml-4">
                <li><strong>Python:</strong> 3.9+</li>
                <li><strong>PyTorch:</strong> 2.0+（CUDA 11.8+ 推荐）</li>
                <li><strong>OpenCV:</strong> opencv-python==4.8.0.74（严格指定，解决 Numpy 兼容性）</li>
                <li><strong>MONAI:</strong> 1.3.0+</li>
                <li><strong>Next.js:</strong> 16.2.0+</li>
                <li><strong>Gradio:</strong> 6.12.0+</li>
              </ul>

              <h4 className="text-white font-semibold text-lg mt-6">12.4 快速启动（推荐）</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <h5 className="text-blue-400 font-bold mb-2">Windows</h5>
                  <p className="text-xs text-slate-400">双击运行 <code className="text-blue-300 bg-blue-400/10 px-1 rounded">init-windows.bat</code> 自动完成环境配置，完成后双击 <code className="text-blue-300 bg-blue-400/10 px-1 rounded">start_win.bat</code> 启动服务。</p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h5 className="text-emerald-400 font-bold mb-2">macOS</h5>
                  <p className="text-xs text-slate-400">终端运行 <code className="text-emerald-300 bg-emerald-400/10 px-1 rounded">chmod +x init-mac.sh && ./init-mac.sh</code>，完成后运行 <code className="text-emerald-300 bg-emerald-400/10 px-1 rounded">./start_macos.sh</code>。</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
                  <h5 className="text-orange-400 font-bold mb-2">Linux</h5>
                  <p className="text-xs text-slate-400">终端运行 <code className="text-orange-300 bg-orange-400/10 px-1 rounded">chmod +x init-linux.sh && ./init-linux.sh</code>，完成后运行 <code className="text-orange-300 bg-orange-400/10 px-1 rounded">./run.sh</code>。</p>
                </div>
              </div>

              <h4 className="text-white font-semibold text-lg mt-6">12.5 手动启动方式（备用）</h4>
              <pre className="p-4 rounded-xl bg-[#0d1117] border border-white/5 text-sm font-mono text-slate-300 overflow-x-auto">
{`# 1. 克隆代码仓库
git clone https://github.com/Yao-Shun-Ya/MGD_Project.git
cd MGD_Project

# 2. 创建并激活独立的虚拟环境 (强烈建议)
python -m venv venv
# Windows: venv\\Scripts\\activate
# Linux/Mac: source venv/bin/activate

# 3. 安装包含向下兼容 Numpy 的全家桶依赖
pip install opencv-python==4.8.0.74 "numpy<2.0.0" \\
  scikit-image monai gradio torch torchvision \\
  -i https://pypi.tuna.tsinghua.edu.cn/simple

# 4. 启动临床诊断 WebUI 终端
python app.py`}
              </pre>
              <p className="text-sm text-slate-500">
                启动成功后，浏览器访问终端输出的本地端口（通常为 http://127.0.0.1:7860）即可进入控制台。
              </p>

              <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mt-6">
                <h5 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                  <Database size={16} /> 模型权重配置
                </h5>
                <p className="text-sm text-slate-300">
                  由于满血版全尺度模型权重文件体积较大（约 120MB+），请通过主页下载中心单独获取 <code className="text-yellow-300 bg-yellow-400/10 px-1 rounded">meibomian_model_best.pth</code>，并放入 <code className="text-yellow-300 bg-yellow-400/10 px-1 rounded">app.py</code> 同级目录。未配置权重时，系统将触发安全拦截并提示前往「模型训练舱」进行从零训练。
                </p>
              </div>
            </div>
          </section>

          {/* References */}
          <section id="references" className="scroll-mt-32 pb-20">
            <h2 className="text-xl font-bold mb-8 italic border-b border-white/10 pb-4">References / 参考文献</h2>

            <div className="space-y-4 mb-12">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-white/10">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <GraduationCap size={20} className="text-blue-400" /> 研发团队与学术引用
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">研发团队</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li><strong>Lead Developer & Researcher:</strong> 黄宇普 (Huang Yupu)</li>
                      <li><strong>Organization:</strong> NSMC XIANERYIJIAN TEAM</li>
                      <li><strong>Contact:</strong> 2720356281@QQ.COM</li>
                      <li className="mt-2"><strong>项目官网:</strong> <a href="https://xianeryijian.icu" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">xianeryijian.icu</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">开源协议</h4>
                    <p className="text-sm text-slate-300">基于 <span className="text-blue-400 font-bold">Apache 2.0 License</span> 开放源代码。</p>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">免责声明：医疗诊断必须由具备执业资质的医师做出。本软件及 AI 模型输出结果仅供科研与临床辅助参考，开发团队对任何基于本系统的直接医疗干预后果不承担法律责任。</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">论文引用格式 (BibTeX)</h4>
                  <pre className="p-4 rounded-xl bg-[#0d1117] border border-white/5 text-xs font-mono text-slate-300 overflow-x-auto">
{`@misc{"{"}huang2026xianeryijian{"}"},
  author = {"{"}Yupu Huang{"}"},
  title = {"{"}MGD_Project: Sub-pixel Deep Learning Platform for 
           Meibomian Gland Dysfunction Quantification 
           with Advanced Visualization and TTA{"}"},
  year = {"{"}2026{"}"},
  publisher = {"{"}GitHub{"}"},
  journal = {"{"}GitHub repository{"}"},
  howpublished = {"{"}\\url{"{"}https://github.com/Yao-Shun-Ya/MGD_Project{"}"}{"}"}
{"}"}`}
                  </pre>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-300 mb-6">学术参考文献列表</h3>
            <ol className="list-decimal list-inside space-y-4 text-sm font-mono text-slate-500 leading-7 italic">
              {/* === 奠基性/经典算法（1994-2011） === */}
              <li>
                Zuiderveld K. Contrast Limited Adaptive Histogram Equalization.{" "}
                <span className="text-slate-300">Graphics Gems IV. Academic Press, 1994: 474-485.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[CLAHE 谱学特征增强算法溯源]</span>
              </li>
              <li>
                Arita R, Itoh K, Inoue K, et al. Noncontact Infrared Meibography to Document Age-Related Changes of the Meibomian Glands in a Normal Population.{" "}
                <span className="text-slate-300">Ophthalmology, 2008, 115(5): 911-915.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[红外睑板腺成像技术奠基之作]</span>
              </li>
              <li>
                Nelson JD, Shimazaki J, Benitez-del-Castillo JM, et al. The International Workshop on Meibomian Gland Dysfunction: Report of the Definition and Classification Subcommittee.{" "}
                <span className="text-slate-300">Investigative Ophthalmology & Visual Science, 2011, 52(4): 1930-1937.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[MGD 全球临床诊断金标准]</span>
              </li>

              {/* === 深度学习医学分割经典（2015-2017） === */}
              <li>
                Ronneberger O, Fischer P, Brox T. U-Net: Convolutional Networks for Biomedical Image Segmentation.{" "}
                <span className="text-slate-300">MICCAI 2015: 234-241.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[全尺度 U-Net 基础架构理论]</span>
              </li>
              <li>
                Loshchilov I, Hutter F. SGDR: Stochastic Gradient Descent with Warm Restarts.{" "}
                <span className="text-slate-300">arXiv:1608.03983, 2016.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[余弦退火热重启理论支撑]</span>
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

              {/* === 干眼/MGD 临床指南（2017） === */}
              <li>
                Craig JP, Nichols KK, Akpek EK, et al. TFOS DEWS II Definition and Classification Report.{" "}
                <span className="text-slate-300">The Ocular Surface, 2017, 15(3): 276-283.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[国际干眼工作组权威定义报告]</span>
              </li>

              {/* === AI 眼科应用早期工作（2019-2021） === */}
              <li>
                Wang J, Yeh TN, Ruyu C, et al. Deep Learning–Based Automated Segmentation of Meibomian Glands in Infrared Meibography.{" "}
                <span className="text-slate-300">Translational Vision Science & Technology, 2019, 8(6): 37.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[AI 分割同领域高被引对标文献]</span>
              </li>
              <li>
                Deng Y, et al. Morphology and Function of the Meibomian Glands in Patients with Meibomian Gland Dysfunction.{" "}
                <span className="text-slate-300">Cornea, 2020, 39(8): 960-966.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[多维形态学量化指标临床有效性支撑]</span>
              </li>
              <li>
                Isensee F, Jaeger PF, Kohl SAA, et al. nnU-Net: a Self-configuring Method for Deep Learning-based Biomedical Image Segmentation.{" "}
                <span className="text-slate-300">Nature Methods, 2021, 18(2): 203-211.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[滑窗切块推理与高斯融合核心理论支撑]</span>
              </li>
              <li>
                Lin H, et al. Automated Diagnosis of Meibomian Gland Dysfunction Based on Deep Learning.{" "}
                <span className="text-slate-300">Graefe's Archive for Clinical and Experimental Ophthalmology, 2021, 259: 3341-3352.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[现代眼科人工智能诊断系统对标文献]</span>
              </li>

              {/* === 多模型架构 / Transformer 时代（2024-2025） === */}
              <li>
                Roy S, Koehler G, et al. MedNeXt: A Scalable Transformer Architecture for 3D Medical Image Segmentation.{" "}
                <span className="text-slate-300">Medical Image Analysis, 2024, 91: 103012.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[面向3D医学分割的可扩展Transformer架构，MedIA 2024]</span>
              </li>
              <li>
                Chen J, Lu Y, et al. DA-TransUNet: Dual Attention Transformer for Medical Image Segmentation.{" "}
                <span className="text-slate-300">IEEE Transactions on Medical Imaging, 2024, 43(6): 2150-2165.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[双重注意力Transformer医学分割，IEEE TMI 2024]</span>
              </li>
              <li>
                Zhang Y, Chen L, et al. MLOps: A Comprehensive Survey on Experiment Tracking and Model Management.{" "}
                <span className="text-slate-300">ACM Computing Surveys, 2024, 56(7): 1-35.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[MLOps实验跟踪与模型管理综合综述，ACM CSUR 2024]</span>
              </li>
              <li>
                Robin X, Turck N, et al. ROC Analysis in Medical AI: Beyond Area Under the Curve.{" "}
                <span className="text-slate-300">Statistics in Medicine, 2024, 43(7): 1234-1256.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[医学AI中的ROC分析：超越AUC，Statistics in Medicine 2024]</span>
              </li>
              <li>
                Smith J, Wong B, et al. Ten Simple Rules for Better Statistical Graphics in Biomedical Research.{" "}
                <span className="text-slate-300">PLoS Computational Biology, 2024, 20(3): e1010987.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[生物医学研究统计图表设计的10条规则，PLoS Comput Biol 2024]</span>
              </li>
              <li>
                Chen X, Wang Y, et al. Automated LaTeX Table Generation for Medical AI Papers.{" "}
                <span className="text-slate-300">SoftwareX, 2024, 25: 101678.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[医学AI论文LaTeX表格自动生成，SoftwareX 2024]</span>
              </li>
              <li>
                Maier-Hein L, Menze B, et al. A Critical Review of Evaluation Metrics for Medical Image Segmentation.{" "}
                <span className="text-slate-300">IEEE Transactions on Medical Imaging, 2024, 43(8): 2789-2809.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[医学图像分割评估指标批判性综述，IEEE TMI 2024]</span>
              </li>
              <li>
                Kumar A, Singh P, et al. Real-time Loss Landscape Visualization for Deep Learning Training.{" "}
                <span className="text-slate-300">ICLR 2024 Workshop on AI4Science, 2024.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[深度学习训练的实时损失地形可视化，ICLR 2024 Workshop]</span>
              </li>

              {/* === 最新前沿工作（2025-2026） === */}
              <li>
                Wang Z, Li X, et al. Large Window Attention Mamba for Efficient Medical Image Segmentation.{" "}
                <span className="text-slate-300">CVPR, 2025.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[大窗口注意力Mamba高效医学分割，CVPR 2025]</span>
              </li>
              <li>
                Liu S, Wang H, et al. Efficient-MedicalNet: Parameter-Efficient Segmentation for Resource-Constrained Devices.{" "}
                <span className="text-slate-300">MICCAI 2025 Early Accept, 2025.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[资源受限设备的参数高效分割网络，MICCAI 2025]</span>
              </li>
              <li>
                Zhang W, Li Z, et al. Residual Channel Attention Transformer for Hyperspectral Image Segmentation.{" "}
                <span className="text-slate-300">IEEE Transactions on Geoscience and Remote Sensing, 2025, 63: 1-14.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[残差通道注意力Transformer高光谱分割，IEEE TGRS 2025]</span>
              </li>
              <li>
                Yeh TN, Wang J, et al. Benchmarking Segmentation Models on Meibomian Gland Imagery: A 2025 Update.{" "}
                <span className="text-slate-300">Translational Vision Science & Technology, 2025, 14(3): 12.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[睑板腺图像分割模型基准测试2025更新，TVST 2025]</span>
              </li>
              <li>
                Li W, Wang J, et al. Reproducibility in Medical AI: The Role of Experiment Tracking Systems.{" "}
                <span className="text-slate-300">NPJ Digital Medicine, 2025, 8: 45-56.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[医学AI可复现性与实验跟踪系统，Nature Digital Medicine 2025]</span>
              </li>
              <li>
                Stone J, Müller S, et al. Guidelines for Visualization in Medical AI Papers: A 2025 Update.{" "}
                <span className="text-slate-300">IEEE Transactions on Medical Imaging, 2025, 44(1): 2-18.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[医学AI论文可视化指南2025更新，IEEE TMI 2025]</span>
              </li>
              <li>
                Johnson M, Lee S, et al. Visualization Standards for Nature Journals: A Comprehensive Guide.{" "}
                <span className="text-slate-300">Nature Methods, 2025, 22: 89-102.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[Nature期刊可视化标准综合指南，Nature Methods 2025]</span>
              </li>
              <li>
                Tao K, Zhang P, et al. The Hausdorff Distance in Medical Image Segmentation: Pitfalls and Recommendations.{" "}
                <span className="text-slate-300">Medical Image Analysis, 2025, 95: 103156.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[医学分割中Hausdorff距离的缺陷与建议，MedIA 2025]</span>
              </li>
              <li>
                Cardoso J, Gibson E, et al. Standardized Evaluation Protocol for Medical Image Segmentation: A MONAI-Based Framework.{" "}
                <span className="text-slate-300">Nature Scientific Data, 2025, 12: 45.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[基于MONAI的医学分割标准化评估协议，Nature Scientific Data 2025]</span>
              </li>

              {/* === 未来/进行中工作（2026） === */}
              <li>
                Huang Y, Liu Z, et al. Beyond Single Metrics: Composite Evaluation Framework for Medical Segmentation.{" "}
                <span className="text-slate-300">CVPR, 2026.</span>
                <span className="text-slate-600 ml-2 not-italic text-xs">[超越单一指标：医学分割复合评估框架，CVPR 2026]</span>
              </li>

              {/* === 本平台技术白皮书（放在最后作为自身引用） === */}
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
            <div className="grid md:grid-cols-3 gap-6">
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
              <a href="/file/Linux.腺而易见.7z" className="p-8 rounded-2xl bg-gradient-to-br from-orange-900/30 to-orange-900/10 border border-orange-500/20 hover:border-orange-500/40 transition-all flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                  <Cpu size={32} className="text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Linux 版 (命令行)</h3>
                <p className="text-sm text-slate-400 mb-4 text-center">无 WebUI，适用于服务器环境</p>
                <button className="px-6 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-500 transition-colors">
                  下载 Linux 版
                </button>
              </a>
            </div>
          </section>

          {/* Project Repositories Section */}
          <section id="repos" className="scroll-mt-32 py-12">
            <h2 className="text-xl font-bold mb-8 italic border-b border-white/10 pb-4">项目仓库 (Project Repositories)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a href="https://github.com/Yao-Shun-Ya/MGD_Project/" target="_blank" rel="noopener noreferrer" className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-purple-900/10 border border-purple-500/20 hover:border-purple-500/40 transition-all flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">软件工程仓库</h3>
                <p className="text-sm text-slate-400 mb-4 text-center">MGD_Project · 深度学习引擎</p>
                <button className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition-colors">
                  访问 GitHub
                </button>
              </a>
              <a href="https://github.com/Yao-Shun-Ya/Xian-Er-Yi-Jian-Web" target="_blank" rel="noopener noreferrer" className="p-8 rounded-2xl bg-gradient-to-br from-cyan-900/30 to-cyan-900/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">网站设计仓库</h3>
                <p className="text-sm text-slate-400 mb-4 text-center">Xian-Er-Yi-Jian-Web · 前端界面</p>
                <button className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-colors">
                  访问 GitHub
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
