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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/auth/callback',
      },
    });
    if (error) console.error('Error logging in:', error.message);
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
