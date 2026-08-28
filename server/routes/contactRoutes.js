import express from 'express';
import {
  submitContactMessage,
  getContactMessages,
  updateMessageStatus,
  deleteMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', contactRateLimiter, submitContactMessage);
router.get('/', protect, getContactMessages);
router.route('/:id').put(protect, updateMessageStatus).delete(protect, deleteMessage);

export default router;
