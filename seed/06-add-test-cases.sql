-- ─────────────────────────────────────────────
-- QuickPlace — Add Test Cases to Questions
-- ─────────────────────────────────────────────

-- 1. Add test_cases column to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS test_cases JSONB;

-- 2. Seed some initial test cases for existing questions
-- Two Sum
UPDATE questions 
SET test_cases = '[
  {"input": "4\n2 7 11 15\n9", "expected_output": "0 1"},
  {"input": "3\n3 2 4\n6", "expected_output": "1 2"},
  {"input": "2\n3 3\n6", "expected_output": "0 1"}
]'
WHERE title = 'Two Sum';

-- Valid Parentheses
UPDATE questions 
SET test_cases = '[
  {"input": "()", "expected_output": "true"},
  {"input": "()[]{}", "expected_output": "true"},
  {"input": "(]", "expected_output": "false"},
  {"input": "([)]", "expected_output": "false"}
]'
WHERE title = 'Valid Parentheses';

-- Reverse Linked List
-- (For simple hardcoded IO, let's assume input is array size then array elements)
UPDATE questions 
SET test_cases = '[
  {"input": "5\n1 2 3 4 5", "expected_output": "5 4 3 2 1"},
  {"input": "2\n1 2", "expected_output": "2 1"},
  {"input": "0\n", "expected_output": ""}
]'
WHERE title = 'Reverse Linked List';

-- Product of Array Except Self
UPDATE questions 
SET test_cases = '[
  {"input": "4\n1 2 3 4", "expected_output": "24 12 8 6"},
  {"input": "5\n-1 1 0 -3 3", "expected_output": "0 0 9 0 0"}
]'
WHERE title = 'Product of Array Except Self';

SELECT 'Test cases column added and seeded successfully!' AS status;
