import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://hroewewttmkwjmjbmcxd.supabase.co';
const SUPABASE_SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is required to run the seeding script. Please check your .env or process arguments.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const infosysQuestions = [
  {
    title: '[HackWithINFY] Food Stamps',
    description: `You want to buy food from a store. You have a scoring system that uses a unit called taste points.
Each time you buy a type of food, you can measure its tastiness by the number of taste points you get from that food.
You have N types of food. You can buy any type any number of times, as long as the total number of meals does not exceed M.
However, you don't want to grow tired of a food if you buy it too often.
Therefore, you will get v[i] - d[i] * (t - 1) taste points when you buy the i-th type of food for the t-th time.
Find the maximum number of taste points you can achieve.`,
    story_description: 'Infosys HackWithINFY Easy Question',
    difficulty: 'easy',
    company_tag: 'infosys',
    pattern_tag: 'arrays',
    test_cases: [
      {
        input: "1\n1\n5\n2",
        expected_output: "5"
      },
      {
        input: "2\n2\n5\n7\n2\n4",
        expected_output: "12"
      },
      {
        input: "3\n5\n5\n7\n9\n2\n4\n6",
        expected_output: "27"
      }
    ]
  },
  {
    title: '[HackWithINFY] MSS With Swaps',
    description: `Given an array a of length n and an integer k. You must perform the following operation exactly k times: choose two indices i, j and swap(ai, aj).
Find the maximum possible MSS (maximum subarray sum) after performing the above operation exactly k times.
Note: Swapping the same pair again is allowed but useless (a double-swap cancels out). Therefore, performing exactly k swaps is equivalent to at most k useful swaps.`,
    story_description: 'Infosys HackWithINFY Medium Question',
    difficulty: 'medium',
    company_tag: 'infosys',
    pattern_tag: 'arrays',
    test_cases: [
      {
        input: "3\n1\n1\n-5\n2",
        expected_output: "3"
      },
      {
        input: "3\n0\n5\n-1\n5",
        expected_output: "2"
      },
      {
        input: "3\n0\n1\n-5\n2",
        expected_output: "2"
      }
    ]
  },
  {
    title: '[HackWithINFY] Lock & Parity',
    description: `You are given N locks in a row (1-indexed). Each lock i has a value L[i]. There is also one key under each lock, and key j has value L[j].
You may assign some keys to some locks under the following rules:
1. You may assign key j to lock i only if: j < i. (Each key can only be used on a lock to its right.)
2. Assignments where the key and lock have the same value are forbidden: L[j] != L[i]
3. Assigning key j to lock i gives effective value: E = |L[j] - L[i]|
4. Each lock can be assigned at most once, and each key can be used at most once.
5. Let 'even' be the number of assignments with even effective value, and 'odd' be the number of assignments with odd effective value. A set of assignments is valid only if: even >= odd.
6. You must perform at least one assignment.

Find the minimum possible sum of effective values over all valid assignment sets. If no valid set exists, output -1.`,
    story_description: 'Infosys HackWithINFY Hard Question',
    difficulty: 'hard',
    company_tag: 'infosys',
    pattern_tag: 'dynamic-programming',
    test_cases: [
      {
        input: "6\n41\n54\n15\n4\n54\n4",
        expected_output: "26"
      },
      {
        input: "6\n45\n6\n38\n15\n6\n38",
        expected_output: "30"
      },
      {
        input: "6\n6\n59\n1\n25\n59\n50",
        expected_output: "24"
      }
    ]
  },
  {
    title: '[HackWithINFY] Layer-Split Path Maximization',
    description: `You are given an undirected graph with N nodes and M edges. Each node u has a layer L[u] (integer from 1 to K) and a value V[u].
You must choose a simple path (no repeated nodes) such that:
- Layer Constraint Along the chosen path, the sequence of layers must be non-decreasing: L[u1] <= L[u2] <= ... <= L[ut]
- Penalty for Layer Jumps: whenever the path moves from a node with layer x to layer y where y > x, you pay a cost: penalty = (y-x)^2

Find the maximum value of (sum of V[u] over the path) - (sum of penalties).`,
    story_description: 'Infosys HackWithINFY Hard Question',
    difficulty: 'hard',
    company_tag: 'infosys',
    pattern_tag: 'graphs',
    test_cases: [
      {
        input: "3\n2\n3\n1 10\n2 20\n3 30\n0 1\n1 2",
        expected_output: "58"
      },
      {
        input: "3\n2\n3\n1 -5\n2 100\n3 -10\n0 1\n1 2",
        expected_output: "100"
      },
      {
        input: "2\n1\n10\n1 10\n3 100\n0 1",
        expected_output: "106"
      }
    ]
  },
  {
    title: '[HackWithINFY] Tree Beauty',
    description: `You are given a tree of n nodes, each node has a value a[i] written on it. The tree is rooted at node 1. A pair of nodes i, j (where 1 <= i < j <= n) is considered GOOD if a[i] * a[j] is a perfect square.

We define beauty(u) as the number of good pairs of nodes in the subtree of u. Your task is to find the sum of beauty(i) for each 1 <= i <= n. Return the sum of these values modulo 10^9 + 7.

Function Description

Name: get_ans

Parameters:
* n (INTEGER): The size of the tree
* par (INTEGER ARRAY): The parent array par[1] = 0
* a (INTEGER ARRAY): The values written on the nodes

Return: INTEGER - The sum of beauty of each node modulo 10^9 + 7`,
    story_description: 'Infosys HackWithINFY Easy Question',
    difficulty: 'easy',
    company_tag: 'infosys',
    pattern_tag: 'trees',
    test_cases: [
      {
        input: "5\n0\n1\n1\n2\n2\n2\n3\n6\n12\n27",
        expected_output: "6"
      },
      {
        input: "2\n0\n1\n4\n9",
        expected_output: "1"
      },
      {
        input: "3\n0\n1\n1\n2\n8\n18",
        expected_output: "3"
      }
    ]
  },
  {
    title: '[HackWithINFY] Good Subsequence with GCD',
    description: `You are given an array a of length n and an integer p. A non-empty subsequence of a is considered GOOD if:
1. The length of the subsequence is strictly less than n.
2. The greatest common divisor (GCD) of the elements of the subsequence is exactly p.

You must process q queries of the form i j: replace a[i] with j (where 1 <= i <= n and 1 <= j <= 10^5). After each query, check if there exists any good subsequence. If it exists, the answer to that query is YES. Find the number of queries that were answered YES.

Function Description

Name: get_ans

Parameters:
* n (INTEGER): The size of the array
* a (INTEGER ARRAY): The elements of the array
* p (INTEGER): The required gcd
* q (INTEGER): The number of queries
* queries (INTEGER 2D ARRAY): The queries, each formatted as [i, j]

Return: INTEGER - The number of queries answered YES`,
    story_description: 'Infosys HackWithINFY Medium Question',
    difficulty: 'medium',
    company_tag: 'infosys',
    pattern_tag: 'math',
    test_cases: [
      {
        input: "2\n3\n3\n6\n2\n2\n2 3\n1 6",
        expected_output: "2"
      },
      {
        input: "4\n3\n9\n12\n15\n18\n3\n3\n1 9\n2 6\n4 12",
        expected_output: "3"
      }
    ]
  },
  {
    title: '[HackWithINFY] Longest Non-Decreasing Subsequence with XOR',
    description: `You are given an array A of length N and an integer M. A subsequence of A is considered GOOD if:
1. The elements of the subsequence are non-decreasing.
2. The bitwise XOR of these elements is at least M.

Find the length of the longest good subsequence. If it is not possible to choose any subsequence, return 0.

Function Description

Name: get_ans

Parameters:
* N (INTEGER): The size of the array
* M (INTEGER): The minimum allowed XOR
* A (INTEGER ARRAY): The elements of the array

Return: INTEGER - The length of the longest good subsequence`,
    story_description: 'Infosys HackWithINFY Hard Question',
    difficulty: 'hard',
    company_tag: 'infosys',
    pattern_tag: 'dynamic-programming',
    test_cases: [
      {
        input: "2\n1\n1\n2",
        expected_output: "2"
      },
      {
        input: "2\n1\n1\n1",
        expected_output: "1"
      },
      {
        input: "4\n3\n1\n2\n3\n4",
        expected_output: "4"
      }
    ]
  },
  {
    title: '[HackWithINFY] Tree Edge Flipping with Pattern Matching',
    description: `You are given a rooted tree with N nodes labeled 0 to N-1 (root 0). Each node has a binary value Val[i] (0 or 1). The array Parent[i] defines the tree structure.

You may flip a set of parent-child edges such that no two flipped edges share a node (they form a matching). Flipping an edge toggles both endpoints' binary values (0 to 1, or 1 to 0) and costs M coins. Each edge can be flipped at most once.

For a binary string q, a root-to-leaf path is NATURAL if, after flips, its node values contain q as a contiguous substring.
For each of Q queries (binary strings), you must:
1. Choose valid flips to MAXIMIZE the number of natural root-to-leaf paths.
2. Among choices with maximum natural paths, pick the one with MINIMUM total cost (M * number of flipped edges).

Find the SUM OF MINIMUM COSTS over all Q queries.

Function Description

Name: get_ans

Parameters:
* N (INTEGER): Number of nodes
* M (INTEGER): Cost per flipped edge
* Parent (INTEGER ARRAY): Parent array
* Val (INTEGER ARRAY): Binary values at each node
* Q (INTEGER): Number of queries
* queries (STRING ARRAY): Binary string queries

Return: INTEGER - Sum of minimum costs for all queries`,
    story_description: 'Infosys HackWithINFY Hard Question',
    difficulty: 'hard',
    company_tag: 'infosys',
    pattern_tag: 'trees',
    test_cases: [
      {
        input: "6\n3\n0\n0\n0\n1\n1\n2\n1\n0\n1\n1\n2\n10\n011",
        expected_output: "6"
      },
      {
        input: "4\n3\n0\n0\n1\n1\n0\n0\n0\n2\n10\n11",
        expected_output: "3"
      },
      {
        input: "5\n3\n0\n0\n1\n1\n2\n0\n1\n0\n1\n0\n2\n01\n10",
        expected_output: "3"
      }
    ]
  }
];

async function seedInfosys() {
  console.log('Seeding Infosys questions...');
  
  for (const q of infosysQuestions) {
    try {
      const { data: existing, error: fetchErr } = await supabase
        .from('questions')
        .select('id')
        .eq('title', q.title)
        .maybeSingle();

      if (fetchErr) {
        console.error(`Error querying database for question "${q.title}":`, fetchErr.message);
        continue;
      }

      if (existing) {
        // Question exists, update it to make sure it contains correct content & test cases
        const { error: updateErr } = await supabase
          .from('questions')
          .update(q)
          .eq('id', existing.id);

        if (updateErr) {
          console.error(`❌ Error updating "${q.title}":`, updateErr.message);
        } else {
          console.log(`✅ Updated: "${q.title}"`);
        }
      } else {
        // Question does not exist, insert it
        const { error: insertErr } = await supabase
          .from('questions')
          .insert(q);

        if (insertErr) {
          console.error(`❌ Error inserting "${q.title}":`, insertErr.message);
        } else {
          console.log(`✨ Created: "${q.title}"`);
        }
      }
    } catch (e) {
      console.error(`An unexpected error occurred seeding "${q.title}":`, e);
    }
  }
  
  console.log('Finished seeding process!');
}

seedInfosys();
