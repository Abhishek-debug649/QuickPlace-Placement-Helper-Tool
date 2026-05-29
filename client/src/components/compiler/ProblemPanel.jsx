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
        <div className="problem-header-top">
          <h2 className="problem-title">{question.title}</h2>
          {question.story_description && (
            <button
              type="button"
              className={`story-toggle ${storyMode ? 'active' : ''}`}
              onClick={() => setStoryMode(!storyMode)}
            >
              📖 {storyMode ? 'Standard' : 'Story Mode'}
            </button>
          )}
        </div>
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

      <div className="problem-body">
        <div className="problem-description">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>

        {/* Predefined Test Cases (Examples) */}
        {question.test_cases && question.test_cases.length > 0 && (
          <div className="problem-examples">
            <h3 className="examples-heading">Examples</h3>
            {question.test_cases.slice(0, 3).map((tc, index) => (
              <div key={index} className="problem-example-card">
                <h4 className="example-card-title">Example {index + 1}</h4>
                <div className="example-card-fields">
                  <div className="example-field">
                    <span className="example-label">Input:</span>
                    <pre className="example-pre">{tc.input}</pre>
                  </div>
                  <div className="example-field">
                    <span className="example-label">Output:</span>
                    <pre className="example-pre">{tc.expected_output}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="problem-actions">
          <button
            type="button"
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
    </div>
  );
}
