import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://hroewewttmkwjmjbmcxd.supabase.co';
const SUPABASE_SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is required. Please check your .env or pass as argument.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Companies to distribute across
const COMPANIES = ['netflix', 'amazon', 'google', 'microsoft', 'meta', 'infosys'];

const leetcodeQuestions = [
  // ──────────── 1. TWO SUM ────────────
  {
    title: 'Two Sum',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.

**Input Format:**
- \`nums\`: integer array (1 <= nums.length <= 10^4)
- \`target\`: integer

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

**Topics:** Array, Hash Table`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/two-sum/',
    test_cases: [
      { input: '[2,7,11,15]\n9', expected_output: '[0,1]' },
      { input: '[3,2,4]\n6', expected_output: '[1,2]' },
      { input: '[3,3]\n6', expected_output: '[0,1]' },
      { input: '[1,5,3,7]\n10', expected_output: '[1,3]' },
      { input: '[-1,-2,-3,-4,-5]\n-8', expected_output: '[2,4]' },
      { input: '[0,4,3,0]\n0', expected_output: '[0,3]' },
    ]
  },

  // ──────────── 2. PALINDROME NUMBER ────────────
  {
    title: 'Palindrome Number',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

An integer is a palindrome when it reads the same forward and backward. For example, 121 is a palindrome while 123 is not.

**Input Format:**
- \`x\`: integer

**Constraints:**
- -2^31 <= x <= 2^31 - 1

**Topics:** Math`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'math',
    external_url: 'https://leetcode.com/problems/palindrome-number/',
    test_cases: [
      { input: '121', expected_output: 'true' },
      { input: '-121', expected_output: 'false' },
      { input: '10', expected_output: 'false' },
      { input: '0', expected_output: 'true' },
      { input: '1221', expected_output: 'true' },
      { input: '123456789', expected_output: 'false' },
    ]
  },

  // ──────────── 3. ADD TWO NUMBERS ────────────
  {
    title: 'Add Two Numbers',
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Input Format:**
- \`l1\`: ListNode (head of first linked list)
- \`l2\`: ListNode (head of second linked list)

**Constraints:**
- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.

**Topics:** Linked List, Math, Recursion`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'linked-list',
    external_url: 'https://leetcode.com/problems/add-two-numbers/',
    test_cases: [
      { input: '[2,4,3]\n[5,6,4]', expected_output: '[7,0,8]' },
      { input: '[0]\n[0]', expected_output: '[0]' },
      { input: '[9,9,9,9,9,9,9]\n[9,9,9,9]', expected_output: '[8,9,9,9,0,0,0,1]' },
      { input: '[1]\n[9,9]', expected_output: '[0,0,1]' },
      { input: '[5]\n[5]', expected_output: '[0,1]' },
    ]
  },

  // ──────────── 4. BEST TIME TO BUY AND SELL STOCK ────────────
  {
    title: 'Best Time to Buy and Sell Stock',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the i-th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve. If no profit is possible, return 0.

**Input Format:**
- \`prices\`: integer array

**Constraints:**
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4

**Topics:** Array, Dynamic Programming`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    test_cases: [
      { input: '[7,1,5,3,6,4]', expected_output: '5' },
      { input: '[7,6,4,3,1]', expected_output: '0' },
      { input: '[1,2]', expected_output: '1' },
      { input: '[2,4,1]', expected_output: '2' },
      { input: '[3,3,3,3]', expected_output: '0' },
      { input: '[1,10,2,8]', expected_output: '9' },
    ]
  },

  // ──────────── 5. LONGEST COMMON PREFIX ────────────
  {
    title: 'Longest Common Prefix',
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \`""\`.

**Input Format:**
- \`strs\`: array of strings

**Constraints:**
- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lowercase English letters.

**Topics:** String, Trie`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'strings',
    external_url: 'https://leetcode.com/problems/longest-common-prefix/',
    test_cases: [
      { input: '["flower","flow","flight"]', expected_output: '"fl"' },
      { input: '["dog","racecar","car"]', expected_output: '""' },
      { input: '["interview","inter","interact"]', expected_output: '"inter"' },
      { input: '["a"]', expected_output: '"a"' },
      { input: '["abc","abc","abc"]', expected_output: '"abc"' },
      { input: '["","b"]', expected_output: '""' },
    ]
  },

  // ──────────── 6. LONGEST CONSECUTIVE SEQUENCE ────────────
  {
    title: 'Longest Consecutive Sequence',
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

**Topics:** Array, Hash Table, Union Find`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    test_cases: [
      { input: '[100,4,200,1,3,2]', expected_output: '4' },
      { input: '[0,3,7,2,5,8,4,6,0,1]', expected_output: '9' },
      { input: '[]', expected_output: '0' },
      { input: '[1]', expected_output: '1' },
      { input: '[1,2,0,1]', expected_output: '3' },
      { input: '[-1,0,1,2,-2]', expected_output: '5' },
    ]
  },

  // ──────────── 7. TRAPPING RAIN WATER ────────────
  {
    title: 'Trapping Rain Water',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Input Format:**
- \`height\`: integer array

**Constraints:**
- n == height.length
- 1 <= n <= 2 * 10^4
- 0 <= height[i] <= 10^5

**Topics:** Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'hard',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/trapping-rain-water/',
    test_cases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expected_output: '6' },
      { input: '[4,2,0,3,2,5]', expected_output: '9' },
      { input: '[1,0,1]', expected_output: '1' },
      { input: '[3,0,0,2,0,4]', expected_output: '10' },
      { input: '[1,2,3,4,5]', expected_output: '0' },
      { input: '[5,4,3,2,1]', expected_output: '0' },
    ]
  },

  // ──────────── 8. LONGEST SUBSTRING WITHOUT REPEATING CHARACTERS ────────────
  {
    title: 'Longest Substring Without Repeating Characters',
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

**Input Format:**
- \`s\`: string

**Constraints:**
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces.

**Topics:** Hash Table, String, Sliding Window`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'sliding-window',
    external_url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    test_cases: [
      { input: '"abcabcbb"', expected_output: '3' },
      { input: '"bbbbb"', expected_output: '1' },
      { input: '"pwwkew"', expected_output: '3' },
      { input: '""', expected_output: '0' },
      { input: '"dvdf"', expected_output: '3' },
      { input: '"aab"', expected_output: '2' },
    ]
  },

  // ──────────── 9. ROMAN TO INTEGER ────────────
  {
    title: 'Roman to Integer',
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M with values 1, 5, 10, 50, 100, 500, 1000 respectively.

Given a Roman numeral string \`s\`, convert it to an integer. Subtractive notation rules apply (e.g., IV = 4, IX = 9, XL = 40, etc.)

**Input Format:**
- \`s\`: string (valid Roman numeral)

**Constraints:**
- 1 <= s.length <= 15
- s contains only ('I','V','X','L','C','D','M')
- It is guaranteed that s is a valid Roman numeral in the range [1, 3999].

**Topics:** Hash Table, Math, String`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'strings',
    external_url: 'https://leetcode.com/problems/roman-to-integer/',
    test_cases: [
      { input: '"III"', expected_output: '3' },
      { input: '"LVIII"', expected_output: '58' },
      { input: '"MCMXCIV"', expected_output: '1994' },
      { input: '"IV"', expected_output: '4' },
      { input: '"IX"', expected_output: '9' },
      { input: '"MMMCMXCIX"', expected_output: '3999' },
    ]
  },

  // ──────────── 10. MEDIAN OF TWO SORTED ARRAYS ────────────
  {
    title: 'Median of Two Sorted Arrays',
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).

**Input Format:**
- \`nums1\`: sorted integer array
- \`nums2\`: sorted integer array

**Constraints:**
- nums1.length == m, nums2.length == n
- 0 <= m <= 1000, 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6

**Topics:** Array, Binary Search, Divide and Conquer`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'hard',
    pattern_tag: 'binary-search',
    external_url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    test_cases: [
      { input: '[1,3]\n[2]', expected_output: '2.00000' },
      { input: '[1,2]\n[3,4]', expected_output: '2.50000' },
      { input: '[]\n[1]', expected_output: '1.00000' },
      { input: '[2]\n[]', expected_output: '2.00000' },
      { input: '[1,3,5]\n[2,4,6]', expected_output: '3.50000' },
      { input: '[0,0]\n[0,0]', expected_output: '0.00000' },
    ]
  },

  // ──────────── 11. MERGE INTERVALS ────────────
  {
    title: 'Merge Intervals',
    description: `Given an array of \`intervals\` where intervals[i] = [start_i, end_i], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Input Format:**
- \`intervals\`: 2D integer array, each element is [start, end]

**Constraints:**
- 1 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= start_i <= end_i <= 10^4

**Topics:** Array, Sorting`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/merge-intervals/',
    test_cases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', expected_output: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', expected_output: '[[1,5]]' },
      { input: '[[1,4],[0,4]]', expected_output: '[[0,4]]' },
      { input: '[[1,4],[2,3]]', expected_output: '[[1,4]]' },
      { input: '[[1,2],[3,4],[5,6]]', expected_output: '[[1,2],[3,4],[5,6]]' },
      { input: '[[1,10],[2,3],[4,5],[6,7]]', expected_output: '[[1,10]]' },
    ]
  },

  // ──────────── 12. 3SUM ────────────
  {
    title: '3Sum',
    description: `Given an integer array \`nums\`, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.

The solution set must not contain duplicate triplets.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 3 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5

**Topics:** Array, Two Pointers, Sorting`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/3sum/',
    test_cases: [
      { input: '[-1,0,1,2,-1,-4]', expected_output: '[[-1,-1,2],[-1,0,1]]' },
      { input: '[0,1,1]', expected_output: '[]' },
      { input: '[0,0,0]', expected_output: '[[0,0,0]]' },
      { input: '[-2,0,0,2,2]', expected_output: '[[-2,0,2]]' },
      { input: '[1,2,-2,-1]', expected_output: '[]' },
    ]
  },

  // ──────────── 13. 4SUM ────────────
  {
    title: '4Sum',
    description: `Given an array \`nums\` of n integers and an integer \`target\`, return all unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that a, b, c, d are distinct indices and nums[a]+nums[b]+nums[c]+nums[d] == target.

**Input Format:**
- \`nums\`: integer array
- \`target\`: integer

**Constraints:**
- 1 <= nums.length <= 200
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9

**Topics:** Array, Two Pointers, Sorting`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/4sum/',
    test_cases: [
      { input: '[1,0,-1,0,-2,2]\n0', expected_output: '[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]' },
      { input: '[2,2,2,2,2]\n8', expected_output: '[[2,2,2,2]]' },
      { input: '[0,0,0,0]\n0', expected_output: '[[0,0,0,0]]' },
      { input: '[-1,0,1,2,-1,-4]\n-1', expected_output: '[[-4,0,1,2],[-1,-1,0,1]]' },
    ]
  },

  // ──────────── 14. ZIGZAG CONVERSION ────────────
  {
    title: 'Zigzag Conversion',
    description: `The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows. Given a string \`s\` and \`numRows\`, return the result read line by line.

Example with numRows = 3:
\`\`\`
P   A   H   N
A P L S I I G
Y   I   R
\`\`\`
Result: "PAHNAPLSIIGYIR"

**Input Format:**
- \`s\`: string
- \`numRows\`: integer

**Constraints:**
- 1 <= s.length <= 1000
- s consists of English letters (lower/upper), ',' and '.'
- 1 <= numRows <= 1000

**Topics:** String`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'strings',
    external_url: 'https://leetcode.com/problems/zigzag-conversion/',
    test_cases: [
      { input: '"PAYPALISHIRING"\n3', expected_output: '"PAHNAPLSIIGYIR"' },
      { input: '"PAYPALISHIRING"\n4', expected_output: '"PINALSIGYAHRPI"' },
      { input: '"A"\n1', expected_output: '"A"' },
      { input: '"AB"\n1', expected_output: '"AB"' },
      { input: '"ABCDE"\n2', expected_output: '"ACEBD"' },
      { input: '"ABCDEF"\n3', expected_output: '"AEBDFC"' },
    ]
  },

  // ──────────── 15. VALID PARENTHESES ────────────
  {
    title: 'Valid Parentheses',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Input Format:**
- \`s\`: string

**Constraints:**
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'

**Topics:** String, Stack`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'stacks',
    external_url: 'https://leetcode.com/problems/valid-parentheses/',
    test_cases: [
      { input: '"()"', expected_output: 'true' },
      { input: '"()[]{}"', expected_output: 'true' },
      { input: '"(]"', expected_output: 'false' },
      { input: '"([)]"', expected_output: 'false' },
      { input: '"{[]}"', expected_output: 'true' },
      { input: '"((("', expected_output: 'false' },
    ]
  },

  // ──────────── 16. TOP K FREQUENT WORDS ────────────
  {
    title: 'Top K Frequent Words',
    description: `Given an array of strings \`words\` and an integer \`k\`, return the k most frequent strings. Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

**Input Format:**
- \`words\`: string array
- \`k\`: integer

**Constraints:**
- 1 <= words.length <= 500
- 1 <= words[i].length <= 10
- words[i] consists of lowercase English letters.
- k is in the range [1, the number of unique words[i]]

**Topics:** Hash Table, String, Trie, Sorting, Heap (Priority Queue), Bucket Sort, Counting`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'hash-table',
    external_url: 'https://leetcode.com/problems/top-k-frequent-words/',
    test_cases: [
      { input: '["i","love","leetcode","i","love","coding"]\n2', expected_output: '["i","love"]' },
      { input: '["the","day","is","sunny","the","the","the","sunny","is","is"]\n4', expected_output: '["the","is","sunny","day"]' },
      { input: '["a","aa","aaa"]\n1', expected_output: '["a"]' },
      { input: '["a"]\n1', expected_output: '["a"]' },
    ]
  },

  // ──────────── 17. SINGLE NUMBER ────────────
  {
    title: 'Single Number',
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.

You must implement a solution with linear runtime complexity and use only constant extra space.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- -3 * 10^4 <= nums[i] <= 3 * 10^4
- Each element appears exactly twice except for one element which appears once.

**Topics:** Array, Bit Manipulation`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'bit-manipulation',
    external_url: 'https://leetcode.com/problems/single-number/',
    test_cases: [
      { input: '[2,2,1]', expected_output: '1' },
      { input: '[4,1,2,1,2]', expected_output: '4' },
      { input: '[1]', expected_output: '1' },
      { input: '[0,1,0]', expected_output: '1' },
      { input: '[7,3,5,3,5]', expected_output: '7' },
      { input: '[-1,-1,99]', expected_output: '99' },
    ]
  },

  // ──────────── 18. CONTAINER WITH MOST WATER ────────────
  {
    title: 'Container With Most Water',
    description: `You are given an integer array \`height\` of length n. There are n vertical lines drawn such that the two endpoints of the i-th line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.

**Input Format:**
- \`height\`: integer array

**Constraints:**
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4

**Topics:** Array, Two Pointers, Greedy`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/container-with-most-water/',
    test_cases: [
      { input: '[1,8,6,2,5,4,8,3,7]', expected_output: '49' },
      { input: '[1,1]', expected_output: '1' },
      { input: '[4,3,2,1,4]', expected_output: '16' },
      { input: '[1,2,1]', expected_output: '2' },
      { input: '[2,3,10,5,7,8,9]', expected_output: '36' },
      { input: '[0,0]', expected_output: '0' },
    ]
  },

  // ──────────── 19. REMOVE DUPLICATES FROM SORTED ARRAY ────────────
  {
    title: 'Remove Duplicates from Sorted Array',
    description: `Given an integer array \`nums\` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same.

Return \`k\` after placing the final result in the first k slots of nums. Do not allocate extra space; you must do this in-place with O(1) extra memory.

**Input Format:**
- \`nums\`: sorted integer array (modified in-place)

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- -100 <= nums[i] <= 100
- nums is sorted in non-decreasing order.

**Topics:** Array, Two Pointers`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
    test_cases: [
      { input: '[1,1,2]', expected_output: 'k=2, nums=[1,2,_]' },
      { input: '[0,0,1,1,1,2,2,3,3,4]', expected_output: 'k=5, nums=[0,1,2,3,4,_,_,_,_,_]' },
      { input: '[1]', expected_output: 'k=1, nums=[1]' },
      { input: '[1,1,1,1]', expected_output: 'k=1, nums=[1,_,_,_]' },
      { input: '[-3,-1,0,0,0,3,3]', expected_output: 'k=4, nums=[-3,-1,0,3,_,_,_]' },
      { input: '[1,2,3,4,5]', expected_output: 'k=5, nums=[1,2,3,4,5]' },
    ]
  },

  // ──────────── 20. NEXT PERMUTATION ────────────
  {
    title: 'Next Permutation',
    description: `A permutation of an array of integers is an arrangement of its members into a sequence. The next permutation of an array of integers is the next lexicographically greater permutation.

If no next permutation exists (the arrangement is the last permutation), rearrange it as the lowest possible order (sorted in ascending order). The replacement must be in place and use only constant extra memory.

**Input Format:**
- \`nums\`: integer array (modified in-place)

**Constraints:**
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100

**Topics:** Array, Two Pointers`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/next-permutation/',
    test_cases: [
      { input: '[1,2,3]', expected_output: '[1,3,2]' },
      { input: '[3,2,1]', expected_output: '[1,2,3]' },
      { input: '[1,1,5]', expected_output: '[1,5,1]' },
      { input: '[1]', expected_output: '[1]' },
      { input: '[2,3,1]', expected_output: '[3,1,2]' },
      { input: '[1,3,2]', expected_output: '[2,1,3]' },
    ]
  },

  // ──────────── 21. SLIDING WINDOW MAXIMUM ────────────
  {
    title: 'Sliding Window Maximum',
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position, return the max value in the window.

**Input Format:**
- \`nums\`: integer array
- \`k\`: integer (window size)

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length

**Topics:** Array, Queue, Sliding Window, Heap, Monotonic Queue`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'hard',
    pattern_tag: 'sliding-window',
    external_url: 'https://leetcode.com/problems/sliding-window-maximum/',
    test_cases: [
      { input: '[1,3,-1,-3,5,3,6,7]\n3', expected_output: '[3,3,5,5,6,7]' },
      { input: '[1]\n1', expected_output: '[1]' },
      { input: '[9,11]\n2', expected_output: '[11]' },
      { input: '[4,-2,1,3,5]\n2', expected_output: '[4,1,3,5]' },
      { input: '[2,1,5,3,6,4,8,7]\n3', expected_output: '[5,5,6,6,8,8]' },
      { input: '[-7,-8,-5,-6]\n2', expected_output: '[-7,-5,-5]' },
    ]
  },

  // ──────────── 22. PASCAL'S TRIANGLE ────────────
  {
    title: "Pascal's Triangle",
    description: `Given an integer \`numRows\`, return the first numRows of Pascal's triangle. In Pascal's triangle, each number is the sum of the two numbers directly above it.

**Input Format:**
- \`numRows\`: integer

**Constraints:**
- 1 <= numRows <= 30

**Topics:** Array, Dynamic Programming`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/pascals-triangle/',
    test_cases: [
      { input: '5', expected_output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' },
      { input: '1', expected_output: '[[1]]' },
      { input: '2', expected_output: '[[1],[1,1]]' },
      { input: '4', expected_output: '[[1],[1,1],[1,2,1],[1,3,3,1]]' },
      { input: '3', expected_output: '[[1],[1,1],[1,2,1]]' },
    ]
  },

  // ──────────── 23. DIAMETER OF BINARY TREE ────────────
  {
    title: 'Diameter of Binary Tree',
    description: `Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

The length of a path between two nodes is the number of edges between them.

**Input Format:**
- \`root\`: TreeNode (binary tree root)

**Constraints:**
- The number of nodes in the tree is in the range [1, 10^4].
- -100 <= Node.val <= 100

**Topics:** Tree, DFS, Binary Tree`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'trees',
    external_url: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    test_cases: [
      { input: '[1,2,3,4,5]', expected_output: '3' },
      { input: '[1,2]', expected_output: '1' },
      { input: '[1]', expected_output: '0' },
      { input: '[1,null,2,null,3,null,4]', expected_output: '3' },
    ]
  },

  // ──────────── 24. FIND PEAK ELEMENT ────────────
  {
    title: 'Find Peak Element',
    description: `A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array \`nums\`, find a peak element and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞. You must write an algorithm that runs in O(log n) time.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 1 <= nums.length <= 1000
- -2^31 <= nums[i] <= 2^31 - 1
- nums[i] != nums[i + 1] for all valid i.

**Topics:** Array, Binary Search`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'binary-search',
    external_url: 'https://leetcode.com/problems/find-peak-element/',
    test_cases: [
      { input: '[1,2,3,1]', expected_output: '2' },
      { input: '[1,2,1,3,5,6,4]', expected_output: '1 or 5' },
      { input: '[1]', expected_output: '0' },
      { input: '[3,2,1]', expected_output: '0' },
      { input: '[1,2,3]', expected_output: '2' },
    ]
  },

  // ──────────── 25. LONGEST PALINDROMIC SUBSTRING ────────────
  {
    title: 'Longest Palindromic Substring',
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.

**Input Format:**
- \`s\`: string

**Constraints:**
- 1 <= s.length <= 1000
- s consist of only digits and English letters.

**Topics:** String, Dynamic Programming`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/longest-palindromic-substring/',
    test_cases: [
      { input: '"babad"', expected_output: '"bab" or "aba"' },
      { input: '"cbbd"', expected_output: '"bb"' },
      { input: '"a"', expected_output: '"a"' },
      { input: '"ac"', expected_output: '"a"' },
      { input: '"racecar"', expected_output: '"racecar"' },
    ]
  },

  // ──────────── 26. SET MATRIX ZEROES ────────────
  {
    title: 'Set Matrix Zeroes',
    description: `Given an m x n integer matrix \`matrix\`, if an element is 0, set its entire row and column to 0's. You must do it in place.

**Input Format:**
- \`matrix\`: 2D integer array (m x n)

**Constraints:**
- m == matrix.length, n == matrix[0].length
- 1 <= m, n <= 200
- -2^31 <= matrix[i][j] <= 2^31 - 1

**Topics:** Array, Hash Table, Matrix`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/set-matrix-zeroes/',
    test_cases: [
      { input: '[[1,1,1],[1,0,1],[1,1,1]]', expected_output: '[[1,0,1],[0,0,0],[1,0,1]]' },
      { input: '[[0,1,2,0],[3,4,5,2],[1,3,1,5]]', expected_output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' },
      { input: '[[1]]', expected_output: '[[1]]' },
      { input: '[[0]]', expected_output: '[[0]]' },
      { input: '[[1,2],[3,0]]', expected_output: '[[1,0],[0,0]]' },
    ]
  },

  // ──────────── 27. MOVE ZEROES ────────────
  {
    title: 'Move Zeroes',
    description: `Given an integer array \`nums\`, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.

**Input Format:**
- \`nums\`: integer array (modified in-place)

**Constraints:**
- 1 <= nums.length <= 10^4
- -2^31 <= nums[i] <= 2^31 - 1

**Topics:** Array, Two Pointers`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/move-zeroes/',
    test_cases: [
      { input: '[0,1,0,3,12]', expected_output: '[1,3,12,0,0]' },
      { input: '[0]', expected_output: '[0]' },
      { input: '[1,0,0,3]', expected_output: '[1,3,0,0]' },
      { input: '[0,0,0,1]', expected_output: '[1,0,0,0]' },
      { input: '[1,2,3]', expected_output: '[1,2,3]' },
      { input: '[0,0,1,0,2,0,3]', expected_output: '[1,2,3,0,0,0,0]' },
    ]
  },

  // ──────────── 28. WORD BREAK ────────────
  {
    title: 'Word Break',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

**Input Format:**
- \`s\`: string
- \`wordDict\`: string array

**Constraints:**
- 1 <= s.length <= 300
- 1 <= wordDict.length <= 1000
- 1 <= wordDict[i].length <= 20
- s and wordDict[i] consist of only lowercase English letters.
- All the strings of wordDict are unique.

**Topics:** Hash Table, String, Dynamic Programming, Trie, Memoization`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/word-break/',
    test_cases: [
      { input: '"leetcode"\n["leet","code"]', expected_output: 'true' },
      { input: '"applepenapple"\n["apple","pen"]', expected_output: 'true' },
      { input: '"catsandog"\n["cats","dog","sand","and","cat"]', expected_output: 'false' },
      { input: '"a"\n["a"]', expected_output: 'true' },
      { input: '"bb"\n["a","b","bbb","bbbb"]', expected_output: 'true' },
      { input: '"goalspecial"\n["go","goal","goals","special"]', expected_output: 'true' },
    ]
  },

  // ──────────── 29. NUMBER OF ISLANDS ────────────
  {
    title: 'Number of Islands',
    description: `Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

Assume all four edges of the grid are surrounded by water.

**Input Format:**
- \`grid\`: 2D char array ('1' = land, '0' = water)

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.

**Topics:** Array, DFS, BFS, Union Find, Matrix`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'graphs',
    external_url: 'https://leetcode.com/problems/number-of-islands/',
    test_cases: [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected_output: '1' },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected_output: '3' },
      { input: '[["1"]]', expected_output: '1' },
      { input: '[["0"]]', expected_output: '0' },
      { input: '[["1","0","1"],["0","1","0"],["1","0","1"]]', expected_output: '5' },
      { input: '[["1","1"],["1","1"]]', expected_output: '1' },
    ]
  },

  // ──────────── 30. FIRST MISSING POSITIVE ────────────
  {
    title: 'First Missing Positive',
    description: `Given an unsorted integer array \`nums\`, return the smallest missing positive integer. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1

**Topics:** Array, Hash Table`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'hard',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/first-missing-positive/',
    test_cases: [
      { input: '[1,2,0]', expected_output: '3' },
      { input: '[3,4,-1,1]', expected_output: '2' },
      { input: '[7,8,9,11,12]', expected_output: '1' },
      { input: '[1]', expected_output: '2' },
      { input: '[1,2,3,4,5]', expected_output: '6' },
      { input: '[0,-1,3,1,2]', expected_output: '4' },
    ]
  },

  // ──────────── 31. MINIMUM WINDOW SUBSTRING ────────────
  {
    title: 'Minimum Window Substring',
    description: `Given two strings \`s\` and \`t\` of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.

If there is no such substring, return the empty string "". The testcases are generated such that the answer is unique.

**Input Format:**
- \`s\`: string
- \`t\`: string

**Constraints:**
- m == s.length, n == t.length
- 1 <= m, n <= 10^5
- s and t consist of uppercase and lowercase English letters.

**Topics:** Hash Table, String, Sliding Window`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'hard',
    pattern_tag: 'sliding-window',
    external_url: 'https://leetcode.com/problems/minimum-window-substring/',
    test_cases: [
      { input: '"ADOBECODEBANC"\n"ABC"', expected_output: '"BANC"' },
      { input: '"a"\n"a"', expected_output: '"a"' },
      { input: '"a"\n"aa"', expected_output: '""' },
      { input: '"aa"\n"aa"', expected_output: '"aa"' },
      { input: '"cabwefgewcwaefgcf"\n"cae"', expected_output: '"cwae"' },
    ]
  },

  // ──────────── 32. GROUP ANAGRAMS ────────────
  {
    title: 'Group Anagrams',
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Input Format:**
- \`strs\`: string array

**Constraints:**
- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- strs[i] consists of lowercase English letters.

**Topics:** Array, Hash Table, String, Sorting`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'hash-table',
    external_url: 'https://leetcode.com/problems/group-anagrams/',
    test_cases: [
      { input: '["eat","tea","tan","ate","nat","bat"]', expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: '[""]', expected_output: '[[""]]' },
      { input: '["a"]', expected_output: '[["a"]]' },
      { input: '["abc","bca","cab","xyz","zyx"]', expected_output: '[["abc","bca","cab"],["xyz","zyx"]]' },
      { input: '["",""]', expected_output: '[["",""]]' },
    ]
  },

  // ──────────── 33. LONGEST INCREASING SUBSEQUENCE ────────────
  {
    title: 'Longest Increasing Subsequence',
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 1 <= nums.length <= 2500
- -10^4 <= nums[i] <= 10^4

**Topics:** Array, Binary Search, Dynamic Programming`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    test_cases: [
      { input: '[10,9,2,5,3,7,101,18]', expected_output: '4' },
      { input: '[0,1,0,3,2,3]', expected_output: '4' },
      { input: '[7,7,7,7,7,7,7]', expected_output: '1' },
      { input: '[1,3,6,7,9,4,10,5,6]', expected_output: '6' },
    ]
  },

  // ──────────── 34. COIN CHANGE ────────────
  {
    title: 'Coin Change',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.

**Input Format:**
- \`coins\`: integer array
- \`amount\`: integer

**Constraints:**
- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10^4

**Topics:** Array, Dynamic Programming, BFS`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/coin-change/',
    test_cases: [
      { input: '[1,5,11]\n11', expected_output: '1' },
      { input: '[2]\n3', expected_output: '-1' },
      { input: '[1]\n0', expected_output: '0' },
      { input: '[1,2,5]\n11', expected_output: '3' },
      { input: '[186,419,83,408]\n6249', expected_output: '20' },
    ]
  },

  // ──────────── 35. PRODUCT OF ARRAY EXCEPT SELF ────────────
  {
    title: 'Product of Array Except Self',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30
- The product of any prefix or suffix of nums fits in a 32-bit integer.

**Topics:** Array, Prefix Sum`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'prefix-sum',
    external_url: 'https://leetcode.com/problems/product-of-array-except-self/',
    test_cases: [
      { input: '[1,2,3,4]', expected_output: '[24,12,8,6]' },
      { input: '[-1,1,0,-3,3]', expected_output: '[0,0,9,0,0]' },
      { input: '[2,3]', expected_output: '[3,2]' },
      { input: '[0,0]', expected_output: '[0,0]' },
    ]
  },

  // ──────────── 36. REVERSE LINKED LIST ────────────
  {
    title: 'Reverse Linked List',
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

**Input Format:**
- \`head\`: ListNode

**Constraints:**
- The number of nodes in the list is in the range [0, 5000].
- -5000 <= Node.val <= 5000

**Topics:** Linked List, Recursion`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'linked-list',
    external_url: 'https://leetcode.com/problems/reverse-linked-list/',
    test_cases: [
      { input: '[1,2,3,4,5]', expected_output: '[5,4,3,2,1]' },
      { input: '[1,2]', expected_output: '[2,1]' },
      { input: '[]', expected_output: '[]' },
      { input: '[1]', expected_output: '[1]' },
    ]
  },

  // ──────────── 37. MERGE TWO SORTED LISTS ────────────
  {
    title: 'Merge Two Sorted Lists',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

**Input Format:**
- \`list1\`: ListNode
- \`list2\`: ListNode

**Constraints:**
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.

**Topics:** Linked List, Recursion`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'linked-list',
    external_url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    test_cases: [
      { input: '[1,2,4]\n[1,3,4]', expected_output: '[1,1,2,3,4,4]' },
      { input: '[]\n[]', expected_output: '[]' },
      { input: '[]\n[0]', expected_output: '[0]' },
      { input: '[5]\n[1,2,4]', expected_output: '[1,2,4,5]' },
    ]
  },

  // ──────────── 38. BINARY TREE LEVEL ORDER TRAVERSAL ────────────
  {
    title: 'Binary Tree Level Order Traversal',
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Input Format:**
- \`root\`: TreeNode

**Constraints:**
- The number of nodes in the tree is in the range [0, 2000].
- -1000 <= Node.val <= 1000

**Topics:** Tree, BFS, Binary Tree`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'trees',
    external_url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    test_cases: [
      { input: '[3,9,20,null,null,15,7]', expected_output: '[[3],[9,20],[15,7]]' },
      { input: '[1]', expected_output: '[[1]]' },
      { input: '[]', expected_output: '[]' },
      { input: '[1,2,3,4,5]', expected_output: '[[1],[2,3],[4,5]]' },
    ]
  },

  // ──────────── 39. MAXIMUM SUBARRAY ────────────
  {
    title: 'Maximum Subarray',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

**Topics:** Array, Divide and Conquer, Dynamic Programming`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/maximum-subarray/',
    test_cases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected_output: '6' },
      { input: '[1]', expected_output: '1' },
      { input: '[5,4,-1,7,8]', expected_output: '23' },
      { input: '[-1]', expected_output: '-1' },
      { input: '[-2,-1]', expected_output: '-1' },
    ]
  },

  // ──────────── 40. SEARCH IN ROTATED SORTED ARRAY ────────────
  {
    title: 'Search in Rotated Sorted Array',
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values). Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index.

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or -1 if it is not in \`nums\`.

You must write an algorithm with O(log n) runtime complexity.

**Input Format:**
- \`nums\`: integer array
- \`target\`: integer

**Constraints:**
- 1 <= nums.length <= 5000
- -10^4 <= nums[i] <= 10^4
- All values of nums are unique.
- nums is an ascending array that is possibly rotated.
- -10^4 <= target <= 10^4

**Topics:** Array, Binary Search`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'binary-search',
    external_url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    test_cases: [
      { input: '[4,5,6,7,0,1,2]\n0', expected_output: '4' },
      { input: '[4,5,6,7,0,1,2]\n3', expected_output: '-1' },
      { input: '[1]\n0', expected_output: '-1' },
      { input: '[1]\n1', expected_output: '0' },
      { input: '[3,1]\n1', expected_output: '1' },
    ]
  },

  // ──────────── 41. CLIMBING STAIRS ────────────
  {
    title: 'Climbing Stairs',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Input Format:**
- \`n\`: integer

**Constraints:**
- 1 <= n <= 45

**Topics:** Math, Dynamic Programming, Memoization`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'easy',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/climbing-stairs/',
    test_cases: [
      { input: '2', expected_output: '2' },
      { input: '3', expected_output: '3' },
      { input: '1', expected_output: '1' },
      { input: '5', expected_output: '8' },
      { input: '10', expected_output: '89' },
    ]
  },

  // ──────────── 42. HOUSE ROBBER ────────────
  {
    title: 'House Robber',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected — if two adjacent houses were broken into on the same night, it will automatically contact the police.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Input Format:**
- \`nums\`: integer array

**Constraints:**
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 400

**Topics:** Array, Dynamic Programming`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'dynamic-programming',
    external_url: 'https://leetcode.com/problems/house-robber/',
    test_cases: [
      { input: '[1,2,3,1]', expected_output: '4' },
      { input: '[2,7,9,3,1]', expected_output: '12' },
      { input: '[2,1,1,2]', expected_output: '4' },
      { input: '[1]', expected_output: '1' },
      { input: '[0]', expected_output: '0' },
    ]
  },

  // ──────────── 43. SORT COLORS ────────────
  {
    title: 'Sort Colors',
    description: `Given an array \`nums\` with \`n\` objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively. You must solve this problem without using the library's sort function.

**Input Format:**
- \`nums\`: integer array (values are 0, 1, or 2)

**Constraints:**
- n == nums.length
- 1 <= n <= 300
- nums[i] is either 0, 1, or 2.

**Topics:** Array, Two Pointers, Sorting`,
    story_description: 'LeetCode Top Interview Question (Dutch National Flag Problem)',
    difficulty: 'medium',
    pattern_tag: 'two-pointers',
    external_url: 'https://leetcode.com/problems/sort-colors/',
    test_cases: [
      { input: '[2,0,2,1,1,0]', expected_output: '[0,0,1,1,2,2]' },
      { input: '[2,0,1]', expected_output: '[0,1,2]' },
      { input: '[0]', expected_output: '[0]' },
      { input: '[1]', expected_output: '[1]' },
      { input: '[1,2,0]', expected_output: '[0,1,2]' },
    ]
  },

  // ──────────── 44. VALIDATE BINARY SEARCH TREE ────────────
  {
    title: 'Validate Binary Search Tree',
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

**Input Format:**
- \`root\`: TreeNode

**Constraints:**
- The number of nodes in the tree is in the range [1, 10^4].
- -2^31 <= Node.val <= 2^31 - 1

**Topics:** Tree, DFS, Binary Search Tree, Binary Tree`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'trees',
    external_url: 'https://leetcode.com/problems/validate-binary-search-tree/',
    test_cases: [
      { input: '[2,1,3]', expected_output: 'true' },
      { input: '[5,1,4,null,null,3,6]', expected_output: 'false' },
      { input: '[1]', expected_output: 'true' },
      { input: '[5,4,6,null,null,3,7]', expected_output: 'false' },
    ]
  },

  // ──────────── 45. SUBARRAY SUM EQUALS K ────────────
  {
    title: 'Subarray Sum Equals K',
    description: `Given an array of integers \`nums\` and an integer \`k\`, return the total number of subarrays whose sum equals to \`k\`.

A subarray is a contiguous non-empty sequence of elements within an array.

**Input Format:**
- \`nums\`: integer array
- \`k\`: integer

**Constraints:**
- 1 <= nums.length <= 2 * 10^4
- -1000 <= nums[i] <= 1000
- -10^7 <= k <= 10^7

**Topics:** Array, Hash Table, Prefix Sum`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'prefix-sum',
    external_url: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    test_cases: [
      { input: '[1,1,1]\n2', expected_output: '2' },
      { input: '[1,2,3]\n3', expected_output: '2' },
      { input: '[1]\n0', expected_output: '0' },
      { input: '[1,-1,0]\n0', expected_output: '3' },
    ]
  },

  // ──────────── 46. IMPLEMENT TRIE (PREFIX TREE) ────────────
  {
    title: 'Implement Trie (Prefix Tree)',
    description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the Trie class:
- \`Trie()\` — Initializes the trie object.
- \`void insert(String word)\` — Inserts the string word into the trie.
- \`boolean search(String word)\` — Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
- \`boolean startsWith(String prefix)\` — Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

**Constraints:**
- 1 <= word.length, prefix.length <= 2000
- word and prefix consist only of lowercase English letters.
- At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.

**Topics:** Hash Table, String, Design, Trie`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'tries',
    external_url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    test_cases: [
      { input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', expected_output: '[null,null,true,false,true,null,true]' },
    ]
  },

  // ──────────── 47. LRU CACHE ────────────
  {
    title: 'LRU Cache',
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.
- \`int get(int key)\` Return the value of the key if the key exists, otherwise return -1.
- \`void put(int key, int value)\` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

**Constraints:**
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls will be made to get and put.

**Topics:** Hash Table, Linked List, Design, Doubly-Linked List`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'design',
    external_url: 'https://leetcode.com/problems/lru-cache/',
    test_cases: [
      { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', expected_output: '[null,null,null,1,null,-1,null,-1,3,4]' },
    ]
  },

  // ──────────── 48. ROTATE IMAGE ────────────
  {
    title: 'Rotate Image',
    description: `You are given an n x n 2D \`matrix\` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

**Input Format:**
- \`matrix\`: n x n 2D integer array

**Constraints:**
- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000

**Topics:** Array, Math, Matrix`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/rotate-image/',
    test_cases: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected_output: '[[7,4,1],[8,5,2],[9,6,3]]' },
      { input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', expected_output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]' },
      { input: '[[1]]', expected_output: '[[1]]' },
      { input: '[[1,2],[3,4]]', expected_output: '[[3,1],[4,2]]' },
    ]
  },

  // ──────────── 49. SPIRAL MATRIX ────────────
  {
    title: 'Spiral Matrix',
    description: `Given an m x n \`matrix\`, return all elements of the matrix in spiral order.

**Input Format:**
- \`matrix\`: 2D integer array

**Constraints:**
- m == matrix.length, n == matrix[i].length
- 1 <= m, n <= 10
- -100 <= matrix[i][j] <= 100

**Topics:** Array, Matrix, Simulation`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'medium',
    pattern_tag: 'arrays',
    external_url: 'https://leetcode.com/problems/spiral-matrix/',
    test_cases: [
      { input: '[[1,2,3],[4,5,6],[7,8,9]]', expected_output: '[1,2,3,6,9,8,7,4,5]' },
      { input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]', expected_output: '[1,2,3,4,8,12,11,10,9,5,6,7]' },
      { input: '[[1]]', expected_output: '[1]' },
      { input: '[[7],[9],[6]]', expected_output: '[7,9,6]' },
    ]
  },

  // ──────────── 50. MAXIMAL RECTANGLE ────────────
  {
    title: 'Maximal Rectangle',
    description: `Given a rows x cols binary \`matrix\` filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

**Input Format:**
- \`matrix\`: 2D char array ('0' and '1')

**Constraints:**
- rows == matrix.length, cols == matrix[i].length
- 1 <= row, cols <= 200
- matrix[i][j] is '0' or '1'.

**Topics:** Array, Dynamic Programming, Stack, Matrix, Monotonic Stack`,
    story_description: 'LeetCode Top Interview Question',
    difficulty: 'hard',
    pattern_tag: 'stacks',
    external_url: 'https://leetcode.com/problems/maximal-rectangle/',
    test_cases: [
      { input: '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', expected_output: '6' },
      { input: '[["0"]]', expected_output: '0' },
      { input: '[["1"]]', expected_output: '1' },
      { input: '[["0","0"]]', expected_output: '0' },
    ]
  },
];

// Assign company tags by distributing equally across all companies (round-robin)
const questionsWithCompanies = leetcodeQuestions.map((q, index) => ({
  ...q,
  company_tag: COMPANIES[index % COMPANIES.length],
}));

async function seedLeetcode() {
  console.log('================================================================================');
  console.log('          SEEDING LEETCODE QUESTION BANK — 50 Questions');
  console.log('          Distributing equally across:', COMPANIES.join(', '));
  console.log('================================================================================\n');

  let created = 0, updated = 0, failed = 0;

  for (const q of questionsWithCompanies) {
    try {
      const { data: existing, error: fetchErr } = await supabase
        .from('questions')
        .select('id')
        .eq('title', q.title)
        .eq('company_tag', q.company_tag)
        .maybeSingle();

      if (fetchErr) {
        console.error(`  ❌ Error querying "${q.title}":`, fetchErr.message);
        failed++;
        continue;
      }

      if (existing) {
        const { error: updateErr } = await supabase
          .from('questions')
          .update(q)
          .eq('id', existing.id);

        if (updateErr) {
          console.error(`  ❌ Error updating "${q.title}" [${q.company_tag}]:`, updateErr.message);
          failed++;
        } else {
          console.log(`  ✅ Updated: "${q.title}" → ${q.company_tag}`);
          updated++;
        }
      } else {
        const { error: insertErr } = await supabase
          .from('questions')
          .insert(q);

        if (insertErr) {
          console.error(`  ❌ Error inserting "${q.title}" [${q.company_tag}]:`, insertErr.message);
          failed++;
        } else {
          console.log(`  ✨ Created: "${q.title}" → ${q.company_tag}`);
          created++;
        }
      }
    } catch (e) {
      console.error(`  💥 Unexpected error for "${q.title}":`, e);
      failed++;
    }
  }

  console.log('\n================================================================================');
  console.log(`  DONE! Created: ${created} | Updated: ${updated} | Failed: ${failed}`);
  console.log('================================================================================');
}

seedLeetcode();
