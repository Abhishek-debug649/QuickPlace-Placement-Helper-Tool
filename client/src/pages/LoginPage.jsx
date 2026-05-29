import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LoginPage() {
  const { login, saveToken } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlError = searchParams.get('error');

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Clear URL errors
    if (searchParams.has('error')) {
      navigate('/login', { replace: true });
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Save JWT token and redirect to dashboard
      saveToken(data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Ambient background blobs */}
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-brand">QuickPlace</h1>
          <p className="auth-subtitle">Welcome back</p>
        </div>

        {/* Google button */}
        <button
          type="button"
          className="auth-google-btn"
          onClick={() => {
            if (searchParams.has('error')) {
              navigate('/login', { replace: true });
            }
            login();
          }}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email */}
          <div className="auth-field">
            <FiMail className="auth-field-icon" />
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="auth-field">
            <FiLock className="auth-field-icon" />
            <input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="auth-eye-btn"
              onClick={() => setShowPass(!showPass)}
              aria-label="Toggle password visibility"
            >
              {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          {/* ★ Password Strength Bar ★ */}
          <PasswordStrengthBar password={form.password} />

          {/* Error */}
          {error && <p className="auth-error">{error}</p>}
          {urlError && (
            <div className="auth-error-card">
              <p className="auth-error-title">⚠️ Sign-in failed</p>
              <p className="auth-error-desc">
                {urlError.includes('provider') || urlError.includes('validation')
                  ? 'Google sign-in is not yet enabled. Go to Supabase → Authentication → Providers → Google and enable it.'
                  : urlError === 'token_exchange_failed'
                  ? 'Server could not verify your Google account. Make sure the backend is running.'
                  : urlError === 'no_token'
                  ? 'Authentication timed out. Please try again.'
                  : urlError === 'auth_failed'
                  ? 'Authentication failed. Check if your Supabase keys are correct.'
                  : `Error: ${urlError}`}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : 'Sign In'}
          </button>
        </form>

        {/* Footer link */}
        <p className="auth-footer-text">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
