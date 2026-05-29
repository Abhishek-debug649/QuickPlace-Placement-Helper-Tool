import { useState, useEffect } from 'react';

export default function Terminal({ stdin, setStdin, output, isRunning, testResults, isTesting }) {
  const [activeTab, setActiveTab] = useState('input');
  const [expandedTest, setExpandedTest] = useState(null);

  // Auto-switch to output/results tab when running code or tests
  useEffect(() => {
    if (isRunning || isTesting) {
      setActiveTab('output');
    }
  }, [isRunning, isTesting]);

  useEffect(() => {
    if (output || testResults) {
      setActiveTab('output');
    }
  }, [output, testResults]);

  return (
    <div className="terminal-panel console-container">
      <div className="terminal-header console-header">
        <div className="console-tabs">
          <button
            type="button"
            className={`console-tab-btn ${activeTab === 'input' ? 'active' : ''}`}
            onClick={() => setActiveTab('input')}
          >
            📥 Custom Input
          </button>
          <button
            type="button"
            className={`console-tab-btn ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            💻 Output / Results {(isRunning || isTesting) && <span className="tab-loading-dot" />}
          </button>
        </div>
        
        {/* If output is present and we are on the output tab, show execution details */}
        {activeTab === 'output' && (
          <div className="terminal-meta">
            {isRunning || isTesting ? (
              <span className="terminal-status-running">Running...</span>
            ) : testResults ? (
              testResults.length > 0 && (
                <span style={{ color: testResults.every(r => r.passed) ? '#4ade80' : '#f87171', fontWeight: 600 }}>
                  {testResults.filter(r => r.passed).length} / {testResults.length} Passed
                </span>
              )
            ) : output ? (
              <>
                {output.time !== undefined && <span>⏱ {output.time}s</span>}
                {output.memory !== undefined && <span>💾 {Math.round(output.memory / 1024)} MB</span>}
              </>
            ) : null}
          </div>
        )}
      </div>

      <div className="console-body">
        {activeTab === 'input' ? (
          <textarea
            className="console-input-textarea"
            placeholder="Enter standard input here... (This will be fed to your program when you click 'Run')"
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
          />
        ) : (
          /* Run results or test results */
          <div className="terminal-body">
            {isRunning || isTesting ? (
              <div className="terminal-running">
                <span className="run-spinner" />
                {isTesting ? 'Running test cases…' : 'Executing code…'}
              </div>
            ) : testResults ? (
              <div className="test-cases-list">
                {testResults.length === 0 && <div className="terminal-status">No tests run</div>}
                {testResults.map((tr) => (
                  <div key={tr.id} className={`test-case-item ${tr.passed ? 'passed' : 'failed'}`}>
                    <div 
                      className="test-case-header"
                      onClick={() => setExpandedTest(expandedTest === tr.id ? null : tr.id)}
                    >
                      <div className="test-case-title">
                        <span className="test-status-icon">{tr.passed ? '✅' : '❌'}</span>
                        <span>Test Case {tr.id}</span>
                      </div>
                      <div className="test-case-meta">
                        {tr.time && <span>{tr.time}s</span>}
                        <span className="expand-icon">{expandedTest === tr.id ? '▼' : '▶'}</span>
                      </div>
                    </div>
                    
                    {expandedTest === tr.id && (
                      <div className="test-case-details">
                        <div className="test-detail-section">
                          <span className="test-detail-label">Input</span>
                          <pre className="test-detail-content">{tr.input}</pre>
                        </div>
                        <div className="test-detail-section">
                          <span className="test-detail-label">Expected Output</span>
                          <pre className="test-detail-content">{tr.expected}</pre>
                        </div>
                        <div className="test-detail-section">
                          <span className="test-detail-label">Actual Output</span>
                          <pre className={`test-detail-content ${!tr.passed ? 'content-error' : ''}`}>
                            {tr.actual || <span className="empty-output">Empty</span>}
                          </pre>
                        </div>
                        {tr.error && (
                          <div className="test-detail-section">
                            <span className="test-detail-label error-label">Error</span>
                            <pre className="test-detail-content error-content">{tr.error}</pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : output ? (
              <div className="terminal-body-output">
                {output.compile_output && (
                  <div className="terminal-compile-err">{output.compile_output}</div>
                )}
                {output.stderr && (
                  <div className="terminal-stderr">{output.stderr}</div>
                )}
                {output.stdout && (
                  <div className="terminal-stdout">{output.stdout}</div>
                )}
                {!output.stdout && !output.stderr && !output.compile_output && (
                  <div className="terminal-status">No output produced</div>
                )}
              </div>
            ) : (
              <div className="terminal-empty">
                Click "Run" to execute your code or "Run Tests" to test against predefined cases.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
