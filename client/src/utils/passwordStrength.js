/**
 * Evaluates password strength and returns a score, label, color, and tips.
 * Score: 0 (empty) to 5 (very strong)
 */
export function evaluatePassword(password) {
  if (!password) {
    return { score: 0, label: '', color: '', tips: [] };
  }

  let score = 0;
  const tips = [];

  // Length checks
  if (password.length >= 8) score++;
  else tips.push('Use at least 8 characters');

  if (password.length >= 12) score++;

  // Uppercase
  if (/[A-Z]/.test(password)) score++;
  else tips.push('Add an uppercase letter');

  // Numbers
  if (/[0-9]/.test(password)) score++;
  else tips.push('Add a number');

  // Special characters
  if (/[^A-Za-z0-9]/.test(password)) score++;
  else tips.push('Add a special character (!@#$...)');

  // Common patterns penalty
  const commonPatterns = ['password', '123456', 'qwerty', 'abc123', 'letmein'];
  if (commonPatterns.some((p) => password.toLowerCase().includes(p))) {
    score = Math.max(score - 2, 1);
    tips.unshift('Avoid common passwords');
  }

  const levels = [
    { label: '', color: '' },
    { label: 'Very Weak', color: '#ef4444' },
    { label: 'Weak', color: '#f97316' },
    { label: 'Fair', color: '#eab308' },
    { label: 'Strong', color: '#22c55e' },
    { label: 'Very Strong', color: '#10b981' },
  ];

  const capped = Math.min(score, 5);

  return {
    score: capped,
    label: levels[capped].label,
    color: levels[capped].color,
    tips,
  };
}
