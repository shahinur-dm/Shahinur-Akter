import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Megaphone, ArrowRight, X } from 'lucide-react';
import { IService } from '../types/index.js';

interface ServicesProps {
  services: IService[];
}

const serviceIcons: Record<string, React.ElementType> = {
  Code: Code2,
  Code2: Code2,
  Palette: Palette,
  Megaphone: Megaphone,
};

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const [selectedService, setSelectedService] = useState<IService | null>(null);

  const sortedServices = [...services].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Floating Polyhedron Accent in the background */}
      <div className="absolute top-1/4 left-6 w-16 h-16 rounded-2xl bg-orange-200/40 rotate-12 blur-xs pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            className="space-y-3 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase">
              My Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What I Do
            </h2>
            <p className="text-base text-slate-600">
              I offer creative and technical services to help brands, businesses and individuals grow online.
            </p>
          </motion.div>

          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-bold text-sm transition-colors group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Core Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedServices.map((service, index) => {
            const IconComponent = serviceIcons[service.icon] || Code2;

            return (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-orange-400 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/25 group-hover:scale-108 transition-transform duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Learn More Action Button */}
                <div>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-2 text-orange-600 group-hover:text-orange-700 font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-orange-100"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-5 shadow-md shadow-orange-500/20">
                <Code2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 mb-3">
                {selectedService.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {selectedService.fullDescription || selectedService.shortDescription}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md shadow-orange-500/25 transition-colors inline-flex items-center gap-2"
                >
                  <span>Request This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setSelectedService(null)}
                  className="text-slate-500 text-sm font-semibold hover:text-slate-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
