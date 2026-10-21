import React from 'react';
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
} from 'lucide-react';
import { IHeroContent } from '../types/index.js';
import { Hero3DCanvas } from './Hero3DCanvas.js';

interface HeroProps {
  heroData?: IHeroContent;
}

export const Hero: React.FC<HeroProps> = ({ heroData }) => {
  const greeting = heroData?.greeting || "Hi, I'm Shahinur Akter 👋";
  const headline = heroData?.headline || 'Turning Ideas Into';
  const highlightText = heroData?.highlightText || 'Creative Digital Experiences';
  const description =
    heroData?.description ||
    'I create modern websites, compelling visual designs, and digital marketing experiences that help brands build a stronger online presence.';
  const portrait = heroData?.portraitImage || '/assets/images/shahinur-hero-ref.png';
  const projectCount = heroData?.projectCount || '110+';
  const disciplinesCount = heroData?.disciplinesCount || '3';
  const learningBadge = heroData?.learningBadge || 'Always Learning, Better Every Day';
  const floatingCardText = heroData?.floatingCardText || 'Turning Creativity Into Real Impact';

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-white">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Greeting Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/60 text-orange-800 text-sm font-semibold shadow-xs"
            >
              <span>{greeting}</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                {headline}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                {highlightText}
              </h1>
            </div>

            {/* Role Pills Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm font-semibold text-slate-700">
                <Code2 className="w-4 h-4 text-orange-500" />
                Frontend Developer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs text-xs sm:text-sm font-semibold text-slate-700">
                <Palette className="w-4 h-4 text-orange-500" />
                Graphic Designer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-300/50 shadow-2xs text-xs sm:text-sm font-semibold text-orange-800">
                <Award className="w-4 h-4 text-orange-600" />
                NSDA Certified Level 4 Digital Marketer
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={heroData?.primaryButtonUrl || '#projects'}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-base px-7 py-3.5 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span>{heroData?.primaryButtonText || 'View My Projects'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={heroData?.secondaryButtonUrl || '#contact'}
                className="inline-flex items-center gap-2 bg-white hover:bg-orange-50/50 border border-slate-300 hover:border-orange-300 text-slate-800 font-bold text-base px-6 py-3.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-orange-500" />
                <span>{heroData?.secondaryButtonText || 'Contact Me'}</span>
              </a>
            </div>

            {/* Statistics Banner */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100/70 flex items-center justify-center text-orange-600 shrink-0">
                  <FolderCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 leading-none">{projectCount}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Projects Completed</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100/70 flex items-center justify-center text-orange-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 leading-none">{disciplinesCount}</div>
                  <div className="text-xs text-slate-500 font-medium mt-1">Creative Disciplines</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100/70 flex items-center justify-center text-orange-600 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-orange-700">Continuous Growth</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{learningBadge}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Animated Portrait Presentation */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Interactive Three.js 3D Canvas Layer */}
            <Hero3DCanvas />

            {/* Radiant Ambient Orange Glow */}
            <div className="absolute inset-0 max-w-[420px] max-h-[420px] m-auto bg-gradient-to-tr from-orange-500/35 via-orange-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Handwritten Signature Script in Background */}
            <div className="absolute top-2 right-4 text-orange-400/50 font-script text-4xl sm:text-5xl select-none pointer-events-none rotate-[-8deg] z-0">
              Shahinur Akter
            </div>

            {/* Main Portrait Frame with Outer Curved Card */}
            <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px]">
              {/* Outer decorative glowing ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-orange-400 to-orange-600 opacity-20 blur-md" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-orange-100/60 to-orange-200/50 p-2 sm:p-3 shadow-2xl border border-white/80">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/4.8] shadow-inner">
                  {/* Portrait Image */}
                  <img
                    src={portrait}
                    alt="Shahinur Akter — Professional Portrait"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                    loading="eager"
                  />

                  {/* Gentle gradient overlay for lighting contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Glassmorphism Badge */}
              <motion.div
                className="absolute -bottom-4 -right-2 sm:-right-4 z-30 glass-panel rounded-2xl p-3 shadow-xl border border-white/80 flex items-center gap-3 max-w-[240px]"
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shrink-0 shadow-sm">
                  🚀
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  {floatingCardText}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
