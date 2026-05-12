import { useState } from 'react';

const OPTIONS = ['A', 'B', 'C', 'D'];
const OPTION_KEYS = { A: 'option_a', B: 'option_b', C: 'option_c', D: 'option_d' };

export default function QuizCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (option) => {
    if (selected || revealed) return;
    setSelected(option);
    setRevealed(true);
    setTimeout(() => {
      onAnswer(option);
      setSelected(null);
      setRevealed(false);
    }, 1400);
  };

  return (
    <div className="quiz-card">
      <p className="quiz-question">{question.question_text}</p>

      <div className="quiz-options">
        {OPTIONS.map((opt) => {
          const text = question[OPTION_KEYS[opt]];
          const isCorrect = opt === question.correct_option;
          const isSelected = selected === opt;

          let optClass = 'quiz-option';
          if (revealed) {
            if (isCorrect) optClass += ' correct';
            else if (isSelected) optClass += ' incorrect';
            else optClass += ' dimmed';
          }

          return (
            <button
              key={opt}
              className={optClass}
              onClick={() => handleSelect(opt)}
              disabled={revealed}
            >
              <span className="quiz-option-letter">{opt}</span>
              <span className="quiz-option-text">{text}</span>
              {revealed && isCorrect && <span className="quiz-option-tick">✓</span>}
              {revealed && isSelected && !isCorrect && <span className="quiz-option-cross">✗</span>}
            </button>
          );
        })}
      </div>

      {revealed && question.explanation && (
        <div className="quiz-explanation">
          <span className="quiz-explanation-icon">💡</span>
          {question.explanation}
        </div>
      )}

      <div className="quiz-difficulty">
        <span className={`badge badge-${question.difficulty || 'medium'}`}>
          {(question.difficulty || 'Medium').charAt(0).toUpperCase() + (question.difficulty || 'medium').slice(1)}
        </span>
      </div>
    </div>
  );
}
