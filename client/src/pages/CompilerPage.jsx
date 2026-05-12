import { useState, useEffect, lazy, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProblemPanel from '../components/compiler/ProblemPanel';
import LanguageSelector from '../components/compiler/LanguageSelector';
import Terminal from '../components/compiler/Terminal';
import toast from 'react-hot-toast';
import './CompilerPage.css';

const CodeEditor = lazy(() => import('../components/compiler/CodeEditor'));

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DEFAULT_CODE = {
  python: '# Write your Python code here\n\ndef solution():\n    pass\n\nsolution()\n',
  javascript: '// Write your JavaScript code here\n\nfunction solution() {\n  \n}\n\nsolution();\n',
  java: '// Write your Java code here\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}\n',
  cpp: '// Write your C++ code here\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
  c: '// Write your C code here\n\n#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n',
};

const LANG_IDS = { python: 71, javascript: 63, java: 62, cpp: 54, c: 50 };

export default function CompilerPage() {
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [language, setLanguage] = useState(
    () => localStorage.getItem('qp_language') || 'python'
  );
  const [code, setCode] = useState(DEFAULT_CODE[language] || DEFAULT_CODE.python);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const token = localStorage.getItem('qp_token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // Fetch questions
  useEffect(() => {
    const pattern = searchParams.get('pattern');
    const company = searchParams.get('company');
    let url = `${API_URL}/api/questions`;
    const params = new URLSearchParams();
    if (pattern) params.append('pattern_tag', pattern);
    if (company) params.append('company_tag', company);
    if (params.toString()) url += `?${params.toString()}`;

    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setQuestions(data.questions || []);
        if (data.questions?.length > 0 && !selectedQuestion) {
          setSelectedQuestion(data.questions[0]);
        }
      })
      .catch(console.error);
  }, [searchParams]);

  // Update code template when language changes
  useEffect(() => {
    localStorage.setItem('qp_language', language);
    setCode(DEFAULT_CODE[language] || DEFAULT_CODE.python);
  }, [language]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const res = await fetch(`${API_URL}/api/compile`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source_code: code,
          language_id: LANG_IDS[language],
          stdin: stdin,
        }),
      });
      
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Execution failed');
        }
        setOutput(data);
      } else {
        const text = await res.text();
        throw new Error(`Server Error (${res.status}): non-JSON response received. Check your API URL or backend logs.`);
      }
    } catch (err) {
      setOutput({ stderr: err.message, status: { description: 'Error' } });
    } finally {
      setIsRunning(false);
    }
  };

  const handleMarkSolved = async () => {
    if (!selectedQuestion) return;
    try {
      if (!isSolved) {
        await fetch(`${API_URL}/api/progress/${selectedQuestion.id}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ status: 'solved' }),
        });
        setIsSolved(true);
        toast.success(`"${selectedQuestion.title}" marked as solved! 🎉`);
      } else {
        await fetch(`${API_URL}/api/progress/${selectedQuestion.id}`, {
          method: 'DELETE',
          headers,
        });
        setIsSolved(false);
        toast('Question unmarked', { icon: '↩️' });
      }
    } catch (err) {
      console.error('Mark solved error:', err);
      toast.error('Failed to update progress');
    }
  };

  return (
    <div className="compiler-page">
      {/* Question selector bar */}
      <div className="compiler-topbar">
        <select
          className="question-select"
          value={selectedQuestion?.id || ''}
          onChange={(e) => {
            const q = questions.find((q) => q.id === e.target.value);
            setSelectedQuestion(q || null);
            setIsSolved(false);
          }}
        >
          <option value="">Select a question...</option>
          {questions.map((q) => (
            <option key={q.id} value={q.id}>
              {q.title} [{q.difficulty}]
            </option>
          ))}
        </select>
      </div>

      <div className="compiler-split">
        {/* Left: Problem Panel */}
        <div className="compiler-left">
          <ProblemPanel
            question={selectedQuestion}
            isSolved={isSolved}
            onMarkSolved={handleMarkSolved}
          />
        </div>

        {/* Right: Editor + Terminal */}
        <div className="compiler-right">
          <div className="editor-toolbar">
            <LanguageSelector language={language} onChange={setLanguage} />
            <div className="editor-actions">
              <button
                className="btn-run"
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <span className="run-spinner" /> Running…
                  </>
                ) : (
                  <>▶ Run</>
                )}
              </button>
              {selectedQuestion && (
                <button
                  className={`btn-solved ${isSolved ? 'active' : ''}`}
                  onClick={handleMarkSolved}
                >
                  {isSolved ? '✓ Solved' : '☐ Mark Solved'}
                </button>
              )}
            </div>
          </div>

          <div className="editor-container">
            <Suspense
              fallback={
                <div className="editor-loading">Loading editor…</div>
              }
            >
              <CodeEditor
                language={language}
                value={code}
                onChange={(v) => setCode(v || '')}
              />
            </Suspense>
          </div>

          <div className="custom-input">
            <span className="custom-input-label">Custom Input</span>
            <textarea
              className="custom-input-textarea"
              placeholder="Enter standard input here..."
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
            />
          </div>

          <Terminal output={output} isRunning={isRunning} />
        </div>
      </div>
    </div>
  );
}
