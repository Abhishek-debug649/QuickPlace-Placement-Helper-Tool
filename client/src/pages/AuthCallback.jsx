import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { saveToken } = useAuth();
  const [status, setStatus] = useState('Signing you in...');

  // Exchange Supabase token for app JWT via backend
  const exchangeTokenForAppJWT = async (supabaseAccessToken) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: supabaseAccessToken }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error('Token exchange failed:', data.error);
        navigate('/login?error=token_exchange_failed', { replace: true });
        return;
      }

      // Save the app JWT (signed with our JWT_SECRET)
      saveToken(data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Token exchange error:', err);
      navigate('/login?error=auth_failed', { replace: true });
    }
  };

  useEffect(() => {
    const handleCallback = async () => {
      // Case 1: Token from backend Passport flow (via query param)
      const backendToken = searchParams.get('token');
      if (backendToken) {
        saveToken(backendToken);
        navigate('/dashboard', { replace: true });
        return;
      }

      // Case 2: Supabase OAuth flow (token in URL hash fragment)
      // Supabase automatically picks up the hash and sets the session
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Supabase auth error:', error.message);
          navigate('/login?error=auth_failed', { replace: true });
          return;
        }

        if (session?.access_token) {
          // Exchange Supabase token for our app JWT
          await exchangeTokenForAppJWT(session.access_token);
        } else {
          // No session found — wait for Supabase to process the hash
          setStatus('Processing authentication...');
          
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              if (event === 'SIGNED_IN' && session) {
                subscription.unsubscribe();
                await exchangeTokenForAppJWT(session.access_token);
              }
            }
          );

          // Timeout after 5 seconds
          setTimeout(() => {
            subscription.unsubscribe();
            navigate('/login?error=no_token', { replace: true });
          }, 5000);
        }
      } catch (err) {
        console.error('Auth callback error:', err);
        navigate('/login?error=auth_failed', { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, saveToken]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>
      <p>{status}</p>
    </div>
  );
}
