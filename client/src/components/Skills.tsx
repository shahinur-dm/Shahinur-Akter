import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Layout,
  Laptop,
  Palette,
  ShieldCheck,
  Share2,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { ISkill } from '../types/index.js';

interface SkillsProps {
  skills: ISkill[];
}

interface TechStackItem {
  name: string;
  category: string;
  svg: React.ReactNode;
}

// Crisp official technology and creative tool vector logos
const techStack: TechStackItem[] = [
  {
    name: 'HTML5',
    category: 'Markup',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 512 512" fill="none">
        <path d="M71 460L35 60h442l-36 400-185 52z" fill="#E44D26" />
        <path d="M256 472l149-41 31-343H256z" fill="#F16529" />
        <path d="M256 176h76l-5 59h-71v59h65l-7 77-58 16v62l118-33 16-177H256z" fill="#EBEBEB" />
        <path d="M256 117H136l4 59h116zm0 118H180l4 59h72zm0 177l-59-16-4-43h-60l7 91 116 32z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    category: 'Styling',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 512 512" fill="none">
        <path d="M71 460L35 60h442l-36 400-185 52z" fill="#1572B6" />
        <path d="M256 472l149-41 31-343H256z" fill="#33A9DC" />
        <path d="M256 176h76l-5 59h-71v59h65l-7 77-58 16v62l118-33 16-177H256z" fill="#EBEBEB" />
        <path d="M256 117H136l4 59h116zm0 118H180l4 59h72zm0 177l-59-16-4-43h-60l7 91 116 32z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    category: 'Language',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg shadow-sm" viewBox="0 0 512 512">
        <path d="M0 0h512v512H0z" fill="#F7DF1E" />
        <path d="M294 397c6 10 14 18 27 18 13 0 20-7 20-24v-166h46v168c0 37-22 54-57 54-31 0-48-18-57-36zm-105-3c8 14 20 22 39 22 17 0 27-9 27-21 0-14-11-20-30-28l-10-4c-30-13-49-29-49-63 0-31 24-55 62-55 27 0 46 9 58 31l-34 22c-7-12-14-17-24-17-10 0-17 6-17 16 0 11 7 16 23 23l10 4c36 15 57 31 57 67 0 38-30 58-71 58-39 0-63-19-72-42z" fill="#000" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    category: 'Language',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg shadow-sm" viewBox="0 0 512 512">
        <path d="M0 0h512v512H0z" fill="#3178C6" />
        <path d="M272 176H152v44h37v156h46V220h37zm49 146c9 14 22 22 41 22 17 0 27-8 27-20 0-13-11-19-30-27l-10-4c-29-12-48-28-48-61 0-30 23-53 60-53 26 0 44 9 56 30l-33 21c-7-12-14-16-23-16-10 0-16 6-16 15 0 10 7 15 22 21l10 4c35 15 56 30 56 65 0 37-29 57-69 57-38 0-61-18-70-40z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'Frontend Framework',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="-11.5 -10.23174 23 20.46348">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    category: 'Fullstack Framework',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" viewBox="0 0 180 180" fill="none">
        <mask id="nextMask" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="#000" />
        </mask>
        <g mask="url(#nextMask)">
          <circle cx="90" cy="90" r="90" fill="#000" stroke="#333" strokeWidth="6" />
          <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="url(#nextGrad)" />
          <rect x="115" y="54" width="12" height="72" fill="#FFF" />
        </g>
        <defs>
          <linearGradient id="nextGrad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF" />
            <stop offset="1" stopColor="#FFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Node.js',
    category: 'Runtime',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 32 32">
        <path d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5z" fill="#339933" />
        <path d="M16 11.2c-2.6 0-4.3 1.2-4.3 3.1 0 2.2 2 2.7 4 3.2 2 .5 2.8.9 2.8 1.8 0 1-1 1.7-2.5 1.7-1.8 0-2.8-.7-3.4-1.8l-2 1.4c1 1.8 2.6 2.7 5.4 2.7 3 0 4.8-1.5 4.8-3.6 0-2.3-2-2.8-4-3.3-1.8-.4-2.8-.8-2.8-1.7s1-1.5 2.3-1.5c1.4 0 2.4.6 3 1.5l1.8-1.3c-.9-1.5-2.5-2.2-5.1-2.2z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: 'Express.js',
    category: 'Backend API',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-white/10 p-1" viewBox="0 0 100 100">
        <text x="14" y="65" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="46" fill="#FFF" letterSpacing="-2">
          ex
        </text>
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'Database',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24">
        <path d="M12 1.5C11.5 3 7 7.5 7 13.5c0 4.2 3.1 7.4 5 8.5 1.9-1.1 5-4.3 5-8.5 0-6-4.5-10.5-5-12z" fill="#47A248" />
        <path d="M12 1.5v20.5c1.9-1.1 5-4.3 5-8.5 0-6-4.5-10.5-5-12z" fill="#499D4A" />
        <path d="M12 11c-.5 0-.8.5-.8 1.2 0 1.2.8 2.3.8 2.3s.8-1.1.8-2.3c0-.7-.3-1.2-.8-1.2z" fill="#FFF" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    category: 'CSS Utility',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'UI/UX Design',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    name: 'Adobe Photoshop',
    category: 'Graphic Design',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#001e36" stroke="#31a8ff" strokeWidth="2" strokeOpacity="0.5" />
        <text x="11" y="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="28" fill="#31a8ff">
          Ps
        </text>
      </svg>
    ),
  },
  {
    name: 'Adobe Illustrator',
    category: 'Vector Design',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#330000" stroke="#ff9a00" strokeWidth="2" strokeOpacity="0.5" />
        <text x="14" y="44" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="900" fontSize="28" fill="#ff9a00">
          Ai
        </text>
      </svg>
    ),
  },
  {
    name: 'WordPress',
    category: 'CMS & Growth',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 512 512">
        <circle cx="256" cy="256" r="256" fill="#21759B" />
        <path d="M50 256c0 86 52 160 127 191L71 190c-14 20-21 42-21 66zm268-12c0-37-13-63-25-84-15-25-30-46-30-71 0-27 21-52 50-52 3 0 6 0 8 1-44-30-97-47-155-47-79 0-149 37-195 94l136 373 45-135c13-37 21-60 21-76h-5zm-103 76l-57 167c17 5 35 8 54 8 20 0 39-3 58-8l-55-167zm137-192c4 13 6 28 6 45 0 31-6 66-24 117l-73 212c58-29 100-84 105-150 4-79-33-161-79-224l65 0z" fill="#FFF" />
      </svg>
    ),
  },
  {
    name: 'Git',
    category: 'Version Control',
    svg: (
      <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l3.3 3.3c.6-.2 1.3 0 1.7.5.5.5.6 1.3.4 1.9l3.1 3.1c.6-.2 1.4 0 1.9.4.7.7.7 1.9 0 2.6-.7.7-1.9.7-2.6 0-.6-.6-.7-1.5-.3-2.2l-2.9-2.9v5.9c.2.2.3.5.3.8 0 .9-.7 1.6-1.6 1.6s-1.6-.7-1.6-1.6c0-.4.1-.7.3-1V9.2c-.2-.2-.3-.5-.3-.8 0-.6.4-1.2.9-1.5L8 3.8 2.4 9.4c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z" fill="#F05032" />
      </svg>
    ),
  },
];

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
    <section id="skills" className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 space-y-3"
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

        {/* ======================================================== */}
        {/* SECTION TWO: CONTINUOUS TECHNOLOGY STACK LOGO MARQUEE */}
        {/* ======================================================== */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-[#0b0908] border border-orange-500/25 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            {/* Ambient orange glow in the capsule corner */}
            <div className="absolute top-0 right-0 w-64 h-32 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Tech Stack Heading */}
            <div className="mb-5 sm:mb-6 pl-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 block mb-0.5 font-mono">
                  MY TECH STACK
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Technologies I Work With
                </h3>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                Drag or hover to pause
              </span>
            </div>

            {/* Seamless Infinite Tech Stack Marquee Strip */}
            <div
              className="w-full overflow-hidden relative"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              }}
            >
              <div className="animate-marquee-left-fast flex items-center gap-6 sm:gap-8 select-none py-2">
                {/* First Copy */}
                {techStack.map((tech, idx) => (
                  <div
                    key={`tech-1-${idx}-${tech.name}`}
                    className="shrink-0 flex flex-col items-center justify-center gap-2.5 min-w-[90px] sm:min-w-[110px] px-3.5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/5 hover:border-orange-500/40 hover:scale-105 transition-all duration-200 cursor-default group shadow-sm"
                    title={`${tech.name} — ${tech.category}`}
                  >
                    <div className="transform group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,90,0,0.4)] transition-transform duration-200">
                      {tech.svg}
                    </div>
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors tracking-tight text-center whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}

                {/* Duplicated Copy for Seamless Infinity */}
                {techStack.map((tech, idx) => (
                  <div
                    key={`tech-2-${idx}-${tech.name}`}
                    aria-hidden="true"
                    className="shrink-0 flex flex-col items-center justify-center gap-2.5 min-w-[90px] sm:min-w-[110px] px-3.5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/5 hover:border-orange-500/40 hover:scale-105 transition-all duration-200 cursor-default group shadow-sm"
                    title={`${tech.name} — ${tech.category}`}
                  >
                    <div className="transform group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,90,0,0.4)] transition-transform duration-200">
                      {tech.svg}
                    </div>
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors tracking-tight text-center whitespace-nowrap">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* SKILLS PROGRESS BARS GRID (Completely Preserved) */}
        {/* ======================================================== */}
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

export default Skills;
