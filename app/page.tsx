'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { handleDownload } from '../lib/download'; 
import { WavyBackground } from '@/components/ui/wavy-background'; 
// 👇 关键修复：引入后端服务端动作
import { submitFeedback } from '@/app/actions/feedback';

// 👇 新增：引入 Vortex 背景和 Shadcn 官方表单组件
import { Vortex } from '@/components/ui/vortex';
import { SparklesCore } from '@/components/ui/sparkles';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { motion, AnimatePresence } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// 引入刚才创建的悬停特效组件
import { TextHoverEffect } from '@/components/ui/text-hover-effect';

export default function Home() {
  // --- 逻辑层：反馈表单状态管理 ---
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // 👇 关键修复：替换为真实的数据库提交逻辑
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 直接调用后端函数，Next.js 会自动帮你发起安全的网络请求
      await submitFeedback(formData);
      
      setSubmitStatus('提交成功！感谢您的反馈。');
      setFormData({ name: '', contact: '', message: '' }); // 重置表单
    } catch (error) {
      console.error("前端提交报错:", error);
      setSubmitStatus('提交失败，请联系管理员或稍后重试。');
    } finally {
      setIsSubmitting(false);
      // 3秒后自动清除状态提示
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/40 overflow-x-hidden">
      
      {/* ==========================================
          1. 英雄区 (Hero Section) - 动态波浪流光
          ========================================== */}
      <WavyBackground 
        className="max-w-6xl mx-auto pb-20 relative z-10 flex flex-col items-center justify-center min-h-screen"
        backgroundFill="#020617" 
        colors={["#3b82f6", "#06b6d4", "#6366f1", "#0ea5e9", "#10b981"]}
        waveWidth={40}
        blur={10}
        speed="slow"
        waveOpacity={0.5}
      >
        <div className="flex flex-col items-center justify-center text-center mt-10 px-6 relative z-20">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-300 text-sm font-mono tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Deep Learning × Medical Imaging
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">腺</span>而易见
            <br />
            <span className="text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-bold">
              MGD精准诊疗辅助系统
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-12 font-medium">
            针对我国患病率高达 <span className="text-white font-bold">54.7%~68.3%</span> 的睑板腺功能障碍，
            利用深度学习驱动多模态图像分析，提供精准、全自动的定量指标。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => handleDownload('MGD_UNet_v1.0.0.pth')}
              className="group relative px-10 py-4 w-full sm:w-auto bg-blue-600 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              免费试用模型 (v1.0)
            </button>
            <Link href="/docs" className="w-full sm:w-auto">
            <button className="px-10 py-4 w-full sm:w-auto bg-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white rounded-full font-bold transition-all hover:bg-white/10">
              技术白皮书
            </button>
          </Link>
          </div>
        </div>
      </WavyBackground>

      {/* ==========================================
          2. 技术深潜 (Tech Deep Dive) - 带暗纹渐隐背景
          ========================================== */}
      <section className="py-32 px-6 relative z-20 bg-[#020617] overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-6">核心技术壁垒</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group relative bg-slate-900/60 p-10 rounded-3xl border border-white/5 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8">AI</div>
                <h3 className="text-2xl font-bold text-white mb-4">自动分割引擎</h3>
                <p className="text-slate-400 leading-relaxed text-sm">基于 U-Net / DeepLabV3+ 架构，针对睑板腺不规则形态进行亚像素级精准分割。</p>
              </div>
            </div>
            
            <div className="group relative bg-blue-600/10 p-10 rounded-3xl border border-blue-500/30 hover:border-blue-400 transition-all duration-500 hover:-translate-y-3 shadow-[0_0_30px_rgba(59,130,246,0.1)] backdrop-blur-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full tracking-widest uppercase shadow-lg shadow-blue-500/30">核心优势</div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8">#</div>
                <h3 className="text-2xl font-bold text-white mb-4">多参数量化</h3>
                <p className="text-slate-400 leading-relaxed text-sm">自动提取面积、长度、弯曲度及缺失率等十余项临床金标准指标。</p>
              </div>
            </div>

            <div className="group relative bg-slate-900/60 p-10 rounded-3xl border border-white/5 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-3 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl font-black mb-8">+</div>
                <h3 className="text-2xl font-bold text-white mb-4">精准诊疗辅助</h3>
                <p className="text-slate-400 leading-relaxed text-sm">自动匹配专家共识分型标准，生成严重程度评估报告与治疗建议。</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 渐变遮罩，确保与下载中心板块过渡平滑 */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none" />
      </section>

      {/* ==========================================
          3. 下载中心 & 行业数据
          ========================================== */}
      <section className="py-24 px-6 relative z-20 overflow-hidden">
        {/* Sparkles 背景 */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="tsparticlesdownload"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            particleColor="#3b82f6"
            className="w-full h-full"
          />
        </div>
        
        {/* 渐变遮罩，确保与上下页面过渡平滑 */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-12 backdrop-blur-2xl relative z-20">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="relative z-30 text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 italic">Open Research Initiative</h2>
            <p className="text-slate-500 font-mono">开源 · 协同 · 普惠</p>
          </div>
          <div className="grid gap-6 relative z-30">
            {/* 1. 模型权重下载 */}
            <DownloadCard 
              title="模型权重 (Weights)"
              description="MGD_UNet_v1.0.0.pth · 99.09MB"
              buttonText="获取模型"
              onClick={() => handleDownload('MGD_UNet_v1.0.0.pth')}
              animationSpeed={3}
              containerClassName="bg-blue-900"
              colors={[[59, 130, 246], [34, 197, 94]]}
            />

            {/* 2. WebUI 软件下载 */}
            <DownloadCard 
              title="演示软件 (Demo WebUI)"
              description="Win 便携版 & Mac 版分析软件"
              buttonText="下载软件"
              onClick={() => {}}
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
              colors={[[34, 197, 94], [6, 182, 212]]}
              isSoftwareCard={true}
              onWinClick={() => handleDownload('Windows.腺而易见WebUI.7z')}
              onMacClick={() => handleDownload('MacOS.腺而易见WebUI.7z')}
            />
          </div>
        </div>
      </section>

      {/* ==========================================
          4. 意见反馈 (Feedback Form) - Vortex 漩涡背景 + 官方 Signup Form
          ========================================== */}
      <section className="dark relative w-full overflow-hidden flex flex-col justify-center z-20 bg-[#020617]">
        
        {/* 👇 丝滑过渡：新增的渐变遮罩，彻底消除“切断感” */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-10 pointer-events-none" />

        <Vortex
          backgroundColor="transparent"
          rangeY={160}
          particleCount={300}
          className="flex items-center flex-col justify-center px-4 py-32 w-full min-h-[800px]"
        >
          {/* 官方原版 Signup Form 容器结构 */}
          <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-6 md:rounded-2xl md:p-8 dark:bg-[#0A101F] border border-white/10 relative z-10 backdrop-blur-md">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              临床反馈与技术支持
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 mb-8">
              如果您有医学科研合作意向，请在此留言。
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <LabelInputContainer>
                <Label htmlFor="name">姓名 / 机构</Label>
                <Input 
                  id="name" 
                  placeholder="张医生 / XX医院" 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="contact">联系邮箱 / 电话</Label>
                <Input 
                  id="contact" 
                  placeholder="email@example.com" 
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required 
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="message">反馈内容</Label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="请输入建议或问题..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="flex w-full rounded-md border-none bg-gray-50 dark:bg-zinc-900 text-black dark:text-white px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition duration-300 resize-none"
                />
              </LabelInputContainer>

              <button
                className="group/btn relative block h-10 w-full mt-8 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : '发送反馈 \u2192'}
                <BottomGradient />
              </button>
              
              {submitStatus && <p className="text-emerald-400 text-sm text-center mt-4 animate-pulse">{submitStatus}</p>}
            </form>
          </div>
        </Vortex>
      </section>

      {/* ==========================================
          5. 页脚 - 已集成 TextHoverEffect (x.ai 风格)
          ========================================== */}
      {/* ==========================================
          5. 页脚 - “三明治”遮挡结构
          ========================================== */}
      <footer className="relative py-12 md:py-20 bg-[#0A101F] border-t border-white/5 overflow-hidden mt-auto flex flex-col items-center justify-center min-h-[400px]">
        
        {/* 层级 1 (底层 z-10)：仅显示灰色轮廓线 */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none px-4 h-full w-full z-10">
           <div className="w-full h-48 md:h-64">
              <TextHoverEffect text="XIANERYIJIAN PROJECT" variant="outline" />
           </div>
        </div>

        {/* 层级 2 (中层 z-20)：页脚文字、链接等真实内容 */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-12 md:mt-20">
            <div className="text-center md:text-left">
              <p className="text-xl font-bold text-white tracking-widest">腺而易见</p>
              <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em] mt-1">NSMC · Team Project</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              {/* 这里由于 z-20 的存在，链接可以被正常点击 */}
              <div className="flex gap-6 relative z-30">
                <Link href="/docs" className="hover:text-blue-500 transition-colors pointer-events-auto">
                  技术文档
                </Link>
                <a href="#" className="hover:text-blue-500 transition-colors pointer-events-auto">学术合作</a>
              </div>
              <p>© {new Date().getFullYear()} HUANG YUPU. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>

        {/* 层级 3 (顶层 z-30)：仅显示彩色发光遮罩 */}
        {/* 设置 pointer-events-none 确保它不会拦截下方 z-20 链接的点击 */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none px-4 h-full w-full z-30">
           <div className="w-full h-48 md:h-64">
              <TextHoverEffect text="XIANERYIJIAN PROJECT" variant="glow" />
           </div>
        </div>
      </footer>
    </main>
  );
}

// ==========================================
// 以下为官方 Signup Form 必须的辅助组件，不可删除
// ==========================================

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const DownloadCard = ({
  title,
  description,
  buttonText,
  onClick,
  animationSpeed,
  containerClassName,
  colors,
  isSoftwareCard = false,
  onWinClick,
  onMacClick
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  animationSpeed: number;
  containerClassName: string;
  colors: number[][];
  isSoftwareCard?: boolean;
  onWinClick?: () => void;
  onMacClick?: () => void;
}) => {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col md:flex-row items-center justify-between p-8 bg-black/40 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all relative overflow-hidden"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10"
          >
            <CanvasRevealEffect
              animationSpeed={animationSpeed}
              containerClassName={containerClassName}
              colors={colors}
              dotSize={2}
            />
            {/* Radial gradient for the fade effect */}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="text-center md:text-left mb-4 md:mb-0 relative z-20">
        <span className="text-xl font-bold text-white">{title}</span>
        <p className="text-sm text-slate-500 font-mono mt-1">{description}</p>
      </div>
      
      <div className="relative z-20">
        {isSoftwareCard ? (
          <div className="flex gap-4">
            <button 
              onClick={onWinClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all"
            >
              Win 版
            </button>
            <button 
              onClick={onMacClick}
              className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-all"
            >
              Mac 版
            </button>
          </div>
        ) : (
          <button 
            onClick={onClick}
            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};