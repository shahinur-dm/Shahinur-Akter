import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ArrowRight, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { ICertification } from '../types/index.js';

interface CertificationProps {
  certifications: ICertification[];
}

export const Certification: React.FC<CertificationProps> = ({ certifications }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const cert = certifications[0] || {
    title: 'NSDA Certified Level 4 Digital Marketer',
    issuer: 'Bangladesh National Skills Development Authority (NSDA)',
    description:
      'Bangladesh National Skills Development Authority (NSDA) Certified Level 4 in Digital Marketing. Demonstrating verified competence in data-driven marketing, campaign planning, and audience growth.',
    certificateImage: '/assets/images/certificate-card.png',
  };

  return (
    <section id="certification" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Info & Action */}
          <motion.div
            className="lg:col-span-7 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase">
              Certification
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {cert.title}
            </h2>

            <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <span>{cert.issuer}</span>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              {cert.description}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm px-7 py-3 rounded-full shadow-md shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span>View Certificate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Certificate Card Preview */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Ambient orange glow */}
            <div className="absolute -inset-4 bg-orange-300/20 rounded-3xl blur-xl pointer-events-none" />

            <div
              onClick={() => setModalOpen(true)}
              className="group relative bg-gradient-to-tr from-orange-100/80 to-amber-50 p-4 sm:p-6 rounded-3xl border border-orange-200/80 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-102 transition-all duration-300 max-w-[420px] w-full"
            >
              <div className="relative rounded-2xl overflow-hidden bg-white p-3 shadow-sm border border-slate-200/60 aspect-[16/11] flex items-center justify-center">
                <img
                  src={cert.certificateImage || '/assets/images/certificate-card.png'}
                  alt={cert.title}
                  className="w-full h-full object-contain"
                />

                {/* Orange Corner Mount Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-orange-500 transform rotate-45 translate-x-4 -translate-y-4" />
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-orange-500 transform rotate-45 -translate-x-4 translate-y-4" />
              </div>

              {/* Verified Badge */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Government Certified Standard
                </span>
                <span className="text-xs font-bold text-orange-600 group-hover:underline inline-flex items-center gap-1">
                  Click to Expand <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-orange-100"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-500">{cert.issuer}</p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-2 sm:p-4 mb-4">
                <img
                  src={cert.certificateImage || '/assets/images/certificate-card.png'}
                  alt={cert.title}
                  className="w-full h-auto object-contain max-h-[55vh] mx-auto rounded-lg shadow-sm"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {cert.description}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
