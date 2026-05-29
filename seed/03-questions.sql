-- ═══════════════════════════════════════════════════════════════════════
-- QuickPlace — Comprehensive Pattern-wise DSA Questions Seed
-- 300+ problems organized by Pattern → Sub-Pattern → Difficulty
-- Run AFTER setup.sql (or after 01-companies + 02-patterns)
-- ═══════════════════════════════════════════════════════════════════════

-- Clean existing pattern-only questions to avoid duplicates
DELETE FROM questions WHERE company_tag IS NULL;


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 1: TWO POINTERS (two-pointers)
-- Sub-patterns: Opposite-End, Same-Direction, Three Pointers
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Two Sum II - Input Array is Sorted',
   'The classic opposite-end pointer movement on a sorted array.',
   'easy', 'two-pointers',
   'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/'),

  ('Remove Duplicates from Sorted Array',
   'Same-direction fast & slow pointer for in-place modification.',
   'easy', 'two-pointers',
   'https://leetcode.com/problems/remove-duplicates-from-sorted-array/'),

  ('Squares of a Sorted Array',
   'Comparing absolute values from opposite ends to build result.',
   'easy', 'two-pointers',
   'https://leetcode.com/problems/squares-of-a-sorted-array/'),

  ('Valid Palindrome',
   'Moving pointers inward while skipping non-alphanumeric chars.',
   'easy', 'two-pointers',
   'https://leetcode.com/problems/valid-palindrome/'),

  ('Remove Duplicates from Sorted List',
   'Slow & fast pointer approach on a linked list to skip duplicates.',
   'easy', 'two-pointers',
   'https://leetcode.com/problems/remove-duplicates-from-sorted-list/'),

  ('Rearrange 0s and 1s',
   'Segregate binary values using two-pointer partitioning.',
   'easy', 'two-pointers',
   'https://www.geeksforgeeks.org/problems/segregate-0s-and-1s5106/1');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Container With Most Water',
   'Optimizing area based on height vs width trade-offs with opposite-end pointers.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/container-with-most-water/'),

  ('Sort Colors (Dutch National Flag)',
   'Using 3 pointers (low, mid, high) to sort 0s, 1s, 2s in a single pass.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/sort-colors/'),

  ('3Sum',
   'Fixing one pointer and using Two Pointers on the remaining sorted portion.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/3sum/'),

  ('3Sum Closest',
   'Tracking the minimum difference from target while moving pointers.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/3sum-closest/'),

  ('Subarray Product Less Than K',
   'Same-direction pointers maintaining a valid product window.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/subarray-product-less-than-k/'),

  ('Next Permutation',
   'Finding the pivot from the right side and swapping to get next lexicographic order.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/next-permutation/'),

  ('Remove Duplicates from Sorted Array II',
   'Allow at most two duplicates using a write-pointer approach.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/'),

  ('Triplets with Smaller Sum',
   'Count triplets whose sum is less than a given target using sorted two-pointer scan.',
   'medium', 'two-pointers',
   'https://www.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1'),

  ('Backspace String Compare',
   'Traverse both strings from right to left, handling backspaces with a counter.',
   'medium', 'two-pointers',
   'https://leetcode.com/problems/backspace-string-compare/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Trapping Rain Water',
   'The ultimate opposite-end pointer question tracking left/right max heights.',
   'hard', 'two-pointers',
   'https://leetcode.com/problems/trapping-rain-water/'),

  ('4Sum',
   'Expanding the 3Sum logic to a fixed double-loop with inner two pointers.',
   'hard', 'two-pointers',
   'https://leetcode.com/problems/4sum/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 2: SLIDING WINDOW (sliding-window)
-- Sub-patterns: Fixed-Size Window, Variable-Size Window
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Maximum Average Subarray I',
   'The standard fixed-size sliding window template.',
   'easy', 'sliding-window',
   'https://leetcode.com/problems/maximum-average-subarray-i/'),

  ('Best Time to Buy and Sell Stock',
   'A basic window tracking a minimum price and maximum profit.',
   'easy', 'sliding-window',
   'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/'),

  ('Maximum Sum Subarray of Size K',
   'Classic fixed-size window: slide right, subtract left, track max sum.',
   'easy', 'sliding-window',
   'https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Longest Repeating Character Replacement',
   'Using a frequency map to track the most frequent character in the window.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/longest-repeating-character-replacement/'),

  ('Max Consecutive Ones III',
   'Shrinking the window when the zero count exceeds K flips.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/max-consecutive-ones-iii/'),

  ('Minimum Size Subarray Sum',
   'Shrinking the window from the left as long as the sum condition is met.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/minimum-size-subarray-sum/'),

  ('Fruit Into Baskets',
   'Variable window tracking exactly 2 unique elements using a Hash Map.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/fruit-into-baskets/'),

  ('Longest Substring with K Distinct Characters',
   'Variable window expanding right, shrinking left when distinct count exceeds K.',
   'medium', 'sliding-window',
   'https://www.geeksforgeeks.org/problems/longest-k-unique-characters-substring0853/1'),

  ('Longest Substring Without Repeating Characters',
   'Variable-size window using a HashSet to track unique characters.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/longest-substring-without-repeating-characters/'),

  ('Permutation in String',
   'Fixed-size sliding window comparing two frequency maps for anagram match.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/permutation-in-string/'),

  ('Find All Anagrams in a String',
   'Fixed window sliding over a string, collecting all anagram start indices.',
   'medium', 'sliding-window',
   'https://leetcode.com/problems/find-all-anagrams-in-a-string/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Minimum Window Substring',
   'The ultimate variable window tracking required vs. formed characters.',
   'hard', 'sliding-window',
   'https://leetcode.com/problems/minimum-window-substring/'),

  ('Sliding Window Maximum',
   'Hard variation requiring a Monotonic Deque inside the window.',
   'hard', 'sliding-window',
   'https://leetcode.com/problems/sliding-window-maximum/'),

  ('Substring with Concatenation of All Words',
   'Fixed-size window moving by word_length steps instead of 1.',
   'hard', 'sliding-window',
   'https://leetcode.com/problems/substring-with-concatenation-of-all-words/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 3: ARRAYS (arrays)
-- Sub-patterns: Kadane, Prefix Sums, Merge Intervals, Cyclic Sort,
--               Subarray/Subsequence
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: Kadane's Algorithm ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Maximum Subarray',
   'The absolute core Kadane''s algorithm template: sum = max(num, sum + num).',
   'easy', 'arrays',
   'https://leetcode.com/problems/maximum-subarray/'),

  ('Minimum Subarray Sum',
   'Kadane''s inverted: track the minimum contiguous subarray sum.',
   'easy', 'arrays',
   'https://www.geeksforgeeks.org/problems/smallest-sum-contiguous-subarray/1');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Maximum Product Subarray',
   'Handling negative multipliers by tracking both the current max and min products.',
   'medium', 'arrays',
   'https://leetcode.com/problems/maximum-product-subarray/'),

  ('Maximum Subarray Sum with One Deletion',
   'Kadane''s with forward and backward passes to allow one element removal.',
   'medium', 'arrays',
   'https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/'),

  ('Maximum Absolute Sum of Any Subarray',
   'Track both max and min subarray sums; answer is the larger absolute value.',
   'medium', 'arrays',
   'https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/'),

  ('Maximum Sum Circular Subarray',
   'Kadane variation: Total Sum minus the Minimum Subarray Sum handles the wrap-around.',
   'medium', 'arrays',
   'https://leetcode.com/problems/maximum-sum-circular-subarray/');

-- ── Sub-pattern: Prefix Sums ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Find Pivot Index',
   'Basic prefix sum vs postfix sum logic to find the balance point.',
   'easy', 'arrays',
   'https://leetcode.com/problems/find-pivot-index/'),

  ('Range Sum Query - Immutable',
   'Creating a prefix array for O(1) repeated range-sum lookups.',
   'easy', 'arrays',
   'https://leetcode.com/problems/range-sum-query-immutable/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Subarray Sum Equals K',
   'The ultimate OA question: Using Prefix Sum + Hash Map to count subarrays summing to K.',
   'medium', 'arrays',
   'https://leetcode.com/problems/subarray-sum-equals-k/'),

  ('Subarray Sums Divisible by K',
   'Prefix sum mapped to remainders using modulo arithmetic.',
   'medium', 'arrays',
   'https://leetcode.com/problems/subarray-sums-divisible-by-k/'),

  ('Contiguous Array',
   'Converting 0s to -1s and using Prefix Sum to find equal count of 0s and 1s.',
   'medium', 'arrays',
   'https://leetcode.com/problems/contiguous-array/'),

  ('Continuous Subarray Sum',
   'Storing modulo remainders in a Hash Map to find subarrays summing to multiples of K.',
   'medium', 'arrays',
   'https://leetcode.com/problems/continuous-subarray-sum/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Shortest Subarray with Sum at Least K',
   'Combining Prefix Sums with a Monotonic Deque for optimal O(n) time.',
   'hard', 'arrays',
   'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/'),

  ('Count of Range Sum',
   'Merge sort on prefix sums to count subarrays within a given range.',
   'hard', 'arrays',
   'https://leetcode.com/problems/count-of-range-sum/');

-- ── Sub-pattern: Subarray / Subsequence ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Is Subsequence',
   'The fundamental two-pointer check for non-contiguous elements.',
   'easy', 'arrays',
   'https://leetcode.com/problems/is-subsequence/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Longest Consecutive Sequence',
   'Using a HashSet to achieve O(N) time without sorting the array.',
   'medium', 'arrays',
   'https://leetcode.com/problems/longest-consecutive-sequence/'),

  ('Increasing Triplet Subsequence',
   'O(1) space tracking of the first and second minimums seen so far.',
   'medium', 'arrays',
   'https://leetcode.com/problems/increasing-triplet-subsequence/'),

  ('Longest Increasing Subsequence',
   'The foundational 1D DP template for non-contiguous elements.',
   'medium', 'arrays',
   'https://leetcode.com/problems/longest-increasing-subsequence/'),

  ('Number of Matching Subsequences',
   'Optimizing multiple subsequence checks using buckets or binary search.',
   'medium', 'arrays',
   'https://leetcode.com/problems/number-of-matching-subsequences/'),

  ('Maximum Length of Repeated Subarray',
   'Applying 2D DP to strictly contiguous subarrays across two arrays.',
   'medium', 'arrays',
   'https://leetcode.com/problems/maximum-length-of-repeated-subarray/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Distinct Subsequences',
   '2D DP matrix mapping string/array subsequences against targets.',
   'hard', 'arrays',
   'https://leetcode.com/problems/distinct-subsequences/');

-- ── Sub-pattern: Merge Intervals ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Merge Intervals',
   'The standard template: sort by start, then merge overlapping end boundaries.',
   'medium', 'arrays',
   'https://leetcode.com/problems/merge-intervals/'),

  ('Insert Interval',
   'Handling the left, overlapping, and right parts separately without re-sorting.',
   'medium', 'arrays',
   'https://leetcode.com/problems/insert-interval/'),

  ('Non-overlapping Intervals',
   'Greedy variation: sort by end time and count removals needed.',
   'medium', 'arrays',
   'https://leetcode.com/problems/non-overlapping-intervals/'),

  ('Interval List Intersections',
   'Two-pointer merge of two sorted interval lists to find overlaps.',
   'medium', 'arrays',
   'https://leetcode.com/problems/interval-list-intersections/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Minimum Meeting Rooms',
   'Tracking active intervals using a Min-Heap or chronological event sorting.',
   'hard', 'arrays',
   'https://www.geeksforgeeks.org/problems/attend-all-meetings-ii/1'),

  ('Maximum CPU Load',
   'Finding the peak overlapping job load using interval sweep or heap.',
   'hard', 'arrays',
   'https://www.geeksforgeeks.org/maximum-cpu-load-from-the-given-list-of-jobs/'),

  ('Employee Free Time',
   'Merging intervals across multiple sorted employee schedules.',
   'hard', 'arrays',
   'https://www.codertrain.co/employee-free-time');

-- ── Sub-pattern: Cyclic Sort ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Missing Number',
   'Basic Cyclic Sort (or XOR) trick to find the missing integer.',
   'easy', 'arrays',
   'https://leetcode.com/problems/missing-number/'),

  ('Find All Numbers Disappeared in an Array',
   'Mark visited indices to find all missing numbers in range [1, n].',
   'easy', 'arrays',
   'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Find the Duplicate Number',
   'Cyclic sort or Floyd''s cycle detection when numbers are in range 1 to N.',
   'medium', 'arrays',
   'https://leetcode.com/problems/find-the-duplicate-number/'),

  ('Find All Duplicates in an Array',
   'Cyclic sort variation: find numbers not at their correct index.',
   'medium', 'arrays',
   'https://leetcode.com/problems/find-all-duplicates-in-an-array/'),

  ('First Missing Positive',
   'The classic hard OA question: cyclic sort on unsorted positive/negative arrays.',
   'medium', 'arrays',
   'https://leetcode.com/problems/first-missing-positive/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 4: BINARY SEARCH (binary-search)
-- Sub-patterns: Basic, Range Search, Peak Finding,
--               Binary Search on Answer / Allocation
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Binary Search',
   'The foundational binary search template on a sorted array.',
   'easy', 'binary-search',
   'https://leetcode.com/problems/binary-search/'),

  ('Guess Number Higher or Lower',
   'Standard binary search API implementation with a comparison function.',
   'easy', 'binary-search',
   'https://leetcode.com/problems/guess-number-higher-or-lower/'),

  ('First Bad Version',
   'Finding the exact boundary of a true/false condition using BS.',
   'easy', 'binary-search',
   'https://leetcode.com/problems/first-bad-version/'),

  ('Valid Perfect Square',
   'Binary search on math logic instead of an array.',
   'easy', 'binary-search',
   'https://leetcode.com/problems/valid-perfect-square/'),

  ('Kth Missing Positive Number',
   'Basic introduction to searching a logical number line.',
   'easy', 'binary-search',
   'https://leetcode.com/problems/kth-missing-positive-number/'),

  ('Ceiling of a Number in Sorted Array',
   'Find the smallest element >= target (upper bound) using binary search.',
   'easy', 'binary-search',
   'https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1'),

  ('Count Number of Occurrences',
   'Use first and last position binary searches; count = last - first + 1.',
   'easy', 'binary-search',
   'https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1'),

  ('Find Number of Rotations in Sorted Array',
   'Index of the minimum element equals the number of rotations.',
   'easy', 'binary-search',
   'https://www.geeksforgeeks.org/problems/rotation4723/1');

-- 🟡 Medium — Range Search
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Find First and Last Position of Element in Sorted Array',
   'Running two separate binary searches for the left and right bounds.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/'),

  ('Search in Rotated Sorted Array',
   'Determining which half of the array is normally sorted, then narrowing.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/search-in-rotated-sorted-array/'),

  ('Search in Rotated Sorted Array II',
   'Handling duplicates when nums[left] == nums[mid] by shrinking bounds.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/'),

  ('Find Minimum in Rotated Sorted Array',
   'Looking for the inflection point (the drop) in a rotated array.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/'),

  ('Single Element in a Sorted Array',
   'Using odd/even index logic to find the element without a pair.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/single-element-in-a-sorted-array/'),

  ('Search in Infinite Sorted Array',
   'Exponentially expand bounds first, then binary search within.',
   'medium', 'binary-search',
   'https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/');

-- 🟡 Medium — Peak Finding
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Find Peak Element',
   'BS on an unsorted array by comparing mid with mid + 1.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/find-peak-element/'),

  ('Peak Index in a Mountain Array',
   'Same logic as Peak Element, but guaranteed to rise then fall.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/peak-index-in-a-mountain-array/');

-- 🟡 Medium — Binary Search on Answer / Allocation
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Koko Eating Bananas',
   'The absolute classic "minimum rate" allocation template.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/koko-eating-bananas/'),

  ('Capacity To Ship Packages Within D Days',
   'Setting low = max(element) and high = sum(elements), then BS the answer.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/'),

  ('Minimum Number of Days to Make m Bouquets',
   'Tracking contiguous bloomed flowers within a day limit.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/'),

  ('Find the Smallest Divisor Given a Threshold',
   'Division logic with ceiling functions inside the BS validity check.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/'),

  ('Minimum Limit of Balls in a Bag',
   'Splitting logic inside the validity check function.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/'),

  ('Aggressive Cows',
   'The classic "maximize the minimum distance" allocation pattern.',
   'medium', 'binary-search',
   'https://www.geeksforgeeks.org/problems/aggressive-cows/1'),

  ('H-Index II',
   'Binary search on a sorted citation array to find the h-index.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/h-index-ii/'),

  ('Maximum Candies Allocated to K Children',
   'Binary search on candy pile size to maximize per-child allocation.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/maximum-candies-allocated-to-k-children/'),

  ('Allocate Minimum Number of Pages',
   'The classic "Minimize the Maximum" student allocation problem.',
   'medium', 'binary-search',
   'https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1'),

  ('Minimum Time to Complete Trips',
   'Handling large numbers (use long long to prevent overflow!).',
   'medium', 'binary-search',
   'https://leetcode.com/problems/minimum-time-to-complete-trips/'),

  ('Search a 2D Matrix',
   'Treat the 2D matrix as a flattened sorted array and binary search.',
   'medium', 'binary-search',
   'https://leetcode.com/problems/search-a-2d-matrix/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Split Array Largest Sum',
   'Same underlying code as Book Allocation, just phrased differently.',
   'hard', 'binary-search',
   'https://leetcode.com/problems/split-array-largest-sum/'),

  ('Find Minimum in Rotated Sorted Array II',
   'Handling duplicate elements while finding the minimum rotation point.',
   'hard', 'binary-search',
   'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/'),

  ('Search a 2D Matrix II',
   'Start from top-right corner; go left if too large, down if too small.',
   'hard', 'binary-search',
   'https://leetcode.com/problems/search-a-2d-matrix-ii/'),

  ('Kth Smallest Element in a Sorted Matrix',
   'Binary search on value range counting elements <= mid in each row.',
   'hard', 'binary-search',
   'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/'),

  ('Kth Smallest Number in Multiplication Table',
   'Binary search on answer with a count function across multiplication rows.',
   'hard', 'binary-search',
   'https://leetcode.com/problems/kth-smallest-number-in-multiplication-table/'),

  ('Median of Two Sorted Arrays',
   'The ultimate BS challenge: dividing two arrays using symmetric partition cuts.',
   'hard', 'binary-search',
   'https://leetcode.com/problems/median-of-two-sorted-arrays/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 5: STRINGS (strings)
-- Sub-patterns: Two Pointers, HashMap/Frequency, Anagram, Trie
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Valid Anagram',
   'The base case for all anagram logic using frequency arrays or sorting.',
   'easy', 'strings',
   'https://leetcode.com/problems/valid-anagram/'),

  ('First Unique Character in a String',
   'Basic ASCII array counting and single-pass lookup for first non-repeater.',
   'easy', 'strings',
   'https://leetcode.com/problems/first-unique-character-in-a-string/'),

  ('Valid Palindrome II',
   'Two pointers with a one-time "skip" allowance for at most one deletion.',
   'easy', 'strings',
   'https://leetcode.com/problems/valid-palindrome-ii/'),

  ('Reverse Vowels of a String',
   'Conditional opposite-end pointers that skip consonants.',
   'easy', 'strings',
   'https://leetcode.com/problems/reverse-vowels-of-a-string/'),

  ('Maximum Number of Balloons',
   'Count character frequencies and find the bottleneck letter.',
   'easy', 'strings',
   'https://leetcode.com/problems/maximum-number-of-balloons/'),

  ('Longest Palindrome',
   'Count chars with odd frequency; at most one odd char in the center.',
   'easy', 'strings',
   'https://leetcode.com/problems/longest-palindrome/'),

  ('Ransom Note',
   'Check if magazine character frequencies cover the ransom note needs.',
   'easy', 'strings',
   'https://leetcode.com/problems/ransom-note/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Sort Characters By Frequency',
   'Mapping character counts and sorting them in descending order.',
   'medium', 'strings',
   'https://leetcode.com/problems/sort-characters-by-frequency/'),

  ('Group Anagrams',
   'Using sorted strings or frequency arrays as Hash Map keys.',
   'medium', 'strings',
   'https://leetcode.com/problems/group-anagrams/'),

  ('Minimum Number of Steps to Make Two Strings Anagram',
   'Calculating the absolute difference between frequency maps.',
   'medium', 'strings',
   'https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/'),

  ('String Compression',
   'In-place read and write pointers directly on a character array.',
   'medium', 'strings',
   'https://leetcode.com/problems/string-compression/'),

  ('Implement Trie (Prefix Tree)',
   'The foundational node-based dictionary tree structure for prefix lookups.',
   'medium', 'strings',
   'https://leetcode.com/problems/implement-trie-prefix-tree/'),

  ('Design Add and Search Words Data Structure',
   'Combining a Trie with DFS to handle wildcard ''.'' characters.',
   'medium', 'strings',
   'https://leetcode.com/problems/design-add-and-search-words-data-structure/'),

  ('Search Suggestions System',
   'The exact Trie logic behind autocomplete search bars.',
   'medium', 'strings',
   'https://leetcode.com/problems/search-suggestions-system/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 6: RECURSION & BACKTRACKING (recursion)
-- Sub-patterns: Basic Recursion, Backtracking, Pruning
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Fibonacci Number',
   'The most basic recursive function — foundation for memoization and DP.',
   'easy', 'recursion',
   'https://leetcode.com/problems/fibonacci-number/'),

  ('Check if String is Palindrome',
   'Recursive comparison of first and last characters moving inward.',
   'easy', 'recursion',
   'https://www.geeksforgeeks.org/problems/palindrome-string0817/1'),

  ('Check if Array is Sorted',
   'Recursively compare adjacent elements to verify sorted order.',
   'easy', 'recursion',
   'https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1'),

  ('Sum of Digits of a Number',
   'Extract last digit with modulo, recurse on the remaining number.',
   'easy', 'recursion',
   'https://www.geeksforgeeks.org/problems/sum-of-digits1742/1'),

  ('Remove All Occurrences of a Character in String',
   'Build a new string recursively, skipping the target character.',
   'easy', 'recursion',
   'https://www.geeksforgeeks.org/problems/remove-all-occurrences-of-a-character-in-a-string/1');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Subsets',
   'The fundamental include/exclude backtracking template.',
   'medium', 'recursion',
   'https://leetcode.com/problems/subsets/'),

  ('Subsets II',
   'Handling duplicates by sorting and skipping same elements at same level.',
   'medium', 'recursion',
   'https://leetcode.com/problems/subsets-ii/'),

  ('Permutations',
   'Generating all orderings by swapping or using a visited array.',
   'medium', 'recursion',
   'https://leetcode.com/problems/permutations/'),

  ('Permutations II',
   'Pruning duplicate permutations by sorting and skipping same-value siblings.',
   'medium', 'recursion',
   'https://leetcode.com/problems/permutations-ii/'),

  ('Combination Sum',
   'Unlimited picks from candidates — recurse with same index allowed.',
   'medium', 'recursion',
   'https://leetcode.com/problems/combination-sum/'),

  ('Combination Sum II',
   'Each number used once; skip duplicates at the same recursion level.',
   'medium', 'recursion',
   'https://leetcode.com/problems/combination-sum-ii/'),

  ('Combination Sum III',
   'Find K numbers from 1-9 that sum to N without repetition.',
   'medium', 'recursion',
   'https://leetcode.com/problems/combination-sum-iii/'),

  ('Letter Combinations of a Phone Number',
   'Map digits to letters and build all combinations via recursion tree.',
   'medium', 'recursion',
   'https://leetcode.com/problems/letter-combinations-of-a-phone-number/'),

  ('Generate Parentheses',
   'Track open/close counts; only add close if close < open.',
   'medium', 'recursion',
   'https://leetcode.com/problems/generate-parentheses/'),

  ('Word Search',
   'DFS backtracking on a 2D grid marking visited cells.',
   'medium', 'recursion',
   'https://leetcode.com/problems/word-search/'),

  ('Palindrome Partitioning',
   'Partition string at every index and recurse if prefix is a palindrome.',
   'medium', 'recursion',
   'https://leetcode.com/problems/palindrome-partitioning/'),

  ('Restore IP Addresses',
   'Backtrack placing dots to form exactly 4 valid IP octets.',
   'medium', 'recursion',
   'https://leetcode.com/problems/restore-ip-addresses/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('N-Queens',
   'Place N queens on an NxN board with column, diagonal, and anti-diagonal checks.',
   'hard', 'recursion',
   'https://leetcode.com/problems/n-queens/'),

  ('Sudoku Solver',
   'Fill empty cells trying 1-9, backtrack on constraint violation.',
   'hard', 'recursion',
   'https://leetcode.com/problems/sudoku-solver/'),

  ('Word Search II',
   'Combining a Trie with grid DFS backtracking for multi-word search.',
   'hard', 'recursion',
   'https://leetcode.com/problems/word-search-ii/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 7: LINKED LIST (linked-list)
-- Sub-patterns: Fast & Slow Pointers, In-Place Reversal,
--               Dummy Node, Merge & Intersection
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: Fast & Slow Pointers ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Middle of the Linked List',
   'The core template: fast moves 2 steps, slow moves 1 — slow ends at middle.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/middle-of-the-linked-list/'),

  ('Linked List Cycle',
   'The core cycle template: Floyd''s Tortoise and Hare algorithm.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/linked-list-cycle/'),

  ('Palindrome Linked List',
   'Finding the middle, reversing the second half, and comparing node by node.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/palindrome-linked-list/'),

  ('Intersection of Two Linked Lists',
   'Two pointers covering both lists to balance length offsets and meet at intersection.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/intersection-of-two-linked-lists/'),

  ('Happy Number',
   'Using cycle detection on digit-square sums instead of linked list nodes.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/happy-number/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Linked List Cycle II',
   'Math trick: after cycle detection, reset one pointer to head to find cycle start.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/linked-list-cycle-ii/'),

  ('Remove Nth Node From End of List',
   'Fast pointer gets a head start of N steps; when fast hits end, slow is at target.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/remove-nth-node-from-end-of-list/'),

  ('Reorder List',
   'Combining Fast/Slow (find midpoint) + Reversal (second half) + Merging.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/reorder-list/'),

  ('Find the Duplicate Number',
   'Floyd''s cycle detection logic applied to an array (indices as pointers).',
   'medium', 'linked-list',
   'https://leetcode.com/problems/find-the-duplicate-number/'),

  ('Delete the Middle Node of a Linked List',
   'Track the node before the slow pointer to delete the middle.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/'),

  ('Sort List',
   'Using Fast/Slow to split the list for recursive Merge Sort.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/sort-list/'),

  ('Swapping Nodes in a Linked List',
   'Locating kth node from front and back in one pass using fast/slow.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/swapping-nodes-in-a-linked-list/'),

  ('Odd Even Linked List',
   'Segregating nodes based on alternating pointer jumps into odd/even chains.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/odd-even-linked-list/'),

  ('Split Linked List in Parts',
   'Calculating total length, then making precise pointer cuts into K parts.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/split-linked-list-in-parts/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Circular Array Loop',
   'Cycle detection in an array with forward/backward direction rules.',
   'hard', 'linked-list',
   'https://leetcode.com/problems/circular-array-loop/');

-- ── Sub-pattern: In-Place Reversal ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Reverse Linked List',
   'The holy grail template: prev, curr, and next pointers to reverse in-place.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/reverse-linked-list/'),

  ('Remove Linked List Elements',
   'Basic pointer skipping to remove all nodes with a given value.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/remove-linked-list-elements/'),

  ('Merge Two Sorted Lists',
   'Stitching pointers from two sorted lists without creating new nodes.',
   'easy', 'linked-list',
   'https://leetcode.com/problems/merge-two-sorted-lists/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Reverse Linked List II',
   'Reversing only a specific sub-list between positions left and right.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/reverse-linked-list-ii/'),

  ('Swap Nodes in Pairs',
   'Reversing the list in chunks of 2 nodes at a time.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/swap-nodes-in-pairs/'),

  ('Rotate List',
   'Connecting the tail to the head to form a ring, then breaking at the right spot.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/rotate-list/'),

  ('Add Two Numbers II',
   'Reversing both lists, adding digit by digit with carry, and reversing result.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/add-two-numbers-ii/'),

  ('Double a Number Represented as a Linked List',
   'Handling carry-over by reversing the list (or using a stack).',
   'medium', 'linked-list',
   'https://leetcode.com/problems/double-a-number-represented-as-a-linked-list/'),

  ('Partition List',
   'Maintaining two separate chains (less than / greater than pivot) and joining.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/partition-list/'),

  ('Insertion Sort List',
   'Safely breaking and inserting nodes into a growing sorted portion.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/insertion-sort-list/'),

  ('Remove Zero Sum Consecutive Nodes from Linked List',
   'Using a dummy node and prefix sums to remove zero-sum segments.',
   'medium', 'linked-list',
   'https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Reverse Nodes in k-Group',
   'The ultimate OA question: combining recursion with chunked k-node reversal.',
   'hard', 'linked-list',
   'https://leetcode.com/problems/reverse-nodes-in-k-group/'),

  ('Reverse Nodes in Even Length Groups',
   'A brutal twist on k-Group requiring counting group lengths on the fly.',
   'hard', 'linked-list',
   'https://leetcode.com/problems/reverse-nodes-in-even-length-groups/'),

  ('Merge k Sorted Lists',
   'Pointer manipulation integrated with a Priority Queue (Min-Heap).',
   'hard', 'linked-list',
   'https://leetcode.com/problems/merge-k-sorted-lists/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 8: STACKS & QUEUES (stacks-queues)
-- Sub-patterns: Monotonic Stack, Expression Evaluation, Design
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: Expression Evaluation & Design ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Valid Parentheses',
   'The absolute basics of stack pushing and popping for bracket matching.',
   'easy', 'stacks-queues',
   'https://leetcode.com/problems/valid-parentheses/'),

  ('Implement Queue using Stacks',
   'Moving data between two stacks to reverse order (LIFO → FIFO).',
   'easy', 'stacks-queues',
   'https://leetcode.com/problems/implement-queue-using-stacks/'),

  ('Implement Stack using Queues',
   'Simulating LIFO behavior using a standard queue.',
   'easy', 'stacks-queues',
   'https://leetcode.com/problems/implement-stack-using-queues/'),

  ('Remove All Adjacent Duplicates in String',
   'Stack-based removal of consecutive duplicate characters.',
   'easy', 'stacks-queues',
   'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/'),

  ('Next Greater Element I',
   'The foundational Monotonic Stack template for next-greater lookups.',
   'easy', 'stacks-queues',
   'https://leetcode.com/problems/next-greater-element-i/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Min Stack',
   'Designing a stack that returns the minimum element in O(1) time.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/min-stack/'),

  ('Evaluate Reverse Polish Notation',
   'Parsing tokens and performing math operations on popped stack elements.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/evaluate-reverse-polish-notation/'),

  ('Minimum Add to Make Parentheses Valid',
   'Counting unmatched open/close brackets without needing a physical stack.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/'),

  ('Decode String',
   'Handling nested brackets and multipliers (e.g., 3[a2[c]]) with a stack.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/decode-string/'),

  ('Simplify Path',
   'Splitting strings by / and popping directories on ".."; joining result.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/simplify-path/'),

  ('Basic Calculator II',
   'Handling operator precedence (* and / before + and -) without parentheses.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/basic-calculator-ii/'),

  ('Remove All Adjacent Duplicates in String II',
   'Stack of (char, count) pairs; pop when count reaches K.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/'),

  ('Remove Nodes From Linked List',
   'Use a monotonic stack to remove nodes smaller than a subsequent node.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/remove-nodes-from-linked-list/');

-- ── Sub-pattern: Monotonic Stack ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Next Greater Element II',
   'Handling a circular array using the modulo operator % with monotonic stack.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/next-greater-element-ii/'),

  ('Daily Temperatures',
   'Storing indexes (not values) in the stack to calculate wait-day distances.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/daily-temperatures/'),

  ('Online Stock Spanner',
   'Designing a class that uses a stack on a continuous data stream.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/online-stock-spanner/'),

  ('Remove K Digits',
   'A greedy monotonic stack — pop larger digits to keep the number small.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/remove-k-digits/'),

  ('Sum of Subarray Minimums',
   'Finding both "next smaller" and "previous smaller" simultaneously.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/sum-of-subarray-minimums/'),

  ('Asteroid Collision',
   'Stack simulation where elements destroy each other based on sign/magnitude.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/asteroid-collision/'),

  ('132 Pattern',
   'A highly specific 3-element trick using a stack to track the "2" element.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/132-pattern/'),

  ('Maximum Width Ramp',
   'Sorting stack indexes to find the widest valid gap.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/maximum-width-ramp/'),

  ('Shortest Unsorted Continuous Subarray',
   'Using the stack to find the exact boundaries where sorting breaks down.',
   'medium', 'stacks-queues',
   'https://leetcode.com/problems/shortest-unsorted-continuous-subarray/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Largest Rectangle in Histogram',
   'The absolute classic Hard OA question. Mastering area calculation on stack pops.',
   'hard', 'stacks-queues',
   'https://leetcode.com/problems/largest-rectangle-in-histogram/'),

  ('Maximal Rectangle',
   'Applying the Histogram logic row-by-row onto a 2D matrix.',
   'hard', 'stacks-queues',
   'https://leetcode.com/problems/maximal-rectangle/'),

  ('Longest Valid Parentheses',
   'Storing indexes in a stack to measure the length of valid bracket chunks.',
   'hard', 'stacks-queues',
   'https://leetcode.com/problems/longest-valid-parentheses/'),

  ('Constrained Subsequence Sum',
   'Combining DP with a Monotonic Queue (Deque) to optimize subarray selection.',
   'hard', 'stacks-queues',
   'https://leetcode.com/problems/constrained-subsequence-sum/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 9: TREES (trees)
-- Sub-patterns: Traversals, Mirror & Symmetry, Search/LCA,
--               Validation, Path Sum, Construction
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: Traversals ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Binary Tree Inorder Traversal',
   'Left → Root → Right. Master both recursive and iterative (stack) versions.',
   'easy', 'trees',
   'https://leetcode.com/problems/binary-tree-inorder-traversal/'),

  ('Binary Tree Preorder Traversal',
   'Root → Left → Right. The most natural recursive traversal.',
   'easy', 'trees',
   'https://leetcode.com/problems/binary-tree-preorder-traversal/'),

  ('Binary Tree Postorder Traversal',
   'Left → Right → Root. Trickiest iterative version — use two stacks or reverse.',
   'easy', 'trees',
   'https://leetcode.com/problems/binary-tree-postorder-traversal/'),

  ('Maximum Depth of Binary Tree',
   'The standard 1 + max(left, right) recursive base case.',
   'easy', 'trees',
   'https://leetcode.com/problems/maximum-depth-of-binary-tree/'),

  ('Minimum Depth of Binary Tree',
   'Careful: a node with one child is NOT a leaf; handle single-child case.',
   'easy', 'trees',
   'https://leetcode.com/problems/minimum-depth-of-binary-tree/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Binary Tree Level Order Traversal',
   'The standard BFS template using a Queue, processing level by level.',
   'medium', 'trees',
   'https://leetcode.com/problems/binary-tree-level-order-traversal/'),

  ('Binary Tree Level Order Traversal II',
   'Same as level order but reverse the final result (bottom-up).',
   'medium', 'trees',
   'https://leetcode.com/problems/binary-tree-level-order-traversal-ii/'),

  ('Binary Tree Zigzag Level Order Traversal',
   'BFS with a flag to reverse the list insertion every other level.',
   'medium', 'trees',
   'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/'),

  ('Binary Tree Right Side View',
   'Modifying BFS to only capture the last element in the queue per level.',
   'medium', 'trees',
   'https://leetcode.com/problems/binary-tree-right-side-view/'),

  ('Top View of Binary Tree',
   'Mapping horizontal distances (HD) to the first visible node via BFS.',
   'medium', 'trees',
   'https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1'),

  ('Bottom View of Binary Tree',
   'Mapping horizontal distances but continuously overwriting with deeper nodes.',
   'medium', 'trees',
   'https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1'),

  ('Boundary Traversal of Binary Tree',
   'Combining Left-view, Leaf-nodes, and reversed Right-view into one result.',
   'medium', 'trees',
   'https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Vertical Order Traversal of a Binary Tree',
   'Complex BFS/DFS tracking both X and Y coordinates in a TreeMap.',
   'hard', 'trees',
   'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/'),

  ('Serialize and Deserialize Binary Tree',
   'Converting a full tree architecture into a single string and back again.',
   'hard', 'trees',
   'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/');

-- ── Sub-pattern: Mirror & Symmetry ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Invert Binary Tree',
   'Swapping left and right child pointers at every node recursively.',
   'easy', 'trees',
   'https://leetcode.com/problems/invert-binary-tree/'),

  ('Symmetric Tree',
   'Mirroring the traversal: Left''s left must match Right''s right.',
   'easy', 'trees',
   'https://leetcode.com/problems/symmetric-tree/'),

  ('Same Tree',
   'Traversing two trees simultaneously and comparing node values.',
   'easy', 'trees',
   'https://leetcode.com/problems/same-tree/'),

  ('Subtree of Another Tree',
   'For each node in the main tree, check if it''s the root of a "Same Tree".',
   'easy', 'trees',
   'https://leetcode.com/problems/subtree-of-another-tree/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Flip Equivalent Binary Trees',
   'Two trees are flip equivalent if they match after optionally swapping children.',
   'medium', 'trees',
   'https://leetcode.com/problems/flip-equivalent-binary-trees/');

-- ── Sub-pattern: Search & LCA ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Search in a Binary Search Tree',
   'Leverage BST property: go left if target < root, right if target > root.',
   'easy', 'trees',
   'https://leetcode.com/problems/search-in-a-binary-search-tree/'),

  ('Two Sum IV - Input is a BST',
   'Combine BST traversal (inorder) with two-pointer or HashSet lookup.',
   'easy', 'trees',
   'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Lowest Common Ancestor of a BST',
   'Using BST property: split point where one value < root and other > root.',
   'medium', 'trees',
   'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/'),

  ('Lowest Common Ancestor of a Binary Tree',
   'Return the exact node where a non-null signal bubbles up from both left and right.',
   'medium', 'trees',
   'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/'),

  ('Lowest Common Ancestor of Deepest Leaves',
   'Find the subtree that contains all the deepest leaves.',
   'medium', 'trees',
   'https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves/'),

  ('Kth Smallest Element in a BST',
   'Inorder traversal of BST gives sorted order; return the Kth element.',
   'medium', 'trees',
   'https://leetcode.com/problems/kth-smallest-element-in-a-bst/');

-- ── Sub-pattern: Validation & Properties ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Balanced Binary Tree',
   'Returning -1 to instantly short-circuit the recursion if any subtree is unbalanced.',
   'easy', 'trees',
   'https://leetcode.com/problems/balanced-binary-tree/'),

  ('Diameter of Binary Tree',
   'Updating a global max variable (leftH + rightH) while calculating depths.',
   'easy', 'trees',
   'https://leetcode.com/problems/diameter-of-binary-tree/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Validate Binary Search Tree',
   'Passing strict min and max bounds down to children at each recursive call.',
   'medium', 'trees',
   'https://leetcode.com/problems/validate-binary-search-tree/'),

  ('Check Completeness of a Binary Tree',
   'BFS level order: once a null is seen, no non-null node should follow.',
   'medium', 'trees',
   'https://leetcode.com/problems/check-completeness-of-a-binary-tree/'),

  ('Recover Binary Search Tree',
   'Inorder traversal to find two swapped nodes; fix by swapping their values.',
   'medium', 'trees',
   'https://leetcode.com/problems/recover-binary-search-tree/');

-- ── Sub-pattern: Path Sum / Root to Leaf ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Path Sum',
   'Passing a remaining target sum down to the leaf nodes and checking equality.',
   'easy', 'trees',
   'https://leetcode.com/problems/path-sum/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Path Sum II',
   'Tracking the current path in an array and backtracking when popping up.',
   'medium', 'trees',
   'https://leetcode.com/problems/path-sum-ii/'),

  ('Path Sum III',
   'Prefix sum logic applied directly onto a tree path for any-start subpath sums.',
   'medium', 'trees',
   'https://leetcode.com/problems/path-sum-iii/'),

  ('Sum Root to Leaf Numbers',
   'Building an integer dynamically as you traverse down (val * 10 + current).',
   'medium', 'trees',
   'https://leetcode.com/problems/sum-root-to-leaf-numbers/'),

  ('Count Good Nodes in Binary Tree',
   'Passing the "maximum value seen so far" down the recursion tree.',
   'medium', 'trees',
   'https://leetcode.com/problems/count-good-nodes-in-binary-tree/'),

  ('All Nodes Distance K in Binary Tree',
   'Converting a Tree into an undirected Graph (parent pointers) and running BFS.',
   'medium', 'trees',
   'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/'),

  ('Amount of Time for Binary Tree to Be Infected',
   'Map parent pointers and run a level-order BFS from the infected node.',
   'medium', 'trees',
   'https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/'),

  ('Step-By-Step Directions From a Binary Tree Node to Another',
   'Finding the LCA, then generating "L", "R", and "U" string paths.',
   'medium', 'trees',
   'https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Binary Tree Maximum Path Sum',
   'Handling negative numbers while calculating the ultimate diameter-like sum.',
   'hard', 'trees',
   'https://leetcode.com/problems/binary-tree-maximum-path-sum/');

-- ── Sub-pattern: Construction ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Convert Sorted Array to Binary Search Tree',
   'Pick middle element as root, recurse on left and right halves.',
   'easy', 'trees',
   'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Construct Binary Tree from Preorder and Inorder Traversal',
   'Preorder gives root; inorder splits left/right. Map indexes for O(n) lookups.',
   'medium', 'trees',
   'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/'),

  ('Construct Binary Tree from Inorder and Postorder Traversal',
   'Postorder gives root (last element); inorder splits left/right subtrees.',
   'medium', 'trees',
   'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 10: HEAP / PRIORITY QUEUE (heap-pq)
-- Sub-patterns: Kth Element, Top K, Greedy+Heap, Two Heaps
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: Kth Element ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Kth Largest Element in a Stream',
   'Maintaining a Min-Heap of exact size K for streaming Kth largest.',
   'easy', 'heap-pq',
   'https://leetcode.com/problems/kth-largest-element-in-a-stream/'),

  ('Last Stone Weight',
   'Basic Max-Heap push and pop simulation until one stone remains.',
   'easy', 'heap-pq',
   'https://leetcode.com/problems/last-stone-weight/'),

  ('Kth Smallest Element',
   'Use a Max-Heap of size K; if new element is smaller, replace the top.',
   'easy', 'heap-pq',
   'https://www.geeksforgeeks.org/problems/kth-smallest-element5635/1'),

  ('The K Weakest Rows in a Matrix',
   'Count soldiers per row and use a min-heap to find K weakest.',
   'easy', 'heap-pq',
   'https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Kth Largest Element in an Array',
   'The classic Min-Heap filtering pattern — maintain heap of size K.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/kth-largest-element-in-an-array/'),

  ('Top K Frequent Elements',
   'Combining a HashMap (for counts) with a Heap (for sorting by count).',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/top-k-frequent-elements/'),

  ('Top K Frequent Words',
   'Custom sorting logic in a heap (count descending, then alphabetical order).',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/top-k-frequent-words/'),

  ('K Closest Points to Origin',
   'Calculating Euclidean distance and keeping the bottom K elements in a heap.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/k-closest-points-to-origin/'),

  ('Find K Closest Elements',
   'Binary search to find the window start, or use a heap for K closest to x.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/find-k-closest-elements/'),

  ('Kth Smallest Element in a Sorted Matrix',
   'Pushing matrix coordinates into a heap for multi-way merging.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/'),

  ('Find K Pairs with Smallest Sums',
   'Tracking combinations from two arrays using a min-heap.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/'),

  ('Seat Reservation Manager',
   'Simple class design wrapping a Min-Heap for smallest available seat.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/seat-reservation-manager/');

-- ── Sub-pattern: Heap as Pointer / Merge K ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Merge K Sorted Arrays',
   'Push one element from each array into a min-heap; pop and push next.',
   'medium', 'heap-pq',
   'https://www.geeksforgeeks.org/problems/merge-k-sorted-arrays/1');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Merge k Sorted Lists',
   'Pushing Linked List head nodes directly into the heap.',
   'hard', 'heap-pq',
   'https://leetcode.com/problems/merge-k-sorted-lists/');

-- ── Sub-pattern: Greedy + Heap ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Task Scheduler',
   'Using a Max-Heap alongside a cooldown Queue to schedule tasks optimally.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/task-scheduler/'),

  ('Reorganize String',
   'Popping the top two elements from a Max-Heap to alternate characters.',
   'medium', 'heap-pq',
   'https://leetcode.com/problems/reorganize-string/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Minimum Number of Refueling Stops',
   'Greedily refuel at the best past station using a Max-Heap of fuel values.',
   'hard', 'heap-pq',
   'https://leetcode.com/problems/minimum-number-of-refueling-stops/'),

  ('IPO',
   'Two-Heaps used sequentially (Min-Heap for capital cost, Max-Heap for profit).',
   'hard', 'heap-pq',
   'https://leetcode.com/problems/ipo/'),

  ('Course Schedule III',
   'Sort by deadline, greedily pick courses, replace longest with shorter if needed.',
   'hard', 'heap-pq',
   'https://leetcode.com/problems/course-schedule-iii/');

-- ── Sub-pattern: Two Heaps (Median) ──

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Find Median from Data Stream',
   'The classic Two-Heap pattern: balance a Max-Heap (left) and Min-Heap (right).',
   'hard', 'heap-pq',
   'https://leetcode.com/problems/find-median-from-data-stream/'),

  ('Sliding Window Median',
   'Two-Heaps combined with lazy deletion as the window slides.',
   'hard', 'heap-pq',
   'https://leetcode.com/problems/sliding-window-median/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 11: DYNAMIC PROGRAMMING (dynamic-programming)
-- Sub-patterns: 1D Basic, Subsequences, Knapsack, Counting, 2D Grid
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: 1D Basic DP ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Climbing Stairs',
   'The foundational 1D DP — Fibonacci variation: dp[i] = dp[i-1] + dp[i-2].',
   'easy', 'dynamic-programming',
   'https://leetcode.com/problems/climbing-stairs/'),

  ('Min Cost Climbing Stairs',
   'Adding a cost array to the basic Fibonacci-like state transition.',
   'easy', 'dynamic-programming',
   'https://leetcode.com/problems/min-cost-climbing-stairs/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('House Robber',
   'The classic "include or exclude" 1D DP: dp[i] = max(dp[i-1], dp[i-2] + val).',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/house-robber/'),

  ('House Robber II',
   'Handling a circular array: run House Robber twice (exclude first or last).',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/house-robber-ii/'),

  ('Decode Ways',
   'String parsing using 1D DP — each digit or pair of digits maps to a letter.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/decode-ways/'),

  ('Combination Sum IV',
   'Counting permutations of numbers that sum to a target using 1D DP.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/combination-sum-iv/');

-- ── Sub-pattern: DP on Subsequences ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Longest Common Subsequence',
   '2D DP comparing two strings character by character.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/longest-common-subsequence/'),

  ('Palindromic Substrings',
   'Expand around center or 2D DP to count all palindromic substrings.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/palindromic-substrings/'),

  ('Longest Palindromic Subsequence',
   'LCS of a string with its reverse gives the longest palindromic subsequence.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/longest-palindromic-subsequence/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Edit Distance',
   'The classic 2D DP with insert/delete/replace operations on two strings.',
   'hard', 'dynamic-programming',
   'https://leetcode.com/problems/edit-distance/');

-- ── Sub-pattern: Knapsack Problems ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Partition Equal Subset Sum',
   '0/1 Knapsack: can we find a subset that sums to total/2?',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/partition-equal-subset-sum/'),

  ('Target Sum',
   'Assign + or - to each number to reach target — maps to subset sum DP.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/target-sum/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Burst Balloons',
   'Interval DP: think about which balloon to burst LAST in each subarray.',
   'hard', 'dynamic-programming',
   'https://leetcode.com/problems/burst-balloons/');

-- ── Sub-pattern: Counting DP ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Coin Change',
   'Unbounded knapsack: find minimum coins to make amount. dp[0]=0, fill forward.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/coin-change/'),

  ('Coin Change II',
   'Count the number of combinations (not permutations) to make the amount.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/coin-change-ii/');

-- ── Sub-pattern: 2D Grid DP ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Minimum Path Sum',
   'Fill grid top-left to bottom-right: dp[i][j] = grid[i][j] + min(top, left).',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/minimum-path-sum/'),

  ('Unique Paths',
   'Count paths from top-left to bottom-right moving only right or down.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/unique-paths/'),

  ('Triangle',
   'Bottom-up DP on a triangle: at each cell, pick min of two children below.',
   'medium', 'dynamic-programming',
   'https://leetcode.com/problems/triangle/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 12: GRAPHS (graphs)
-- Sub-patterns: BFS/DFS, Grid-Based, Topological Sort, Union-Find,
--               Shortest Path, MST
-- ─────────────────────────────────────────────────────────────────────

-- ── Sub-pattern: Basics ──

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Print Adjacency List',
   'Construct an adjacency list representation from given edges and nodes.',
   'easy', 'graphs',
   'https://www.geeksforgeeks.org/problems/print-adjacency-list-1587115620/1'),

  ('Graph DFS Traversal',
   'Depth-First Search on a graph using recursion or an explicit stack.',
   'easy', 'graphs',
   'https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1'),

  ('Graph BFS Traversal',
   'Breadth-First Search on a graph using a queue, level by level.',
   'easy', 'graphs',
   'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1'),

  ('Flood Fill',
   'Grid-based DFS/BFS starting from a cell, coloring all connected same-value cells.',
   'easy', 'graphs',
   'https://leetcode.com/problems/flood-fill/');

-- ── Sub-pattern: Grid-Based BFS/DFS & Connected Components ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Number of Islands',
   'Count connected components of 1s in a 2D grid using DFS/BFS.',
   'medium', 'graphs',
   'https://leetcode.com/problems/number-of-islands/'),

  ('Number of Provinces',
   'Count connected components in an adjacency matrix using DFS or Union-Find.',
   'medium', 'graphs',
   'https://leetcode.com/problems/number-of-provinces/'),

  ('Max Area of Island',
   'DFS/BFS tracking the size of each island and returning the maximum.',
   'medium', 'graphs',
   'https://leetcode.com/problems/max-area-of-island/'),

  ('Surrounded Regions',
   'Start DFS from border O cells; everything else gets captured to X.',
   'medium', 'graphs',
   'https://leetcode.com/problems/surrounded-regions/'),

  ('Clone Graph',
   'Deep copy a graph using DFS/BFS with a HashMap to map old → new nodes.',
   'medium', 'graphs',
   'https://leetcode.com/problems/clone-graph/'),

  ('Is Graph Bipartite?',
   'BFS/DFS coloring: alternate colors and check for conflicts.',
   'medium', 'graphs',
   'https://leetcode.com/problems/is-graph-bipartite/'),

  ('Redundant Connection',
   'Union-Find to detect the edge that creates a cycle in an undirected graph.',
   'medium', 'graphs',
   'https://leetcode.com/problems/redundant-connection/');

-- ── Sub-pattern: Cycle Detection ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Detect Cycle in an Undirected Graph',
   'BFS/DFS cycle detection by tracking parent node in undirected traversal.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1'),

  ('Detect Cycle in a Directed Graph',
   'DFS with a recursion stack (or Kahn''s BFS) to detect back edges.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1');

-- ── Sub-pattern: Topological Sort / DAG ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Topological Sort',
   'BFS (Kahn''s) or DFS-based ordering of a directed acyclic graph.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/topological-sort/1'),

  ('Course Schedule',
   'Detect if you can finish all courses — check for cycles in prerequisite graph.',
   'medium', 'graphs',
   'https://leetcode.com/problems/course-schedule/'),

  ('Course Schedule II',
   'Return the actual topological ordering of courses, or empty if impossible.',
   'medium', 'graphs',
   'https://leetcode.com/problems/course-schedule-ii/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Alien Dictionary',
   'Build a directed graph from sorted alien words, then topological sort.',
   'hard', 'graphs',
   'https://www.geeksforgeeks.org/problems/alien-dictionary/1');

-- ── Sub-pattern: Multi-Source BFS ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Rotting Oranges',
   'Multi-source BFS from all rotten oranges simultaneously, tracking time levels.',
   'medium', 'graphs',
   'https://leetcode.com/problems/rotting-oranges/'),

  ('As Far from Land as Possible',
   'Multi-source BFS from all land cells to find the farthest water cell.',
   'medium', 'graphs',
   'https://leetcode.com/problems/as-far-from-land-as-possible/'),

  ('01 Matrix',
   'Multi-source BFS from all 0-cells to compute distance for each 1-cell.',
   'medium', 'graphs',
   'https://leetcode.com/problems/01-matrix/');

-- ── Sub-pattern: Shortest Path (BFS / Dijkstra / Bellman-Ford) ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Shortest Path in Undirected Graph (Unit Distance)',
   'Simple BFS from source gives shortest path when all edges have weight 1.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1'),

  ('Dijkstra''s Algorithm',
   'Min-Heap based shortest path for non-negative weighted graphs.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1'),

  ('Network Delay Time',
   'Dijkstra''s from source node; answer is max of all shortest distances.',
   'medium', 'graphs',
   'https://leetcode.com/problems/network-delay-time/'),

  ('Path With Minimum Effort',
   'Dijkstra on a grid where edge weight = absolute height difference.',
   'medium', 'graphs',
   'https://leetcode.com/problems/path-with-minimum-effort/'),

  ('Bellman-Ford Algorithm',
   'Handle negative edge weights; detect negative cycles after V-1 relaxations.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1'),

  ('Cheapest Flights Within K Stops',
   'Modified Bellman-Ford or BFS with K-level limit for cheapest path.',
   'medium', 'graphs',
   'https://leetcode.com/problems/cheapest-flights-within-k-stops/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Swim in Rising Water',
   'Binary search on answer + BFS, or Dijkstra on the grid elevation.',
   'hard', 'graphs',
   'https://leetcode.com/problems/swim-in-rising-water/'),

  ('Word Ladder',
   'BFS transforming words one letter at a time to reach the target word.',
   'hard', 'graphs',
   'https://leetcode.com/problems/word-ladder/'),

  ('Longest Increasing Path in a Matrix',
   'DFS with memoization on a grid; only move to strictly greater neighbors.',
   'hard', 'graphs',
   'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/');

-- ── Sub-pattern: Minimum Spanning Tree ──

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Prim''s MST Algorithm',
   'Greedy MST construction using a Min-Heap to always pick the cheapest edge.',
   'medium', 'graphs',
   'https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1'),

  ('Min Cost to Connect All Points',
   'Prim''s or Kruskal''s MST on a complete graph of point distances.',
   'medium', 'graphs',
   'https://leetcode.com/problems/min-cost-to-connect-all-points/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 13: GREEDY (greedy)
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Assign Cookies',
   'Sort both arrays; greedily assign smallest sufficient cookie to each child.',
   'easy', 'greedy',
   'https://leetcode.com/problems/assign-cookies/'),

  ('Lemonade Change',
   'Greedy cash register: always prefer giving $10 change over two $5 bills.',
   'easy', 'greedy',
   'https://leetcode.com/problems/lemonade-change/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Jump Game',
   'Track the farthest reachable index; if current index exceeds it, return false.',
   'medium', 'greedy',
   'https://leetcode.com/problems/jump-game/'),

  ('Jump Game II',
   'BFS-like level expansion: count jumps when you hit the current level boundary.',
   'medium', 'greedy',
   'https://leetcode.com/problems/jump-game-ii/'),

  ('Gas Station',
   'If total gas >= total cost, a solution exists. Find the starting point greedily.',
   'medium', 'greedy',
   'https://leetcode.com/problems/gas-station/'),

  ('Partition Labels',
   'Track last occurrence of each char; extend partition end greedily.',
   'medium', 'greedy',
   'https://leetcode.com/problems/partition-labels/'),

  ('Valid Parenthesis String',
   'Track min/max possible open count as * can be (, ), or empty.',
   'medium', 'greedy',
   'https://leetcode.com/problems/valid-parenthesis-string/'),

  ('Non-overlapping Intervals',
   'Sort by end time; greedily keep intervals that don''t overlap.',
   'medium', 'greedy',
   'https://leetcode.com/problems/non-overlapping-intervals/'),

  ('Minimum Number of Arrows to Burst Balloons',
   'Sort by end; one arrow covers all overlapping balloons at current end.',
   'medium', 'greedy',
   'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/');

-- 🔴 Hard
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Candy',
   'Two passes (left-to-right, right-to-left) to ensure both neighbor constraints.',
   'hard', 'greedy',
   'https://leetcode.com/problems/candy/');


-- ─────────────────────────────────────────────────────────────────────
-- PATTERN 14: BIT MANIPULATION (bit-manipulation)
-- ─────────────────────────────────────────────────────────────────────

-- 🟢 Easy
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Single Number',
   'The absolute core XOR trick: N ^ N = 0, so all pairs cancel out.',
   'easy', 'bit-manipulation',
   'https://leetcode.com/problems/single-number/'),

  ('Number of 1 Bits',
   'Using n & (n - 1) to drop the lowest set bit, counting iterations.',
   'easy', 'bit-manipulation',
   'https://leetcode.com/problems/number-of-1-bits/'),

  ('Counting Bits',
   'DP on bit counting: dp[i] = dp[i >> 1] + (i & 1), offsetting by powers of 2.',
   'easy', 'bit-manipulation',
   'https://leetcode.com/problems/counting-bits/'),

  ('Reverse Bits',
   'Shifting bits left and right to rebuild a reversed 32-bit integer.',
   'easy', 'bit-manipulation',
   'https://leetcode.com/problems/reverse-bits/'),

  ('Missing Number',
   'Using XOR on the range [0..n] to find the missing integer.',
   'easy', 'bit-manipulation',
   'https://leetcode.com/problems/missing-number/');

-- 🟡 Medium
INSERT INTO questions (title, description, difficulty, pattern_tag, external_url) VALUES
  ('Sum of Two Integers',
   'Adding numbers without the + operator using XOR (sum) and AND (carry).',
   'medium', 'bit-manipulation',
   'https://leetcode.com/problems/sum-of-two-integers/'),

  ('Single Number III',
   'Finding TWO unique numbers by isolating the rightmost set bit to create two XOR buckets.',
   'medium', 'bit-manipulation',
   'https://leetcode.com/problems/single-number-iii/');


-- ═══════════════════════════════════════════════════════════════════════
-- DONE! ✅  ~300 questions seeded across 14 patterns
-- ═══════════════════════════════════════════════════════════════════════
SELECT 'Pattern questions seeded successfully!' AS status;
