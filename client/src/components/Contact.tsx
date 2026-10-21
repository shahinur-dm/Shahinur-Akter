import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../lib/api.js';
import { ISiteSetting } from '../types/index.js';

interface ContactProps {
  settings?: ISiteSetting;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Business Website',
    budget: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactEmail = settings?.contactEmail || 'ceo@shahinurakter.com';
  const socialLinks = settings?.socialLinks || {
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    twitter: 'https://x.com/',
    instagram: 'https://instagram.com/',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          projectType: 'Business Website',
          budget: '',
          message: '',
        });

        // Festive confetti burst
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F97316', '#FDBA74', '#FB923C', '#0F172A'],
        });
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3.5 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold tracking-wide uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's Create Something Amazing
          </h2>
          <p className="text-base text-slate-600">
            Have a project in mind? Let's discuss how creative design, modern development, and digital marketing can bring your ideas to life.
          </p>
        </motion.div>

        {/* Form and Contact Card Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Email <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Project Type <span className="text-orange-500">*</span>
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none transition-all bg-white"
                  >
                    <option value="Business Website">Business Website</option>
                    <option value="E-commerce Website">E-commerce Website</option>
                    <option value="Portfolio Website">Portfolio Website</option>
                    <option value="Brand Identity Design">Brand Identity Design</option>
                    <option value="Social Media Campaign">Social Media Campaign</option>
                    <option value="Digital Marketing Strategy">Digital Marketing Strategy</option>
                    <option value="Other Creative Work">Other Creative Work</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Budget Range (Optional)
                  </label>
                  <input
                    id="budget"
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="e.g. $500 - $2,000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Message <span className="text-orange-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, goals, or timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 text-sm outline-none transition-all resize-y placeholder:text-slate-400"
                />
              </div>

              {/* Status Alerts */}
              {status === 'success' && (
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3 text-green-800 text-sm font-semibold">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. I will respond to you shortly!</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-800 text-sm font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Info Card with Handwritten Note */}
          <div className="lg:col-span-4 bg-orange-50/70 rounded-2xl p-6 sm:p-7 border border-orange-100 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Email */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-orange-500" />
                  Email
                </div>
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-bold text-slate-900 text-sm hover:text-orange-600 transition-colors break-all"
                >
                  {contactEmail}
                </a>
              </div>

              {/* Social Links */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Follow Me
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(socialLinks).map(([key, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-orange-500 hover:border-transparent flex items-center justify-center text-xs font-bold uppercase transition-all shadow-2xs"
                        title={key}
                      >
                        {key.slice(0, 2)}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Handwritten script note matching mockup */}
            <div className="pt-4 border-t border-orange-200/60">
              <span className="font-script text-3xl sm:text-4xl text-orange-600 block leading-tight">
                Let's Connect ♡
              </span>
              <span className="text-xs text-slate-500 font-medium mt-1 block">
                Open for client projects, full-time opportunities, and consultations.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
