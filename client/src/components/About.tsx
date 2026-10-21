import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Megaphone, Award, ArrowRight } from 'lucide-react';
import { IAboutContent } from '../types/index.js';

interface AboutProps {
  aboutData?: IAboutContent;
}

export const About: React.FC<AboutProps> = ({ aboutData }) => {
  const sectionTitle = aboutData?.sectionTitle || "I'm a Creative Problem Solver";
  const introduction =
    aboutData?.introduction ||
    'I work at the intersection of design, development and marketing. My goal is to create digital solutions that are not only beautiful but also functional, user-friendly and result-driven.';
  const biography =
    aboutData?.biography ||
    'With over 110+ projects completed across frontend web development, graphic design, and certified digital marketing campaigns, I help brands and businesses transform their visual and technical presence. I focus on clean architecture, accessible user experiences, high-converting visuals, and strategic digital reach.';
  const portrait = aboutData?.portraitImage || '/assets/images/shahinur-hero-ref.png';
  const certificationTitle =
    aboutData?.certificationTitle || 'NSDA Certified — Level 4 Digital Marketer';
  const certificationDescription =
    aboutData?.certificationDescription ||
    'Bangladesh National Skills Development Authority (NSDA) Certified Level 4 in Digital Marketing.';

  const disciplines = [
    { name: 'Frontend Development', icon: Code2, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Graphic Design', icon: Palette, color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Digital Marketing', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Certification Card */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase">
              About Me
            </span>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {sectionTitle}
            </h2>

            {/* Introduction & Biography */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {introduction}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {biography}
            </p>

            {/* Disciplines Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {disciplines.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.name}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50/60 border border-orange-100/80 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {d.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* NSDA Certification Card */}
            <motion.div
              whileHover={{ scale: 1.01, y: -2 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-50 via-white to-orange-50 border border-orange-200/80 shadow-sm flex items-center justify-between gap-4 mt-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-orange-500/20 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {certificationTitle}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 sm:line-clamp-none">
                    {certificationDescription}
                  </p>
                </div>
              </div>

              <a
                href="#certification"
                className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors"
                title="View Certificate"
              >
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Original Portrait in Curved Container */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
              {/* Warm decorative backdrop */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-orange-400/30 to-amber-300/20 rounded-3xl blur-lg pointer-events-none" />

              {/* Portrait Container */}
              <div className="relative rounded-3xl overflow-hidden bg-orange-100 p-2 border border-white shadow-xl">
                <div className="rounded-2xl overflow-hidden aspect-[4/4.8] bg-slate-900">
                  <img
                    src={portrait}
                    alt="Shahinur Akter — About Me Portrait"
                    className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 3D Floating Orb */}
              <motion.div
                className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 shadow-lg shadow-orange-500/40"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
