import express from 'express';
import { loginAdmin, logoutAdmin, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authRateLimiter, loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protect, getMe);

export default router;
