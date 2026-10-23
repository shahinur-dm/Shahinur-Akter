import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Palette,
  Award,
  ArrowRight,
  Mail,
  FolderCheck,
  Sparkles,
  BookOpen,
  Star,
  CheckCircle2,
  Terminal,
  MousePointer2,
} from 'lucide-react';
import { IHeroContent } from '../types/index.js';
import { Hero3DCanvas } from './Hero3DCanvas.js';

interface HeroProps {
  heroData?: IHeroContent;
}

export const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mq.matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const headline = heroData?.headline || 'TURNING IDEAS';
  const highlightText = heroData?.highlightText || 'VISUAL STORIES';
  const description =
    heroData?.description ||
    'I create modern websites, compelling visual designs, and digital marketing experiences that help brands build a stronger online presence.';

  // Default to our clean feathered cinematic portrait
  const portrait = '/assets/images/shahinur-portrait-feathered.png';

  const projectCount = heroData?.projectCount || '110+';
  const disciplinesCount = heroData?.disciplinesCount || '3';
  const learningBadge = heroData?.learningBadge || 'Always Learning, Better Every Day';

  return (
    <section
      id="home"
      className="relative min-h-[94vh] pt-28 sm:pt-32 lg:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#070504] text-white selection:bg-orange-500 selection:text-white"
    >
      {/* 1. ATMOSPHERIC CINEMATIC LIGHTING & RADIAL GRADIENTS */}
      {/* Radiant Amber-Orange Core behind portrait */}
      <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[680px] h-[680px] bg-gradient-to-tr from-orange-600/35 via-orange-500/25 to-amber-500/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Secondary Warm Glow for Left Typography */}
      <div className="absolute top-1/3 left-[4%] w-[480px] h-[480px] bg-orange-700/15 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Deep Vignette Perimeter Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,4,3,0.85)_100%)] pointer-events-none z-0" />

      {/* Interactive Three.js 3D Particle Canvas */}
      <div className="absolute inset-0 z-5 opacity-70 pointer-events-none">
        <Hero3DCanvas />
      </div>

      {/* 2. OVERSIZED BACKGROUND TYPOGRAPHY: "CREATIVE" */}
      <div className="absolute top-[52%] lg:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-10 overflow-hidden">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.16, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="font-black text-[18vw] sm:text-[16vw] lg:text-[14rem] xl:text-[16.5rem] tracking-tight text-white whitespace-nowrap leading-none block font-sans uppercase drop-shadow-[0_0_80px_rgba(255,90,0,0.15)]"
        >
          CREATIVE
        </motion.span>
      </div>

      {/* 3. TOP-RIGHT "CREATIVE STUDIO" EMBLEM */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hidden lg:flex flex-col items-end text-right absolute top-28 right-8 xl:right-16 z-20 pointer-events-none"
      >
        <div className="text-2xl xl:text-3xl font-black tracking-tight text-white uppercase font-sans">
          CREATIVE
        </div>
        <div className="text-3xl xl:text-4xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent uppercase font-sans -mt-1.5 drop-shadow-[0_0_25px_rgba(255,90,0,0.6)]">
          STUDIO
        </div>
        <div className="flex items-center gap-2 mt-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">
          <span>Design</span>
          <span className="text-orange-500 font-bold">•</span>
          <span>Code</span>
          <span className="text-orange-500 font-bold">•</span>
          <span>Create</span>
        </div>
      </motion.div>

      {/* 4. MAIN HERO CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: EDITORIAL HEADLINE & ACTION */}
          {/* ======================================================== */}
          <motion.div
            className="lg:col-span-6 xl:col-span-6 space-y-5 z-20"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(255,90,0,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#ff5a00]" />
              <span>CREATIVE DESIGNER & DEVELOPER</span>
            </motion.div>

            {/* Oversized Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
                {headline.includes('Turning Ideas') || headline === 'Turning Ideas Into'
                  ? 'TURNING IDEAS'
                  : headline.toUpperCase()}
              </h1>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08]">
                <span className="text-white">INTO </span>
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,90,0,0.55)]">
                  {highlightText.includes('Creative') ? 'VISUAL STORIES' : highlightText.toUpperCase()}
                </span>
              </h1>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
                THAT MATTER
              </h1>
            </div>

            {/* Concise Supporting Description */}
            <p className="text-sm sm:text-base text-zinc-300/90 max-w-xl leading-relaxed font-normal">
              {description}
            </p>

            {/* Role Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-orange-500/30 shadow-sm text-xs font-semibold text-zinc-200 backdrop-blur-md hover:border-orange-500/60 transition-colors"
              >
                <Palette className="w-3.5 h-3.5 text-orange-400" />
                <span>Creative Designer</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 text-xs font-bold ring-1 ring-orange-400/40"
              >
                <Code2 className="w-3.5 h-3.5 text-white" />
                <span>Frontend Developer</span>
              </motion.div>

              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-md"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>NSDA Certified Level 4</span>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href={heroData?.primaryButtonUrl || '#projects'}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-[0_0_30px_rgba(255,90,0,0.45)] hover:shadow-[0_0_45px_rgba(255,90,0,0.65)] hover:-translate-y-0.5 transition-all duration-300 group ring-1 ring-orange-400/40"
              >
                <span>{heroData?.primaryButtonText || 'View My Projects'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href={heroData?.secondaryButtonUrl || '#contact'}
                className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.09] border border-orange-500/30 hover:border-orange-500/70 text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-full backdrop-blur-md shadow-sm hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-orange-400" />
                <span>{heroData?.secondaryButtonText || 'Contact Me'}</span>
              </a>
            </div>

            {/* Achievement Glass Cards */}
            <div className="pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="glass-cinematic p-3.5 rounded-2xl flex items-center gap-3.5 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <FolderCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-white leading-none">{projectCount}</div>
                  <div className="text-[11px] text-zinc-400 font-medium mt-1">Projects Completed</div>
                </div>
              </div>

              <div className="glass-cinematic p-3.5 rounded-2xl flex items-center gap-3.5 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-white leading-none">{disciplinesCount}</div>
                  <div className="text-[11px] text-zinc-400 font-medium mt-1">Creative Disciplines</div>
                </div>
              </div>

              <div className="glass-cinematic p-3.5 rounded-2xl flex items-center gap-3.5 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-orange-400">Continuous Growth</div>
                  <div className="text-[11px] text-zinc-400 font-medium mt-0.5 truncate max-w-[130px]" title={learningBadge}>
                    {learningBadge}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: CINEMATIC PORTRAIT & FLOATING UI ECOSYSTEM */}
          {/* ======================================================== */}
          <motion.div
            className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: 'easeOut' }}
            style={{
              transform: reducedMotion
                ? undefined
                : `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Radiant Ambient Core Behind Portrait */}
            <div className="absolute inset-0 max-w-[480px] max-h-[480px] m-auto bg-gradient-to-tr from-orange-500/45 via-amber-500/25 to-transparent rounded-full blur-[80px] pointer-events-none z-10" />

            {/* Glowing Orbital Light Trail Lines (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible"
              viewBox="0 0 600 600"
            >
              <defs>
                <linearGradient id="orbitalGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5a00" stopOpacity="0" />
                  <stop offset="25%" stopColor="#ff7a00" stopOpacity="0.9" />
                  <stop offset="60%" stopColor="#ffb830" stopOpacity="1" />
                  <stop offset="90%" stopColor="#ff3a00" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ff5a00" stopOpacity="0" />
                </linearGradient>
                <filter id="cinematicGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Sweeping Luminous Orbital Arc wrapping around figure */}
              <motion.path
                d="M 50,460 C 130,530 380,550 540,410 C 600,350 560,260 470,240 C 370,220 220,290 90,440"
                fill="none"
                stroke="url(#orbitalGlowGrad)"
                strokeWidth="3.5"
                filter="url(#cinematicGlow)"
                initial={{ pathLength: 0.8, opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Secondary delicate luminous arc */}
              <path
                d="M 120,440 C 260,510 460,480 540,360"
                fill="none"
                stroke="rgba(255, 180, 50, 0.75)"
                strokeWidth="2"
                filter="url(#cinematicGlow)"
              />
            </svg>

            {/* Seamless Feathered Cinematic Portrait */}
            <div className="relative z-20 w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[480px] flex items-center justify-center">
              <img
                src={portrait}
                alt="Shahinur Akter — Creative Designer & Frontend Developer"
                className="w-full h-auto max-h-[580px] object-contain select-none pointer-events-none drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter hover:scale-[1.02] transition-transform duration-700"
                loading="eager"
              />

              {/* ======================================================== */}
              {/* FLOATING ELEMENT 1: CREATIVE & CODE SOFTWARE BADGES (Left) */}
              {/* ======================================================== */}
              <motion.div
                className="absolute top-[28%] -left-3 sm:-left-6 z-30 grid grid-cols-2 gap-2 p-2 rounded-2xl glass-cinematic border border-orange-500/30 shadow-2xl backdrop-blur-xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              >
                {/* Figma Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#1e1e1e] border border-white/10 flex items-center justify-center shadow-md relative group/figma" title="Figma">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 38 57" fill="none">
                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                  </svg>
                </div>

                {/* Photoshop Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#001e36] border border-[#31a8ff]/40 flex items-center justify-center text-[#31a8ff] font-extrabold text-sm sm:text-base shadow-md" title="Adobe Photoshop">
                  Ps
                </div>

                {/* Code </> Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#141210] border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-sm sm:text-base shadow-md" title="Clean Code">
                  &lt;/&gt;
                </div>

                {/* Illustrator Badge */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#330000] border border-[#ff9a00]/40 flex items-center justify-center text-[#ff9a00] font-extrabold text-sm sm:text-base shadow-md" title="Adobe Illustrator">
                  Ai
                </div>
              </motion.div>

              {/* ======================================================== */}
              {/* FLOATING ELEMENT 2: ANGLED MODERN WEB PREVIEW TABLET (Bottom-Left) */}
              {/* ======================================================== */}
              <motion.div
                className="absolute -bottom-6 -left-4 sm:-left-8 z-30 w-44 sm:w-56 glass-cinematic-card rounded-2xl p-2.5 sm:p-3 border border-orange-500/35 shadow-2xl backdrop-blur-xl rotate-[-4deg] hidden xs:block"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, delay: 0.5, ease: 'easeInOut' }}
              >
                {/* Mini browser topbar */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[9px] font-mono text-zinc-400 truncate max-w-[90px]">
                    shahinur.dev
                  </div>
                </div>

                {/* Tablet Content Preview: Product / Creative Showcase */}
                <div className="bg-[#18110b] rounded-xl p-2 border border-orange-500/20 space-y-1.5">
                  <div className="h-14 sm:h-16 rounded-lg bg-gradient-to-r from-orange-600/40 via-amber-600/30 to-orange-900/40 p-2 flex items-center justify-between overflow-hidden relative">
                    <div>
                      <div className="text-[10px] font-bold text-white leading-tight">Sneaker Pro</div>
                      <div className="text-[8px] text-orange-300 font-semibold">$149 • Live</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-orange-500/30 flex items-center justify-center text-xs">
                      👟
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono px-0.5">
                    <span className="text-emerald-400 flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" /> Active
                    </span>
                    <span>100% Responsive</span>
                  </div>
                </div>
              </motion.div>

              {/* ======================================================== */}
              {/* FLOATING ELEMENT 3: CODE WINDOW (Top-Right) */}
              {/* ======================================================== */}
              <motion.div
                className="absolute top-2 -right-4 sm:-right-8 z-30 w-44 sm:w-52 glass-cinematic-card rounded-2xl p-2.5 sm:p-3 border border-orange-500/30 shadow-2xl backdrop-blur-xl rotate-[3deg] hidden xs:block"
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, delay: 1, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-orange-400" />
                    <span className="text-[10px] font-bold text-zinc-200">&lt;/&gt; Clean Code</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                </div>
                <div className="font-mono text-[9px] sm:text-[10px] space-y-1 text-zinc-300 leading-tight">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-amber-300">vision</span> = {'{'}
                  </div>
                  <div className="pl-2">
                    <span className="text-orange-400">craft:</span>{' '}
                    <span className="text-emerald-300">"Creative"</span>,
                  </div>
                  <div className="pl-2">
                    <span className="text-orange-400">impact:</span>{' '}
                    <span className="text-amber-300">100</span>
                  </div>
                  <div>{'};'}</div>
                </div>
              </motion.div>

              {/* ======================================================== */}
              {/* FLOATING ELEMENT 4: TYPOGRAPHY & COLOR PALETTE (Bottom-Right) */}
              {/* ======================================================== */}
              <motion.div
                className="absolute bottom-4 -right-3 sm:-right-7 z-30 w-40 sm:w-48 glass-cinematic-card rounded-2xl p-2.5 sm:p-3 border border-orange-500/30 shadow-2xl backdrop-blur-xl"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, delay: 1.5, ease: 'easeInOut' }}
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                  <span className="text-xl font-serif font-black text-white leading-none">Aa</span>
                  <div className="space-y-1 w-16">
                    <div className="h-1 bg-white/30 rounded-full w-full" />
                    <div className="h-1 bg-white/15 rounded-full w-3/4" />
                  </div>
                </div>

                {/* Color Swatches with Cursor Pointer */}
                <div className="flex items-center justify-between pt-1 relative">
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#ff5a00] shadow-[0_0_8px_#ff5a00] ring-1 ring-white/50" />
                    <div className="w-4 h-4 rounded-full bg-[#16120e] ring-1 ring-white/20" />
                    <div className="w-4 h-4 rounded-full bg-[#f59e0b] ring-1 ring-white/20" />
                    <div className="w-4 h-4 rounded-full bg-white ring-1 ring-white/20" />
                  </div>
                  <MousePointer2 className="w-4 h-4 text-orange-400 fill-orange-500/40 -rotate-12 translate-x-1" />
                </div>
              </motion.div>

              {/* ======================================================== */}
              {/* FLOATING STAT PILL 1: DESIGN PROJECTS */}
              {/* ======================================================== */}
              <motion.div
                className="absolute -bottom-8 left-1/4 sm:left-1/3 -translate-x-1/2 z-30 glass-cinematic px-3.5 py-1.5 rounded-full border border-orange-500/30 shadow-xl flex items-center gap-2"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut' }}
              >
                <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
                <span className="text-xs font-bold text-white">15+ Design Projects</span>
              </motion.div>

              {/* ======================================================== */}
              {/* FLOATING STAT PILL 2: CLIENT SATISFACTION */}
              {/* ======================================================== */}
              <motion.div
                className="absolute -bottom-8 right-0 sm:right-6 z-30 glass-cinematic px-3.5 py-1.5 rounded-full border border-orange-500/30 shadow-xl flex items-center gap-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.1, delay: 0.8, ease: 'easeInOut' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-white">96% Satisfaction</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 5. SEAMLESS BOTTOM TRANSITION GRADIENT */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent via-[#070504]/60 to-orange-50/20 pointer-events-none z-10" />
    </section>
  );
};

export default Hero;
