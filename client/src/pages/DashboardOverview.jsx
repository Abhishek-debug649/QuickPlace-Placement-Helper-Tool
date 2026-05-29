import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDashboardData } from '../hooks/useDashboardData';
import { Link } from 'react-router-dom';
import {
  FiCheckCircle, FiZap, FiTrendingUp, FiAward,
  FiArrowRight, FiLoader,
} from 'react-icons/fi';

/* ── Pattern accent colours ── */
const PATTERN_COLORS = {
  'sliding-window': '#3b82f6',
  'two-pointers': '#8b5cf6',
  'binary-search': '#f59e0b',
  'dynamic-programming': '#ef4444',
  'graphs': '#10b981',
  'backtracking': '#f97316',
  'linked-list': '#06b6d4',
  'trees': '#22c55e',
  'stacks-queues': '#a855f7',
  'greedy': '#eab308',
  'arrays': '#6366f1',
  'strings': '#ec4899',
  'recursion': '#14b8a6',
  'heap-pq': '#8b5cf6',
  'bit-manipulation': '#64748b',
};

/* ── Heatmap helpers ── */
function buildHeatmapGrid(apiData) {
  const dateMap = {};
  for (const item of apiData) dateMap[item.date] = item.count;

  const today = new Date();
  const raw = [];
  for (let i = 182; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    raw.push({ date: d, count: dateMap[key] || 0 });
  }
  return raw;
}

function getHeatColor(count) {
  if (count === 0) return 'rgba(255,255,255,0.04)';
  if (count === 1) return 'rgba(229,9,20,0.2)';
  if (count === 2) return 'rgba(229,9,20,0.4)';
  if (count === 3) return 'rgba(229,9,20,0.6)';
  if (count === 4) return 'rgba(229,9,20,0.8)';
  return '#e50914';
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

/* ── Activity Heatmap ── */
function ActivityHeatmap({ data }) {
  const heatmapData = useMemo(() => buildHeatmapGrid(data), [data]);

  const weeks = useMemo(() => {
    const w = [];
    let cur = [];
    const firstDay = heatmapData[0].date.getDay();
    for (let i = 0; i < firstDay; i++) cur.push(null);
    for (const entry of heatmapData) {
      cur.push(entry);
      if (cur.length === 7) { w.push(cur); cur = []; }
    }
    if (cur.length) w.push(cur);
    return w;
  }, [heatmapData]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let last = -1;
    weeks.forEach((week, i) => {
      const first = week.find(d => d !== null);
      if (first) {
        const m = first.date.getMonth();
        if (m !== last) { labels.push({ month: MONTHS[m], col: i }); last = m; }
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className="heatmap-wrapper">
      <div className="heatmap-header">
        <h2>Activity</h2>
        <div className="heatmap-legend">
          <span className="heatmap-legend-label">Less</span>
          {[0,1,2,3,4,5].map(v => (
            <span key={v} className="heatmap-legend-box" style={{ background: getHeatColor(v) }} />
          ))}
          <span className="heatmap-legend-label">More</span>
        </div>
      </div>
      <div className="heatmap-scroll">
        <div className="heatmap-grid-container">
          <div className="heatmap-day-labels">
            {DAYS.map((d, i) => <span key={i} className="heatmap-day-label">{d}</span>)}
          </div>
          <div className="heatmap-columns-wrapper">
            <div className="heatmap-month-row">
              {monthLabels.map((ml, i) => (
                <span key={i} className="heatmap-month-label" style={{ gridColumn: ml.col + 1 }}>{ml.month}</span>
              ))}
            </div>
            <div className="heatmap-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="heatmap-col">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="heatmap-cell"
                      style={{ background: day ? getHeatColor(day.count) : 'transparent' }}
                      title={day ? `${day.date.toDateString()}: ${day.count} problem${day.count !== 1 ? 's' : ''}` : ''}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Pattern Progress Card ── */
function PatternCard({ pattern_tag, solved, total }) {
  const color = PATTERN_COLORS[pattern_tag] || '#8b5cf6';
  const pct = total > 0 ? (solved / total) * 100 : 0;
  const name = pattern_tag.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="pattern-card">
      <div className="pattern-card-header">
        <span className="pattern-card-name">{name}</span>
        <span className="pattern-card-count" style={{ color }}>{solved}/{total}</span>
      </div>
      <div className="pattern-card-bar-track">
        <div className="pattern-card-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <p className="pattern-card-pct">{Math.round(pct)}% complete</p>
    </div>
  );
}

/* ── Stat Card ── */
function StatCard({ icon, value, label, colorClass }) {
  return (
    <div className="welcome-stat">
      <div className={`welcome-stat-icon ${colorClass}`}>{icon}</div>
      <div>
        <p className="welcome-stat-value">{value}</p>
        <p className="welcome-stat-label">{label}</p>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function DashboardOverview() {
  const { user } = useAuth();
  const { patterns, heatmap, stats, isLoading } = useDashboardData();

  const displayStats = {
    totalSolved: stats?.totalSolved ?? 0,
    streak: stats?.currentStreak ?? 0,
    longestStreak: stats?.longestStreak ?? 0,
    questionsToday: stats?.questionsToday ?? 0,
  };

  const topPatterns = useMemo(() => {
    if (!patterns || patterns.length === 0) return [];
    return [...patterns].sort((a, b) => b.solved - a.solved).slice(0, 6);
  }, [patterns]);

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="dashboard-overview">

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>
            {greet()}, <span className="welcome-name">{user?.name || 'Student'}</span> 👋
          </h1>
          <p>Keep grinding — your next placement drive is closer than you think.</p>
        </div>
        <div className="welcome-stats">
          <StatCard icon={<FiCheckCircle />} value={displayStats.totalSolved} label="Total Solved" colorClass="purple" />
          <StatCard icon={<FiZap />}         value={`${displayStats.streak}d`}  label="Current Streak" colorClass="orange" />
          <StatCard icon={<FiTrendingUp />}  value={displayStats.questionsToday} label="Today" colorClass="blue" />
          <StatCard icon={<FiAward />}       value={`${displayStats.longestStreak}d`} label="Best Streak" colorClass="green" />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="dash-loading">
          <FiLoader className="dash-spin" size={24} />
          <span>Loading your progress…</span>
        </div>
      )}

      {/* Heatmap */}
      {!isLoading && <ActivityHeatmap data={heatmap} />}

      {/* Pattern Progress */}
      {!isLoading && (
        <div className="patterns-section">
          <div className="patterns-section-header">
            <h2>Pattern Progress</h2>
            <Link to="/dashboard/patterns" className="patterns-see-all">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          {topPatterns.length > 0 ? (
            <div className="patterns-grid">
              {topPatterns.map(p => <PatternCard key={p.pattern_tag} {...p} />)}
            </div>
          ) : (
            <div className="patterns-empty-hint">
              <p>Start solving questions in the <Link to="/dashboard/compiler">Compiler</Link> to see your pattern progress here.</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Links */}
      <div className="quick-links">
        <h2>Quick Actions</h2>
        <div className="quick-links-grid">
          <Link to="/dashboard/compiler" className="quick-link-card compiler-card">
            <span className="quick-link-icon">💻</span>
            <span className="quick-link-label">Practice Coding</span>
          </Link>
          <Link to="/dashboard/patterns" className="quick-link-card pattern-card-link">
            <span className="quick-link-icon">🧩</span>
            <span className="quick-link-label">DSA Patterns</span>
          </Link>
          <Link to="/dashboard/notes" className="quick-link-card notes-card">
            <span className="quick-link-icon">📝</span>
            <span className="quick-link-label">Study Notes</span>
          </Link>
          <Link to="/dashboard/aptitude" className="quick-link-card aptitude-card">
            <span className="quick-link-icon">🧠</span>
            <span className="quick-link-label">Aptitude Quiz</span>
          </Link>
          <Link to="/dashboard/companies" className="quick-link-card companies-card">
            <span className="quick-link-icon">🏢</span>
            <span className="quick-link-label">Companies</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
