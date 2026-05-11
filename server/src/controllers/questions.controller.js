import { supabase } from '../config/db.js';

// GET /api/questions — List all questions with optional filters
export const getAllQuestions = async (req, res, next) => {
  try {
    const { company_tag, pattern_tag, difficulty } = req.query;

    let query = supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: true });

    if (company_tag) query = query.eq('company_tag', company_tag);
    if (pattern_tag) query = query.eq('pattern_tag', pattern_tag);
    if (difficulty) query = query.eq('difficulty', difficulty);

    const { data, error } = await query;

    if (error) throw error;

    res.json({ questions: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/questions/:id — Get single question by ID
export const getQuestionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Question not found' });
      }
      throw error;
    }

    res.json({ question: data });
  } catch (err) {
    next(err);
  }
};
