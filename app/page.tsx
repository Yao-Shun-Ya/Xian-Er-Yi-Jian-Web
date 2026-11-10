'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { handleDownload } from '@/lib/download';
import { WavyBackground } from '@/components/ui/wavy-background'; 
// 👇 关键修复：引入后端服务端动作
import { submitFeedback } from '@/app/actions/feedback';

// 👇 新增：引入 Vortex 背景和 Shadcn 官方表单组件
import { Vortex } from '@/components/ui/vortex';
import { SparklesCore } from '@/components/ui/sparkles';
import { CanvasRevealEffect } from '@/components/ui/canvas-reveal-effect';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { SiteNav } from '@/components/nav/SiteNav';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SpotlightCard } from '@/components/motion/SpotlightCard';
import { useTheme } from '@/lib/theme/provider';
import { useI18n } from '@/lib/i18n/provider';

export default function Home() {
  const reducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const { t, locale } = useI18n();
  const dark = resolvedTheme === "dark";
  const capabilities = [
    {
      meta: "Segment",
      title: t("home.tech.segment.title"),
      body: t("home.tech.segment.body"),
      tags: ["MGD-Former", "MiT-B2", "stride 4", "4 baselines"],
    },
    {
      meta: "Quantify",
      title: t("home.tech.quantify.title"),
      body: t("home.tech.quantify.body"),
      tags: ["R_loss", "density", "length / width", "spacing", "v2.4.0 诊断中心级"],
    },
    {
      meta: "Review",
      title: t("home.tech.review.title"),
      body: t("home.tech.review.body"),
      tags: ["balanced", "conservative", "sensitive", "no weight change"],
    },
  ];
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
      const result = await submitFeedback(formData);

      if (result.success) {
        setSubmitStatus(t("home.feedback.success"));
        setFormData({ name: '', contact: '', message: '' }); // 重置表单
      } else {
        // 限流/校验错误从返回值透出（生产环境 throw 会被 Next 掩码成 digest，用户看不到）
        setSubmitStatus(result.error);
      }
    } catch (error) {
      console.error("前端提交报错:", error);
      setSubmitStatus(t("home.feedback.error"));
    } finally {
      setIsSubmitting(false);
      // 3秒后自动清除状态提示
      setTimeout(() => setSubmitStatus(''), 3000);
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/40 overflow-x-hidden">
      <SiteNav />
      
      {/* ==========================================
          1. 英雄区 (Hero Section) - 动态波浪流光
          ========================================== */}
      <WavyBackground 
        key={dark ? "wavy-dark" : "wavy-light"}
        className="max-w-6xl mx-auto pb-20 relative z-10 flex flex-col items-center justify-center min-h-screen"
        backgroundFill={dark ? "#020617" : "#f4f7fa"} 
        colors={dark
          ? ["#3b82f6", "#06b6d4", "#6366f1", "#0ea5e9", "#10b981"]
          : ["#0e7490", "#0f766e", "#2563eb", "#67c7d6", "#a7f3d0"]}
        waveWidth={40}
        blur={dark ? 10 : 16}
        speed="slow"
        waveOpacity={dark ? 0.5 : 0.2}
      >
        <div className="flex flex-col items-center justify-center text-center mt-10 px-6 relative z-20">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-blue-400/30 bg-blue-400/10 text-blue-300 text-sm font-mono tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {t("home.badge")}
          </div>
          
          <h1 className={`${locale === "zh" ? "text-6xl md:text-8xl" : "text-5xl md:text-7xl"} font-black tracking-tighter mb-8`}>
            {locale === "zh" ? (
              <>
                <span className="hero-title-glow text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">腺</span>而易见
              </>
            ) : (
              <span className="hero-title-glow text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                XianErYiJian
              </span>
            )}
            <br />
            <span className="text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 font-bold">
              {t("home.subtitle")}
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-12 font-medium">
            {t("home.description")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/downloads"
              className="group relative inline-flex items-center justify-center px-10 py-4 w-full sm:w-auto bg-blue-600 text-white rounded-full font-bold text-center transition-all hover:-translate-y-0.5 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.4)] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {t("home.ctaDownloads")}
            </Link>
            <Link
              href="/docs"
              className="inline-flex w-full items-center justify-center px-10 py-4 sm:w-auto bg-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white rounded-full font-bold transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]"
            >
              {t("home.ctaDocs")}
            </Link>
          </div>
        </div>
      </WavyBackground>

      {/* ==========================================
          2. 技术深潜 (Tech Deep Dive) - 带暗纹渐隐背景
          ========================================== */}
      <section id="capabilities" className="scroll-mt-24 py-32 px-6 relative z-20 bg-[#020617] overflow-hidden">
        <div 
          className="capabilities-backdrop absolute inset-0 z-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}
        ></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0.92, y: 12 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="h-fit lg:sticky lg:top-28"
            >
              <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-blue-300">
                <span className="h-px w-8 bg-blue-400/70" />
                {t("home.tech.kicker")}
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
                {t("home.tech.title")}
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                {t("home.tech.lead")}
              </p>
              <Link
                href="/docs"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {t("home.tech.link")}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <div className="mono mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.16em] text-slate-600">
                <span>{t("home.tech.modules")}</span>
                <span className="h-1 w-1 rounded-full bg-slate-700" />
                <span>v2.3.0</span>
              </div>
            </motion.div>

            <div className="border-t border-white/10 bg-[#020617]/50 backdrop-blur-[2px]">
              {capabilities.map((item, index) => (
                <motion.div
                  key={item.meta}
                  initial={reducedMotion ? false : { opacity: 0.92, y: 12 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <SpotlightCard className="group grid gap-4 border-b border-white/10 px-2 py-8 transition-colors hover:bg-white/[0.02] md:grid-cols-[64px_1fr] md:gap-6 md:px-4">
                    <div className="mono text-[11px] tracking-[0.16em] text-blue-300/80">
                      0{index + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-200 md:text-2xl">
                          {item.title}
                        </h3>
                        <span className="mono rounded border border-white/10 bg-white/[0.03] px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-slate-500">
                          {item.meta}
                        </span>
                      </div>
                      <p className="mt-3 max-w-2xl text-[13px] leading-7 text-slate-400">
                        {item.body}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="mono rounded border border-white/10 bg-white/[0.02] px-2 py-1 text-[9px] tracking-[0.04em] text-slate-500"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 渐变遮罩，确保与下载中心板块过渡平滑 */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none" />
      </section>

      {/* ==========================================
          3. 下载中心 & 行业数据
          ========================================== */}
      <section id="downloads" className="scroll-mt-24 py-24 px-6 relative z-20 overflow-hidden">
        {/* Sparkles 背景 */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            key={dark ? "sparkles-dark" : "sparkles-light"}
            id="tsparticlesdownload"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={dark ? 100 : 60}
            particleColor={dark ? "#3b82f6" : "#0e7490"}
            className="w-full h-full"
          />
        </div>
        
        {/* 渐变遮罩，确保与上下页面过渡平滑 */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-2xl relative z-20 md:rounded-[40px] md:p-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/20 blur-[100px] rounded-full"></div>
          <div className="relative z-30 text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 italic md:text-4xl">{t("home.downloads.title")}</h2>
            <p className="text-xs text-slate-500 font-mono md:text-sm">{t("home.downloads.subtitle")}</p>
          </div>
          <div className="grid gap-6 relative z-30">
            {/* 1. 模型权重下载 */}
            <DownloadCard 
              title={t("home.downloads.weights.title")}
              description={t("home.downloads.weights.desc")}
              buttonText={t("home.downloads.weights.button")}
              onClick={() => handleDownload('MGD_UNet_v1.0.0.pth')}
              animationSpeed={3}
              containerClassName="bg-blue-900"
              colors={dark ? [[59, 130, 246], [34, 197, 94]] : [[14, 116, 144], [15, 118, 110]]}
            />

            {/* 2. WebUI 软件下载 */}
            <DownloadCard 
              title={t("home.downloads.windows.title")}
              description={t("home.downloads.windows.desc")}
              buttonText={t("home.downloads.windows.button")}
              onClick={() => handleDownload('Windows.腺而易见WebUI.7z')}
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
              colors={dark ? [[34, 197, 94], [6, 182, 212]] : [[15, 118, 110], [14, 116, 144]]}
            />

            {/* 3. Linux 版本下载 */}
            <LinuxDownloadCard />
          </div>
        </div>
      </section>

      {/* ==========================================
          4. 意见反馈 (Feedback Form) - Vortex 漩涡背景 + 官方 Signup Form
          ========================================== */}
      <section id="feedback" className="dark scroll-mt-24 relative w-full overflow-hidden flex flex-col justify-center z-20 bg-[#020617]">
        
        {/* 👇 丝滑过渡：新增的渐变遮罩，彻底消除“切断感” */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#020617] to-transparent z-10 pointer-events-none" />

        <Vortex
          key={dark ? "vortex-dark" : "vortex-light"}
          backgroundColor="transparent"
          rangeY={160}
          particleCount={dark ? 300 : 180}
          baseHue={dark ? 220 : 190}
          rangeHue={dark ? 100 : 45}
          saturation={dark ? 100 : 45}
          lightness={dark ? 60 : 38}
          alphaScale={dark ? 1 : 0.45}
          glow={dark}
          className="flex items-center flex-col justify-center px-4 py-32 w-full min-h-[800px]"
        >
          {/* 官方原版 Signup Form 容器结构 */}
          <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-6 md:rounded-2xl md:p-8 dark:bg-[#0A101F] border border-white/10 relative z-10 backdrop-blur-md">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              {t("home.feedback.title")}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300 mb-8">
              {t("home.feedback.lead")}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <LabelInputContainer>
                <Label htmlFor="name">{t("home.feedback.name")}</Label>
                <Input 
                  id="name" 
                  placeholder={t("home.feedback.namePlaceholder")} 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="contact">{t("home.feedback.contact")}</Label>
                <Input 
                  id="contact" 
                  placeholder={t("home.feedback.contactPlaceholder")} 
                  type="text" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  required 
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="message">{t("home.feedback.message")}</Label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder={t("home.feedback.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="flex w-full rounded-md border-none bg-gray-50 dark:bg-zinc-900 text-black dark:text-white px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-600 shadow-input focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 transition duration-300 resize-none"
                />
              </LabelInputContainer>

              <button
                className="feedback-submit group/btn relative block h-10 w-full mt-8 rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("home.feedback.submitting") : t("home.feedback.submit")}
                <BottomGradient />
              </button>
              
              {submitStatus && <p className="text-emerald-400 text-sm text-center mt-4 animate-pulse">{submitStatus}</p>}
            </form>
          </div>
        </Vortex>
      </section>

      <SiteFooter />
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
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  animationSpeed: number;
  containerClassName: string;
  colors: number[][];
}) => {
  const [hovered, setHovered] = React.useState(false);
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col md:flex-row items-center justify-between p-5 md:p-8 bg-black/40 border border-white/5 rounded-3xl hover:border-blue-500/30 transition-all relative overflow-hidden"
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
        <span className="text-lg font-bold text-white md:text-xl">{title}</span>
        <p className="text-sm text-slate-500 font-mono mt-1">{description}</p>
      </div>
      
      <div className="relative z-20">
        <button 
          onClick={onClick}
          className="home-download-button px-5 py-3 md:px-8 bg-white text-black rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const LinuxDownloadCard = () => {
  const [hovered, setHovered] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const { t } = useI18n();
  const dark = resolvedTheme === "dark";
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col md:flex-row items-center justify-between p-5 md:p-8 bg-orange-900/20 border border-orange-500/30 rounded-3xl hover:border-orange-500/60 transition-all relative overflow-hidden"
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
              animationSpeed={4.5}
              containerClassName="bg-orange-900"
              colors={dark ? [[249, 115, 22], [251, 191, 36]] : [[180, 83, 9], [161, 98, 7]]}
              dotSize={2}
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="text-center md:text-left mb-4 md:mb-0 relative z-20">
        <span className="text-lg font-bold text-orange-400 md:text-xl">{t("home.downloads.linux.title")}</span>
        <p className="text-sm text-slate-400 font-mono mt-1">
          {t("home.downloads.linux.desc")}
        </p>
      </div>
      
      <div className="relative z-20">
        <button 
          onClick={() => handleDownload('Linux.腺而易见.7z')}
          className="px-5 py-3 md:px-8 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-500 transition-all hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {t("home.downloads.linux.button")}
        </button>
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