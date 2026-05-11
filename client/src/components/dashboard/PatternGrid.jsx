import PatternCard from './PatternCard';

export default function PatternGrid({ patterns = [] }) {
  return (
    <div className="patterns-section">
      <h2>Pattern Progress</h2>
      <div className="patterns-grid">
        {patterns.map((p) => (
          <PatternCard
            key={p.pattern_tag}
            patternTag={p.pattern_tag}
            solved={p.solved}
            total={p.total}
            percentage={p.percentage}
          />
        ))}
        {patterns.length === 0 && (
          <p style={{ color: '#6b7280', gridColumn: '1 / -1' }}>
            No pattern data yet. Start solving questions to see your progress!
          </p>
        )}
      </div>
    </div>
  );
}
