import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Laptop, Palette, ShieldCheck, Share2, TrendingUp, Sparkles } from 'lucide-react';
import { ISkill } from '../types/index.js';

interface SkillsProps {
  skills: ISkill[];
}

const skillIcons: Record<string, React.ElementType> = {
  'frontend development': Code,
  'responsive web design': Layout,
  'ui implementation': Laptop,
  'graphic design': Palette,
  'brand identity design': ShieldCheck,
  'social media design': Share2,
  'digital marketing': TrendingUp,
  'creative content design': Sparkles,
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Sort by displayOrder
  const sortedSkills = [...skills].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="skills" className="py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase">
            My Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Skills & Expertise
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A balanced synthesis of frontend engineering, visual aesthetics, and certified marketing competency.
          </p>
        </motion.div>

        {/* Skills Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl mx-auto">
          {sortedSkills.map((skill, index) => {
            const IconComponent =
              skillIcons[skill.name.toLowerCase()] ||
              (skill.category.toLowerCase().includes('frontend')
                ? Code
                : skill.category.toLowerCase().includes('graphic')
                ? Palette
                : TrendingUp);

            return (
              <motion.div
                key={skill._id || index}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-extrabold text-orange-600 text-sm sm:text-base">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-xs"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
