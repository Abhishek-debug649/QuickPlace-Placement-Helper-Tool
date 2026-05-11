export default function Terminal({ output, isRunning }) {
  if (isRunning) {
    return (
      <div className="terminal-panel">
        <div className="terminal-header">
          <span>Output</span>
        </div>
        <div className="terminal-running">
          <span className="run-spinner" />
          Executing code…
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="terminal-panel">
        <div className="terminal-header">
          <span>Output</span>
        </div>
        <div className="terminal-empty">
          Click "Run" to execute your code
        </div>
      </div>
    );
  }

  const statusDesc = output.status?.description || 'Unknown';
  const isAccepted = output.status?.id === 3;

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <span>Output</span>
        <div className="terminal-meta">
          {output.time && <span>⏱ {output.time}s</span>}
          {output.memory && <span>💾 {Math.round(output.memory / 1024)} MB</span>}
          <span style={{ color: isAccepted ? '#4ade80' : '#f87171' }}>
            {isAccepted ? '✅' : '⚠️'} {statusDesc}
          </span>
        </div>
      </div>
      <div className="terminal-body">
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
    </div>
  );
}
