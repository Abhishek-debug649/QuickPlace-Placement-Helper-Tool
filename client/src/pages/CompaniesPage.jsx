import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiExternalLink, FiCode, FiChevronDown, FiChevronUp, FiCheckCircle, FiCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './CompaniesPage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const COMPANIES = [
  { slug: 'netflix',   name: 'Netflix',    emoji: '🎬', color: '#e50914', bg: 'rgba(229,9,20,0.08)',    desc: 'Streaming giant · System Design & Algorithms' },
  { slug: 'amazon',    name: 'Amazon',     emoji: '📦', color: '#ff9900', bg: 'rgba(255,153,0,0.08)',   desc: 'E-commerce leader · DSA & Leadership Principles' },
  { slug: 'google',    name: 'Google',     emoji: '🔍', color: '#4285f4', bg: 'rgba(66,133,244,0.08)',  desc: 'Search & Cloud · Algorithmic Thinking' },
  { slug: 'microsoft', name: 'Microsoft',  emoji: '🪟', color: '#00a4ef', bg: 'rgba(0,164,239,0.08)',   desc: 'Enterprise software · OOP & System Design' },
  { slug: 'meta',      name: 'Meta',       emoji: '👥', color: '#0668e1', bg: 'rgba(6,104,225,0.08)',   desc: 'Social media · Graph Problems & Scalability' },
];

const DIFFICULTY_ORDER = { easy: 1, medium: 2, hard: 3 };

export default function CompaniesPage() {
  const navigate = useNavigate();
  const [selected, setSelected]       = useState(null);
  const [questions, setQuestions]     = useState([]);
  const [progress, setProgress]       = useState({});   // { company_slug: {solved, total} }
  const [solvedIds, setSolvedIds]     = useState(new Set());
  const [loadingQ, setLoadingQ]       = useState(false);
  const [filter, setFilter]           = useState('all'); // all | easy | medium | hard

  const token   = localStorage.getItem('qp_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  /* Fetch company-level progress on mount */
  useEffect(() => {
    fetch(`${API_URL}/api/progress/companies`, { headers })
      .then(r => r.json())
      .then(data => {
        const map = {};
        for (const c of data.companies || []) map[c.company_tag] = c;
        setProgress(map);
      })
      .catch(() => {});
  }, []);

  /* Fetch questions when a company is selected */
  useEffect(() => {
    if (!selected) return;
    setLoadingQ(true);
    Promise.all([
      fetch(`${API_URL}/api/questions?company_tag=${selected}`, { headers }).then(r => r.json()),
      fetch(`${API_URL}/api/progress/companies`, { headers }).then(r => r.json()),
    ])
      .then(([qData, pData]) => {
        const qs = qData.questions || [];
        setQuestions(qs.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]));

        const map = {};
        for (const c of pData.companies || []) map[c.company_tag] = c;
        setProgress(map);
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoadingQ(false));

    // Also get individually solved questions
    fetch(`${API_URL}/api/progress/companies`, { headers })
      .then(r => r.json())
      .catch(() => {});
  }, [selected]);

  const handleCompanyClick = (slug) => {
    setSelected(prev => (prev === slug ? null : slug));
    setFilter('all');
  };

  const handleMarkSolved = async (questionId, currentlySolved) => {
    try {
      if (!currentlySolved) {
        await fetch(`${API_URL}/api/progress/${questionId}`, {
          method: 'POST', headers,
          body: JSON.stringify({ status: 'solved' }),
        });
        setSolvedIds(prev => new Set([...prev, questionId]));
        toast.success('Marked as solved! 🎉');
      } else {
        await fetch(`${API_URL}/api/progress/${questionId}`, { method: 'DELETE', headers });
        setSolvedIds(prev => { const n = new Set(prev); n.delete(questionId); return n; });
        toast('Unmarked question');
      }
    } catch {
      toast.error('Failed to update progress');
    }
  };

  const handlePractice = (question) => {
    navigate(`/dashboard/compiler?company=${selected}`);
    toast(`Opening ${question.title} in compiler`, { icon: '💻' });
  };

  const selectedCompany = COMPANIES.find(c => c.slug === selected);
  const filteredQuestions = filter === 'all'
    ? questions
    : questions.filter(q => q.difficulty === filter);

  return (
    <div className="companies-page">
      {/* Header */}
      <div className="companies-header">
        <h1 className="companies-title">🏢 Company-wise Prep</h1>
        <p className="companies-subtitle">
          Practice questions from top tech companies and track your readiness
        </p>
      </div>

      {/* Company Cards Grid */}
      <div className="company-cards-grid">
        {COMPANIES.map(co => {
          const prog = progress[co.slug];
          const solved = prog?.solved || 0;
          const total  = prog?.total  || 0;
          const pct    = total > 0 ? Math.round((solved / total) * 100) : 0;
          const isActive = selected === co.slug;

          return (
            <div
              key={co.slug}
              className={`company-card ${isActive ? 'active' : ''}`}
              style={{ '--co-color': co.color, '--co-bg': co.bg }}
              onClick={() => handleCompanyClick(co.slug)}
            >
              <div className="company-card-top">
                <div className="company-emoji" style={{ background: co.bg }}>{co.emoji}</div>
                <div className="company-info">
                  <h3>{co.name}</h3>
                  <p>{co.desc}</p>
                </div>
                <div className="company-chevron">
                  {isActive ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </div>

              <div className="company-progress-row">
                <div className="company-progress-track">
                  <div className="company-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="company-progress-label">
                  {solved}/{total} solved · {pct}%
                </span>
              </div>

              {pct >= 80 && (
                <div className="company-badge-earned">
                  🏆 {co.name} Ready!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Questions Panel */}
      {selected && selectedCompany && (
        <div className="company-questions-panel">
          <div className="cq-panel-header">
            <div className="cq-panel-title">
              <span style={{ fontSize: 24 }}>{selectedCompany.emoji}</span>
              <h2>{selectedCompany.name} Questions</h2>
              <span className="cq-count-badge">{questions.length} total</span>
            </div>
            <div className="cq-filters">
              {['all','easy','medium','hard'].map(f => (
                <button
                  key={f}
                  className={`cq-filter-btn ${filter === f ? 'active' : ''} ${f}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
              <button
                className="cq-practice-all-btn"
                onClick={() => navigate(`/dashboard/compiler?company=${selected}`)}
              >
                <FiCode size={14} /> Practice All
              </button>
            </div>
          </div>

          {loadingQ ? (
            <div className="cq-loading">
              <span className="cq-spinner" />
              <span>Loading questions…</span>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="cq-empty">
              <p>No {filter !== 'all' ? filter : ''} questions found for {selectedCompany.name}.</p>
              <p style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>
                Run the seed SQL to populate questions.
              </p>
            </div>
          ) : (
            <div className="cq-list">
              {filteredQuestions.map((q, i) => {
                const isSolved = solvedIds.has(q.id);
                return (
                  <div key={q.id} className={`cq-item ${isSolved ? 'solved' : ''}`}>
                    <span className="cq-num">{i + 1}</span>
                    <div className="cq-main">
                      <span className="cq-title">{q.title}</span>
                      <div className="cq-meta">
                        <span className={`badge badge-${q.difficulty}`}>
                          {q.difficulty?.charAt(0).toUpperCase() + q.difficulty?.slice(1)}
                        </span>
                        {q.pattern_tag && (
                          <span className="cq-pattern-tag">
                            {q.pattern_tag.replace(/-/g, ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="cq-actions">
                      <button
                        className={`cq-solved-btn ${isSolved ? 'solved' : ''}`}
                        onClick={(e) => { e.stopPropagation(); handleMarkSolved(q.id, isSolved); }}
                        title={isSolved ? 'Unmark solved' : 'Mark as solved'}
                      >
                        {isSolved ? <FiCheckCircle size={16} /> : <FiCircle size={16} />}
                      </button>
                      <button
                        className="cq-code-btn"
                        onClick={(e) => { e.stopPropagation(); handlePractice(q); }}
                        title="Practice in compiler"
                      >
                        <FiCode size={14} />
                      </button>
                      {q.external_url && (
                        <a
                          href={q.external_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cq-ext-btn"
                          onClick={e => e.stopPropagation()}
                          title="Open on LeetCode"
                        >
                          <FiExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
