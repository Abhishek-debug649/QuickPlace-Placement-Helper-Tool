import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  getPatternProgress,
  getCompanyProgress,
  getHeatmapData,
  getStats,
  markSolved,
  unmarkQuestion,
} from '../controllers/progress.controller.js';

const router = express.Router();

// All progress routes require authentication
router.use(requireAuth);

router.get('/patterns', getPatternProgress);
router.get('/companies', getCompanyProgress);
router.get('/heatmap', getHeatmapData);
router.get('/stats', getStats);
router.post('/:questionId', markSolved);
router.delete('/:questionId', unmarkQuestion);

export default router;
