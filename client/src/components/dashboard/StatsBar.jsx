import { FiCheckCircle, FiZap, FiTarget, FiAward } from 'react-icons/fi';

export default function StatsBar({ stats }) {
  const items = [
    {
      label: 'Total Solved',
      value: stats.totalSolved || 0,
      icon: <FiCheckCircle />,
      colorClass: 'purple',
    },
    {
      label: 'Current Streak',
      value: `${stats.currentStreak || 0} days`,
      icon: <FiZap />,
      colorClass: 'orange',
    },
    {
      label: 'Today',
      value: stats.questionsToday || 0,
      icon: <FiTarget />,
      colorClass: 'blue',
    },
    {
      label: 'Longest Streak',
      value: `${stats.longestStreak || 0} days`,
      icon: <FiAward />,
      colorClass: 'green',
    },
  ];

  return (
    <div className="welcome-stats">
      {items.map((item) => (
        <div key={item.label} className="welcome-stat">
          <div className={`welcome-stat-icon ${item.colorClass}`}>
            {item.icon}
          </div>
          <div>
            <p className="welcome-stat-value">{item.value}</p>
            <p className="welcome-stat-label">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
