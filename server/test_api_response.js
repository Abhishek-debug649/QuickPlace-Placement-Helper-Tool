import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-256-bit-secret';

// Generate a valid mock user token
const token = jwt.sign(
  { id: 'test-user-id', email: 'test@example.com' },
  JWT_SECRET,
  { expiresIn: '1h' }
);

async function test() {
  try {
    const res = await fetch('http://localhost:5000/api/questions?company_tag=infosys', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.error(`HTTP Error: ${res.status}`);
      const txt = await res.text();
      console.error(txt);
      return;
    }

    const data = await res.json();
    console.log(`API returned ${data.questions.length} questions:`);
    data.questions.forEach((q, i) => {
      console.log(`${i+1}. [${q.difficulty}] ${q.title} (ID: ${q.id})`);
    });
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

test();
