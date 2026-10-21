import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { ENV } from '../config/env.js';
import {
  AdminUser,
  SiteSetting,
  HeroContent,
  CompanyLogo,
  AboutContent,
  Skill,
  Service,
  Project,
  Certification,
} from '../models/index.js';

export const runSeed = async (): Promise<void> => {
  try {
    await connectDB();
    console.log('[Seed] Starting database seed process...');

    // 1. Admin User
    const existingAdmin = await AdminUser.findOne({ email: ENV.ADMIN_SEED_EMAIL.toLowerCase() });
    const passwordHash = await bcrypt.hash(ENV.ADMIN_SEED_PASSWORD, 12);

    if (!existingAdmin) {
      await AdminUser.create({
        name: ENV.ADMIN_SEED_NAME,
        email: ENV.ADMIN_SEED_EMAIL.toLowerCase(),
        passwordHash,
        role: 'admin',
        isActive: true,
      });
      console.log(`[Seed] Created initial administrator: ${ENV.ADMIN_SEED_EMAIL}`);
    } else {
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
      console.log(`[Seed] Updated administrator credentials for: ${ENV.ADMIN_SEED_EMAIL}`);
    }

    // 2. Site Settings (Upsert singleton)
    await SiteSetting.findOneAndUpdate(
      {},
      {
        $set: {
          siteName: 'SA — Shahinur Akter | Portfolio',
          ownerName: 'Shahinur Akter',
          headline: 'Frontend Developer, Graphic Designer & NSDA Level 4 Digital Marketer',
          description:
            'I create modern websites, compelling visual designs, and digital marketing experiences that help brands build a stronger online presence.',
          portraitImage: '/assets/images/shahinur-hero-ref.png',
          logo: 'SA',
          favicon: '/favicon.ico',
          primaryColor: '#F97316',
          secondaryColor: '#0F172A',
          contactEmail: 'ceo@shahinurakter.com',
          socialLinks: {
            facebook: 'https://facebook.com/',
            linkedin: 'https://linkedin.com/',
            github: 'https://github.com/',
            twitter: 'https://x.com/',
            instagram: 'https://instagram.com/',
          },
          seoTitle: 'Shahinur Akter — Creative Portfolio',
          seoDescription:
            'Shahinur Akter portfolio: Frontend Developer, Graphic Designer, NSDA Certified Level 4 Digital Marketer.',
          ogImage: '/assets/images/shahinur-hero-ref.png',
        },
      },
      { upsert: true, new: true }
    );
    console.log('[Seed] Site settings verified/updated.');

    // 3. Hero Content (Upsert singleton)
    await HeroContent.findOneAndUpdate(
      {},
      {
        $set: {
          greeting: "Hi, I'm Shahinur Akter 👋",
          headline: 'Turning Ideas Into',
          highlightText: 'Creative Digital Experiences',
          professionalRoles: [
            'Frontend Developer',
            'Graphic Designer',
            'NSDA Certified Level 4 Digital Marketer',
          ],
          description:
            'I create modern websites, compelling visual designs, and digital marketing experiences that help brands build a stronger online presence.',
          portraitImage: '/assets/images/shahinur-hero-ref.png',
          primaryButtonText: 'View My Projects',
          primaryButtonUrl: '#projects',
          secondaryButtonText: 'Contact Me',
          secondaryButtonUrl: '#contact',
          projectCount: '110+',
          disciplinesCount: '3',
          learningBadge: 'Always Learning, Better Every Day',
          floatingCardText: 'Turning Creativity Into Real Impact',
          active: true,
        },
      },
      { upsert: true, new: true }
    );
    console.log('[Seed] Hero content verified/updated.');

    // 4. Two Company Logos (Immediately after hero - Requirement 5)
    // Clear and upsert exactly 2 active placeholder records
    const logos = [
      {
        companyName: 'Apex Digital Lab',
        logoImage: '/assets/images/company-logo-1.svg',
        websiteUrl: 'https://example.com/apex-digital',
        description: 'Editable Demo Partner 1 — Replaceable via Admin Dashboard',
        displayOrder: 1,
        isActive: true,
      },
      {
        companyName: 'Nova Creative Studio',
        logoImage: '/assets/images/company-logo-2.svg',
        websiteUrl: 'https://example.com/nova-creative',
        description: 'Editable Demo Partner 2 — Replaceable via Admin Dashboard',
        displayOrder: 2,
        isActive: true,
      },
    ];

    for (const logo of logos) {
      await CompanyLogo.findOneAndUpdate(
        { companyName: logo.companyName },
        { $set: logo },
        { upsert: true }
      );
    }
    console.log('[Seed] Company logos (exactly 2 active positions) verified/updated.');

    // 5. About Content
    await AboutContent.findOneAndUpdate(
      {},
      {
        $set: {
          sectionTitle: "I'm a Creative Problem Solver",
          introduction:
            'I work at the intersection of design, development and marketing. My goal is to create digital solutions that are not only beautiful but also functional, user-friendly and result-driven.',
          biography:
            'With over 110+ projects completed across frontend web development, graphic design, and certified digital marketing campaigns, I help brands and businesses transform their visual and technical presence. I focus on clean architecture, accessible user experiences, high-converting visuals, and strategic digital reach.',
          portraitImage: '/assets/images/shahinur-hero-ref.png',
          certificationTitle: 'NSDA Certified — Level 4 Digital Marketer',
          certificationDescription:
            'Bangladesh National Skills Development Authority (NSDA) Certified Level 4 in Digital Marketing.',
          highlights: ['Frontend Development', 'Graphic Design', 'Digital Marketing'],
          isPublished: true,
        },
      },
      { upsert: true, new: true }
    );
    console.log('[Seed] About content verified/updated.');

    // 6. Skills (Matching design mockup exactly)
    const skillsList = [
      { name: 'Frontend Development', category: 'Frontend Development', proficiency: 95, displayOrder: 1 },
      { name: 'Responsive Web Design', category: 'Frontend Development', proficiency: 90, displayOrder: 2 },
      { name: 'UI Implementation', category: 'Frontend Development', proficiency: 88, displayOrder: 3 },
      { name: 'Graphic Design', category: 'Graphic Design', proficiency: 85, displayOrder: 4 },
      { name: 'Brand Identity Design', category: 'Graphic Design', proficiency: 80, displayOrder: 5 },
      { name: 'Social Media Design', category: 'Graphic Design', proficiency: 75, displayOrder: 6 },
      { name: 'Digital Marketing', category: 'Digital Marketing', proficiency: 80, displayOrder: 7 },
      { name: 'Creative Content Design', category: 'Digital Marketing', proficiency: 78, displayOrder: 8 },
    ];

    for (const s of skillsList) {
      await Skill.findOneAndUpdate(
        { name: s.name },
        { $set: { ...s, isActive: true } },
        { upsert: true }
      );
    }
    console.log('[Seed] Professional skills verified/updated.');

    // 7. Services (3 core services matching design)
    const servicesList = [
      {
        title: 'Frontend Development',
        slug: 'frontend-development',
        shortDescription: 'Modern, responsive and user-friendly websites and landing pages.',
        fullDescription:
          'Specializing in React, TypeScript, Tailwind CSS, clean architecture, responsive layouts, web performance optimization, and interactive UI experiences.',
        icon: 'Code',
        displayOrder: 1,
        isActive: true,
      },
      {
        title: 'Graphic Design',
        slug: 'graphic-design',
        shortDescription: 'Brand visuals, promotional graphics, social media creatives and visual communication.',
        fullDescription:
          'Creating compelling brand identities, logos, marketing banners, vector assets, and engaging digital creatives that elevate visual prestige.',
        icon: 'Palette',
        displayOrder: 2,
        isActive: true,
      },
      {
        title: 'Digital Marketing',
        slug: 'digital-marketing',
        shortDescription: 'Campaign support, marketing creatives, content planning and online brand visibility.',
        fullDescription:
          'NSDA Level 4 certified marketing campaigns, conversion-focused strategy, social media advertising, and content planning that drives measurable results.',
        icon: 'Megaphone',
        displayOrder: 3,
        isActive: true,
      },
    ];

    for (const s of servicesList) {
      await Service.findOneAndUpdate(
        { slug: s.slug },
        { $set: s },
        { upsert: true }
      );
    }
    console.log('[Seed] Core services verified/updated.');

    // 8. Projects (4 projects matching reference mockup cards)
    const projectsList = [
      {
        title: 'Business Website',
        slug: 'business-website-development',
        shortDescription: 'Web Design & Development',
        description:
          'A modern, high-performance corporate business website crafted with clean typography, responsive layout, smooth animations, and optimized lead-capture forms.',
        thumbnail: '/assets/images/project-business-web.png',
        gallery: ['/assets/images/project-business-web.png', '/assets/images/project-ecommerce.jpg'],
        category: 'Business Website',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
        liveUrl: 'https://example.com/demo-business',
        isFeatured: true,
        isPublished: true,
        displayOrder: 1,
      },
      {
        title: 'Brand Identity Design',
        slug: 'brand-identity-design-system',
        shortDescription: 'Graphic Design',
        description:
          'A complete corporate brand identity package including signature logo emblem, brand color harmony, typography guides, stationery, and business collateral.',
        thumbnail: '/assets/images/project-brand-identity.png',
        gallery: ['/assets/images/project-brand-identity.png', '/assets/images/original-download-1.jpg'],
        category: 'Brand Identity Design',
        technologies: ['Adobe Illustrator', 'Photoshop', 'Brand Strategy'],
        liveUrl: 'https://example.com/demo-brand',
        isFeatured: true,
        isPublished: true,
        displayOrder: 2,
      },
      {
        title: 'Social Media Campaign',
        slug: 'social-media-campaign-growth',
        shortDescription: 'Digital Marketing',
        description:
          'Strategic social media campaign design and digital marketing creatives developed to boost brand reach, engagement, and conversion rates across platforms.',
        thumbnail: '/assets/images/project-social-campaign.png',
        gallery: ['/assets/images/project-social-campaign.png', '/assets/images/original-download-2.jpg'],
        category: 'Social Media Campaign',
        technologies: ['Meta Ads', 'Canva Pro', 'Digital Strategy', 'Analytics'],
        liveUrl: 'https://example.com/demo-campaign',
        isFeatured: true,
        isPublished: true,
        displayOrder: 3,
      },
      {
        title: 'Portfolio Website',
        slug: 'portfolio-website-showcase',
        shortDescription: 'Frontend Development',
        description:
          'Personal portfolio web application engineered with 3D canvas interactions, Framer Motion transitions, headless REST API, and MongoDB admin dashboard.',
        thumbnail: '/assets/images/project-portfolio-web.png',
        gallery: ['/assets/images/project-portfolio-web.png'],
        category: 'Portfolio Website',
        technologies: ['React', 'Three.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
        liveUrl: 'https://example.com/demo-portfolio',
        isFeatured: true,
        isPublished: true,
        displayOrder: 4,
      },
    ];

    for (const p of projectsList) {
      await Project.findOneAndUpdate(
        { slug: p.slug },
        { $set: p },
        { upsert: true }
      );
    }
    console.log('[Seed] Portfolio projects verified/updated.');

    // 9. Certification (NSDA Certified Level 4 Digital Marketer)
    await Certification.findOneAndUpdate(
      { title: 'NSDA Certified Level 4 Digital Marketer' },
      {
        $set: {
          title: 'NSDA Certified Level 4 Digital Marketer',
          issuer: 'Bangladesh National Skills Development Authority (NSDA)',
          description:
            'Bangladesh National Skills Development Authority (NSDA) Certified Level 4 in Digital Marketing. Verified expertise in digital marketing campaign execution, audience targeting, and content planning.',
          certificateImage: '/assets/images/certificate-card.png',
          issueDate: 'Verified Qualification',
          verificationUrl: '',
          displayOrder: 1,
          isPublished: true,
        },
      },
      { upsert: true }
    );
    console.log('[Seed] NSDA certification verified/updated.');

    console.log('✅ [Seed] Database initialization and seeding completed successfully!');
  } catch (error) {
    console.error('❌ [Seed] Error seeding database:', error);
    throw error;
  }
};

// Auto run if executed directly
if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runSeed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
