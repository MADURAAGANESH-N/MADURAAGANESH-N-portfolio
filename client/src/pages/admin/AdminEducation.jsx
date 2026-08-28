import React, { useState, useEffect } from 'react';
import { GraduationCap, Edit2, Trash2, CheckCircle2, Loader2, Save, X, Plus } from 'lucide-react';
import portfolioService from '../../services/portfolioService';

const AdminEducation = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEdu, setEditingEdu] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    degree: 'B.Tech',
    field: 'Information Technology',
    institution: '[College/University]',
    startYear: '[Start year]',
    endYear: '[Graduation year]',
    grade: '[CGPA]',
    description: '',
  });
  const [toast, setToast] = useState('');

  const fetchEducation = async () => {
    try {
      const res = await portfolioService.getEducation();
      setEducationList(res.data || []);
    } catch (err) {
      console.error('Error fetching education:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      field: edu.field,
      institution: edu.institution,
      startYear: edu.startYear,
      endYear: edu.endYear,
      grade: edu.grade,
      description: edu.description || '',
    });
    setIsCreating(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await portfolioService.updateEducation(editingEdu._id, formData);
        setToast('Education record updated!');
      } else {
        await portfolioService.createEducation(formData);
        setToast('Education record created!');
      }
      setEditingEdu(null);
      setIsCreating(false);
      fetchEducation();
      setTimeout(() => setToast(''), 3000);
    } catch (err) {
      setToast('Failed to save education record.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Education Management</h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Academic qualifications and degrees.
          </p>
        </div>
        {toast && (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {toast}
          </span>
        )}
      </div>

      {editingEdu && (
        <div className="rounded-2xl glass-panel p-6 space-y-4 border-primary/40">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Edit Academic Record</h3>
            <button onClick={() => setEditingEdu(null)} className="text-text-muted hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-text-muted mb-1">Degree</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block font-mono text-text-muted mb-1">Field of Study</label>
                <input
                  type="text"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-mono text-text-muted mb-1">College / University</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white"
                />
              </div>
              <div>
                <label className="block font-mono text-text-muted mb-1">Start & End Years</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    className="w-1/2 px-3 py-2 bg-card border border-white/10 rounded-xl text-white"
                  />
                  <input
                    type="text"
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    className="w-1/2 px-3 py-2 bg-card border border-white/10 rounded-xl text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-text-muted mb-1">CGPA / Grade</label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 bg-card border border-white/10 rounded-xl text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-primary hover:bg-primary-hover text-white"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Record</span>
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {educationList.map((edu) => (
          <div
            key={edu._id}
            className="rounded-2xl glass-panel p-5 flex items-start justify-between gap-4"
          >
            <div>
              <h3 className="font-bold text-white text-base">
                {edu.degree} — {edu.field}
              </h3>
              <div className="text-xs font-mono text-text-muted mt-1">
                {edu.institution} • {edu.startYear} — {edu.endYear} • CGPA: {edu.grade}
              </div>
              <p className="text-xs text-text-muted mt-2">{edu.description}</p>
            </div>

            <button
              onClick={() => handleEdit(edu)}
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

export default AdminEducation;
