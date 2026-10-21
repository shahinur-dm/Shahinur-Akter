import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
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
  Testimonial,
  ContactInquiry,
  MediaAsset,
} from '../models/index.js';
import {
  SkillCreateSchema,
  ServiceCreateSchema,
  ProjectCreateSchema,
  CompanyLogoSchema,
  CertificationCreateSchema,
  TestimonialCreateSchema,
} from '../validators/schemas.js';

// ---------------------------------------------------------------------------
// 1. Dashboard Overview Stats
// ---------------------------------------------------------------------------
export const getDashboardStats = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [
      totalProjects,
      totalSkills,
      totalServices,
      totalInquiries,
      newInquiries,
      totalLogos,
      totalMedia,
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Service.countDocuments(),
      ContactInquiry.countDocuments(),
      ContactInquiry.countDocuments({ status: 'new' }),
      CompanyLogo.countDocuments(),
      MediaAsset.countDocuments(),
    ]);

    const recentInquiries = await ContactInquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        stats: {
          totalProjects,
          totalSkills,
          totalServices,
          totalInquiries,
          newInquiries,
          totalLogos,
          totalMedia,
        },
        recentInquiries,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 2. Site Settings
// ---------------------------------------------------------------------------
export const updateSettings = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = new SiteSetting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json({ success: true, message: 'Site settings updated successfully.', data: settings });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 3. Hero Content
// ---------------------------------------------------------------------------
export const updateHero = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let hero = await HeroContent.findOne();
    if (!hero) {
      hero = new HeroContent(req.body);
    } else {
      Object.assign(hero, req.body);
    }
    await hero.save();
    res.json({ success: true, message: 'Hero section updated successfully.', data: hero });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 4. Company Logos (Specifically for the 2 prominent logos after Hero)
// ---------------------------------------------------------------------------
export const getAllCompanyLogos = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const logos = await CompanyLogo.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: logos });
  } catch (error) {
    next(error);
  }
};

export const createCompanyLogo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = CompanyLogoSchema.parse(req.body);
    const logo = await CompanyLogo.create(validated);
    res.status(201).json({ success: true, message: 'Company logo added successfully.', data: logo });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyLogo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const validated = CompanyLogoSchema.partial().parse(req.body);
    const logo = await CompanyLogo.findByIdAndUpdate(id, { $set: validated }, { new: true });
    if (!logo) {
      res.status(404).json({ success: false, message: 'Logo record not found' });
      return;
    }
    res.json({ success: true, message: 'Company logo updated successfully.', data: logo });
  } catch (error) {
    next(error);
  }
};

export const deleteCompanyLogo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await CompanyLogo.findByIdAndDelete(id);
    res.json({ success: true, message: 'Company logo deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 5. About Me
// ---------------------------------------------------------------------------
export const updateAbout = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let about = await AboutContent.findOne();
    if (!about) {
      about = new AboutContent(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json({ success: true, message: 'About content updated successfully.', data: about });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 6. Skills
// ---------------------------------------------------------------------------
export const getAllSkills = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ displayOrder: 1, createdAt: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = SkillCreateSchema.parse(req.body);
    const skill = await Skill.create(validated);
    res.status(201).json({ success: true, message: 'Skill created successfully.', data: skill });
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const validated = SkillCreateSchema.partial().parse(req.body);
    const skill = await Skill.findByIdAndUpdate(id, { $set: validated }, { new: true });
    if (!skill) {
      res.status(404).json({ success: false, message: 'Skill not found' });
      return;
    }
    res.json({ success: true, message: 'Skill updated successfully.', data: skill });
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Skill.findByIdAndDelete(id);
    res.json({ success: true, message: 'Skill deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 7. Services
// ---------------------------------------------------------------------------
export const getAllServices = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const services = await Service.find().sort({ displayOrder: 1 });
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const createService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = ServiceCreateSchema.parse(req.body);
    const service = await Service.create(validated);
    res.status(201).json({ success: true, message: 'Service created successfully.', data: service });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const validated = ServiceCreateSchema.partial().parse(req.body);
    const service = await Service.findByIdAndUpdate(id, { $set: validated }, { new: true });
    if (!service) {
      res.status(404).json({ success: false, message: 'Service not found' });
      return;
    }
    res.json({ success: true, message: 'Service updated successfully.', data: service });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.json({ success: true, message: 'Service deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 8. Projects Showcase
// ---------------------------------------------------------------------------
export const getAllProjects = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = ProjectCreateSchema.parse(req.body);
    const project = await Project.create(validated);
    res.status(201).json({ success: true, message: 'Project created successfully.', data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const validated = ProjectCreateSchema.partial().parse(req.body);
    const project = await Project.findByIdAndUpdate(id, { $set: validated }, { new: true });
    if (!project) {
      res.status(404).json({ success: false, message: 'Project not found' });
      return;
    }
    res.json({ success: true, message: 'Project updated successfully.', data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 9. Certifications
// ---------------------------------------------------------------------------
export const getAllCertifications = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const certs = await Certification.find().sort({ displayOrder: 1 });
    res.json({ success: true, data: certs });
  } catch (error) {
    next(error);
  }
};

export const createCertification = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = CertificationCreateSchema.parse(req.body);
    const cert = await Certification.create(validated);
    res.status(201).json({ success: true, message: 'Certification added successfully.', data: cert });
  } catch (error) {
    next(error);
  }
};

export const updateCertification = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const validated = CertificationCreateSchema.partial().parse(req.body);
    const cert = await Certification.findByIdAndUpdate(id, { $set: validated }, { new: true });
    if (!cert) {
      res.status(404).json({ success: false, message: 'Certification not found' });
      return;
    }
    res.json({ success: true, message: 'Certification updated successfully.', data: cert });
  } catch (error) {
    next(error);
  }
};

export const deleteCertification = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Certification.findByIdAndDelete(id);
    res.json({ success: true, message: 'Certification deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 10. Testimonials
// ---------------------------------------------------------------------------
export const getAllTestimonials = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const testimonials = await Testimonial.find().sort({ displayOrder: 1 });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validated = TestimonialCreateSchema.parse(req.body);
    const testimonial = await Testimonial.create(validated);
    res.status(201).json({ success: true, message: 'Testimonial created successfully.', data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const validated = TestimonialCreateSchema.partial().parse(req.body);
    const testimonial = await Testimonial.findByIdAndUpdate(id, { $set: validated }, { new: true });
    if (!testimonial) {
      res.status(404).json({ success: false, message: 'Testimonial not found' });
      return;
    }
    res.json({ success: true, message: 'Testimonial updated successfully.', data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.json({ success: true, message: 'Testimonial deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 11. Contact Inquiries Management
// ---------------------------------------------------------------------------
export const getInquiries = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const status = req.query.status as string;

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      ContactInquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ContactInquiry.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateInquiryStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const inquiry = await ContactInquiry.findByIdAndUpdate(
      id,
      { $set: { ...(status && { status }), ...(adminNotes !== undefined && { adminNotes }) } },
      { new: true }
    );

    if (!inquiry) {
      res.status(404).json({ success: false, message: 'Inquiry not found' });
      return;
    }

    res.json({ success: true, message: 'Inquiry updated successfully.', data: inquiry });
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await ContactInquiry.findByIdAndDelete(id);
    res.json({ success: true, message: 'Inquiry deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// ---------------------------------------------------------------------------
// 12. Media Upload & Library
// ---------------------------------------------------------------------------
export const uploadMedia = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No image file uploaded' });
      return;
    }

    const url = `/uploads/${req.file.filename}`;
    const media = await MediaAsset.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url,
      mimeType: req.file.mimetype,
      size: req.file.size,
      altText: req.body.altText || req.file.originalname,
      uploadedBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: 'Media uploaded successfully.',
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllMedia = async (
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const media = await MediaAsset.find().sort({ createdAt: -1 });
    res.json({ success: true, data: media });
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await MediaAsset.findByIdAndDelete(id);
    res.json({ success: true, message: 'Media record removed successfully.' });
  } catch (error) {
    next(error);
  }
};
