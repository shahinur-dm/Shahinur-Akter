import { Request, Response, NextFunction } from 'express';
import {
  SiteSetting,
  HeroContent,
  CompanyLogo,
  AboutContent,
  Skill,
  Service,
  Project,
  Certification,
  Testimonial,
  ContactInquiry,
} from '../models/index.js';
import { ContactInquirySchema } from '../validators/schemas.js';

export const getSettings = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const getHero = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let hero = await HeroContent.findOne({ active: true });
    if (!hero) {
      hero = await HeroContent.findOne();
    }
    res.json({ success: true, data: hero });
  } catch (error) {
    next(error);
  }
};

export const getCompanyLogos = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Return active company logos ordered by displayOrder (designed to show exactly two active logos after hero)
    const logos = await CompanyLogo.find({ isActive: true }).sort({ displayOrder: 1 }).limit(10);
    res.json({ success: true, data: logos });
  } catch (error) {
    next(error);
  }
};

export const getAbout = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const about = await AboutContent.findOne({ isPublished: true });
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
};

export const getSkills = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const skills = await Skill.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await Service.find({ isActive: true }).sort({ displayOrder: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, featured } = req.query;
    const filter: any = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const projects = await Project.find(filter).sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const getProjectBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const project = await Project.findOne({ slug, isPublished: true });
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
};

export const getCertifications = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const certs = await Certification.find({ isPublished: true }).sort({ displayOrder: 1 });
    res.json({ success: true, data: certs });
  } catch (error) {
    next(error);
  }
};

export const getTestimonials = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true }).sort({ displayOrder: 1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const submitContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const validated = ContactInquirySchema.parse(req.body);

    const inquiry = await ContactInquiry.create({
      ...validated,
      ipAddress: req.ip || '',
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been sent successfully. I will get back to you soon.',
      data: {
        id: inquiry._id,
        createdAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
