import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, CheckCircle2, Loader2, Save, X } from 'lucide-react';
import portfolioService from '../../services/portfolioService';

const AdminExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExp, setEditingExp] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    company: 'Zoho',
    role: 'AI Engineer',
    startDate: '[Add employment start date]',
    endDate: 'Present',
    description: '',
    responsibilities: '',
    technologies: '',
  });
  const [toast, setToast] = useState('');

  const fetchExperience = async () => {
    try {
      const res = await portfolioService.getExperience();
      setExperiences(res.data || []);
    } catch (err) {
      console.error('Error fetching experience:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description || '',
      responsibilities: (exp.responsibilities || []).join('\n'),
      technologies: (exp.technologies || []).join(', '),
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingExp(null);
    setFormData({
      company: '',
      role: '',
      startDate: '[Add employment start date]',
      endDate: 'Present',
      description: '',
      responsibilities: '',
      technologies: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingExp) {
        await portfolioService.updateExperience(editingExp._id, payload);
        setToast('Experience updated successfully!');
      } else {
        await portfolioService.createExperience(payload);
        setToast('Experience created successfully!');
      }
      setEditingExp(null);
      setIsCreating(false);
      fetchExperience();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to save experience.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Experience Management</h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Manage professional roles and career timeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toast && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {toast}
            </span>
          )}
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary-hover"
          >
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        </div>
      </div>

      {/* Form */}
      {(isCreating || editingExp) && (
        <div className="rounded-2xl glass-panel p-6 space-y-4 border-primary/30">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              {editingExp ? `Edit: ${editingExp.role} @ ${editingExp.company}` : 'Add Experience Entry'}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingExp(null);
              }}
              className="p-1 text-text-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-text-muted mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-mono text-text-muted mb-1">Role Title</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-text-muted mb-1">Start Date</label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block font-mono text-text-muted mb-1">End Date</label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Role Overview</label>
              <textarea
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">
                Responsibilities (one per line)
              </label>
              <textarea
                rows="3"
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Entry</span>
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="rounded-2xl glass-panel p-5 flex items-start justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{exp.role}</h3>
                <span className="text-secondary font-mono text-sm">@ {exp.company}</span>
              </div>
              <div className="text-xs font-mono text-text-muted mt-1">
                {exp.startDate} — {exp.endDate}
              </div>
              <p className="text-xs text-text-muted mt-2">{exp.description}</p>
            </div>

            <button
              onClick={() => handleEdit(exp)}
              className="p-2 rounded-lg bg-card text-text-muted hover:text-white border border-white/5"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperience;
