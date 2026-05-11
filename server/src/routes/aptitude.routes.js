import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getCategories,
  getQuiz,
  submitQuiz,
} from '../controllers/aptitude.controller.js';

const router = express.Router();

// All aptitude routes require authentication
router.use(requireAuth);

router.get('/categories', getCategories);
router.get('/quiz/:category', getQuiz);
router.post('/submit', submitQuiz);

export default router;
