import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { executeCode } from '../controllers/compile.controller.js';

const router = express.Router();

// POST /api/compile — Execute code via Judge0 (requires auth)
router.post('/', requireAuth, executeCode);

export default router;
