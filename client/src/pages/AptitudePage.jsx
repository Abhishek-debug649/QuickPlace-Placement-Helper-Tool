import { useState, useEffect, useRef, useCallback } from 'react';
import QuizCard from '../components/aptitude/QuizCard';
import './AptitudePage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TIMER_OPTIONS = [
  { label: '30s', value: 30 },
  { label: '60s', value: 60 },
  { label: '90s', value: 90 },
];

export default function AptitudePage() {
  const [categories, setCategories] = useState([]);
  const [phase, setPhase] = useState('select'); // 'select' | 'quiz' | 'results'
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [timerPerQ, setTimerPerQ] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  const token = localStorage.getItem('qp_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/api/aptitude/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error);
  }, []);

  // Timer logic
  useEffect(() => {
    if (phase !== 'quiz') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext(null); // Auto-skip on timeout
          return timerPerQ;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, currentIdx, timerPerQ]);

  const startQuiz = async (category) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/aptitude/quiz/${category}?limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setQuestions(data.questions || []);
      setAnswers([]);
      setCurrentIdx(0);
      setTimeLeft(timerPerQ);
      setPhase('quiz');
    } catch (err) {
      console.error('Failed to load quiz:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = useCallback(
    (selected) => {
      const currentQ = questions[currentIdx];
      if (!currentQ) return;

      const newAnswers = [
        ...answers,
        { question_id: currentQ.id, selected: selected || 'X' },
      ];
      setAnswers(newAnswers);

      if (currentIdx + 1 >= questions.length) {
        // Submit quiz
        clearInterval(timerRef.current);
        submitQuiz(newAnswers);
      } else {
        setCurrentIdx((prev) => prev + 1);
        setTimeLeft(timerPerQ);
      }
    },
    [currentIdx, questions, answers, timerPerQ]
  );

  const submitQuiz = async (finalAnswers) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/aptitude/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      setResults(data);
      setPhase('results');
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setPhase('select');
    setQuestions([]);
    setAnswers([]);
    setResults(null);
    setCurrentIdx(0);
  };

  // ── Phase: Category Selection ──
  if (phase === 'select') {
    return (
      <div className="aptitude-page">
        <div className="aptitude-header">
          <h1 className="aptitude-title">🧠 Aptitude Practice</h1>
          <p className="aptitude-subtitle">
            Sharpen your quantitative, logical, and verbal reasoning skills
          </p>
        </div>

        <div className="timer-selector">
          <span className="timer-label">⏱ Time per question:</span>
          {TIMER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`timer-btn ${timerPerQ === opt.value ? 'active' : ''}`}
              onClick={() => setTimerPerQ(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="category-cards">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="category-card"
              onClick={() => startQuiz(cat.name)}
            >
              <div className="category-card-icon">
                {cat.name === 'quantitative' ? '📊'
                  : cat.name === 'logical' ? '🧩'
                  : cat.name === 'verbal' ? '📝'
                  : cat.name === 'technical' ? '💻'
                  : '🎯'}
              </div>
              <h3 className="category-card-title">{cat.displayName}</h3>
              <p className="category-card-count">{cat.count} questions</p>
              <button className="category-card-btn">Start Quiz →</button>
            </div>
          ))}
          {categories.length === 0 && (
            <p style={{ color: '#6b7280' }}>Loading categories…</p>
          )}
        </div>
      </div>
    );
  }

  // ── Phase: Quiz ──
  if (phase === 'quiz') {
    const currentQ = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;

    return (
      <div className="aptitude-page">
        {/* Progress bar */}
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="quiz-header">
          <span className="quiz-counter">
            Q {currentIdx + 1}/{questions.length}
          </span>
          <span className={`quiz-timer ${timeLeft <= 10 ? 'urgent' : ''}`}>
            ⏱ {timeLeft}s
          </span>
        </div>

        {currentQ && (
          <QuizCard
            key={currentQ.id}
            question={currentQ}
            onAnswer={handleNext}
            timeLeft={timeLeft}
            timerTotal={timerPerQ}
          />
        )}
      </div>
    );
  }

  // ── Phase: Results ──
  if (phase === 'results' && results) {
    return (
      <div className="aptitude-page">
        <div className="results-card">
          <div className="results-header">
            <div className="results-score-circle">
              <svg viewBox="0 0 100 100" className="results-ring">
                <circle cx="50" cy="50" r="42" className="ring-bg" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="ring-fill"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 42}`,
                    strokeDashoffset: `${2 * Math.PI * 42 * (1 - results.percentage / 100)}`,
                  }}
                />
              </svg>
              <span className="results-percentage">{results.percentage}%</span>
            </div>
            <div>
              <h2 className="results-title">
                {results.percentage >= 80
                  ? '🎉 Excellent!'
                  : results.percentage >= 50
                  ? '👍 Good job!'
                  : '💪 Keep practicing!'}
              </h2>
              <p className="results-summary">
                You scored {results.score}/{results.total} correct
              </p>
            </div>
          </div>

          <div className="results-breakdown">
            <h3>Question Breakdown</h3>
            {results.results.map((r, i) => (
              <div
                key={i}
                className={`result-item ${r.is_correct ? 'correct' : 'incorrect'}`}
              >
                <div className="result-item-header">
                  <span className="result-item-num">Q{i + 1}</span>
                  <span className={`result-icon ${r.is_correct ? '' : 'wrong'}`}>
                    {r.is_correct ? '✅' : '❌'}
                  </span>
                </div>
                <p className="result-question">{r.question_text}</p>
                <div className="result-detail">
                  <span>Your answer: <strong>{r.selected}</strong></span>
                  {!r.is_correct && (
                    <span>
                      Correct: <strong style={{ color: '#4ade80' }}>{r.correct_option}</strong>
                    </span>
                  )}
                </div>
                {r.explanation && (
                  <p className="result-explanation">💡 {r.explanation}</p>
                )}
              </div>
            ))}
          </div>

          <button className="btn-try-again" onClick={resetQuiz}>
            ← Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return null;
}
