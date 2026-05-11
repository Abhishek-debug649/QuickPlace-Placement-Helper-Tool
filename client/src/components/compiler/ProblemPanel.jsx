import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ProblemPanel({ question, isSolved, onMarkSolved }) {
  const [storyMode, setStoryMode] = useState(false);

  if (!question) {
    return (
      <div className="problem-panel">
        <div className="problem-empty">
          <div className="problem-empty-icon">📝</div>
          <h3>Select a Question</h3>
          <p>Choose a question from the dropdown above to start coding.</p>
        </div>
      </div>
    );
  }

  const difficultyClass = `badge badge-${question.difficulty}`;
  const description = storyMode && question.story_description
    ? question.story_description
    : question.description;

  return (
    <div className="problem-panel">
      <div className="problem-header">
        <h2 className="problem-title">{question.title}</h2>
        <div className="problem-badges">
          <span className={difficultyClass}>
            {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1)}
          </span>
          {question.pattern_tag && (
            <span className="badge badge-tag">
              {question.pattern_tag.replace(/-/g, ' ')}
            </span>
          )}
          {question.company_tag && (
            <span className="badge badge-tag">
              {question.company_tag.charAt(0).toUpperCase() + question.company_tag.slice(1)}
            </span>
          )}
        </div>
      </div>

      {question.story_description && (
        <button
          className={`story-toggle ${storyMode ? 'active' : ''}`}
          onClick={() => setStoryMode(!storyMode)}
        >
          📖 {storyMode ? 'Standard Mode' : 'Story Mode'}
        </button>
      )}

      <div className="problem-description">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {description}
        </ReactMarkdown>
      </div>

      <div className="problem-actions">
        <button
          className={`btn-solved ${isSolved ? 'active' : ''}`}
          onClick={onMarkSolved}
        >
          {isSolved ? '✓ Solved' : 'Mark as Solved ✓'}
        </button>
        {question.external_url && (
          <a href={question.external_url} target="_blank" rel="noopener noreferrer">
            🔗 Solve on LeetCode
          </a>
        )}
      </div>
    </div>
  );
}
