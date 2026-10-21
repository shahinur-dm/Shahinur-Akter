import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import {
  getDashboardStats,
  updateSettings,
  updateHero,
  getAllCompanyLogos,
  createCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo,
  updateAbout,
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getAllServices,
  createService,
  updateService,
  deleteService,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
  getAllCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
  uploadMedia,
  getAllMedia,
  deleteMedia,
} from '../controllers/adminController.js';

const router = Router();

// Protect all admin routes
router.use(requireAuth);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// Site Settings & Hero & About
router.put('/settings', updateSettings);
router.put('/hero', updateHero);
router.put('/about', updateAbout);

// Company Logos (Manage the two company logos after Hero)
router.get('/company-logos', getAllCompanyLogos);
router.post('/company-logos', createCompanyLogo);
router.put('/company-logos/:id', updateCompanyLogo);
router.delete('/company-logos/:id', deleteCompanyLogo);

// Skills
router.get('/skills', getAllSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Services
router.get('/services', getAllServices);
router.post('/services', createService);
router.put('/services/:id', updateService);
router.delete('/services/:id', deleteService);

// Projects
router.get('/projects', getAllProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

// Certifications
router.get('/certifications', getAllCertifications);
router.post('/certifications', createCertification);
router.put('/certifications/:id', updateCertification);
router.delete('/certifications/:id', deleteCertification);

// Testimonials
router.get('/testimonials', getAllTestimonials);
router.post('/testimonials', createTestimonial);
router.put('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

// Contact Inquiries
router.get('/inquiries', getInquiries);
router.put('/inquiries/:id', updateInquiryStatus);
router.delete('/inquiries/:id', deleteInquiry);

// Media
router.get('/media', getAllMedia);
router.post('/media/upload', upload.single('image'), uploadMedia);
router.delete('/media/:id', deleteMedia);

export default router;
