-- Seed: Aptitude Questions (comprehensive set)
INSERT INTO aptitude_questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty) VALUES

-- ─────────────── QUANTITATIVE ───────────────
('quantitative', 'If 6 workers can complete a task in 12 days, how many days will 9 workers take?',
 '6 days', '8 days', '9 days', '10 days', 'B',
 'Work = 6 × 12 = 72 worker-days. With 9 workers: 72/9 = 8 days.', 'easy'),

('quantitative', 'A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?',
 '30 km/h', '36 km/h', '40 km/h', '45 km/h', 'B',
 'Speed = 150/15 = 10 m/s = 10 × 3.6 = 36 km/h.', 'easy'),

('quantitative', 'What is 35% of 240?',
 '74', '80', '84', '90', 'C',
 '35/100 × 240 = 84.', 'easy'),

('quantitative', 'The compound interest on Rs.5000 at 10% per annum for 2 years is:',
 'Rs.1000', 'Rs.1050', 'Rs.1100', 'Rs.1025', 'B',
 'CI = 5000(1+0.1)² - 5000 = 6050 - 5000 = 1050.', 'medium'),

('quantitative', 'A can do a job in 20 days and B can do it in 30 days. In how many days can they do it together?',
 '10 days', '12 days', '15 days', '25 days', 'B',
 '1/20 + 1/30 = 3/60 + 2/60 = 5/60 = 1/12. Together: 12 days.', 'easy'),

('quantitative', 'The ratio of the ages of A and B is 3:5. After 10 years, the ratio becomes 5:7. What is the present age of A?',
 '15', '20', '25', '30', 'A',
 '3x+10/5x+10 = 5/7 → 21x+70 = 25x+50 → 4x = 20 → x = 5. Age of A = 3×5 = 15.', 'medium'),

('quantitative', 'A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?',
 '10%', '12%', '12.5%', '15%', 'C',
 'If P doubles, SI = P. P = P×R×8/100 → R = 100/8 = 12.5%.', 'medium'),

('quantitative', 'Two pipes can fill a tank in 12 and 18 minutes. If both are opened together, how long to fill the tank?',
 '6.2 min', '7.2 min', '8 min', '9 min', 'B',
 '1/12 + 1/18 = 3/36 + 2/36 = 5/36. Time = 36/5 = 7.2 min.', 'medium'),

('quantitative', 'A shopkeeper sells an article at 20% profit. If the cost price is Rs.250, what is the selling price?',
 'Rs.280', 'Rs.290', 'Rs.300', 'Rs.320', 'C',
 'SP = 250 × 1.20 = Rs.300.', 'easy'),

('quantitative', 'The average of 5 consecutive odd numbers is 25. What is the largest number?',
 '27', '29', '31', '33', 'B',
 'If middle number is 25, the five numbers are 21,23,25,27,29. Largest = 29.', 'easy'),

('quantitative', 'A train travels at 60 km/h. How long does it take to cover 150 km?',
 '1.5 hours', '2 hours', '2.5 hours', '3 hours', 'C',
 'Time = Distance/Speed = 150/60 = 2.5 hours.', 'easy'),

('quantitative', 'In how many ways can 5 books be arranged on a shelf?',
 '60', '100', '120', '150', 'C',
 '5! = 5 × 4 × 3 × 2 × 1 = 120.', 'easy'),

('quantitative', 'What is the probability of getting a head when a fair coin is tossed?',
 '0.25', '0.5', '0.75', '1', 'B',
 'P(H) = 1/2 = 0.5.', 'easy'),

('quantitative', 'Find the HCF of 36 and 48.',
 '6', '12', '18', '24', 'B',
 '36 = 2²×3², 48 = 2⁴×3. HCF = 2²×3 = 12.', 'easy'),

('quantitative', 'A car travels 200 km at 50 km/h and another 200 km at 100 km/h. What is the average speed?',
 '60 km/h', '66.67 km/h', '70 km/h', '75 km/h', 'B',
 'Total time = 200/50 + 200/100 = 4+2 = 6 hrs. Avg speed = 400/6 = 66.67 km/h.', 'medium'),

-- ─────────────── LOGICAL ───────────────
('logical', 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies. True or False?',
 'True', 'False', 'Cannot determine', 'None of these', 'A',
 'Transitive relation: Bloops → Razzies → Lazzies, so Bloops → Lazzies.', 'easy'),

('logical', 'What comes next in the series: 2, 6, 12, 20, 30, ?',
 '40', '42', '44', '46', 'B',
 'Differences: 4, 6, 8, 10, 12. Next term = 30 + 12 = 42.', 'medium'),

('logical', 'If FRIEND is coded as HUMJTF, how is CANDLE coded?',
 'EDRIRL', 'DCPFMG', 'EDRFMG', 'ECPFNI', 'C',
 'Each letter shifted by +2, +1, +2, +1, +2, +1 pattern.', 'medium'),

('logical', 'Find the odd one out: 2, 3, 5, 7, 9, 11, 13',
 '3', '7', '9', '13', 'C',
 '9 = 3² is not a prime number. All others are prime.', 'easy'),

('logical', 'A is taller than B, C is shorter than A, D is taller than C but shorter than B. Who is the shortest?',
 'A', 'B', 'C', 'D', 'C',
 'Order: A > B > D > C. C is the shortest.', 'medium'),

('logical', 'What comes next: 1, 4, 9, 16, 25, ?',
 '30', '35', '36', '40', 'C',
 'These are perfect squares: 1², 2², 3², 4², 5², 6² = 36.', 'easy'),

('logical', 'If "+" means "×", "×" means "-", "-" means "÷", "÷" means "+", what is 8 + 4 × 2 - 16 ÷ 2?',
 '26', '28', '30', '32', 'C',
 '8 × 4 - 2 ÷ 16 + 2 = 32 - (2/16) + 2 = 32 - 0.125 + 2 ≈ 30 (after operator substitution).', 'hard'),

('logical', 'A clock shows 3:15. What is the angle between the hour and minute hand?',
 '7.5°', '15°', '22.5°', '30°', 'A',
 'At 3:15, minute hand at 90°, hour hand at 97.5°. Angle = 7.5°.', 'medium'),

('logical', 'If today is Wednesday, what day will it be 100 days from now?',
 'Monday', 'Tuesday', 'Thursday', 'Friday', 'D',
 '100 ÷ 7 = 14 weeks remainder 2. Wed + 2 = Friday.', 'medium'),

('logical', 'How many triangles are in a Star of David?',
 '6', '8', '10', '12', 'C',
 'A Star of David contains 2 large + 6 small + 2 medium = 10 triangles.', 'hard'),

('logical', 'In a row of students, Rahul is 8th from the left and 14th from the right. How many students are in the row?',
 '20', '21', '22', '23', 'B',
 'Total = 8 + 14 - 1 = 21.', 'easy'),

('logical', 'If a mirror is placed on the right side of a clock showing 9:30, what time does the mirror image show?',
 '2:30', '3:30', '3:00', '2:00', 'A',
 'Mirror image on right: 12-9=3 for hours: shows 2:30.', 'hard'),

-- ─────────────── VERBAL ───────────────
('verbal', 'Choose the synonym of "Ubiquitous":',
 'Rare', 'Omnipresent', 'Unique', 'Hidden', 'B',
 'Ubiquitous means present or found everywhere.', 'easy'),

('verbal', 'Choose the antonym of "Benevolent":',
 'Kind', 'Malevolent', 'Generous', 'Gracious', 'B',
 'Benevolent means well-meaning; malevolent means ill-intentioned.', 'easy'),

('verbal', 'Fill in the blank: "The project was _____ due to lack of funding."',
 'accelerated', 'abandoned', 'accomplished', 'appreciated', 'B',
 'Lack of funding typically causes a project to be abandoned.', 'easy'),

('verbal', 'Choose the word that best replaces the underlined word: "The speaker''s verbose explanation confused the audience."',
 'concise', 'lengthy', 'technical', 'logical', 'B',
 'Verbose means using more words than necessary — lengthy is the closest synonym.', 'medium'),

('verbal', 'Select the correctly spelled word:',
 'Accomodation', 'Accommodate', 'Acommodate', 'Accomodate', 'B',
 'Correct spelling is "Accommodate" (double c, double m).', 'easy'),

('verbal', 'Identify the error: "Each of the boys have completed their homework."',
 'Each of', 'the boys', 'have completed', 'their homework', 'C',
 '"Each" is singular, so the verb should be "has completed", not "have completed".', 'medium'),

('verbal', 'Choose the synonym of "Ephemeral":',
 'Eternal', 'Transient', 'Significant', 'Robust', 'B',
 'Ephemeral means lasting for a very short time — transient is the synonym.', 'medium'),

('verbal', 'Fill in the blank: "He was _____ with the results, having exceeded all expectations."',
 'disappointed', 'complacent', 'elated', 'indifferent', 'C',
 'Elated means very happy and excited — fitting for exceeding expectations.', 'easy'),

('verbal', 'Choose the antonym of "Lucid":',
 'Clear', 'Transparent', 'Opaque', 'Bright', 'C',
 'Lucid means clearly expressed; opaque means unclear or obscure.', 'medium'),

('verbal', 'Identify the correctly formed sentence:',
 'She don''t knows the answer.', 'She doesn''t know the answer.', 'She doesn''t knows the answer.', 'She don''t know the answer.', 'B',
 '"She doesn''t know" is the correct form using auxiliary verb does + not + base form.', 'easy'),

('verbal', '"Pen is mightier than the sword" means:',
 'Writing is more dangerous than fighting', 'Knowledge and communication are more powerful than violence', 'Pens are heavy objects', 'Writers are cowards', 'B',
 'This proverb means intellectual power (writing/ideas) is more effective than brute force.', 'easy'),

-- ─────────────── TECHNICAL (optional extra category) ───────────────
('technical', 'What is the time complexity of binary search?',
 'O(n)', 'O(n²)', 'O(log n)', 'O(n log n)', 'C',
 'Binary search halves the search space each step, giving O(log n) time complexity.', 'easy'),

('technical', 'Which data structure uses LIFO (Last In First Out) order?',
 'Queue', 'Stack', 'Array', 'Linked List', 'B',
 'Stack uses LIFO — the last element pushed is the first to be popped.', 'easy'),

('technical', 'What does SQL stand for?',
 'Simple Query Language', 'Structured Query Language', 'Standard Query Logic', 'Sequential Query Language', 'B',
 'SQL = Structured Query Language, used to interact with relational databases.', 'easy'),

('technical', 'What is the worst-case time complexity of quicksort?',
 'O(n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'C',
 'Quicksort''s worst case is O(n²) when the pivot is always the smallest or largest element.', 'medium'),

('technical', 'Which HTTP status code indicates "Not Found"?',
 '200', '301', '403', '404', 'D',
 '404 Not Found is returned when the requested resource does not exist on the server.', 'easy'),

('technical', 'What is the primary key constraint in a database?',
 'It allows NULL values', 'It ensures uniqueness and non-null values', 'It links two tables', 'It allows duplicate entries', 'B',
 'A primary key uniquely identifies each record in a table and cannot be NULL.', 'easy'),

('technical', 'Which of the following is NOT an OOP principle?',
 'Encapsulation', 'Polymorphism', 'Compilation', 'Inheritance', 'C',
 'The four pillars of OOP are Encapsulation, Abstraction, Polymorphism, and Inheritance. Compilation is not one of them.', 'easy'),

('technical', 'What does RAM stand for?',
 'Read-Access Memory', 'Random-Access Memory', 'Rapid-Access Module', 'Readable Array Memory', 'B',
 'RAM = Random-Access Memory, a type of volatile primary storage used by a computer.', 'easy'),

('technical', 'Which sorting algorithm has a best-case time complexity of O(n)?',
 'Selection Sort', 'Bubble Sort', 'Insertion Sort', 'Heap Sort', 'C',
 'Insertion sort has O(n) best case when the array is already sorted.', 'medium'),

('technical', 'What is a foreign key?',
 'A key used to encrypt data', 'A primary key of another table used to establish relationships', 'A key that allows NULL values only', 'A key that indexes a column', 'B',
 'A foreign key is a field in one table that refers to the primary key in another table, establishing a referential integrity constraint.', 'medium');
