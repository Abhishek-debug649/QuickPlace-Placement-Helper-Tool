import { useAuth } from '../context/AuthContext';
import { useDashboardData } from '../hooks/useDashboardData';
import { useMemo } from 'react';
import { FiCheckCircle, FiZap, FiAward, FiCalendar, FiLogOut, FiUser, FiMail, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './ProfilePage.css';

const PATTERN_COLORS = {
  'sliding-window': '#3b82f6', 'two-pointers': '#8b5cf6', 'binary-search': '#f59e0b',
  'dynamic-programming': '#ef4444', 'graphs': '#10b981', 'backtracking': '#f97316',
  'linked-list': '#06b6d4', 'trees': '#22c55e', 'stacks-queues': '#a855f7',
  'greedy': '#eab308', 'arrays': '#6366f1', 'strings': '#ec4899',
};

const ALL_BADGES = [
  { id: 'netflix',    label: 'Netflix Ready',     icon: '🎬', company_tag: 'netflix',    threshold: 80 },
  { id: 'amazon',     label: 'Amazon Ready',      icon: '📦', company_tag: 'amazon',     threshold: 80 },
  { id: 'google',     label: 'Google Ready',      icon: '🔍', company_tag: 'google',     threshold: 80 },
  { id: 'microsoft',  label: 'Microsoft Ready',   icon: '🪟', company_tag: 'microsoft',  threshold: 80 },
  { id: 'meta',       label: 'Meta Ready',        icon: '👥', company_tag: 'meta',       threshold: 80 },
  { id: 'dp-master',  label: 'DP Master',         icon: '🧠', pattern_tag: 'dynamic-programming', threshold: 80 },
  { id: 'graph-explorer', label: 'Graph Explorer',icon: '🕸️', pattern_tag: 'graphs',    threshold: 80 },
  { id: 'sliding-window-pro', label: 'SW Pro',   icon: '🪟', pattern_tag: 'sliding-window', threshold: 80 },
  { id: 'streaker',   label: '7-day Streak',      icon: '🔥', streak_min: 7 },
  { id: 'century',    label: 'Century Club',      icon: '💯', solved_min: 100 },
  { id: 'solver50',   label: 'Half-century',      icon: '🥇', solved_min: 50 },
  { id: 'first',      label: 'First Steps',       icon: '👶', solved_min: 1 },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { patterns, companies, stats, isLoading } = useDashboardData();

  const displayStats = {
    totalSolved:   stats?.totalSolved   ?? 0,
    currentStreak: stats?.currentStreak ?? 0,
    longestStreak: stats?.longestStreak ?? 0,
    questionsToday: stats?.questionsToday ?? 0,
  };

  /* Compute earned badges */
  const earnedBadges = useMemo(() => {
    const earned = new Set();

    // Company badges
    for (const co of companies || []) {
      if (co.total > 0 && (co.solved / co.total) * 100 >= 80) {
        earned.add(co.company_tag);
      }
    }
    // Pattern badges
    for (const p of patterns || []) {
      if (p.total > 0 && (p.solved / p.total) * 100 >= 80) {
        earned.add(p.pattern_tag);
      }
    }
    // Stat badges
    if (displayStats.currentStreak >= 7)    earned.add('streaker');
    if (displayStats.totalSolved >= 100)    earned.add('century');
    if (displayStats.totalSolved >= 50)     earned.add('solver50');
    if (displayStats.totalSolved >= 1)      earned.add('first');

    return earned;
  }, [companies, patterns, displayStats]);

  const handleLogout = () => {
    toast('Signed out. See you soon! 👋');
    setTimeout(() => logout(), 800);
  };

  const overallPct = useMemo(() => {
    if (!patterns || patterns.length === 0) return 0;
    const totalQ = patterns.reduce((s, p) => s + p.total, 0);
    const totalS = patterns.reduce((s, p) => s + p.solved, 0);
    return totalQ > 0 ? Math.round((totalS / totalQ) * 100) : 0;
  }, [patterns]);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : (user?.email?.[0] || 'U').toUpperCase();

  return (
    <div className="profile-page">
      {/* Profile Card */}
      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          {user?.avatar
            ? <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
            : <div className="profile-avatar-initials">{initials}</div>
          }
          <div className="profile-avatar-ring" />
        </div>

        <div className="profile-identity">
          <h1 className="profile-name">{user?.name || 'Student'}</h1>
          <div className="profile-meta">
            <span className="profile-meta-item"><FiMail size={13} /> {user?.email || '—'}</span>
            <span className="profile-meta-item"><FiUser size={13} /> {user?.role || 'student'}</span>
          </div>
          <div className="profile-overall">
            <div className="profile-overall-ring">
              <svg viewBox="0 0 44 44" width="44" height="44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                <circle cx="22" cy="22" r="18" fill="none"
                  stroke="url(#pgGrad)" strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - overallPct / 100)}`}
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s ease' }}
                />
                <defs>
                  <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="profile-overall-pct">{overallPct}%</span>
            </div>
            <span className="profile-overall-label">Overall Progress</span>
          </div>
        </div>

        <button className="profile-logout-btn" onClick={handleLogout}>
          <FiLogOut size={16} /> Sign Out
        </button>
      </div>

      {/* Stats Row */}
      <div className="profile-stats-row">
        {[
          { icon: <FiCheckCircle />, value: displayStats.totalSolved, label: 'Total Solved', color: '#a855f7' },
          { icon: <FiZap />,         value: `${displayStats.currentStreak}d`, label: 'Current Streak', color: '#f59e0b' },
          { icon: <FiAward />,       value: `${displayStats.longestStreak}d`, label: 'Best Streak',    color: '#10b981' },
          { icon: <FiCalendar />,    value: displayStats.questionsToday, label: 'Today',              color: '#6366f1' },
          { icon: <FiTrendingUp />,  value: `${earnedBadges.size}`,     label: 'Badges Earned',       color: '#ec4899' },
        ].map((s, i) => (
          <div key={i} className="profile-stat-card" style={{ '--s-color': s.color }}>
            <div className="profile-stat-icon" style={{ color: s.color, background: `${s.color}18` }}>{s.icon}</div>
            <div className="profile-stat-value">{s.value}</div>
            <div className="profile-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="profile-section">
        <h2 className="profile-section-title">🏆 Badges</h2>
        <div className="badges-grid">
          {ALL_BADGES.map(badge => {
            const earned = earnedBadges.has(badge.id)
              || earnedBadges.has(badge.company_tag)
              || earnedBadges.has(badge.pattern_tag);
            return (
              <div key={badge.id} className={`badge-card ${earned ? 'earned' : 'locked'}`}>
                <div className="badge-icon">{earned ? badge.icon : '🔒'}</div>
                <div className="badge-label">{badge.label}</div>
                {!earned && <div className="badge-hint">
                  {badge.threshold ? `${badge.threshold}% completion` : badge.streak_min ? `${badge.streak_min}-day streak` : `Solve ${badge.solved_min}+ questions`}
                </div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Breakdown */}
      {!isLoading && patterns && patterns.length > 0 && (
        <div className="profile-section">
          <h2 className="profile-section-title">🧩 Pattern Breakdown</h2>
          <div className="profile-patterns-grid">
            {[...patterns].sort((a, b) => b.solved - a.solved).map(p => {
              const color = PATTERN_COLORS[p.pattern_tag] || '#8b5cf6';
              const pct = p.total > 0 ? Math.round((p.solved / p.total) * 100) : 0;
              const name = p.pattern_tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              return (
                <div key={p.pattern_tag} className="profile-pattern-row">
                  <span className="ppr-name">{name}</span>
                  <div className="ppr-track">
                    <div className="ppr-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                  <span className="ppr-count" style={{ color }}>{p.solved}/{p.total}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="profile-loading">Loading your stats…</div>
      )}
    </div>
  );
}
