import mongoose, { Schema, Document, Model } from 'mongoose';

// ---------------------------------------------------------------------------
// A. Admin Users — adminusers
// ---------------------------------------------------------------------------
export interface IAdminUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
  },
  { timestamps: true, collection: 'adminusers' }
);

// AdminUser email has unique: true on field definition

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

// ---------------------------------------------------------------------------
// B. Site Settings — sitesettings
// ---------------------------------------------------------------------------
export interface ISiteSetting extends Document {
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
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    siteName: { type: String, default: 'Shahinur Akter — Portfolio' },
    ownerName: { type: String, default: 'Shahinur Akter' },
    headline: { type: String, default: 'Frontend Developer, Graphic Designer & Digital Marketer' },
    description: {
      type: String,
      default:
        'I create modern websites, compelling visual designs, and digital marketing experiences that help brands build a stronger online presence.',
    },
    portraitImage: { type: String, default: '/assets/images/shahinur-hero-ref.png' },
    logo: { type: String, default: 'SA' },
    favicon: { type: String, default: '/favicon.ico' },
    primaryColor: { type: String, default: '#F97316' }, // Vibrant Orange
    secondaryColor: { type: String, default: '#0F172A' }, // Deep Navy
    contactEmail: { type: String, default: 'ceo@shahinurakter.com' },
    contactPhone: { type: String, default: '' },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/' },
      linkedin: { type: String, default: 'https://linkedin.com/' },
      github: { type: String, default: 'https://github.com/' },
      twitter: { type: String, default: 'https://x.com/' },
      instagram: { type: String, default: 'https://instagram.com/' },
      behance: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
    },
    seoTitle: { type: String, default: 'Shahinur Akter — Creative Portfolio' },
    seoDescription: {
      type: String,
      default:
        'Portfolio of Shahinur Akter — Frontend Developer, Graphic Designer, and NSDA Certified Level 4 Digital Marketer.',
    },
    ogImage: { type: String, default: '/assets/images/shahinur-hero-ref.png' },
  },
  { timestamps: true, collection: 'sitesettings' }
);

export const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting || mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);

// ---------------------------------------------------------------------------
// C. Hero Content — herocontents
// ---------------------------------------------------------------------------
export interface IHeroContent extends Document {
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
  updatedAt: Date;
}

const HeroContentSchema = new Schema<IHeroContent>(
  {
    greeting: { type: String, default: "Hi, I'm Shahinur Akter 👋" },
    headline: { type: String, default: 'Turning Ideas Into' },
    highlightText: { type: String, default: 'Creative Digital Experiences' },
    professionalRoles: {
      type: [String],
      default: ['Frontend Developer', 'Graphic Designer', 'NSDA Certified Level 4 Digital Marketer'],
    },
    description: {
      type: String,
      default:
        'I create modern websites, compelling visual designs, and digital marketing experiences that help brands build a stronger online presence.',
    },
    portraitImage: { type: String, default: '/assets/images/shahinur-hero-ref.png' },
    primaryButtonText: { type: String, default: 'View My Projects' },
    primaryButtonUrl: { type: String, default: '#projects' },
    secondaryButtonText: { type: String, default: 'Contact Me' },
    secondaryButtonUrl: { type: String, default: '#contact' },
    projectCount: { type: String, default: '110+' },
    disciplinesCount: { type: String, default: '3' },
    learningBadge: { type: String, default: 'Always Learning, Better Every Day' },
    floatingCardText: { type: String, default: 'Turning Creativity Into Real Impact' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'herocontents' }
);

export const HeroContent: Model<IHeroContent> =
  mongoose.models.HeroContent || mongoose.model<IHeroContent>('HeroContent', HeroContentSchema);

// ---------------------------------------------------------------------------
// D. Company Logos — companylogos
// Exactly two active logos shown directly after hero
// ---------------------------------------------------------------------------
export interface ICompanyLogo extends Document {
  companyName: string;
  logoImage: string;
  websiteUrl?: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyLogoSchema = new Schema<ICompanyLogo>(
  {
    companyName: { type: String, required: true, trim: true },
    logoImage: { type: String, required: true },
    websiteUrl: { type: String, default: '' },
    description: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'companylogos' }
);

CompanyLogoSchema.index({ displayOrder: 1, isActive: 1 });

export const CompanyLogo: Model<ICompanyLogo> =
  mongoose.models.CompanyLogo || mongoose.model<ICompanyLogo>('CompanyLogo', CompanyLogoSchema);

// ---------------------------------------------------------------------------
// E. About Content — aboutcontents
// ---------------------------------------------------------------------------
export interface IAboutContent extends Document {
  sectionTitle: string;
  introduction: string;
  biography: string;
  portraitImage: string;
  certificationTitle: string;
  certificationDescription: string;
  highlights: string[];
  isPublished: boolean;
  updatedAt: Date;
}

const AboutContentSchema = new Schema<IAboutContent>(
  {
    sectionTitle: { type: String, default: "I'm a Creative Problem Solver" },
    introduction: {
      type: String,
      default:
        'I work at the intersection of design, development and marketing. My goal is to create digital solutions that are not only beautiful but also functional, user-friendly and result-driven.',
    },
    biography: {
      type: String,
      default:
        'With a unique multidisciplinary background spanning clean frontend web development, brand graphic design, and certified digital marketing strategies, I bridge the gap between creative visual concepts and robust digital execution. Every interface is crafted with precision, accessibility, and high performance in mind.',
    },
    portraitImage: { type: String, default: '/assets/images/shahinur-hero-ref.png' },
    certificationTitle: { type: String, default: 'NSDA Certified — Level 4 Digital Marketer' },
    certificationDescription: {
      type: String,
      default:
        'Bangladesh National Skills Development Authority (NSDA) Certified Level 4 in Digital Marketing.',
    },
    highlights: {
      type: [String],
      default: ['Frontend Development', 'Graphic Design', 'Digital Marketing'],
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'aboutcontents' }
);

export const AboutContent: Model<IAboutContent> =
  mongoose.models.AboutContent || mongoose.model<IAboutContent>('AboutContent', AboutContentSchema);

// ---------------------------------------------------------------------------
// F. Skills — skills
// ---------------------------------------------------------------------------
export interface ISkill extends Document {
  name: string;
  category: string;
  description?: string;
  proficiency: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'skills' }
);

SkillSchema.index({ displayOrder: 1, isActive: 1, category: 1 });

export const Skill: Model<ISkill> =
  mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);

// ---------------------------------------------------------------------------
// G. Services — services
// ---------------------------------------------------------------------------
export interface IService extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, default: '' },
    icon: { type: String, required: true, default: 'Code' },
    image: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'services' }
);

ServiceSchema.index({ displayOrder: 1, isActive: 1 });

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

// ---------------------------------------------------------------------------
// H. Projects — projects
// ---------------------------------------------------------------------------
export interface IProject extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, default: '' },
    thumbnail: { type: String, required: true },
    gallery: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    caseStudyUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'projects' }
);

ProjectSchema.index({ category: 1, isPublished: 1, isFeatured: 1, displayOrder: 1 });

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

// ---------------------------------------------------------------------------
// I. Certifications — certifications
// ---------------------------------------------------------------------------
export interface ICertification extends Document {
  title: string;
  issuer: string;
  description: string;
  certificateImage?: string;
  issueDate?: string;
  verificationUrl?: string;
  displayOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    certificateImage: { type: String, default: '' },
    issueDate: { type: String, default: '' },
    verificationUrl: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'certifications' }
);

CertificationSchema.index({ displayOrder: 1, isPublished: 1 });

export const Certification: Model<ICertification> =
  mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);

// ---------------------------------------------------------------------------
// J. Contact Inquiries — contactinquiries
// ---------------------------------------------------------------------------
export interface IContactInquiry extends Document {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
  status: 'new' | 'in-progress' | 'responded' | 'archived';
  adminNotes?: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    projectType: { type: String, required: true, trim: true },
    budget: { type: String, default: '' },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'responded', 'archived'],
      default: 'new',
    },
    adminNotes: { type: String, default: '' },
    ipAddress: { type: String, default: '' },
  },
  { timestamps: true, collection: 'contactinquiries' }
);

ContactInquirySchema.index({ createdAt: -1, status: 1 });

export const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry || mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);

// ---------------------------------------------------------------------------
// K. Testimonials — testimonials
// ---------------------------------------------------------------------------
export interface ITestimonial extends Document {
  clientName: string;
  clientRole: string;
  companyName: string;
  message: string;
  avatar?: string;
  rating: number;
  displayOrder: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true, trim: true },
    clientRole: { type: String, default: '' },
    companyName: { type: String, default: '' },
    message: { type: String, required: true },
    avatar: { type: String, default: '' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    displayOrder: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'testimonials' }
);

TestimonialSchema.index({ displayOrder: 1, isPublished: 1 });

export const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

// ---------------------------------------------------------------------------
// L. Media Assets — mediaassets
// ---------------------------------------------------------------------------
export interface IMediaAsset extends Document {
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  altText?: string;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    altText: { type: String, default: '' },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'AdminUser' },
  },
  { timestamps: { createdAt: true, updatedAt: false }, collection: 'mediaassets' }
);

MediaAssetSchema.index({ createdAt: -1 });

export const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset || mongoose.model<IMediaAsset>('MediaAsset', MediaAssetSchema);
