import { useState } from 'react';

const OPTIONS = ['A', 'B', 'C', 'D'];
const OPTION_KEYS = {
  A: 'option_a',
  B: 'option_b',
  C: 'option_c',
  D: 'option_d',
};

export default function QuizCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (option) => {
    if (selected || revealed) return;
    setSelected(option);
    setRevealed(true);

    // Brief delay to show correct/incorrect before moving on
    setTimeout(() => {
      onAnswer(option);
      setSelected(null);
      setRevealed(false);
    }, 1200);
  };

  return (
    <div className="quiz-card">
      <p className="quiz-question">{question.question_text}</p>

      <div className="quiz-options">
        {OPTIONS.map((opt) => {
          const text = question[OPTION_KEYS[opt]];
          let optClass = 'quiz-option';

          if (revealed && selected === opt) {
            optClass += ' selected';
          }

          return (
            <button
              key={opt}
              className={optClass}
              onClick={() => handleSelect(opt)}
              disabled={revealed}
            >
              <span className="quiz-option-letter">{opt}</span>
              <span>{text}</span>
            </button>
          );
        })}
      </div>

      <div className="quiz-difficulty">
        <span className={`badge badge-${question.difficulty || 'medium'}`}>
          {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
        </span>
      </div>
    </div>
  );
}
