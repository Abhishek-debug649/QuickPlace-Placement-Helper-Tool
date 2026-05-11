import { useState, useMemo, useCallback, useEffect } from 'react';
import { FiSearch, FiChevronDown, FiCheck, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import PATTERNS_DATA from '../data/patternsData';
import './PatternsPage.css';

// ─── LocalStorage helpers ───
const STORAGE_KEY = 'qp_patterns_progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// Build a question key from IDs
function qKey(catId, subId, qIdx) {
  return `${catId}::${subId}::${qIdx}`;
}

// ─── Filter options ───
const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Not Started', value: 'not-started' },
];

// ═══════════════════════════════════════════════════════════════
//  COMPONENT: PatternsPage
// ═══════════════════════════════════════════════════════════════
export default function PatternsPage() {
  const [progress, setProgress] = useState(loadProgress);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expandedCats, setExpandedCats] = useState(new Set());
  const [expandedSubs, setExpandedSubs] = useState(new Set());

  // Persist progress to localStorage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Toggle a question
  const toggleQuestion = useCallback((catId, subId, qIdx) => {
    const key = qKey(catId, subId, qIdx);
    setProgress((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  }, []);

  // Toggle category accordion
  const toggleCategory = useCallback((catId) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  }, []);

  // Toggle sub-pattern accordion
  const toggleSubPattern = useCallback((key) => {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // Expand / Collapse all
  const [allExpanded, setAllExpanded] = useState(false);
  const toggleAllExpanded = useCallback(() => {
    if (allExpanded) {
      setExpandedCats(new Set());
      setExpandedSubs(new Set());
    } else {
      const cats = new Set(PATTERNS_DATA.map((c) => c.id));
      const subs = new Set();
      PATTERNS_DATA.forEach((c) =>
        c.subPatterns.forEach((s) => subs.add(`${c.id}::${s.id}`))
      );
      setExpandedCats(cats);
      setExpandedSubs(subs);
    }
    setAllExpanded(!allExpanded);
  }, [allExpanded]);

  // Compute stats
  const stats = useMemo(() => {
    let totalQ = 0;
    let totalDone = 0;
    const catStats = {};

    PATTERNS_DATA.forEach((cat) => {
      let catTotal = 0;
      let catDone = 0;
      const subStats = {};

      cat.subPatterns.forEach((sub) => {
        const subTotal = sub.questions.length;
        let subDone = 0;
        sub.questions.forEach((_, qi) => {
          if (progress[qKey(cat.id, sub.id, qi)]) subDone++;
        });
        catTotal += subTotal;
        catDone += subDone;
        subStats[sub.id] = { total: subTotal, done: subDone };
      });

      totalQ += catTotal;
      totalDone += catDone;
      catStats[cat.id] = { total: catTotal, done: catDone, subStats };
    });

    return { totalQ, totalDone, catStats };
  }, [progress]);

  // Filter categories
  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    return PATTERNS_DATA.map((cat) => {
      const catStat = stats.catStats[cat.id];

      // Category-level filter
      if (filter === 'completed' && catStat.done < catStat.total) {
        // Check if this whole category might still show partial matches
      }
      if (filter === 'not-started' && catStat.done > 0) {
        // similarly
      }

      const filteredSubs = cat.subPatterns
        .map((sub) => {
          const subStat = catStat.subStats[sub.id];

          // Apply filter at sub-pattern level
          if (filter === 'completed' && subStat.done < subStat.total) return null;
          if (filter === 'not-started' && subStat.done > 0) return null;
          if (filter === 'in-progress' && (subStat.done === 0 || subStat.done === subStat.total)) return null;

          // Search within questions or sub-pattern name
          if (q) {
            const nameMatch = sub.name.toLowerCase().includes(q);
            const qMatch = sub.questions.some((qn) => qn.toLowerCase().includes(q));
            if (!nameMatch && !qMatch) return null;
          }

          return sub;
        })
        .filter(Boolean);

      // Also check if category name matches search
      if (q && filteredSubs.length === 0 && !cat.name.toLowerCase().includes(q)) {
        return null;
      }

      // If filter removes all sub-patterns and cat name doesn't match
      if (filteredSubs.length === 0 && !q) {
        // Still show categories for 'all' filter
        if (filter !== 'all') return null;
      }

      return { ...cat, subPatterns: filteredSubs.length > 0 ? filteredSubs : cat.subPatterns, hidden: filteredSubs.length === 0 && filter !== 'all' };
    }).filter((c) => c && !c.hidden);
  }, [search, filter, stats]);

  // Overall progress ring
  const overallPct = stats.totalQ > 0 ? Math.round((stats.totalDone / stats.totalQ) * 100) : 0;
  const circumference = 2 * Math.PI * 22;
  const dashOffset = circumference - (overallPct / 100) * circumference;

  return (
    <div className="patterns-page">
      {/* ── Header ── */}
      <div className="patterns-header">
        <div className="patterns-title-block">
          <h1 className="patterns-title">
            <span className="patterns-title-icon">🧩</span>
            <span className="patterns-title-gradient">DSA Patterns</span>
          </h1>
          <p className="patterns-subtitle">
            Master every pattern — track your progress question by question.
          </p>
        </div>

        {/* Overall progress ring */}
        <div className="patterns-overall-progress">
          <div className="overall-progress-ring">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <defs>
                <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle className="overall-progress-ring-bg" cx="26" cy="26" r="22" />
              <circle
                className="overall-progress-ring-fill"
                cx="26"
                cy="26"
                r="22"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <span className="overall-progress-pct">{overallPct}%</span>
          </div>
          <div className="overall-progress-info">
            <span className="overall-progress-label">Overall Progress</span>
            <span className="overall-progress-value">
              {stats.totalDone} <span>/ {stats.totalQ} solved</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="patterns-toolbar">
        <div className="patterns-search">
          <FiSearch className="patterns-search-icon" />
          <input
            id="patterns-search-input"
            className="patterns-search-input"
            type="text"
            placeholder="Search patterns or questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`patterns-filter-btn ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
        <button className="patterns-expand-all-btn" onClick={toggleAllExpanded}>
          {allExpanded ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* ── Categories ── */}
      {filteredData.length === 0 ? (
        <div className="patterns-empty">
          <span className="patterns-empty-icon">🔎</span>
          <h3>No patterns found</h3>
          <p>Try a different search term or filter.</p>
        </div>
      ) : (
        <div className="patterns-categories-grid">
          {filteredData.map((cat) => {
            const catStat = stats.catStats[cat.id];
            const catPct = catStat.total > 0 ? Math.round((catStat.done / catStat.total) * 100) : 0;
            const isCatExpanded = expandedCats.has(cat.id);

            return (
              <div
                key={cat.id}
                className={`pattern-category ${isCatExpanded ? 'expanded' : ''}`}
              >
                {/* Category Header */}
                <div className="category-header" onClick={() => toggleCategory(cat.id)}>
                  <div
                    className="category-icon-wrapper"
                    style={{ background: `${cat.color}20` }}
                  >
                    {cat.icon}
                  </div>

                  <div className="category-info">
                    <div className="category-name-row">
                      <h3 className="category-name">{cat.name}</h3>
                      <span
                        className="category-count-badge"
                        style={{ background: `${cat.color}30`, color: cat.color }}
                      >
                        {catStat.done}/{catStat.total}
                      </span>
                    </div>
                    <div className="category-progress-row">
                      <div className="category-progress-track">
                        <div
                          className="category-progress-fill"
                          style={{
                            width: `${catPct}%`,
                            background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`,
                          }}
                        />
                      </div>
                      <span className="category-progress-text">
                        {catPct}% complete
                      </span>
                    </div>
                  </div>

                  <FiChevronDown className="category-expand-icon" />
                </div>

                {/* Sub-Patterns Body */}
                <div className="category-body">
                  <div className="sub-patterns-list">
                    {cat.subPatterns.map((sub) => {
                      const subStat = catStat.subStats[sub.id];
                      const subPct = subStat.total > 0 ? Math.round((subStat.done / subStat.total) * 100) : 0;
                      const subKey = `${cat.id}::${sub.id}`;
                      const isSubExpanded = expandedSubs.has(subKey);

                      return (
                        <div
                          key={sub.id}
                          className={`sub-pattern ${isSubExpanded ? 'expanded' : ''}`}
                        >
                          {/* Sub-pattern Header */}
                          <div
                            className="sub-pattern-header"
                            onClick={() => toggleSubPattern(subKey)}
                          >
                            <span className="sub-pattern-name">{sub.name}</span>
                            <div className="sub-pattern-stats">
                              <span
                                className="sub-pattern-count"
                                style={{ color: cat.color }}
                              >
                                {subStat.done}/{subStat.total}
                              </span>
                              <div className="sub-pattern-bar-track">
                                <div
                                  className="sub-pattern-bar-fill"
                                  style={{
                                    width: `${subPct}%`,
                                    background: cat.color,
                                  }}
                                />
                              </div>
                            </div>
                            <FiChevronDown className="sub-pattern-chevron" />
                          </div>

                          {/* Questions Body */}
                          <div className="sub-pattern-body">
                            <div className="questions-list">
                              {sub.questions.map((qName, qi) => {
                                const key = qKey(cat.id, sub.id, qi);
                                const isDone = !!progress[key];

                                return (
                                  <div
                                    key={qi}
                                    className={`question-item ${isDone ? 'done' : ''}`}
                                    onClick={() => toggleQuestion(cat.id, sub.id, qi)}
                                  >
                                    <span className="question-index">{qi + 1}</span>
                                    <div
                                      className="question-checkbox"
                                      style={{
                                        background: isDone ? cat.color : 'transparent',
                                        borderColor: isDone ? cat.color : undefined,
                                      }}
                                    >
                                      {isDone && <FiCheck className="question-checkbox-icon" />}
                                    </div>
                                    <span className="question-name">{qName}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
