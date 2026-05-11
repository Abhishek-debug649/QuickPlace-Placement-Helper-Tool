import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getAllQuestions, getQuestionById } from '../controllers/questions.controller.js';

const router = express.Router();

// All question routes require authentication
router.use(requireAuth);

router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);

export default router;
