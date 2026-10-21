import React, { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import {
  ISiteSetting,
  IHeroContent,
  ICompanyLogo,
  IAboutContent,
  ISkill,
  IService,
  IProject,
  ICertification,
} from '../types/index.js';
import { Header } from '../components/Header.js';
import { Hero } from '../components/Hero.js';
import { CompanyLogos } from '../components/CompanyLogos.js';
import { About } from '../components/About.js';
import { Skills } from '../components/Skills.js';
import { Services } from '../components/Services.js';
import { Projects } from '../components/Projects.js';
import { Certification } from '../components/Certification.js';
import { Contact } from '../components/Contact.js';
import { Footer } from '../components/Footer.js';

export const HomePage: React.FC = () => {
  const [settings, setSettings] = useState<ISiteSetting>();
  const [hero, setHero] = useState<IHeroContent>();
  const [logos, setLogos] = useState<ICompanyLogo[]>([]);
  const [about, setAbout] = useState<IAboutContent>();
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          settingsRes,
          heroRes,
          logosRes,
          aboutRes,
          skillsRes,
          servicesRes,
          projectsRes,
          certsRes,
        ] = await Promise.all([
          api.getSettings().catch(() => ({ success: false, data: undefined })),
          api.getHero().catch(() => ({ success: false, data: undefined })),
          api.getCompanyLogos().catch(() => ({ success: false, data: [] })),
          api.getAbout().catch(() => ({ success: false, data: undefined })),
          api.getSkills().catch(() => ({ success: false, data: [] })),
          api.getServices().catch(() => ({ success: false, data: [] })),
          api.getProjects().catch(() => ({ success: false, data: [] })),
          api.getCertifications().catch(() => ({ success: false, data: [] })),
        ]);

        if (settingsRes.data) setSettings(settingsRes.data);
        if (heroRes.data) setHero(heroRes.data);
        if (logosRes.data) setLogos(logosRes.data);
        if (aboutRes.data) setAbout(aboutRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
        if (servicesRes.data) setServices(servicesRes.data);
        if (projectsRes.data) setProjects(projectsRes.data);
        if (certsRes.data) setCertifications(certsRes.data);
      } catch (err) {
        console.error('Failed to load portfolio content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-2xl animate-bounce shadow-lg shadow-orange-500/30">
          SA
        </div>
        <div className="text-sm font-bold text-slate-500 animate-pulse">
          Loading Shahinur Akter Portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      {/* 3. Header and Navigation */}
      <Header settings={settings} />

      <main className="flex-1">
        {/* 4. Hero Section — Premium 3D Animation */}
        <Hero heroData={hero} />

        {/* 5. TWO COMPANY LOGOS IMMEDIATELY AFTER THE HERO (Mandatory Requirement) */}
        <CompanyLogos logos={logos} />

        {/* 6. About Section */}
        <About aboutData={about} />

        {/* 7. Skills Section */}
        <Skills skills={skills} />

        {/* 8. Services Section */}
        <Services services={services} />

        {/* 9. Project Portfolio Section */}
        <Projects projects={projects} />

        {/* 10. Certification Section */}
        <Certification certifications={certifications} />

        {/* 11. Contact Section */}
        <Contact settings={settings} />
      </main>

      {/* 12. Complete Footer */}
      <Footer settings={settings} />
    </div>
  );
};
