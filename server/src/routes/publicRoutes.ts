import { Router } from 'express';
import {
  getSettings,
  getHero,
  getCompanyLogos,
  getAbout,
  getSkills,
  getServices,
  getProjects,
  getProjectBySlug,
  getCertifications,
  getTestimonials,
  submitContact,
} from '../controllers/publicController.js';

const router = Router();

router.get('/settings', getSettings);
router.get('/hero', getHero);
router.get('/company-logos', getCompanyLogos);
router.get('/about', getAbout);
router.get('/skills', getSkills);
router.get('/services', getServices);
router.get('/projects', getProjects);
router.get('/projects/:slug', getProjectBySlug);
router.get('/certifications', getCertifications);
router.get('/testimonials', getTestimonials);
router.post('/contact', submitContact);

export default router;
