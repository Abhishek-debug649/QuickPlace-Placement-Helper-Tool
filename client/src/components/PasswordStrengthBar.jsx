import { evaluatePassword } from '../utils/passwordStrength';
import './PasswordStrengthBar.css';

export default function PasswordStrengthBar({ password }) {
  const { score, label, color, tips } = evaluatePassword(password);

  if (!password) return null;

  return (
    <div className="psb-container">
      {/* Strength bar */}
      <div className="psb-track">
        {[1, 2, 3, 4, 5].map((seg) => (
          <div
            key={seg}
            className={`psb-segment ${score >= seg ? 'psb-active' : ''}`}
            style={{
              '--seg-color': score >= seg ? color : undefined,
              transitionDelay: `${(seg - 1) * 60}ms`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div className="psb-info">
        <span className="psb-label" style={{ color }}>
          {label}
        </span>
      </div>

      {/* Tips */}
      {tips.length > 0 && (
        <ul className="psb-tips">
          {tips.map((tip, i) => (
            <li key={i} className="psb-tip">
              <span className="psb-tip-dot" />
              {tip}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
