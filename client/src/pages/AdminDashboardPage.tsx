import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Sparkles,
  Building2,
  User,
  Zap,
  Briefcase,
  Layers,
  Award,
  Mail,
  Image as ImageIcon,
  KeyRound,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Upload,
} from 'lucide-react';
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
  IContactInquiry,
  IMediaAsset,
} from '../types/index.js';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Dashboard Data State
  const [stats, setStats] = useState<any>({});
  const [recentInquiries, setRecentInquiries] = useState<IContactInquiry[]>([]);
  const [settings, setSettings] = useState<Partial<ISiteSetting>>({});
  const [hero, setHero] = useState<Partial<IHeroContent>>({});
  const [logos, setLogos] = useState<ICompanyLogo[]>([]);
  const [about, setAbout] = useState<Partial<IAboutContent>>({});
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [inquiries, setInquiries] = useState<IContactInquiry[]>([]);
  const [media, setMedia] = useState<IMediaAsset[]>([]);

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Initial Data Fetch
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Check auth first
      await api.me();

      const [
        statsRes,
        settingsRes,
        heroRes,
        logosRes,
        aboutRes,
        skillsRes,
        servicesRes,
        projectsRes,
        certsRes,
        inquiriesRes,
        mediaRes,
      ] = await Promise.all([
        api.admin.getDashboardStats().catch(() => ({ data: { stats: {}, recentInquiries: [] } })),
        api.getSettings().catch(() => ({ data: {} })),
        api.getHero().catch(() => ({ data: {} })),
        api.admin.getCompanyLogos().catch(() => ({ data: [] })),
        api.getAbout().catch(() => ({ data: {} })),
        api.admin.getSkills().catch(() => ({ data: [] })),
        api.admin.getServices().catch(() => ({ data: [] })),
        api.admin.getProjects().catch(() => ({ data: [] })),
        api.admin.getCertifications().catch(() => ({ data: [] })),
        api.admin.getInquiries(1, 'all').catch(() => ({ data: [] })),
        api.admin.getMedia().catch(() => ({ data: [] })),
      ]);

      setStats(statsRes.data?.stats || {});
      setRecentInquiries(statsRes.data?.recentInquiries || []);
      setSettings(settingsRes.data || {});
      setHero(heroRes.data || {});
      setLogos(logosRes.data || []);
      setAbout(aboutRes.data || {});
      setSkills(skillsRes.data || []);
      setServices(servicesRes.data || []);
      setProjects(projectsRes.data || []);
      setCertifications(certsRes.data || []);
      setInquiries(inquiriesRes.data || []);
      setMedia(mediaRes.data || []);
    } catch (err: any) {
      console.error('Auth verification failed:', err);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(''), 4000);
    } else {
      setSaveMessage(msg);
      setTimeout(() => setSaveMessage(''), 4000);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/admin/login');
    }
  };

  // ---------------------------------------------------------------------------
  // Save Handlers
  // ---------------------------------------------------------------------------
  const saveSettings = async () => {
    try {
      await api.admin.updateSettings(settings);
      showNotification('Site settings updated successfully!');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const saveHero = async () => {
    try {
      await api.admin.updateHero(hero);
      showNotification('Hero section content updated successfully!');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const saveAbout = async () => {
    try {
      await api.admin.updateAbout(about);
      showNotification('About content updated successfully!');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleUpdateLogo = async (logo: ICompanyLogo) => {
    try {
      await api.admin.updateCompanyLogo(logo._id, logo);
      showNotification(`Updated ${logo.companyName}`);
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleToggleLogoActive = async (logo: ICompanyLogo) => {
    try {
      const updated = { ...logo, isActive: !logo.isActive };
      await api.admin.updateCompanyLogo(logo._id, updated);
      setLogos(logos.map((l) => (l._id === logo._id ? updated : l)));
      showNotification(`Toggled active status for ${logo.companyName}`);
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleSkillUpdate = async (skill: ISkill) => {
    try {
      await api.admin.updateSkill(skill._id, skill);
      showNotification(`Updated skill: ${skill.name}`);
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.admin.deleteSkill(id);
      setSkills(skills.filter((s) => s._id !== id));
      showNotification('Skill removed successfully');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleCreateSkill = async () => {
    const name = prompt('Enter new skill name:');
    if (!name) return;
    try {
      const res = await api.admin.createSkill({
        name,
        category: 'Frontend Development',
        proficiency: 85,
        displayOrder: skills.length + 1,
        isActive: true,
      });
      if (res.data) setSkills([...skills, res.data]);
      showNotification('Skill created successfully');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    try {
      await api.admin.updateInquiry(id, { status });
      setInquiries(
        inquiries.map((inq) => (inq._id === id ? { ...inq, status: status as any } : inq))
      );
      showNotification('Inquiry status updated');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await api.admin.deleteInquiry(id);
      setInquiries(inquiries.filter((i) => i._id !== id));
      showNotification('Inquiry deleted');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;
    try {
      const res = await api.admin.uploadMedia(uploadFile);
      if (res.data) {
        setMedia([res.data, ...media]);
        setUploadFile(null);
        showNotification('Media image uploaded to library!');
      }
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.changePassword(passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      showNotification('Password changed successfully!');
    } catch (err: any) {
      showNotification(err.message, true);
    }
  };

  const navTabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'logos', label: 'Company Logos (2 Logos)', icon: Building2 },
    { id: 'about', label: 'About Me', icon: User },
    { id: 'skills', label: 'Professional Skills', icon: Zap },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Project Showcase', icon: Layers },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'inquiries', label: 'Contact Inquiries', icon: Mail },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'security', label: 'Change Password', icon: KeyRound },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-sm font-bold text-slate-500 animate-pulse">
          Loading Admin Control Center...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Branding */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
                SA
              </div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm block">Admin Panel</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Shahinur Akter
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto w-full">
        {/* Notification Toasts */}
        {saveMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h2>
              <p className="text-sm text-slate-500">
                Summary of published content, inquiries, and platform metrics
              </p>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Total Projects</span>
                <span className="text-2xl font-extrabold text-slate-900">{stats.totalProjects ?? projects.length}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Skills Listed</span>
                <span className="text-2xl font-extrabold text-slate-900">{stats.totalSkills ?? skills.length}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Services</span>
                <span className="text-2xl font-extrabold text-slate-900">{stats.totalServices ?? services.length}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs font-bold text-slate-400 block mb-1">Contact Leads</span>
                <span className="text-2xl font-extrabold text-orange-600">
                  {stats.totalInquiries ?? inquiries.length}
                </span>
              </div>
            </div>

            {/* Recent Inquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">Recent Inquiries</h3>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  View All →
                </button>
              </div>

              {recentInquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No contact inquiries yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 uppercase font-semibold">
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Email</th>
                        <th className="pb-3">Project Type</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {recentInquiries.map((inq) => (
                        <tr key={inq._id}>
                          <td className="py-3 font-bold text-slate-900">{inq.name}</td>
                          <td className="py-3">{inq.email}</td>
                          <td className="py-3">{inq.projectType}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                                inq.status === 'new'
                                  ? 'bg-orange-100 text-orange-700'
                                  : inq.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-400">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. SITE SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Site Settings</h2>
                <p className="text-xs text-slate-500">Configure global metadata, contacts, and links</p>
              </div>
              <button
                onClick={saveSettings}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  value={settings.ownerName || ''}
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Site Title</label>
                <input
                  type="text"
                  value={settings.siteName || ''}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail || ''}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portrait Image Path</label>
                <input
                  type="text"
                  value={settings.portraitImage || ''}
                  onChange={(e) => setSettings({ ...settings, portraitImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={settings.headline || ''}
                  onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={settings.description || ''}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. HERO SECTION TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Hero Section Editor</h2>
                <p className="text-xs text-slate-500">Edit headlines, badges, counters, and portrait image</p>
              </div>
              <button
                onClick={saveHero}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Hero</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Greeting</label>
                <input
                  type="text"
                  value={hero.greeting || ''}
                  onChange={(e) => setHero({ ...hero, greeting: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Headline Part 1</label>
                <input
                  type="text"
                  value={hero.headline || ''}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Highlight Text (Gradient)</label>
                <input
                  type="text"
                  value={hero.highlightText || ''}
                  onChange={(e) => setHero({ ...hero, highlightText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm text-orange-600 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Count Stat</label>
                <input
                  type="text"
                  value={hero.projectCount || ''}
                  onChange={(e) => setHero({ ...hero, projectCount: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Floating Badge Text</label>
                <input
                  type="text"
                  value={hero.floatingCardText || ''}
                  onChange={(e) => setHero({ ...hero, floatingCardText: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portrait Image</label>
                <input
                  type="text"
                  value={hero.portraitImage || ''}
                  onChange={(e) => setHero({ ...hero, portraitImage: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={hero.description || ''}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* 4. COMPANY LOGOS TAB (Requirement 5) */}
        {activeTab === 'logos' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Company Logos Manager (Exactly 2 Logos Directly After Hero)
                </h2>
                <p className="text-xs text-slate-500">
                  Manage the 2 prominent logos displayed in the "Selected Collaborations" section
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {logos.map((logo, index) => (
                <div
                  key={logo._id || index}
                  className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-orange-100 text-orange-800">
                      Position #{logo.displayOrder}
                    </span>
                    <button
                      onClick={() => handleToggleLogoActive(logo)}
                      className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer transition-colors ${
                        logo.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {logo.isActive ? 'Active (Visible)' : 'Inactive'}
                    </button>
                  </div>

                  <div className="w-full h-16 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-2">
                    <img src={logo.logoImage} alt={logo.companyName} className="max-h-full object-contain" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={logo.companyName}
                      onChange={(e) => {
                        const updated = { ...logo, companyName: e.target.value };
                        setLogos(logos.map((l) => (l._id === logo._id ? updated : l)));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Logo Image URL</label>
                    <input
                      type="text"
                      value={logo.logoImage}
                      onChange={(e) => {
                        const updated = { ...logo, logoImage: e.target.value };
                        setLogos(logos.map((l) => (l._id === logo._id ? updated : l)));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Website URL</label>
                    <input
                      type="text"
                      value={logo.websiteUrl || ''}
                      onChange={(e) => {
                        const updated = { ...logo, websiteUrl: e.target.value };
                        setLogos(logos.map((l) => (l._id === logo._id ? updated : l)));
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                    />
                  </div>

                  <button
                    onClick={() => handleUpdateLogo(logo)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Save Changes for Logo #{logo.displayOrder}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. ABOUT ME TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">About Me Editor</h2>
                <p className="text-xs text-slate-500">Edit story, introduction, and NSDA certificate card</p>
              </div>
              <button
                onClick={saveAbout}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save About</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={about.sectionTitle || ''}
                  onChange={(e) => setAbout({ ...about, sectionTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Short Introduction</label>
                <textarea
                  rows={2}
                  value={about.introduction || ''}
                  onChange={(e) => setAbout({ ...about, introduction: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Biography / Story</label>
                <textarea
                  rows={4}
                  value={about.biography || ''}
                  onChange={(e) => setAbout({ ...about, biography: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Certification Title</label>
                <input
                  type="text"
                  value={about.certificationTitle || ''}
                  onChange={(e) => setAbout({ ...about, certificationTitle: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* 6. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Professional Skills</h2>
                <p className="text-xs text-slate-500">Manage skills, categories, and progress bar percentages (0-100%)</p>
              </div>
              <button
                onClick={handleCreateSkill}
                className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{skill.name}</span>
                    <button
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={skill.proficiency}
                      onChange={(e) => {
                        const updated = { ...skill, proficiency: parseInt(e.target.value, 10) };
                        setSkills(skills.map((s) => (s._id === skill._id ? updated : s)));
                      }}
                      className="w-full accent-orange-500 cursor-pointer"
                    />
                    <span className="font-extrabold text-orange-600 text-sm w-10 text-right">
                      {skill.proficiency}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleSkillUpdate(skill)}
                    className="w-full text-center bg-white border border-slate-200 hover:border-orange-300 font-bold text-xs py-1.5 rounded-lg text-slate-700 transition-colors cursor-pointer"
                  >
                    Save Percentage
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. CONTACT INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Contact Inquiries & Leads</h2>
                <p className="text-xs text-slate-500">
                  Review client project requests submitted through the contact form
                </p>
              </div>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-slate-400 text-center py-10">No inquiries found in database.</p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{inq.name}</h4>
                        <a
                          href={`mailto:${inq.email}`}
                          className="text-xs text-orange-600 font-semibold hover:underline"
                        >
                          {inq.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq._id, e.target.value)}
                          className="text-xs font-bold px-3 py-1 rounded-lg border border-slate-200 bg-white"
                        >
                          <option value="new">New</option>
                          <option value="in-progress">In-Progress</option>
                          <option value="responded">Responded</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq._id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-slate-500">
                      Project Type:{' '}
                      <span className="text-slate-800 font-bold">{inq.projectType}</span> | Budget:{' '}
                      <span className="text-slate-800 font-bold">{inq.budget || 'Not specified'}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap">
                      {inq.message}
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Submitted on: {new Date(inq.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 8. MEDIA LIBRARY TAB */}
        {activeTab === 'media' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Media Library & Upload</h2>
                <p className="text-xs text-slate-500">Upload and manage images stored for portfolio sections</p>
              </div>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleUploadMedia} className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 flex flex-col sm:flex-row items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                className="text-xs font-semibold text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
              />
              <button
                type="submit"
                disabled={!uploadFile}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload to Library</span>
              </button>
            </form>

            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {media.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-2 space-y-2"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center">
                    <img src={item.url} alt={item.originalName} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 truncate">{item.originalName}</div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      showNotification('URL copied to clipboard!');
                    }}
                    className="w-full text-center bg-white border border-slate-200 font-bold text-[10px] py-1 rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    Copy URL
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Change Password</h2>
              <p className="text-xs text-slate-500">Update administrator credentials</p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
