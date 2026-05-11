import dotenv from 'dotenv';

dotenv.config();

export const JUDGE0_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
export const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY || '';

// Judge0 language IDs
export const LANGUAGES = {
  python: 71,
  javascript: 63,
  java: 62,
  cpp: 54,
  c: 50,
};
