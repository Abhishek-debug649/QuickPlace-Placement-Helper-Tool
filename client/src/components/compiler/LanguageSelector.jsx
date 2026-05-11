const LANGUAGES = [
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'javascript', label: 'JavaScript', icon: '🟨' },
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'cpp', label: 'C++', icon: '⚡' },
  { id: 'c', label: 'C', icon: '🔧' },
];

export default function LanguageSelector({ language, onChange }) {
  return (
    <div className="language-selector">
      <select
        value={language}
        onChange={(e) => onChange(e.target.value)}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.icon} {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
