import Editor from '@monaco-editor/react';

export default function CodeEditor({ language, value, onChange }) {
  const monacoLang = language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : language;

  return (
    <Editor
      height="100%"
      language={monacoLang}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        padding: { top: 16, bottom: 16 },
        lineNumbersMinChars: 3,
        renderLineHighlight: 'line',
        smoothScrolling: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
        fontLigatures: true,
        wordWrap: 'on',
        tabSize: 4,
      }}
    />
  );
}
