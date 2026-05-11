import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FiCheckCircle,
  FiZap,
  FiTrendingUp,
  FiAward,
} from 'react-icons/fi';

/* ─── Mock Data (replace with real API calls later) ─── */
const MOCK_STATS = {
  totalSolved: 47,
  streak: 12,
  rank: 42,
  accuracy: 78,
};

const PATTERN_DATA = [
  { name: 'Sliding Window', solved: 8, total: 15, color: '#a855f7' },
  { name: 'Dynamic Programming', solved: 4, total: 20, color: '#6366f1' },
  { name: 'Graphs', solved: 2, total: 12, color: '#06b6d4' },
  { name: 'Two Pointers', solved: 6, total: 18, color: '#f43f5e' },
  { name: 'Backtracking', solved: 0, total: 10, color: '#f59e0b' },
  { name: 'Binary Search', solved: 9, total: 14, color: '#22c55e' },
];

/* ─── Heatmap helpers ─── */
function generateHeatmapData() {
  const today = new Date();
  const data = [];
  // ~26 weeks back (≈6 months)
  for (let i = 182; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // Random 0-5 contributions for demo
    const count = Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 5) + 1;
    data.push({ date: d, count });
  }
  return data;
}

function getHeatColor(count) {
  if (count === 0) return 'rgba(255,255,255,0.04)';
  if (count === 1) return 'rgba(168,85,247,0.25)';
  if (count === 2) return 'rgba(168,85,247,0.45)';
  if (count === 3) return 'rgba(168,85,247,0.6)';
  if (count === 4) return 'rgba(168,85,247,0.8)';
  return '#a855f7';
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Mon', '', 'Wed', '', 'Fri', '', ''];

/* ─── Activity Heatmap Component ─── */
function ActivityHeatmap() {
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  // Group by weeks (columns)
  const weeks = useMemo(() => {
    const w = [];
    let currentWeek = [];
    // Pad start: the first date may not be a Sunday
    const firstDay = heatmapData[0].date.getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }
    for (const entry of heatmapData) {
      currentWeek.push(entry);
      if (currentWeek.length === 7) {
        w.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      w.push(currentWeek);
    }
    return w;
  }, [heatmapData]);

  // Month labels
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const firstDate = week.find((d) => d !== null);
      if (firstDate) {
        const m = firstDate.date.getMonth();
        if (m !== lastMonth) {
          labels.push({ month: MONTHS[m], col: i });
          lastMonth = m;
        }
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
          {[0, 1, 2, 3, 4, 5].map((v) => (
            <span
              key={v}
              className="heatmap-legend-box"
              style={{ background: getHeatColor(v) }}
            />
          ))}
          <span className="heatmap-legend-label">More</span>
        </div>
      </div>

      <div className="heatmap-scroll">
        <div className="heatmap-grid-container">
          {/* Day labels */}
          <div className="heatmap-day-labels">
            {DAYS.map((d, i) => (
              <span key={i} className="heatmap-day-label">{d}</span>
            ))}
          </div>

          <div className="heatmap-columns-wrapper">
            {/* Month labels */}
            <div className="heatmap-month-row">
              {monthLabels.map((ml, i) => (
                <span
                  key={i}
                  className="heatmap-month-label"
                  style={{ gridColumn: ml.col + 1 }}
                >
                  {ml.month}
                </span>
              ))}
            </div>

            {/* Grid */}
            <div className="heatmap-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="heatmap-col">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="heatmap-cell"
                      style={{ background: day ? getHeatColor(day.count) : 'transparent' }}
                      title={
                        day
                          ? `${day.date.toDateString()}: ${day.count} problem${day.count !== 1 ? 's' : ''}`
                          : ''
                      }
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

/* ─── Pattern Progress Card ─── */
function PatternCard({ name, solved, total, color }) {
  const pct = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div className="pattern-card">
      <div className="pattern-card-header">
        <span className="pattern-card-name">{name}</span>
        <span className="pattern-card-count" style={{ color }}>
          {solved}/{total}
        </span>
      </div>
      <div className="pattern-card-bar-track">
        <div
          className="pattern-card-bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="pattern-card-pct">{Math.round(pct)}% complete</p>
    </div>
  );
}

/* ─── Main Dashboard Overview ─── */
export default function DashboardOverview() {
  const { user } = useAuth();

  return (
    <div className="dashboard-overview">
      {/* ── Welcome Banner + Stats ── */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <h1>
            Welcome back, <span className="welcome-name">{user?.name || 'Student'}</span>
          </h1>
          <p>Keep grinding — your next placement drive is closer than you think.</p>
        </div>

        <div className="welcome-stats">
          <div className="welcome-stat">
            <div className="welcome-stat-icon purple">
              <FiCheckCircle />
            </div>
            <div>
              <p className="welcome-stat-value">{MOCK_STATS.totalSolved}</p>
              <p className="welcome-stat-label">Total Solved</p>
            </div>
          </div>
          <div className="welcome-stat">
            <div className="welcome-stat-icon orange">
              <FiZap />
            </div>
            <div>
              <p className="welcome-stat-value">{MOCK_STATS.streak} days</p>
              <p className="welcome-stat-label">Streak</p>
            </div>
          </div>
          <div className="welcome-stat">
            <div className="welcome-stat-icon blue">
              <FiTrendingUp />
            </div>
            <div>
              <p className="welcome-stat-value">{MOCK_STATS.accuracy}%</p>
              <p className="welcome-stat-label">Accuracy</p>
            </div>
          </div>
          <div className="welcome-stat">
            <div className="welcome-stat-icon green">
              <FiAward />
            </div>
            <div>
              <p className="welcome-stat-value">#{MOCK_STATS.rank}</p>
              <p className="welcome-stat-label">Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Activity Heatmap ── */}
      <ActivityHeatmap />

      {/* ── Pattern Progress Section ── */}
      <div className="patterns-section">
        <h2>Pattern Progress</h2>
        <div className="patterns-grid">
          {PATTERN_DATA.map((p) => (
            <PatternCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
