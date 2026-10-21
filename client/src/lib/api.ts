import {
  ISiteSetting,
  IHeroContent,
  ICompanyLogo,
  IAboutContent,
  ISkill,
  IService,
  IProject,
  ICertification,
  ITestimonial,
  IContactInquiry,
  IMediaAsset,
  IUser,
} from '../types/index.js';

const API_BASE = '/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = localStorage.getItem('token');
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.errors || `Request failed with status ${response.status}`);
  }

  return data;
}

// ---------------------------------------------------------------------------
// Public API Calls
// ---------------------------------------------------------------------------
export const api = {
  getSettings: () => request<{ success: boolean; data: ISiteSetting }>('/settings'),
  getHero: () => request<{ success: boolean; data: IHeroContent }>('/hero'),
  getCompanyLogos: () => request<{ success: boolean; data: ICompanyLogo[] }>('/company-logos'),
  getAbout: () => request<{ success: boolean; data: IAboutContent }>('/about'),
  getSkills: () => request<{ success: boolean; data: ISkill[] }>('/skills'),
  getServices: () => request<{ success: boolean; data: IService[] }>('/services'),
  getProjects: (category?: string) =>
    request<{ success: boolean; data: IProject[] }>(
      category && category !== 'All' ? `/projects?category=${encodeURIComponent(category)}` : '/projects'
    ),
  getProjectBySlug: (slug: string) =>
    request<{ success: boolean; data: IProject }>(`/projects/${encodeURIComponent(slug)}`),
  getCertifications: () => request<{ success: boolean; data: ICertification[] }>('/certifications'),
  getTestimonials: () => request<{ success: boolean; data: ITestimonial[] }>('/testimonials'),
  submitContact: (form: { name: string; email: string; projectType: string; budget?: string; message: string }) =>
    request<{ success: boolean; message: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(form),
    }),

  // ---------------------------------------------------------------------------
  // Auth API Calls
  // ---------------------------------------------------------------------------
  login: (credentials: { email: string; password: string }) =>
    request<{ success: boolean; token: string; user: IUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  logout: () =>
    request<{ success: boolean }>('/auth/logout', {
      method: 'POST',
    }),
  me: () => request<{ success: boolean; user: IUser }>('/auth/me'),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    request<{ success: boolean; message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // ---------------------------------------------------------------------------
  // Admin CRUD API Calls
  // ---------------------------------------------------------------------------
  admin: {
    getDashboardStats: () =>
      request<{
        success: boolean;
        data: {
          stats: {
            totalProjects: number;
            totalSkills: number;
            totalServices: number;
            totalInquiries: number;
            newInquiries: number;
            totalLogos: number;
            totalMedia: number;
          };
          recentInquiries: IContactInquiry[];
        };
      }>('/admin/dashboard/stats'),

    updateSettings: (settings: Partial<ISiteSetting>) =>
      request<{ success: boolean; message: string; data: ISiteSetting }>('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(settings),
      }),

    updateHero: (hero: Partial<IHeroContent>) =>
      request<{ success: boolean; message: string; data: IHeroContent }>('/admin/hero', {
        method: 'PUT',
        body: JSON.stringify(hero),
      }),

    // Company Logos CRUD
    getCompanyLogos: () => request<{ success: boolean; data: ICompanyLogo[] }>('/admin/company-logos'),
    createCompanyLogo: (data: Partial<ICompanyLogo>) =>
      request<{ success: boolean; message: string; data: ICompanyLogo }>('/admin/company-logos', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateCompanyLogo: (id: string, data: Partial<ICompanyLogo>) =>
      request<{ success: boolean; message: string; data: ICompanyLogo }>(`/admin/company-logos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteCompanyLogo: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/company-logos/${id}`, {
        method: 'DELETE',
      }),

    updateAbout: (about: Partial<IAboutContent>) =>
      request<{ success: boolean; message: string; data: IAboutContent }>('/admin/about', {
        method: 'PUT',
        body: JSON.stringify(about),
      }),

    // Skills CRUD
    getSkills: () => request<{ success: boolean; data: ISkill[] }>('/admin/skills'),
    createSkill: (data: Partial<ISkill>) =>
      request<{ success: boolean; message: string; data: ISkill }>('/admin/skills', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateSkill: (id: string, data: Partial<ISkill>) =>
      request<{ success: boolean; message: string; data: ISkill }>(`/admin/skills/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteSkill: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/skills/${id}`, {
        method: 'DELETE',
      }),

    // Services CRUD
    getServices: () => request<{ success: boolean; data: IService[] }>('/admin/services'),
    createService: (data: Partial<IService>) =>
      request<{ success: boolean; message: string; data: IService }>('/admin/services', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateService: (id: string, data: Partial<IService>) =>
      request<{ success: boolean; message: string; data: IService }>(`/admin/services/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteService: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/services/${id}`, {
        method: 'DELETE',
      }),

    // Projects CRUD
    getProjects: () => request<{ success: boolean; data: IProject[] }>('/admin/projects'),
    createProject: (data: Partial<IProject>) =>
      request<{ success: boolean; message: string; data: IProject }>('/admin/projects', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateProject: (id: string, data: Partial<IProject>) =>
      request<{ success: boolean; message: string; data: IProject }>(`/admin/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteProject: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/projects/${id}`, {
        method: 'DELETE',
      }),

    // Certifications CRUD
    getCertifications: () => request<{ success: boolean; data: ICertification[] }>('/admin/certifications'),
    createCertification: (data: Partial<ICertification>) =>
      request<{ success: boolean; message: string; data: ICertification }>('/admin/certifications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateCertification: (id: string, data: Partial<ICertification>) =>
      request<{ success: boolean; message: string; data: ICertification }>(`/admin/certifications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteCertification: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/certifications/${id}`, {
        method: 'DELETE',
      }),

    // Inquiries
    getInquiries: (page = 1, status = 'all') =>
      request<{
        success: boolean;
        data: IContactInquiry[];
        pagination: { page: number; limit: number; total: number; totalPages: number };
      }>(`/admin/inquiries?page=${page}&status=${status}`),
    updateInquiry: (id: string, data: { status?: string; adminNotes?: string }) =>
      request<{ success: boolean; message: string; data: IContactInquiry }>(`/admin/inquiries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteInquiry: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/inquiries/${id}`, {
        method: 'DELETE',
      }),

    // Media
    getMedia: () => request<{ success: boolean; data: IMediaAsset[] }>('/admin/media'),
    uploadMedia: (file: File, altText?: string) => {
      const formData = new FormData();
      formData.append('image', file);
      if (altText) formData.append('altText', altText);
      return request<{ success: boolean; message: string; data: IMediaAsset }>('/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
    },
    deleteMedia: (id: string) =>
      request<{ success: boolean; message: string }>(`/admin/media/${id}`, {
        method: 'DELETE',
      }),
  },
};
