import { LANGUAGES } from '../config/judge0.js';

const PISTON_LANGS = {
  71: 'python',
  63: 'javascript',
  62: 'java',
  54: 'cpp',
  50: 'c'
};

// POST /api/compile — Execute user code via Piston API
export const executeCode = async (req, res, next) => {
  try {
    const { source_code, language_id, stdin } = req.body;

    if (!source_code || !language_id) {
      return res.status(400).json({ error: 'source_code and language_id are required' });
    }

    // Validate language_id
    const validIds = Object.values(LANGUAGES);
    if (!validIds.includes(Number(language_id))) {
      return res.status(400).json({
        error: `Invalid language_id. Valid options: ${JSON.stringify(LANGUAGES)}`,
      });
    }

    const language = PISTON_LANGS[language_id];

    // Submit to Piston API
    const submitRes = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language,
        version: '*',
        files: [
          {
            content: source_code
          }
        ],
        stdin: stdin || '',
      }),
    });

    if (!submitRes.ok) {
      const errText = await submitRes.text();
      throw new Error(`Piston API failed (${submitRes.status}): ${errText}`);
    }

    const data = await submitRes.json();

    const stdout = data.run?.stdout || null;
    const stderr = data.run?.stderr || null;
    const compile_output = data.compile?.stderr || null;
    const isAccepted = data.run?.code === 0 && !stderr && !compile_output;

    res.json({
      stdout,
      stderr,
      compile_output,
      status: {
        id: isAccepted ? 3 : 4,
        description: isAccepted ? 'Accepted' : (compile_output ? 'Compilation Error' : (stderr ? 'Runtime Error' : 'Error'))
      },
      time: 0,
      memory: 0,
    });
  } catch (err) {
    next(err);
  }
};
