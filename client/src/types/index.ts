export interface ISiteSetting {
  siteName: string;
  ownerName: string;
  headline: string;
  description: string;
  portraitImage: string;
  logo: string;
  favicon?: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone?: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    behance?: string;
    whatsapp?: string;
  };
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
}

export interface IHeroContent {
  _id?: string;
  greeting: string;
  headline: string;
  highlightText: string;
  professionalRoles: string[];
  description: string;
  portraitImage: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  projectCount: string;
  disciplinesCount: string;
  learningBadge: string;
  floatingCardText: string;
  active: boolean;
}

export interface ICompanyLogo {
  _id: string;
  companyName: string;
  logoImage: string;
  websiteUrl?: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface IAboutContent {
  _id?: string;
  sectionTitle: string;
  introduction: string;
  biography: string;
  portraitImage: string;
  certificationTitle: string;
  certificationDescription: string;
  highlights: string[];
  isPublished: boolean;
}

export interface ISkill {
  _id: string;
  name: string;
  category: string;
  description?: string;
  proficiency: number;
  displayOrder: number;
  isActive: boolean;
}

export interface IService {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface IProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  category: string;
  technologies: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface ICertification {
  _id: string;
  title: string;
  issuer: string;
  description: string;
  certificateImage?: string;
  issueDate?: string;
  verificationUrl?: string;
  displayOrder: number;
  isPublished: boolean;
}

export interface IContactInquiry {
  _id: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'in-progress' | 'responded' | 'archived';
  adminNotes?: string;
  createdAt: string;
}

export interface ITestimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  message: string;
  avatar?: string;
  rating: number;
  displayOrder: number;
  isPublished: boolean;
}

export interface IMediaAsset {
  _id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  altText?: string;
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}
