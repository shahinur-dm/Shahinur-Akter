import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ICompanyLogo } from '../types/index.js';

interface CompanyLogosProps {
  logos: ICompanyLogo[];
}

export const CompanyLogos: React.FC<CompanyLogosProps> = ({ logos }) => {
  // Requirement 5: Exactly two active company logos immediately after hero
  const activeLogos = logos.filter((l) => l.isActive).slice(0, 2);

  if (activeLogos.length === 0) return null;

  return (
    <section className="relative py-12 bg-gradient-to-r from-orange-50/50 via-white to-orange-50/50 border-y border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-2 mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs uppercase tracking-widest font-extrabold text-orange-600">
            Selected Collaborations
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            Trusted by Brands & Creative Studios
          </h2>
        </motion.div>

        {/* Exactly TWO prominent company logos side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto items-center">
          {activeLogos.map((logo, index) => (
            <motion.div
              key={logo._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={logo.logoImage}
                    alt={logo.companyName}
                    className="max-w-full max-h-full object-contain p-2"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors truncate">
                    {logo.companyName}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {logo.description || 'Verified Partner'}
                  </p>
                </div>
              </div>

              {logo.websiteUrl && (
                <a
                  href={logo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors ml-2"
                  title="Visit Website"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
