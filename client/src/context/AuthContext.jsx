import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('qp_token'));
  const [loading, setLoading] = useState(true);

  // Fetch user whenever token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    // Set loading true IMMEDIATELY so ProtectedRoute waits
    // before the async fetchUser completes
    setLoading(true);
    fetchUser(token);
  }, [token]);

  const fetchUser = async (currentToken) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      if (!res.ok) throw new Error('Failed to fetch user');

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error('Auth fetch error:', err);
      // Token is invalid — clear it
      localStorage.removeItem('qp_token');
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) {
        console.error('Google OAuth error:', error.message);
        // Will be caught by LoginPage's urlError display
        throw error;
      }
    } catch (err) {
      console.error('Login error:', err.message);
      // Redirect with error param so LoginPage shows it
      window.location.href = `/login?error=${encodeURIComponent(err.message)}`;
    }
  };

  const saveToken = (newToken) => {
    localStorage.setItem('qp_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('qp_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
