import express from 'express';
import {
  getRepositories,
  getFeaturedRepositories,
  getProfileStats,
  refreshGitHubCache,
  getRepoConfigs,
  updateRepoConfig,
} from '../controllers/githubController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/repos', getRepositories);
router.get('/featured', getFeaturedRepositories);
router.get('/profile', getProfileStats);
router.post('/refresh', protect, refreshGitHubCache);
router.get('/configs', protect, getRepoConfigs);
router.post('/featured', protect, updateRepoConfig);
router.put('/featured/:id', protect, updateRepoConfig);

export default router;
