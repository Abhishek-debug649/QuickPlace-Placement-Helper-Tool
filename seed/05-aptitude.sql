-- Seed: Aptitude Questions (sample set)
INSERT INTO aptitude_questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty) VALUES
  ('quantitative', 'If 6 workers can complete a task in 12 days, how many days will 9 workers take?',
   '6 days', '8 days', '9 days', '10 days', 'B',
   'Work = 6 × 12 = 72 worker-days. With 9 workers: 72/9 = 8 days.', 'easy'),

  ('quantitative', 'A train 150m long passes a pole in 15 seconds. What is the speed of the train in km/h?',
   '30 km/h', '36 km/h', '40 km/h', '45 km/h', 'B',
   'Speed = 150/15 = 10 m/s = 10 × 3.6 = 36 km/h.', 'easy'),

  ('quantitative', 'What is 35% of 240?',
   '74', '80', '84', '90', 'C',
   '35/100 × 240 = 84.', 'easy'),

  ('logical', 'If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies. True or False?',
   'True', 'False', 'Cannot determine', 'None of these', 'A',
   'Transitive relation: Bloops → Razzies → Lazzies, so Bloops → Lazzies.', 'easy'),

  ('logical', 'What comes next in the series: 2, 6, 12, 20, 30, ?',
   '40', '42', '44', '46', 'B',
   'Differences: 4, 6, 8, 10, 12. Next term = 30 + 12 = 42.', 'medium'),

  ('logical', 'If FRIEND is coded as HUMJTF, how is CANDLE coded?',
   'EDRIRL', 'DCPFMG', 'EDRFMG', 'ECPFNI', 'C',
   'Each letter shifted by +2, +1, +2, +1, +2, +1 pattern.', 'medium'),

  ('verbal', 'Choose the synonym of "Ubiquitous":',
   'Rare', 'Omnipresent', 'Unique', 'Hidden', 'B',
   'Ubiquitous means present or found everywhere.', 'easy'),

  ('verbal', 'Choose the antonym of "Benevolent":',
   'Kind', 'Malevolent', 'Generous', 'Gracious', 'B',
   'Benevolent means well-meaning; malevolent means ill-intentioned.', 'easy'),

  ('verbal', 'Fill in the blank: "The project was _____ due to lack of funding."',
   'accelerated', 'abandoned', 'accomplished', 'appreciated', 'B',
   'Lack of funding typically causes a project to be abandoned.', 'easy'),

  ('quantitative', 'The compound interest on Rs.5000 at 10% per annum for 2 years is:',
   'Rs.1000', 'Rs.1050', 'Rs.1100', 'Rs.1025', 'B',
   'CI = 5000(1+0.1)^2 - 5000 = 6050 - 5000 = 1050.', 'medium');
