import { LANGUAGES } from '../config/judge0.js';

const WANDBOX_LANGS = {
  71: 'cpython-head',       // Python
  63: 'nodejs-20.17.0',     // JavaScript
  62: 'openjdk-jdk-22+36',  // Java
  54: 'gcc-head',           // C++
  50: 'gcc-head-c'          // C
};

// POST /api/compile — Execute user code via Wandbox API
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

    const compilerName = WANDBOX_LANGS[language_id];

    // Submit to Wandbox API
    const submitRes = await fetch('https://wandbox.org/api/compile.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        compiler: compilerName,
        code: source_code,
        stdin: stdin || '',
      }),
    });

    if (!submitRes.ok) {
      const errText = await submitRes.text();
      throw new Error(`Wandbox API failed (${submitRes.status}): ${errText}`);
    }

    const data = await submitRes.json();

    const stdout = data.program_output || null;
    const stderr = data.program_error || null;
    
    // Combine compiler output and errors
    let compile_output = null;
    if (data.compiler_error || data.compiler_output) {
      compile_output = [data.compiler_error, data.compiler_output].filter(Boolean).join('\n');
    }

    // Wandbox returns status as a string integer (e.g. "0" for success)
    // Note: status "0" does not guarantee compilation success if there's compiler_error for some compilers,
    // but typically compilation error returns non-zero status.
    const isAccepted = data.status === "0" && !stderr;

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
