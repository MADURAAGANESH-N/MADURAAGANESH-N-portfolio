import api from './api';

export const githubService = {
  // Public repository endpoints
  getRepos: async (params = {}) => {
    const response = await api.get('/github/repos', { params });
    return response.data;
  },

  getFeaturedRepos: async () => {
    const response = await api.get('/github/featured');
    return response.data;
  },

  getProfileStats: async (params = {}) => {
    const response = await api.get('/github/profile', { params });
    return response.data;
  },

  // Admin repository endpoints
  refreshCache: async () => {
    const response = await api.post('/github/refresh');
    return response.data;
  },

  getRepoConfigs: async () => {
    const response = await api.get('/github/configs');
    return response.data;
  },

  updateRepoConfig: async (data) => {
    const response = await api.post('/github/featured', data);
    return response.data;
  },
};

export default githubService;
