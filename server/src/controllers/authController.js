import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/db.js';
import { createClient } from '@supabase/supabase-js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // --- PASSWORD HASHING LOGIC ---
    // 1. Generate a salt (random data added to the password to make it unguessable)
    const saltRounds = 10;

    // 2. Hash the password combined with the salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save the HASHED password to the database, NEVER the plain text.
    // NOTE: This assumes a custom 'users' table in your database.
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password_hash: hashedPassword, // Store securely
          provider: 'local'
        }
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(409).json({ error: 'Email already exists' });
      }
      throw error;
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, name: user.name }
    });

  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 1. Find the user by email in the database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // --- PASSWORD VERIFICATION LOGIC ---
    // 2. Compare the plain password with the stored hash. 
    // bcrypt handles extracting the salt from the hash and comparing them securely.
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // 3. Generate JWT token for the session
    console.log('[LOGIN] User found:', { id: user.id, email: user.email, role: user.role });
    console.log('[LOGIN] JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'MISSING');

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    console.log('[LOGIN] Generated token (first 30 chars):', token?.substring(0, 30));

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });

  } catch (err) {
    next(err);
  }
};

// Called after Passport authenticates with Google
export const googleCallback = async (req, res) => {
  try {
    const { google_id, email, name, avatar } = req.user;

    // Upsert user in Supabase (insert or update if exists)
    const { data: user, error } = await supabase
      .from('users')
      .upsert(
        { google_id, email, name, avatar },
        { onConflict: 'google_id' }
      )
      .select()
      .single();

    if (error) throw error;

    // Sign JWT with user info
    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    // Redirect to frontend with JWT in query param
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/auth/callback?token=${token}`);
  } catch (err) {
    console.error('Auth error:', err);
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${clientUrl}/login?error=auth_failed`);
  }
};

// Exchange Supabase OAuth token for app JWT
export const googleLogin = async (req, res, next) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ error: 'Supabase access token is required' });
    }

    // Create a temporary Supabase client authenticated with the user's token
    // to verify the token and get user info
    const supabaseUser = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY,
      {
        global: {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      }
    );

    const { data: { user: authUser }, error: authError } = await supabaseUser.auth.getUser();

    if (authError || !authUser) {
      console.error('[GOOGLE LOGIN] Supabase token verification failed:', authError?.message);
      return res.status(401).json({ error: 'Invalid Supabase token' });
    }

    console.log('[GOOGLE LOGIN] Supabase user verified:', authUser.email);

    // Extract Google user info from Supabase user metadata
    const email = authUser.email;
    const name = authUser.user_metadata?.full_name || authUser.user_metadata?.name || email;
    const avatar = authUser.user_metadata?.avatar_url || null;
    const google_id = authUser.user_metadata?.provider_id || authUser.id;

    // Upsert user in our users table
    if (!supabase) {
      console.error('[GOOGLE LOGIN] Supabase client is null — check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in server/.env');
      return res.status(500).json({ error: 'Database not configured on server' });
    }

    const { data: user, error: dbError } = await supabase
      .from('users')
      .upsert(
        {
          google_id,
          email,
          name,
          avatar,
          provider: 'google',
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (dbError) {
      console.error('[GOOGLE LOGIN] DB upsert error:', dbError.message, dbError.code);
      // Handle missing table — either PostgreSQL 42P01 or PostgREST PGRST205
      const tableNotFound = dbError.code === '42P01' || dbError.code === 'PGRST205' || dbError.message?.includes('does not exist') || dbError.message?.includes('schema cache');
      if (tableNotFound) {
        console.warn('[GOOGLE LOGIN] users table not found — issuing JWT from Supabase data directly. Run setup.sql in Supabase to fix permanently.');
        const fallbackToken = jwt.sign(
          { user_id: authUser.id, email, role: 'student' },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRY || '7d' }
        );
        return res.status(200).json({
          message: 'Google login successful (DB tables not yet created)',
          token: fallbackToken,
          user: { id: authUser.id, email, name, avatar },
        });
      }
      throw dbError;
    }

    // Sign app JWT
    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || '7d' }
    );

    console.log('[GOOGLE LOGIN] App JWT issued for:', user.email);

    res.status(200).json({
      message: 'Google login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar },
    });
  } catch (err) {
    next(err);
  }
};

// Get current user from JWT
export const getMe = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, google_id, email, name, avatar, role, created_at')
      .eq('id', req.user.user_id)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('GetMe error:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
