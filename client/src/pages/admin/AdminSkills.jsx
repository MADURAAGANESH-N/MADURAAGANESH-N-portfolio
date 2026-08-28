import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Loader2, Cpu, X, Save } from 'lucide-react';
import portfolioService from '../../services/portfolioService';

const categories = [
  'AI & Machine Learning',
  'Generative AI',
  'Software Engineering',
  'Backend Development',
  'Databases',
  'Tools & Technologies',
];

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'AI & Machine Learning',
    proficiency: 85,
    icon: 'Cpu',
    displayOrder: 0,
  });
  const [toast, setToast] = useState('');

  const fetchSkills = async () => {
    try {
      const res = await portfolioService.getSkills();
      setSkills(res.data || []);
    } catch (err) {
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'Cpu',
      displayOrder: skill.displayOrder || 0,
    });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'AI & Machine Learning',
      proficiency: 85,
      icon: 'Cpu',
      displayOrder: skills.length + 1,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await portfolioService.updateSkill(editingSkill._id, formData);
        setToast('Skill updated successfully!');
      } else {
        await portfolioService.createSkill(formData);
        setToast('Skill created successfully!');
      }
      setEditingSkill(null);
      setIsCreating(false);
      fetchSkills();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to save skill.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await portfolioService.deleteSkill(id);
      setToast('Skill deleted successfully!');
      fetchSkills();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to delete skill.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Skills Management</h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Manage technical proficiencies and categorized competencies.
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-primary to-accent text-white shadow-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Skill</span>
          </button>
        </div>
      </div>

      {/* Create / Edit Form Modal */}
      {(isCreating || editingSkill) && (
        <div className="rounded-2xl glass-panel p-6 border-primary/40 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              {editingSkill ? `Edit: ${editingSkill.name}` : 'Add New Skill'}
            </h3>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingSkill(null);
              }}
              className="p-1 text-text-muted hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-mono text-text-muted mb-1">Skill Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g. PyTorch"
                className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">
                Proficiency ({formData.proficiency}%)
              </label>
              <input
                type="range"
                min="50"
                max="100"
                value={formData.proficiency}
                onChange={(e) => setFormData({ ...formData, proficiency: Number(e.target.value) })}
                className="w-full mt-2 accent-primary"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Skill</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills Table */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
        </div>
      ) : (
        <div className="rounded-2xl glass-panel overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-card border-b border-white/5 font-mono text-text-subtle uppercase">
                <tr>
                  <th className="py-3 px-4">Skill</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Proficiency</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {skills.map((skill) => (
                  <tr key={skill._id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 px-4 font-semibold text-white">{skill.name}</td>
                    <td className="py-3.5 px-4 text-text-muted font-mono">{skill.category}</td>
                    <td className="py-3.5 px-4 text-center font-mono">{skill.proficiency}%</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="p-1.5 rounded-lg bg-card hover:bg-white/10 text-text-muted hover:text-white"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
