import React from 'react';
import { ICompanyLogo } from '../types/index.js';

interface CompanyLogosProps {
  logos?: ICompanyLogo[];
}

interface BrandItem {
  name: string;
  category?: string;
  svg: React.ReactNode;
}

// Crisp official vector brand logos matching reference screenshot 2
const defaultBrands: BrandItem[] = [
  {
    name: 'HubSpot',
    category: 'CRM & Inbound',
    svg: (
      <svg className="h-6 sm:h-7 w-auto fill-current" viewBox="0 0 130 35">
        <path d="M102.5 13.5v-3.7c1.3-.7 2.2-2.1 2.2-3.7 0-2.3-1.9-4.2-4.2-4.2s-4.2 1.9-4.2 4.2c0 1.6.9 3 2.2 3.7v3.7c-3.1.5-5.5 3.1-5.7 6.3h-7.6c-.6-1.5-2.1-2.5-3.8-2.5-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2c1.7 0 3.2-1 3.8-2.5h7.6c.7 3.3 3.6 5.8 7 5.8 4 0 7.2-3.2 7.2-7.2 0-3.8-3-6.9-6.7-7.2zm-2-.8c-1.3.3-2.3 1.3-2.6 2.6-.1 0-.1 0-.2 0-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3c0-.9-.4-1.7-1-2.3l.5-3.6zm-17.7 10.3c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1.1 2.4-2.4 2.4zm19.7-17.3c1.3 0 2.4 1.1 2.4 2.4s-1.1 2.4-2.4 2.4-2.4-1.1-2.4-2.4 1.1-2.4 2.4-2.4z" />
        <text x="2" y="24" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="21" fill="currentColor" letterSpacing="-0.5">
          HubSpot
        </text>
      </svg>
    ),
  },
  {
    name: 'Meta',
    category: 'Meta Ads & Social',
    svg: (
      <svg className="h-6 sm:h-7 w-auto fill-current" viewBox="0 0 115 32">
        <path d="M16.5 7.6C13.2 7.6 10.7 9.8 8.4 13.5 6.7 10.1 4.5 7.6 1.8 7.6 0.7 7.6 0 8.4 0 9.7c0 1.9 1.8 4.7 3.6 8 1.9 3.5 4.3 6.6 6.8 6.6 2.5 0 4.8-2.2 7-6.2 2.3 4 4.5 6.2 7 6.2 2.6 0 5-3.1 6.9-6.6 1.8-3.3 3.6-6.1 3.6-8 0-1.3-.7-2.1-1.8-2.1-2.7 0-4.9 2.5-6.6 5.9-2.3-3.7-4.8-5.9-8-5.9zm-8.8 8.7c1.7-2.8 3.5-4.7 5.7-4.7 2.1 0 3.7 1.7 5.3 4.5-1.7 3-3.4 5-5.5 5-2.2 0-3.8-1.9-5.5-4.8zm17.6 0c-1.7 2.9-3.3 4.8-5.5 4.8-2.1 0-3.8-2-5.5-5 1.6-2.8 3.2-4.5 5.3-4.5 2.2 0 4 1.9 5.7 4.7z" />
        <text x="42" y="23" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="22" fill="currentColor" letterSpacing="-0.5">
          Meta
        </text>
      </svg>
    ),
  },
  {
    name: 'Google Ads',
    category: 'Search & Display',
    svg: (
      <svg className="h-6 sm:h-7 w-auto fill-current" viewBox="0 0 160 32">
        <path d="M4.6 19.3L12.5 5.6c1.1-1.9 3.5-2.6 5.4-1.5 1.9 1.1 2.6 3.5 1.5 5.4L11.5 23.2c-1.1 1.9-3.5 2.6-5.4 1.5-1.9-1.1-2.6-3.5-1.5-5.4z" opacity="0.85" />
        <path d="M19.4 19.3l7.9-13.7c1.1-1.9 3.5-2.6 5.4-1.5 1.9 1.1 2.6 3.5 1.5 5.4l-7.9 13.7c-1.1 1.9-3.5 2.6-5.4 1.5-1.9-1.1-2.6-3.5-1.5-5.4z" />
        <circle cx="9.2" cy="22.2" r="3.7" />
        <text x="40" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="19" fill="currentColor" letterSpacing="-0.3">
          Google Ads
        </text>
      </svg>
    ),
  },
  {
    name: 'Semrush',
    category: 'SEO & Marketing',
    svg: (
      <svg className="h-6 sm:h-7 w-auto fill-current" viewBox="0 0 135 32">
        <path d="M12.8 5.2c-4.2 0-7.6 3.4-7.6 7.6 0 1.8.6 3.4 1.7 4.7L1.2 23.2c-.3.3-.3.9 0 1.2.3.3.9.3 1.2 0l5.8-5.8c1.3 1.1 3 1.7 4.7 1.7 4.2 0 7.6-3.4 7.6-7.6 0-4.2-3.4-7.5-7.7-7.5zm0 12.2c-2.5 0-4.6-2-4.6-4.6s2-4.6 4.6-4.6 4.6 2 4.6 4.6-2 4.6-4.6 4.6z" />
        <path d="M21.5 12.8c0 .8-.1 1.5-.4 2.2l2.3-2.3c-.6-1.5-1.1-2.5-1.9-3.4v3.5z" />
        <text x="32" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="20" fill="currentColor" letterSpacing="-0.4">
          Semrush
        </text>
      </svg>
    ),
  },
  {
    name: 'Mailchimp',
    category: 'Email Automation',
    svg: (
      <svg className="h-6 sm:h-7 w-auto fill-current" viewBox="0 0 145 32">
        <circle cx="12" cy="16" r="10.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="8.5" cy="14" r="1.5" />
        <circle cx="15.5" cy="14" r="1.5" />
        <path d="M9 19c1.5 2 4.5 2 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <text x="31" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="20" fill="currentColor" letterSpacing="-0.4">
          Mailchimp
        </text>
      </svg>
    ),
  },
  {
    name: 'WordPress',
    category: 'CMS & Web',
    svg: (
      <svg className="h-6 sm:h-7 w-auto fill-current" viewBox="0 0 140 32">
        <circle cx="13" cy="16" r="11" stroke="currentColor" strokeWidth="2.2" fill="none" />
        <path d="M5.5 16c0 3.3 2.2 6.1 5.2 7.1L6.9 12.5C6 13.5 5.5 14.7 5.5 16zm12.3-.6c0-1.7-.6-2.9-1.2-3.8-.7-1.1-1.4-2.1-1.4-3.2 0-1.2.9-2.3 2.2-2.3.1 0 .1 0 .2 0-2-1.3-4.4-2.1-7-2.1-3.6 0-6.8 1.6-8.9 4.1l6.1 16.7 2-6c.6-1.7 1-2.7 1-3.4h7zm-4.7 3.5l-2.6 7.6c.8.2 1.6.4 2.5.4.9 0 1.8-.1 2.6-.4l-2.5-7.6zm6.3-8.8c.2.6.3 1.3.3 2.1 0 1.4-.3 3-1.1 5.3l-3.3 9.7c2.6-1.3 4.5-3.8 4.7-6.8.2-3.6-1.5-7.3-3.6-10.3l3-0z" />
        <text x="33" y="22" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700" fontSize="19" fill="currentColor" letterSpacing="-0.3">
          WordPress
        </text>
      </svg>
    ),
  },
];

export const CompanyLogos: React.FC<CompanyLogosProps> = ({ logos = [] }) => {
  // Filter out demo/invented template placeholders so only verified genuine clients or platforms show
  const customLogos: BrandItem[] = logos
    .filter(
      (l) =>
        l.isActive &&
        !l.companyName?.toLowerCase().includes('apex digital') &&
        !l.companyName?.toLowerCase().includes('nova creative') &&
        !l.logoImage?.includes('company-logo-')
    )
    .map((l) => ({
      name: l.companyName,
      category: l.description || 'Verified Partner',
      svg: (
        <div className="flex items-center gap-2.5">
          {l.logoImage ? (
            <img
              src={l.logoImage}
              alt={l.companyName}
              className="h-6 sm:h-7 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          ) : null}
          <span className="font-extrabold text-sm sm:text-base tracking-tight text-zinc-200">
            {l.companyName}
          </span>
        </div>
      ),
    }));

  const allBrands = [...defaultBrands, ...customLogos];

  return (
    <section
      aria-label="Brands and Platforms Marquee"
      className="relative w-full bg-[#070504] border-y border-white/[0.08] py-5 sm:py-6 overflow-hidden z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-10">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: FIXED TWO-LINE BRAND HEADING */}
          {/* ======================================================== */}
          <div className="shrink-0 text-center md:text-left pr-0 md:pr-6 md:border-r md:border-white/10">
            <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white leading-tight uppercase font-sans">
              Trusted by Brands I've
            </h3>
            <h3 className="text-xs sm:text-sm font-bold tracking-tight text-orange-400 leading-tight uppercase font-sans">
              Helped Grow
            </h3>
          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: CONTINUOUS INFINITE SCROLLING MARQUEE TRACK */}
          {/* ======================================================== */}
          <div
            className="flex-1 w-full overflow-hidden relative"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <div className="animate-marquee-left flex items-center gap-10 sm:gap-14 select-none">
              {/* First Track Copy */}
              {allBrands.map((brand, idx) => (
                <div
                  key={`b1-${idx}-${brand.name}`}
                  className="group shrink-0 flex items-center text-zinc-400 hover:text-white transition-colors duration-200 cursor-default"
                  title={`${brand.name}${brand.category ? ` — ${brand.category}` : ''}`}
                >
                  <div className="opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200">
                    {brand.svg}
                  </div>
                </div>
              ))}

              {/* Duplicate Track Copy to make it perfectly seamless */}
              {allBrands.map((brand, idx) => (
                <div
                  key={`b2-${idx}-${brand.name}`}
                  aria-hidden="true"
                  className="group shrink-0 flex items-center text-zinc-400 hover:text-white transition-colors duration-200 cursor-default"
                  title={`${brand.name}${brand.category ? ` — ${brand.category}` : ''}`}
                >
                  <div className="opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-200">
                    {brand.svg}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
