import React, { useState, useEffect } from 'react';
import { User, Save, CheckCircle2, Loader2 } from 'lucide-react';
import portfolioService from '../../services/portfolioService';

const AdminProfile = () => {
  const [formData, setFormData] = useState({
    name: 'Maduraaganesh N.',
    role: 'AI Engineer',
    company: 'Zoho',
    qualification: 'B.Tech – Information Technology',
    email: 'nmaduraaganesh@gmail.com',
    githubUrl: 'https://github.com/MADURAAGANESH-N',
    linkedinUrl: '[Add correct public LinkedIn URL]',
    tagline: 'Building intelligent systems and practical AI solutions that turn complex problems into impactful products.',
    aboutBio: 'AI Engineer at Zoho with a B.Tech in Information Technology.',
    professionalSummaryPlaceholder: '[Add professional summary]',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await portfolioService.getProfile();
        if (res.data) setFormData((prev) => ({ ...prev, ...res.data }));
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await portfolioService.updateProfile(formData);
      setToast('Profile settings saved successfully!');
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Profile & Identity Settings</h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Verified identity information for Maduraaganesh N.
          </p>
        </div>
        {toast && (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {toast}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl glass-panel p-6 sm:p-8 space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-text-muted mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-mono text-text-muted mb-1">Role Title</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-mono text-text-muted mb-1">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-mono text-text-muted mb-1">Qualification</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-mono text-text-muted mb-1">Primary Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block font-mono text-text-muted mb-1">GitHub Profile URL</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-mono text-text-muted mb-1">LinkedIn Profile URL</label>
            <input
              type="text"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-text-muted mb-1">Tagline (Hero Statement)</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block font-mono text-text-muted mb-1">Professional Summary Placeholder / Text</label>
          <textarea
            rows="3"
            value={formData.professionalSummaryPlaceholder}
            onChange={(e) => setFormData({ ...formData, professionalSummaryPlaceholder: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:from-primary-hover hover:to-accent-hover transition-all disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
