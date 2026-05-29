import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing Supabase credentials in server/.env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const questions = [
  {
    title: 'FOOD STAMPS',
    description: `You want to buy food from a store. You have a scoring system that uses a unit called taste points.
Each time you buy a type of food, you can measure its tastiness by the number of taste points you get from that food.
You have N types of food. You can buy any type any number of times, as long as the total number of meals does not exceed M.
However, you don't want to grow tired of a food if you buy it too often.
Therefore, you will get v[i] - d[i] * (t - 1) taste points when you buy the i-th type of food for the t-th time.
Find the maximum number of taste points you can achieve.

**Input Format:**
- The first line contains an integer, n, denoting the number of types of food you can buy.
- The next line contains an integer, m, denoting the maximum number of meals you can buy.
- Each line i of the n subsequent lines contains an integer describing v[i].
- Each line i of the n subsequent lines contains an integer describing d[i].

**Constraints:**
- 1 <= n <= 10^5
- 1 <= m <= 10^9
- 1 <= v[i] <= 10^9
- 1 <= d[i] <= 10^9`,
    story_description: "You're optimizing a diet plan for an Infosys employee cafeteria. Maximizing taste while limiting repetitive meals!",
    difficulty: 'easy',
    company_tag: 'infosys',
    pattern_tag: 'greedy',
    test_cases: [
      { input: "1\n1\n5\n2", expected_output: "5" },
      { input: "2\n2\n5\n7\n2\n4", expected_output: "12" },
      { input: "3\n5\n5\n7\n9\n2\n4\n6", expected_output: "27" }
    ]
  },
  {
    title: 'MSS WITH SWAPS',
    description: `Given an array a of length n and an integer k. You must perform the following operation exactly k times: choose two indices i, j and swap(a[i], a[j]).
Find the maximum possible MSS (maximum subarray sum) after performing the above operation exactly k times.

**Note:**
Swapping the same pair again is allowed but useless (a double-swap cancels out). Therefore, performing exactly k swaps is equivalent to at most k useful swaps.

**Input Format:**
- The first line contains an integer, n, denoting the size of array
- The next line contains an integer, k, denoting the number of swaps.
- Each line i of the n subsequent lines contains an integer describing a[i].

**Constraints:**
- 2 <= n <= 500
- 0 <= k <= n
- -1000 <= a[i] <= 1000`,
    story_description: "An Infosys trading system needs to maximize contiguous profit segments in an array, with the ability to correct a few erroneous records by swapping them.",
    difficulty: 'medium',
    company_tag: 'infosys',
    pattern_tag: 'dynamic-programming',
    test_cases: [
      { input: "3\n1\n1\n-5\n2", expected_output: "3" },
      { input: "3\n0\n5\n-1\n5", expected_output: "9" },
      { input: "3\n0\n1\n-5\n2", expected_output: "2" }
    ]
  },
  {
    title: 'LOCK & PARITY',
    description: `You are given N locks in a row (1-indexed). Each lock i has a value L[i]. There is also one key under each lock, and key j has value L[j].

You may assign some keys to some locks under the following rules:
1. You may assign key j to lock i only if: j < i. (Each key can only be used on a lock to its right.)
2. Assignments where the key and lock have the same value are forbidden: L[j] != L[i]. (So the effective value is never zero.)
3. Assigning key j to lock i gives an effective value: E = |L[j] - L[i]|
4. Each lock can be assigned at most once, and each key can be used at most once.
5. Let \`even\` be the number of assignments with even effective value, and \`odd\` be the number of assignments with odd effective value. A set of assignments is valid only if: \`even >= odd\`. This condition applies to the final chosen set.
6. You must perform at least one assignment.

Find the minimum possible sum of effective values over all valid assignment sets. If no valid set exists, output -1.

**Input Format:**
- The first line contains an integer, N, denoting the number of locks.
- Each line i of the N subsequent lines contains an integer describing L[i].

**Constraints:**
- 1 <= N <= 200
- 1 <= L[i] <= 10^5`,
    story_description: "An Infosys cybersecurity module requires you to match cryptographic keys to locks while adhering to strict parity and directionality rules to minimize risk exposure.",
    difficulty: 'hard',
    company_tag: 'infosys',
    pattern_tag: 'graphs',
    test_cases: [
      { input: "6\n41\n54\n15\n4\n54\n4", expected_output: "26" },
      { input: "6\n45\n6\n38\n15\n38\n38", expected_output: "30" },
      { input: "6\n6\n59\n1\n25\n59\n50", expected_output: "24" }
    ]
  },
  {
    title: 'Layer-Split Path Maximization with Penalties',
    description: `You are given an undirected graph with N nodes and M edges. Each node u has a layer L[u] (integer from 1 to K) and a value V[u].

You must choose a simple path (no repeated nodes) such that:
- **Layer Constraint**: Along the chosen path, the sequence of layers must be non-decreasing: L[u1] <= L[u2] <= ... <= L[ut]
- **Penalty for Layer Jumps**: whenever the path moves from a node with layer x to layer y where y > x, you pay a cost: penalty = (y - x)^2

Find the maximum value of (sum of V[u] over the path) - (sum of penalties).

**Input Format:**
- The first line contains an integer, N (number of nodes).
- The next line contains an integer, M (number of edges).
- The next line contains an integer, K (max layer).
- Each line i of the N subsequent lines contains 2 space separated integers describing the layer and value of node i (0-indexed).
- Each line i of the M subsequent lines contains 2 space separated integers u and v denoting an undirected edge.

**Constraints:**
- 1 <= N, M, K <= 10^5
- -10^9 <= V[u] <= 10^9`,
    story_description: "An Infosys cloud architecture uses multiple service layers. Route a request to maximize service value while minimizing the architectural penalty of crossing layers.",
    difficulty: 'hard',
    company_tag: 'infosys',
    pattern_tag: 'graphs',
    test_cases: [
      { input: "3\n2\n3\n1 10\n2 20\n3 30\n0 1\n1 2", expected_output: "58" },
      { input: "3\n2\n3\n1 -5\n2 100\n3 -10\n0 1\n1 2", expected_output: "100" },
      { input: "2\n1\n10\n1 10\n3 100\n0 1", expected_output: "106" }
    ]
  }
];

async function seedInfosysQuestions() {
  console.log("Seeding HackWithINFY questions into database...");
  
  for (const q of questions) {
    const { data, error } = await supabase
      .from('questions')
      .insert([q])
      .select()
      .single();
      
    if (error) {
      console.error('Failed to insert ' + q.title + ':', error.message);
    } else {
      console.log('Successfully inserted: ' + q.title);
    }
  }
  
  console.log("Seeding complete!");
}

seedInfosysQuestions();
