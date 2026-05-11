import express from 'express';
import { register, login, googleLogin, getMe } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Route for custom email/password registration
router.post('/register', register);

// Route for custom email/password login
router.post('/login', login);

// Route to exchange Supabase Google OAuth token for app JWT
router.post('/google', googleLogin);

// 3. Get currently logged-in user profile
router.get('/me', requireAuth, getMe);

export default router;
