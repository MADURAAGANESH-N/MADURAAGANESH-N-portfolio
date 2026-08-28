import api from './api';

export const portfolioService = {
  // Profile
  getProfile: async () => {
    const res = await api.get('/profile');
    return res.data;
  },
  updateProfile: async (data) => {
    const res = await api.put('/profile', data);
    return res.data;
  },

  // Skills
  getSkills: async () => {
    const res = await api.get('/skills');
    return res.data;
  },
  createSkill: async (data) => {
    const res = await api.post('/skills', data);
    return res.data;
  },
  updateSkill: async (id, data) => {
    const res = await api.put(`/skills/${id}`, data);
    return res.data;
  },
  deleteSkill: async (id) => {
    const res = await api.delete(`/skills/${id}`);
    return res.data;
  },

  // Experience
  getExperience: async () => {
    const res = await api.get('/experience');
    return res.data;
  },
  createExperience: async (data) => {
    const res = await api.post('/experience', data);
    return res.data;
  },
  updateExperience: async (id, data) => {
    const res = await api.put(`/experience/${id}`, data);
    return res.data;
  },
  deleteExperience: async (id) => {
    const res = await api.delete(`/experience/${id}`);
    return res.data;
  },

  // Education
  getEducation: async () => {
    const res = await api.get('/education');
    return res.data;
  },
  createEducation: async (data) => {
    const res = await api.post('/education', data);
    return res.data;
  },
  updateEducation: async (id, data) => {
    const res = await api.put(`/education/${id}`, data);
    return res.data;
  },
  deleteEducation: async (id) => {
    const res = await api.delete(`/education/${id}`);
    return res.data;
  },

  // Contact
  submitContact: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
  getMessages: async () => {
    const res = await api.get('/contact');
    return res.data;
  },
  updateMessageStatus: async (id, status) => {
    const res = await api.put(`/contact/${id}`, { status });
    return res.data;
  },
  deleteMessage: async (id) => {
    const res = await api.delete(`/contact/${id}`);
    return res.data;
  },
};

export default portfolioService;
