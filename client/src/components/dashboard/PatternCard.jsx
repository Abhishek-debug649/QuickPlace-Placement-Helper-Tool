import { useNavigate } from 'react-router-dom';

const PATTERN_META = {
  'sliding-window': { icon: '🪟', color: '#3b82f6' },
  'two-pointers': { icon: '👉', color: '#8b5cf6' },
  'binary-search': { icon: '🔍', color: '#f59e0b' },
  'dynamic-programming': { icon: '🧩', color: '#ef4444' },
  'graphs': { icon: '🕸️', color: '#10b981' },
  'backtracking': { icon: '🔙', color: '#f97316' },
  'linked-list': { icon: '🔗', color: '#06b6d4' },
  'trees': { icon: '🌳', color: '#22c55e' },
  'stacks-queues': { icon: '📚', color: '#a855f7' },
  'greedy': { icon: '💰', color: '#eab308' },
};

function getProgressColor(pct) {
  if (pct >= 80) return '#22c55e';
  if (pct >= 40) return '#f59e0b';
  return '#ef4444';
}

export default function PatternCard({ patternTag, solved, total, percentage }) {
  const navigate = useNavigate();
  const meta = PATTERN_META[patternTag] || { icon: '📋', color: '#9ca3af' };
  const displayName = patternTag
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const barColor = getProgressColor(percentage);

  return (
    <div
      className="pattern-card"
      onClick={() => navigate(`/dashboard/compiler?pattern=${patternTag}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="pattern-card-header">
        <span className="pattern-card-name">
          {meta.icon} {displayName}
        </span>
        <span className="pattern-card-count" style={{ color: meta.color }}>
          {solved}/{total}
        </span>
      </div>
      <div className="pattern-card-bar-track">
        <div
          className="pattern-card-bar-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${barColor}, ${meta.color})`,
          }}
        />
      </div>
      <p className="pattern-card-pct">{percentage}% complete</p>
    </div>
  );
}
