-- Seed: Badges
INSERT INTO badges (name, description, icon_url, company_tag, pattern_tag, threshold_percentage) VALUES
  ('Netflix Ready',     'Complete 80% of Netflix PYQs',           NULL, 'netflix',    NULL, 80),
  ('Amazon Ready',      'Complete 80% of Amazon PYQs',            NULL, 'amazon',     NULL, 80),
  ('Google Ready',      'Complete 80% of Google PYQs',            NULL, 'google',     NULL, 80),
  ('Microsoft Ready',   'Complete 80% of Microsoft PYQs',         NULL, 'microsoft',  NULL, 80),
  ('Meta Ready',        'Complete 80% of Meta PYQs',              NULL, 'meta',       NULL, 80),
  ('Sliding Window Pro','Complete 80% of Sliding Window problems', NULL, NULL, 'sliding-window', 80),
  ('DP Master',         'Complete 80% of DP problems',            NULL, NULL, 'dynamic-programming', 80),
  ('Graph Explorer',    'Complete 80% of Graph problems',         NULL, NULL, 'graphs', 80);
