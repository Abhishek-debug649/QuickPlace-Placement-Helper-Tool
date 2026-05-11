import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import PasswordStrengthBar from '../components/PasswordStrengthBar';
import './AuthPages.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setSuccess('Account created successfully! You can now login.');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
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
          <p className="auth-subtitle">Create your account</p>
        </div>

        {/* Google button */}
        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleLogin}
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span>or register with email</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name */}
          <div className="auth-field">
            <FiUser className="auth-field-icon" />
            <input
              id="register-name"
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="auth-field">
            <FiMail className="auth-field-icon" />
            <input
              id="register-email"
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
              id="register-password"
              type={showPass ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
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

          {/* Error / Success */}
          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          {/* Submit */}
          <button
            id="register-submit"
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? <span className="auth-spinner" /> : 'Create Account'}
          </button>
        </form>

        {/* Footer link */}
        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
