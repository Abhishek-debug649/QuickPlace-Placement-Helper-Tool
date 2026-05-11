import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function useDashboardData() {
  const [patterns, setPatterns] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [stats, setStats] = useState({
    totalSolved: 0,
    currentStreak: 0,
    questionsToday: 0,
    longestStreak: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('qp_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const fetchAll = async () => {
      try {
        setIsLoading(true);
        const [patRes, compRes, heatRes, statRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/progress/patterns`, { headers }),
          fetch(`${API_URL}/api/progress/companies`, { headers }),
          fetch(`${API_URL}/api/progress/heatmap`, { headers }),
          fetch(`${API_URL}/api/progress/stats`, { headers }),
        ]);

        if (patRes.status === 'fulfilled' && patRes.value.ok) {
          const data = await patRes.value.json();
          setPatterns(data.patterns || []);
        }

        if (compRes.status === 'fulfilled' && compRes.value.ok) {
          const data = await compRes.value.json();
          setCompanies(data.companies || []);
        }

        if (heatRes.status === 'fulfilled' && heatRes.value.ok) {
          const data = await heatRes.value.json();
          setHeatmap(data.heatmap || []);
        }

        if (statRes.status === 'fulfilled' && statRes.value.ok) {
          const data = await statRes.value.json();
          setStats(data.stats || {});
        }
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { patterns, companies, heatmap, stats, isLoading, error };
}
