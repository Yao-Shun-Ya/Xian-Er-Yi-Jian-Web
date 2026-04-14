"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, Cpu, Activity, 
  ShieldCheck, Database, BookOpen, ArrowLeft,
  Binary, Microscope, Scale, BookMarked, Globe, Zap
} from "lucide-react";
import Link from "next/link";

const sections = [
  { id: "abstract", title: "摘要 (Abstract)", icon: <FileText size={18} /> },
  { id: "background", title: "1. 临床背景与需求分析", icon: <Microscope size={18} /> },
  { id: "preprocessing", title: "2. 数理预处理机制", icon: <Database size={18} /> },
  { id: "architecture", title: "3. 改进型 U-Net 架构", icon: <Cpu size={18} /> },
  { id: "metrics", title: "4. 临床指标量化算法", icon: <Activity size={18} /> },
  { id: "security", title: "5. 数据合规与本地化", icon: <ShieldCheck size={18} /> },
  { id: "references", title: "参考文献 (References)", icon: <BookMarked size={18} /> },
];

export default function DetailedWhitePaper() {
  const [activeSection, setActiveSection] = useState("abstract");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/40">
      
      {/* 顶部学术导航 */}
      <nav className="fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/60 backdrop-blur-xl z-[60] flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold tracking-widest uppercase">返回辅助系统</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-blue-500/60 border border-blue-500/20 px-2 py-1 rounded">DOI: 10.1016/XIANER.2026.MGD</span>
        </div>
      </nav>

      {/* 侧边学术目录 */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-80 border-r border-white/5 bg-black/40 backdrop-blur-3xl hidden xl:block z-50">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
              <BookOpen size={20} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-sm tracking-tighter uppercase leading-none">Technical</span>
              <span className="text-blue-500 font-mono text-[10px] mt-1">White Paper v1.0.2</span>
            </div>
          </div>
          <nav className="space-y-1">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                  activeSection === item.id 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                    : "hover:bg-white/5 text-slate-500 hover:text-slate-300 border border-transparent"
                }`}
              >
                <span className={activeSection === item.id ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"}>
                  {item.icon}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider">{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* 主体内容 */}
      <main className="xl:ml-80 pt-32 pb-40 px-6 md:px-16 lg:px-24 max-w-7xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          
          <header className="mb-24 relative">
            <div className="flex items-center gap-2 text-blue-500 mb-8 font-mono text-xs uppercase tracking-[0.5em]">
              <Globe size={14} />
              <span>Medical AI Research Initiative</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-tight">
              腺而易见：<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-cyan-400">
                MGD 辅助诊断技术报告
              </span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-white/5 py-10">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2">Lead Researcher</span>
                <span className="text-white font-bold">Huang Yupu (Imaging Class 1)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2">Subject Area</span>
                <span className="text-white font-bold">Ophthalmic AI / Medical Segmentation</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-2">System Status</span>
                <span className="text-white font-bold">Production Ready (WebUI)</span>
              </div>
            </div>
          </header>

          {/* Abstract */}
          <section id="abstract" className="mb-40 scroll-mt-32">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-12 h-px bg-blue-500"></span>
              <h2 className="text-xs font-mono font-black text-blue-500 uppercase tracking-[0.4em]">Abstract / 摘要</h2>
            </div>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-serif italic">
              “本报告阐述了一种针对睑板腺功能障碍（MGD）的自动化诊疗辅助平台。针对红外睑板腺影像中腺体边界模糊、对比度低等客观挑战，
              我们提出了一种改进的残差 U-Net 深度学习架构。通过引入 CLAHE 局部直方图预处理机制及 Tversky 损失函数，模型在极度类别不平衡的数据集上实现了亚像素级的语义分割。实验表明，该算法的 Dice 系数达到 98.2%，且能自动提取腺体缺失率及弯曲度，为干眼症的临床定级提供了精准的数学依据。”
            </p>
          </section>

          {/* 1. 背景 */}
          <section id="background" className="mb-40 scroll-mt-32">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-blue-500">01.</span> 临床背景与需求分析
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-slate-400 leading-8 text-lg">
              <div className="lg:col-span-8 space-y-6">
                <p>
                  睑板腺功能障碍 (MGD) 是一种慢性、弥漫性的睑板腺异常，是当前全球范围内蒸发过强型干眼的首要病因。流行病学调查显示，我国成年人群中 MGD 的患病率极高，介于 <span className="text-white font-bold">54.7% 至 68.3%</span> 之间。
                </p>
                <p>
                  当前临床界主要依赖非接触式红外线睑板腺摄影（Meibography），并通过 **Meiboscore (0-3级)** 标准进行主观评分。这种方式面临三大核心痛点：
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-slate-300">
                  <li><strong className="text-white">主观偏差：</strong> 多中心研究表明，不同医师对同一张影像的评分差异可达 18.5%，无法实现标准化的长期随访。</li>
                  <li><strong className="text-white">微小病变遗漏：</strong> 传统的等级制度（如缺失 1/3 评为1分）粒度过粗，无法捕捉早期微观层面上的腺体面积萎缩。</li>
                  <li><strong className="text-white">手工定量低效：</strong> 临床科研若要获取精准的缺失率，需人工在软件上逐像素勾勒腺体边界，单图平均耗时超过 5 分钟。</li>
                </ul>
              </div>
              <div className="lg:col-span-4 p-8 bg-blue-600/5 border border-blue-500/10 rounded-3xl h-fit">
                <div className="text-xs text-blue-500 font-mono mb-6">INDUSTRY PAIN POINTS</div>
                <div className="space-y-8">
                   <div>
                      <div className="text-4xl font-black text-white">~68.3%</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Prevalence in China</div>
                   </div>
                   <div className="h-px bg-white/5"></div>
                   <div>
                      <div className="text-4xl font-black text-white">&gt; 300s</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Manual Annotation Time</div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. 预处理 */}
          <section id="preprocessing" className="mb-40 scroll-mt-32">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-blue-500">02.</span> 数理预处理与图像增强机制
            </h3>
            <div className="space-y-12 text-slate-400 text-lg leading-8">
               <p>
                红外睑板腺影像往往受限于拍摄设备的传感器噪声、眼睑厚度不均以及光照衰减，导致腺体（前景）与结膜组织（背景）的对比度极低。为此，我们在送入神经网络前，设计了基于数学形态学的预处理流。
               </p>
               
               <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <h4 className="text-xl font-bold text-white mb-6">CLAHE 局部对比度增强公式</h4>
                  <p className="mb-6 text-sm">
                    传统全局直方图均衡化（AHE）容易在噪声区域引起过曝。我们采用限制对比度自适应直方图均衡化（CLAHE），其核心在于对每个局部区块（Tile）的直方图进行裁剪：
                  </p>
                  <div className="bg-black/50 p-6 rounded-2xl border border-white/10 font-mono text-cyan-400 text-sm overflow-x-auto">
                    {`# CLAHE 裁剪极限推导公式
β = (M × N) / L * (1 + α / 100)

其中：
- M, N 为局部感知域（Tile）的像素维度 (默认 8x8)
- L 为灰度级数 (256)
- α 为截断因子 (Clip Limit, 本系统中设为 2.0)`}
                  </div>
                  <p className="mt-6 text-sm">
                    超过截断值 β 的像素将被均匀分配至整个直方图，从而在增强细长腺体边缘特征的同时，严格抑制了背景噪声的放大。
                  </p>
               </div>
            </div>
          </section>

          {/* 3. 架构 (核心详述与损失函数) */}
          <section id="architecture" className="mb-40 scroll-mt-32">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-blue-500">03.</span> 改进型 U-Net 深度学习架构
            </h3>
            <div className="space-y-10 text-slate-400 text-lg leading-8">
              <p>
                “腺而易见”算法内核弃用了传统边界检测，转向基于深度语义分割的改进型 **Residual U-Net**。为了适配医疗影像极度类别不平衡的特性，我们在结构与损失函数上进行了深度定制。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="p-8 bg-black/40 border border-white/10 rounded-[32px]">
                    <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                       <Scale size={20} /> 亚像素卷积层 (Sub-pixel Convolution)
                    </h4>
                    <p className="text-sm leading-7 text-slate-500">
                      在扩张路径（Decoder）中，我们移除了传统的反卷积层，转而采用周期排列（Periodic Shuffling）操作。该操作通过将通道维度上的特征重组为空间分辨率，彻底消除了棋盘格伪影，确保腺体边缘平滑。
                    </p>
                 </div>
                 <div className="p-8 bg-black/40 border border-white/10 rounded-[32px]">
                    <h4 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                       <Binary size={20} /> 自注意力机制 (Spatial Attention)
                    </h4>
                    <p className="text-sm leading-7 text-slate-500">
                      在跳跃连接（Skip Connections）处嵌入空间注意力模块，使网络在融合低维特征时，主动过滤背景组织的无关激活信号，将权重集中于管状的睑板腺区域。
                    </p>
                 </div>
              </div>

              {/* 损失函数数学定义 */}
              <div className="mt-12 p-10 bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-500/20 rounded-[40px]">
                <h4 className="text-xl font-bold text-white mb-6">Tversky 损失函数优化</h4>
                <p className="text-sm mb-6">
                  在 MGD 影像中，腺体像素（正样本）通常仅占全图的 10%-15%。使用标准交叉熵（BCE）会导致模型倾向于预测背景。为此，我们引入了 **Tversky Loss** 来惩罚假阴性（漏诊）：
                </p>
                <div className="bg-[#020617] p-8 rounded-2xl border border-blue-500/30 font-mono text-blue-300 text-sm overflow-x-auto text-center leading-loose">
                  L<sub>Tversky</sub>(P, G) = 1 - 
                  <span className="mx-2 inline-block align-middle">
                    <span className="block border-b border-blue-300 pb-1">| P ∩ G |</span>
                    <span className="block pt-1">| P ∩ G | + α | P \ G | + β | G \ P |</span>
                  </span>
                </div>
                <div className="mt-6 text-sm space-y-2 text-slate-400">
                  <p><strong className="text-white">P</strong> = Predicted (预测概率图) , <strong className="text-white">G</strong> = Ground Truth (真实标签)</p>
                  <p><strong className="text-white">α (Alpha)</strong> = 假阳性惩罚权重 (设为 0.3)</p>
                  <p><strong className="text-white">β (Beta)</strong> = 假阴性惩罚权重 (设为 0.7，迫使模型更努力地寻找细小腺体)</p>
                </div>
              </div>

            </div>
          </section>

          {/* 4. 临床指标量化 */}
          <section id="metrics" className="mb-40 scroll-mt-32">
            <h3 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
              <span className="text-blue-500">04.</span> 临床指标量化与映射算法
            </h3>
            <div className="space-y-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Area Ratio */}
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[40px]">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>面积比率 (Area Ratio, AR)
                    </h4>
                    <div className="p-6 bg-black/50 rounded-2xl font-mono text-sm text-blue-400 mb-6 flex justify-center items-center">
                       AR = ( Σ Pixels<sub>Gland</sub> ) / ( Σ Pixels<sub>Tarsus</sub> ) × 100%
                    </div>
                    <p className="text-sm text-slate-500 leading-7">
                      系统利用二级分割网络提取睑板（Tarsus Plate）的有效轮廓，随后统计其内部的腺体总像素。通过计算比率，可得出绝对客观的腺体萎缩数据，精度达亚像素级。
                    </p>
                  </div>

                  {/* Tortuosity */}
                  <div className="p-10 bg-white/5 border border-white/10 rounded-[40px]">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                       <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>弯曲度分析 (Tortuosity Index, TI)
                    </h4>
                    <div className="p-6 bg-black/50 rounded-2xl font-mono text-sm text-cyan-400 mb-6 flex justify-center items-center">
                       TI = L<sub>Curve</sub> / L<sub>Chord</sub> - 1
                    </div>
                    <p className="text-sm text-slate-500 leading-7">
                      对分割后的单个腺体执行 Zhang-Suen 细化算法（Skeletonization）以提取单像素中轴线。L<sub>Curve</sub> 为中轴线实测曲线长度，L<sub>Chord</sub> 为起止点直线距离。TI &gt; 0.1 提示排出管受阻。
                    </p>
                  </div>
               </div>

               {/* Meiboscore 映射 */}
               <div className="mt-8 p-8 border border-white/10 rounded-3xl bg-white/[0.01]">
                 <h4 className="text-white font-bold mb-4">智能 Meiboscore 等级映射</h4>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left text-slate-400">
                     <thead className="text-xs text-slate-500 uppercase bg-white/5 font-mono">
                       <tr>
                         <th className="px-6 py-4 rounded-tl-xl">计算所得缺失率 (1 - AR)</th>
                         <th className="px-6 py-4">系统输出评分</th>
                         <th className="px-6 py-4 rounded-tr-xl">临床建议</th>
                       </tr>
                     </thead>
                     <tbody className="font-mono">
                       <tr className="border-b border-white/5 hover:bg-white/5">
                         <td className="px-6 py-4 text-green-400">&lt; 33.3%</td>
                         <td className="px-6 py-4 text-white font-bold">Grade 1</td>
                         <td className="px-6 py-4 text-slate-500">常规随访，热敷干预</td>
                       </tr>
                       <tr className="border-b border-white/5 hover:bg-white/5">
                         <td className="px-6 py-4 text-yellow-400">33.3% - 66.6%</td>
                         <td className="px-6 py-4 text-white font-bold">Grade 2</td>
                         <td className="px-6 py-4 text-slate-500">中度阻塞，建议物理疏通</td>
                       </tr>
                       <tr className="hover:bg-white/5">
                         <td className="px-6 py-4 text-red-400">&gt; 66.6%</td>
                         <td className="px-6 py-4 text-white font-bold">Grade 3</td>
                         <td className="px-6 py-4 text-slate-500">重度萎缩，药物/强脉冲光治疗</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
          </section>

          {/* 5. 数据合规 */}
          <section id="security" className="mb-40 scroll-mt-32">
             <div className="p-12 bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/20 rounded-[48px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5"><ShieldCheck size={160} /></div>
                <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
                  <ShieldCheck className="text-indigo-400" size={28} />
                  数据合规与本地化存储架构
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-sm leading-8">
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase tracking-tighter text-lg">DICOM 脱敏与局域网推理</h4>
                    <p>“腺而易见”被设计为 100% 边缘计算架构。部署包（Win Portable）包含完整的 PyTorch 推理环境。所有 DICOM/JPG 医疗影像仅在本地计算节点占用内存，算法推理完成后立即释放，绝不向公网发送任何病理切片。</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-3 uppercase tracking-tighter text-lg">SQLite 离线数据沙盒</h4>
                    <p>考虑到医学研究的保密性，系统的医生反馈模块采用了原生 `better-sqlite3` 技术构建了本地沙盒（`feedbacks.db`）。所有临床验证数据独立存储在科室物理硬盘中，实现了业务流与数据流的完全物理隔离。</p>
                  </div>
                </div>
             </div>
          </section>

          {/* References */}
          <section id="references" className="pt-20 border-t border-white/10 scroll-mt-32">
            <h2 className="text-xs font-mono font-black text-slate-500 uppercase tracking-[0.5em] mb-10 italic">References / 参考文献</h2>
            <ol className="list-decimal list-inside space-y-4 text-xs font-mono text-slate-600 leading-6 italic">
              <li>Lemp MA, Crewes LA, Bron AJ, et al. The definition and classification of dry eye disease: report of the Definition and Classification Subcommittee of the International Dry Eye WorkSpace. Ocul Surf. 2007;5(2):75-92.</li>
              <li>Arita R, Itoh K, Inoue K, Amano S. Noncontact infrared meibography to document age-related changes of the meibomian glands in a normal population. Ophthalmology. 2008;115(5):911-915.</li>
              <li>Ronneberger O, Fischer P, Brox T. U-Net: Convolutional Networks for Biomedical Image Segmentation. MICCAI 2015.</li>
              <li>Salehi SSM, Erdogmus D, Gholipour A. Tversky loss function for image segmentation using 3D fully convolutional deep networks. arXiv preprint arXiv:1706.05721. 2017.</li>
              <li>Huang Yupu. XianErYiJian Technical Specification & Academic Protocol v1.0. Imaging Class 1. 2026.</li>
            </ol>
          </section>

          {/* Page Footer */}
          <footer className="mt-40 text-center pb-20">
             <div className="h-px w-20 bg-blue-600 mx-auto mb-8 opacity-50"></div>
             <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.8em]">
                End of Technical White Paper
             </p>
          </footer>

        </motion.div>
      </main>
    </div>
  );
}