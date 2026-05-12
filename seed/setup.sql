-- ═══════════════════════════════════════════════════════
-- QuickPlace — Complete Database Setup
-- Run this ONCE in Supabase SQL Editor to set up everything
-- ═══════════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- 1. CREATE TABLES
-- ─────────────────────────────────────────────

-- Users table (local + Google OAuth accounts)
CREATE TABLE IF NOT EXISTS users (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT        UNIQUE NOT NULL,
  name           TEXT,
  password_hash  TEXT,
  avatar         TEXT,
  provider       TEXT        DEFAULT 'local',
  google_id      TEXT,
  role           TEXT        DEFAULT 'student',
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT        UNIQUE NOT NULL,
  name           TEXT        NOT NULL,
  logo_url       TEXT,
  description    TEXT,
  display_order  INT         DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- DSA Patterns table
CREATE TABLE IF NOT EXISTS patterns (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT        UNIQUE NOT NULL,
  name           TEXT        NOT NULL,
  description    TEXT,
  icon           TEXT,
  color          TEXT,
  display_order  INT         DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT        NOT NULL,
  description       TEXT,
  story_description TEXT,
  difficulty        TEXT        DEFAULT 'medium',
  company_tag       TEXT,
  pattern_tag       TEXT,
  external_url      TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- Progress table (tracks which questions each user has solved)
CREATE TABLE IF NOT EXISTS progress (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        REFERENCES users(id) ON DELETE CASCADE,
  question_id  UUID        REFERENCES questions(id) ON DELETE CASCADE,
  status       TEXT        DEFAULT 'solved',
  solved_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, question_id)
);

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id                   UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  name                 TEXT    NOT NULL,
  description          TEXT,
  icon_url             TEXT,
  company_tag          TEXT,
  pattern_tag          TEXT,
  threshold_percentage INT     DEFAULT 80,
  created_at           TIMESTAMPTZ DEFAULT now()
);

-- Aptitude Questions table
CREATE TABLE IF NOT EXISTS aptitude_questions (
  id             UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  category       TEXT    NOT NULL,
  question_text  TEXT    NOT NULL,
  option_a       TEXT    NOT NULL,
  option_b       TEXT    NOT NULL,
  option_c       TEXT    NOT NULL,
  option_d       TEXT    NOT NULL,
  correct_option CHAR(1) NOT NULL,
  explanation    TEXT,
  difficulty     TEXT    DEFAULT 'medium',
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────
-- 2. SEED: Companies
-- ─────────────────────────────────────────────

INSERT INTO companies (slug, name, logo_url, description, display_order) VALUES
  ('netflix',    'Netflix',    NULL, 'Streaming giant known for system design and algorithm challenges.', 1),
  ('amazon',     'Amazon',     NULL, 'E-commerce leader with heavy focus on data structures and LP questions.', 2),
  ('google',     'Google',     NULL, 'Search and cloud company with emphasis on algorithmic thinking.', 3),
  ('microsoft',  'Microsoft',  NULL, 'Enterprise software leader testing OOP and system design.', 4),
  ('meta',       'Meta',       NULL, 'Social media giant focusing on graph problems and scalability.', 5)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- 3. SEED: DSA Patterns
-- ─────────────────────────────────────────────

INSERT INTO patterns (slug, name, description, icon, color, display_order) VALUES
  ('sliding-window',     'Sliding Window',       'Problems involving a moving window over data.',           '🪟', '#3b82f6', 1),
  ('two-pointers',       'Two Pointers',          'Using two pointers to traverse data efficiently.',        '👉', '#8b5cf6', 2),
  ('binary-search',      'Binary Search',         'Divide and conquer search in sorted data.',               '🔍', '#f59e0b', 3),
  ('dynamic-programming','Dynamic Programming',   'Breaking problems into overlapping subproblems.',         '🧩', '#ef4444', 4),
  ('graphs',             'Graphs',                'Problems involving nodes, edges, BFS, and DFS.',          '🕸️', '#10b981', 5),
  ('backtracking',       'Backtracking',          'Exploring all paths and pruning invalid ones.',           '🔙', '#f97316', 6),
  ('linked-list',        'Linked List',           'Pointer manipulation and list traversal problems.',       '🔗', '#06b6d4', 7),
  ('trees',              'Trees',                 'Binary trees, BSTs, and tree traversal algorithms.',      '🌳', '#22c55e', 8),
  ('stacks-queues',      'Stacks & Queues',       'LIFO and FIFO data structure problems.',                  '📚', '#a855f7', 9),
  ('greedy',             'Greedy',                'Making locally optimal choices for global solutions.',     '💰', '#eab308', 10),
  ('arrays',             'Arrays',                'Core data structures and manipulation.',                  '📁', '#6366f1', 11),
  ('strings',            'Strings',               'Manipulating and searching text data.',                   '🔤', '#ec4899', 12),
  ('recursion',          'Recursion',             'Functions calling themselves and divide & conquer.',      '🔁', '#14b8a6', 13),
  ('heap-pq',            'Heap / PQ',             'Priority queues and Kth elements.',                       '🏗️', '#8b5cf6', 14),
  ('bit-manipulation',   'Bit Manipulation',      'Operations directly on bits.',                            '0️⃣', '#64748b', 15)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────
-- 4. SEED: Questions (Netflix, Amazon, Google, Microsoft, Meta)
-- ─────────────────────────────────────────────

INSERT INTO questions (title, description, story_description, difficulty, company_tag, pattern_tag, external_url) VALUES
  ('Two Sum', 'Given an array of integers and a target, return indices of two numbers that add up to target.', 'You are a Netflix engineer building a recommendation engine. Two users'' preference scores must combine to hit an exact relevance threshold.', 'easy', 'netflix', 'two-pointers', 'https://leetcode.com/problems/two-sum/'),
  ('Longest Substring Without Repeating Characters', 'Find the length of the longest substring without repeating characters.', 'Netflix''s search bar needs to auto-suggest titles. Find the longest streak of unique characters typed.', 'medium', 'netflix', 'sliding-window', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'),
  ('LRU Cache', 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.', 'Netflix caches recently watched thumbnails. When memory is full, the least recently viewed must be evicted.', 'medium', 'netflix', 'linked-list', 'https://leetcode.com/problems/lru-cache/'),
  ('Merge Intervals', 'Given an array of intervals, merge all overlapping intervals.', 'Netflix scheduling system has overlapping content release windows. Merge them into non-overlapping time slots.', 'medium', 'netflix', 'greedy', 'https://leetcode.com/problems/merge-intervals/'),
  ('Word Search', 'Given an m x n grid of characters and a word, determine if the word exists in the grid.', 'Netflix content moderation AI scans subtitle grids for flagged words.', 'medium', 'netflix', 'backtracking', 'https://leetcode.com/problems/word-search/'),
  ('Valid Parentheses', 'Given a string containing brackets, determine if the input string is valid.', 'Amazon''s code review bot checks if all brackets in submitted code are properly matched.', 'easy', 'amazon', 'stacks-queues', 'https://leetcode.com/problems/valid-parentheses/'),
  ('Number of Islands', 'Given a 2D grid of 1s and 0s, count the number of islands.', 'Amazon logistics maps warehouses on a grid. Connected warehouse zones form a cluster.', 'medium', 'amazon', 'graphs', 'https://leetcode.com/problems/number-of-islands/'),
  ('Product of Array Except Self', 'Return an array where each element is the product of all other elements.', 'Amazon inventory system calculates the combined stock value of all products except each individual one.', 'medium', 'amazon', 'arrays', 'https://leetcode.com/problems/product-of-array-except-self/'),
  ('Trapping Rain Water', 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.', 'Amazon warehouse rooftop drainage system. Calculate the maximum water that can be held between storage containers.', 'hard', 'amazon', 'two-pointers', 'https://leetcode.com/problems/trapping-rain-water/'),
  ('Kth Largest Element in an Array', 'Find the kth largest element in an unsorted array.', 'Amazon reviews system needs to find the Kth most helpful review efficiently.', 'medium', 'amazon', 'heap-pq', 'https://leetcode.com/problems/kth-largest-element-in-an-array/'),
  ('Search in Rotated Sorted Array', 'Search for a target in a sorted array that has been rotated.', 'Google''s distributed database shards are stored in rotated order. Find a specific record.', 'medium', 'google', 'binary-search', 'https://leetcode.com/problems/search-in-rotated-sorted-array/'),
  ('Clone Graph', 'Given a reference of a node in a connected undirected graph, return a deep copy of the graph.', 'Google Maps creates a copy of the city graph to run optimizations without affecting the live routing system.', 'medium', 'google', 'graphs', 'https://leetcode.com/problems/clone-graph/'),
  ('Decode Ways', 'A message containing letters from A-Z can be encoded into numbers. Given an encoded string, return the number of ways to decode it.', 'Google''s speech-to-text system must decode audio signals which map to multiple letter sequences.', 'medium', 'google', 'dynamic-programming', 'https://leetcode.com/problems/decode-ways/'),
  ('Word Ladder', 'Given two words and a dictionary, find the length of shortest transformation sequence.', 'Google Translate evolves words through minimal changes to reach a target language form.', 'hard', 'google', 'graphs', 'https://leetcode.com/problems/word-ladder/'),
  ('Median of Two Sorted Arrays', 'Given two sorted arrays, return the median of the two sorted arrays.', 'Google Analytics merges two sets of time-series data and needs the median response time.', 'hard', 'google', 'binary-search', 'https://leetcode.com/problems/median-of-two-sorted-arrays/'),
  ('Reverse Linked List', 'Reverse a singly linked list.', 'Microsoft''s version control system needs to reverse the sequence of commits in a branch.', 'easy', 'microsoft', 'linked-list', 'https://leetcode.com/problems/reverse-linked-list/'),
  ('Binary Tree Level Order Traversal', 'Given a binary tree, return the level order traversal of its nodes'' values.', 'Microsoft''s org chart system needs to display employees level by level from the CEO down.', 'medium', 'microsoft', 'trees', 'https://leetcode.com/problems/binary-tree-level-order-traversal/'),
  ('Maximum Subarray', 'Find the contiguous subarray with the largest sum.', 'Microsoft''s stock analysis tool finds the most profitable trading window in price change data.', 'medium', 'microsoft', 'dynamic-programming', 'https://leetcode.com/problems/maximum-subarray/'),
  ('Spiral Matrix', 'Given an m x n matrix, return all elements in spiral order.', 'Microsoft''s display driver renders pixels in spiral scan order for a screensaver effect.', 'medium', 'microsoft', 'arrays', 'https://leetcode.com/problems/spiral-matrix/'),
  ('Course Schedule', 'Determine if you can finish all courses given prerequisites.', 'Microsoft Teams onboarding flow has module dependencies. Detect if the training path has circular requirements.', 'medium', 'microsoft', 'graphs', 'https://leetcode.com/problems/course-schedule/'),
  ('Longest Common Subsequence', 'Given two strings, return the length of their longest common subsequence.', 'Meta''s plagiarism detection in posts finds the longest common text between two flagged posts.', 'medium', 'meta', 'dynamic-programming', 'https://leetcode.com/problems/longest-common-subsequence/'),
  ('Graph Valid Tree', 'Given n nodes and edges, determine if the edges form a valid tree.', 'Meta''s social graph validator checks if a subset of connections forms a valid friendship tree.', 'medium', 'meta', 'graphs', 'https://leetcode.com/problems/graph-valid-tree/'),
  ('Accounts Merge', 'Given a list of accounts, merge accounts that share emails.', 'Meta merges duplicate user accounts that share at least one email address.', 'medium', 'meta', 'graphs', 'https://leetcode.com/problems/accounts-merge/'),
  ('Basic Calculator II', 'Implement a basic calculator to evaluate a string expression.', 'Meta''s ad pricing engine evaluates budget expressions entered by advertisers.', 'medium', 'meta', 'stacks-queues', 'https://leetcode.com/problems/basic-calculator-ii/'),
  ('Minimum Window Substring', 'Find the minimum window in string s which contains all characters of string t.', 'Meta''s content moderation scans the smallest window of a post containing all flagged keywords.', 'hard', 'meta', 'sliding-window', 'https://leetcode.com/problems/minimum-window-substring/');

-- ─────────────────────────────────────────────
-- 5. SEED: Badges
-- ─────────────────────────────────────────────

INSERT INTO badges (name, description, icon_url, company_tag, pattern_tag, threshold_percentage) VALUES
  ('Netflix Ready',     'Complete 80% of Netflix PYQs',            NULL, 'netflix',   NULL,                  80),
  ('Amazon Ready',      'Complete 80% of Amazon PYQs',             NULL, 'amazon',    NULL,                  80),
  ('Google Ready',      'Complete 80% of Google PYQs',             NULL, 'google',    NULL,                  80),
  ('Microsoft Ready',   'Complete 80% of Microsoft PYQs',          NULL, 'microsoft', NULL,                  80),
  ('Meta Ready',        'Complete 80% of Meta PYQs',               NULL, 'meta',      NULL,                  80),
  ('Sliding Window Pro','Complete 80% of Sliding Window problems',  NULL, NULL,        'sliding-window',      80),
  ('DP Master',         'Complete 80% of DP problems',             NULL, NULL,        'dynamic-programming', 80),
  ('Graph Explorer',    'Complete 80% of Graph problems',          NULL, NULL,        'graphs',              80);

-- ─────────────────────────────────────────────
-- 6. SEED: Aptitude Questions (47 questions, 4 categories)
-- ─────────────────────────────────────────────

INSERT INTO aptitude_questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty) VALUES
('quantitative', 'If 6 workers can complete a task in 12 days, how many days will 9 workers take?', '6 days', '8 days', '9 days', '10 days', 'B', 'Work = 6 × 12 = 72 worker-days. With 9 workers: 72/9 = 8 days.', 'easy'),
('quantitative', 'A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?', '30 km/h', '36 km/h', '40 km/h', '45 km/h', 'B', 'Speed = 150/15 = 10 m/s = 10 × 3.6 = 36 km/h.', 'easy'),
('quantitative', 'What is 35% of 240?', '74', '80', '84', '90', 'C', '35/100 × 240 = 84.', 'easy'),
('quantitative', 'The compound interest on Rs.5000 at 10% per annum for 2 years is:', 'Rs.1000', 'Rs.1050', 'Rs.1100', 'Rs.1025', 'B', 'CI = 5000(1+0.1)² - 5000 = 6050 - 5000 = 1050.', 'medium'),
('quantitative', 'A can do a job in 20 days and B can do it in 30 days. In how many days can they do it together?', '10 days', '12 days', '15 days', '25 days', 'B', '1/20 + 1/30 = 5/60 = 1/12. Together: 12 days.', 'easy'),
('quantitative', 'The ratio of ages of A and B is 3:5. After 10 years, the ratio becomes 5:7. What is the present age of A?', '15', '20', '25', '30', 'A', '3x+10/5x+10 = 5/7 → 4x = 20 → x = 5. Age of A = 15.', 'medium'),
('quantitative', 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?', '10%', '12%', '12.5%', '15%', 'C', 'P = P×R×8/100 → R = 12.5%.', 'medium'),
('quantitative', 'Two pipes can fill a tank in 12 and 18 minutes. If both are opened together, how long to fill the tank?', '6.2 min', '7.2 min', '8 min', '9 min', 'B', '1/12 + 1/18 = 5/36. Time = 36/5 = 7.2 min.', 'medium'),
('quantitative', 'A shopkeeper sells an article at 20% profit. If cost price is Rs.250, what is the selling price?', 'Rs.280', 'Rs.290', 'Rs.300', 'Rs.320', 'C', 'SP = 250 × 1.20 = Rs.300.', 'easy'),
('quantitative', 'The average of 5 consecutive odd numbers is 25. What is the largest number?', '27', '29', '31', '33', 'B', 'Five numbers are 21,23,25,27,29. Largest = 29.', 'easy'),
('quantitative', 'A train travels at 60 km/h. How long does it take to cover 150 km?', '1.5 hours', '2 hours', '2.5 hours', '3 hours', 'C', 'Time = 150/60 = 2.5 hours.', 'easy'),
('quantitative', 'In how many ways can 5 books be arranged on a shelf?', '60', '100', '120', '150', 'C', '5! = 120.', 'easy'),
('quantitative', 'What is the probability of getting a head when a fair coin is tossed?', '0.25', '0.5', '0.75', '1', 'B', 'P(H) = 1/2 = 0.5.', 'easy'),
('quantitative', 'Find the HCF of 36 and 48.', '6', '12', '18', '24', 'B', '36 = 2²×3², 48 = 2⁴×3. HCF = 12.', 'easy'),
('quantitative', 'A car travels 200 km at 50 km/h and 200 km at 100 km/h. What is the average speed?', '60 km/h', '66.67 km/h', '70 km/h', '75 km/h', 'B', 'Total time = 4+2 = 6 hrs. Avg = 400/6 = 66.67 km/h.', 'medium'),
('logical', 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies. True or False?', 'True', 'False', 'Cannot determine', 'None of these', 'A', 'Transitive: Bloops → Razzies → Lazzies.', 'easy'),
('logical', 'What comes next in the series: 2, 6, 12, 20, 30, ?', '40', '42', '44', '46', 'B', 'Differences: 4,6,8,10,12. Next = 30+12 = 42.', 'medium'),
('logical', 'Find the odd one out: 2, 3, 5, 7, 9, 11, 13', '3', '7', '9', '13', 'C', '9 = 3² is not a prime number.', 'easy'),
('logical', 'A is taller than B, C is shorter than A, D is taller than C but shorter than B. Who is the shortest?', 'A', 'B', 'C', 'D', 'C', 'Order: A > B > D > C. C is the shortest.', 'medium'),
('logical', 'What comes next: 1, 4, 9, 16, 25, ?', '30', '35', '36', '40', 'C', 'Perfect squares: 1²,2²,3²,4²,5²,6² = 36.', 'easy'),
('logical', 'A clock shows 3:15. What is the angle between the hour and minute hand?', '7.5°', '15°', '22.5°', '30°', 'A', 'Minute hand at 90°, hour hand at 97.5°. Angle = 7.5°.', 'medium'),
('logical', 'If today is Wednesday, what day will it be 100 days from now?', 'Monday', 'Tuesday', 'Thursday', 'Friday', 'D', '100 ÷ 7 = 14 weeks remainder 2. Wed + 2 = Friday.', 'medium'),
('logical', 'In a row, Rahul is 8th from the left and 14th from the right. How many students are in the row?', '20', '21', '22', '23', 'B', 'Total = 8 + 14 - 1 = 21.', 'easy'),
('logical', 'If "+" means "×", "×" means "-", what is 4 + 3 × 2?', '10', '14', '10', '6', 'A', '4 × 3 - 2 = 12 - 2 = 10.', 'medium'),
('logical', 'What is the missing number: 3, 7, 13, 21, 31, ?', '41', '43', '45', '47', 'B', 'Differences: 4,6,8,10,12. Next = 31+12 = 43.', 'medium'),
('logical', 'How many triangles are in a Star of David?', '6', '8', '10', '12', 'C', 'A Star of David contains 10 triangles total.', 'hard'),
('verbal', 'Choose the synonym of "Ubiquitous":', 'Rare', 'Omnipresent', 'Unique', 'Hidden', 'B', 'Ubiquitous means present or found everywhere.', 'easy'),
('verbal', 'Choose the antonym of "Benevolent":', 'Kind', 'Malevolent', 'Generous', 'Gracious', 'B', 'Benevolent means well-meaning; malevolent means ill-intentioned.', 'easy'),
('verbal', 'Fill in the blank: "The project was _____ due to lack of funding."', 'accelerated', 'abandoned', 'accomplished', 'appreciated', 'B', 'Lack of funding typically causes a project to be abandoned.', 'easy'),
('verbal', 'Select the correctly spelled word:', 'Accomodation', 'Accommodate', 'Acommodate', 'Accomodate', 'B', 'Correct spelling is "Accommodate" (double c, double m).', 'easy'),
('verbal', 'Identify the error: "Each of the boys have completed their homework."', 'Each of', 'the boys', 'have completed', 'their homework', 'C', '"Each" is singular — should be "has completed".', 'medium'),
('verbal', 'Choose the synonym of "Ephemeral":', 'Eternal', 'Transient', 'Significant', 'Robust', 'B', 'Ephemeral means lasting a very short time.', 'medium'),
('verbal', 'Fill in the blank: "He was _____ with the results, having exceeded all expectations."', 'disappointed', 'complacent', 'elated', 'indifferent', 'C', 'Elated means very happy and excited.', 'easy'),
('verbal', 'Choose the antonym of "Lucid":', 'Clear', 'Transparent', 'Opaque', 'Bright', 'C', 'Lucid means clearly expressed; opaque means unclear.', 'medium'),
('verbal', 'Identify the correctly formed sentence:', 'She don''t knows the answer.', 'She doesn''t know the answer.', 'She doesn''t knows the answer.', 'She don''t know the answer.', 'B', '"She doesn''t know" uses auxiliary does + not + base form correctly.', 'easy'),
('verbal', '"Pen is mightier than the sword" means:', 'Writing is dangerous', 'Knowledge and communication are more powerful than violence', 'Pens are heavy', 'Writers are cowards', 'B', 'Ideas and communication are more effective than brute force.', 'easy'),
('verbal', 'Choose the word most similar to "Candid":', 'Secretive', 'Frank', 'Timid', 'Reserved', 'B', 'Candid means frank or straightforward.', 'easy'),
('technical', 'What is the time complexity of binary search?', 'O(n)', 'O(n²)', 'O(log n)', 'O(n log n)', 'C', 'Binary search halves the search space each step: O(log n).', 'easy'),
('technical', 'Which data structure uses LIFO order?', 'Queue', 'Stack', 'Array', 'Linked List', 'B', 'Stack uses LIFO — last in, first out.', 'easy'),
('technical', 'What does SQL stand for?', 'Simple Query Language', 'Structured Query Language', 'Standard Query Logic', 'Sequential Query Language', 'B', 'SQL = Structured Query Language.', 'easy'),
('technical', 'What is the worst-case time complexity of quicksort?', 'O(n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'C', 'Worst case is O(n²) when pivot is always smallest/largest.', 'medium'),
('technical', 'Which HTTP status code indicates "Not Found"?', '200', '301', '403', '404', 'D', '404 Not Found means the requested resource does not exist.', 'easy'),
('technical', 'What does a primary key constraint ensure?', 'Allows NULL values', 'Ensures uniqueness and non-null values', 'Links two tables', 'Allows duplicate entries', 'B', 'Primary key uniquely identifies each record and cannot be NULL.', 'easy'),
('technical', 'Which of the following is NOT an OOP principle?', 'Encapsulation', 'Polymorphism', 'Compilation', 'Inheritance', 'C', 'The four OOP pillars are Encapsulation, Abstraction, Polymorphism, Inheritance.', 'easy'),
('technical', 'Which sorting algorithm has O(n) best-case time complexity?', 'Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Heap Sort', 'C', 'Insertion sort is O(n) when the array is already sorted.', 'medium'),
('technical', 'What is a foreign key?', 'A key to encrypt data', 'A primary key of another table used to establish relationships', 'A key that allows only NULL values', 'A key that indexes a column', 'B', 'Foreign key references the primary key in another table for referential integrity.', 'medium'),
('technical', 'What does RAM stand for?', 'Read-Access Memory', 'Random-Access Memory', 'Rapid-Access Module', 'Readable Array Memory', 'B', 'RAM = Random-Access Memory, volatile primary storage.', 'easy'),
('technical', 'Which layer of OSI model handles routing?', 'Data Link', 'Transport', 'Network', 'Session', 'C', 'Network layer (Layer 3) handles routing between networks using IP.', 'medium');

-- ─────────────────────────────────────────────
-- Done! ✅
-- ─────────────────────────────────────────────
SELECT 'Setup complete! Tables created and seeded.' AS status;
