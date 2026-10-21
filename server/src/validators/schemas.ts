import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export const ContactInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.string().min(2, 'Please select or enter a project type'),
  budget: z.string().optional().default(''),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const SkillCreateSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional().default(''),
  proficiency: z.coerce.number().min(0).max(100),
  displayOrder: z.coerce.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const ServiceCreateSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  shortDescription: z.string().min(5, 'Short description is required'),
  fullDescription: z.string().optional().default(''),
  icon: z.string().min(1, 'Icon name is required'),
  image: z.string().optional().default(''),
  displayOrder: z.coerce.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const ProjectCreateSchema = z.object({
  title: z.string().min(2, 'Project title is required'),
  slug: z.string().min(2, 'Slug is required'),
  shortDescription: z.string().min(5, 'Short description is required'),
  description: z.string().optional().default(''),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  gallery: z.array(z.string()).optional().default([]),
  category: z.string().min(2, 'Category is required'),
  technologies: z.array(z.string()).optional().default([]),
  liveUrl: z.string().optional().default(''),
  caseStudyUrl: z.string().optional().default(''),
  isFeatured: z.boolean().optional().default(false),
  isPublished: z.boolean().optional().default(true),
  displayOrder: z.coerce.number().optional().default(0),
});

export const CompanyLogoSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  logoImage: z.string().min(1, 'Logo image is required'),
  websiteUrl: z.string().optional().default(''),
  description: z.string().optional().default(''),
  displayOrder: z.coerce.number().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const CertificationCreateSchema = z.object({
  title: z.string().min(2, 'Certification title is required'),
  issuer: z.string().min(2, 'Issuer name is required'),
  description: z.string().optional().default(''),
  certificateImage: z.string().optional().default(''),
  issueDate: z.string().optional().default(''),
  verificationUrl: z.string().optional().default(''),
  displayOrder: z.coerce.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

export const TestimonialCreateSchema = z.object({
  clientName: z.string().min(2, 'Client name is required'),
  clientRole: z.string().optional().default(''),
  companyName: z.string().optional().default(''),
  message: z.string().min(5, 'Testimonial message is required'),
  avatar: z.string().optional().default(''),
  rating: z.coerce.number().min(1).max(5).default(5),
  displayOrder: z.coerce.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});
