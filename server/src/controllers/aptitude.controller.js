import { supabase } from '../config/db.js';

// GET /api/aptitude/categories — List distinct quiz categories
export const getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('aptitude_questions')
      .select('category');

    if (error) throw error;

    // Get unique categories with counts
    const categoryMap = {};
    for (const row of data) {
      categoryMap[row.category] = (categoryMap[row.category] || 0) + 1;
    }

    const categories = Object.entries(categoryMap).map(([name, count]) => ({
      name,
      count,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
    }));

    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

// GET /api/aptitude/quiz/:category — Get N random MCQs for a category
export const getQuiz = async (req, res, next) => {
  try {
    const { category } = req.params;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);

    const { data, error } = await supabase
      .from('aptitude_questions')
      .select('id, category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty')
      .eq('category', category);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: `No questions found for category: ${category}` });
    }

    // Shuffle and take `limit` questions
    const shuffled = data.sort(() => Math.random() - 0.5).slice(0, limit);

    res.json({ questions: shuffled, total: data.length });
  } catch (err) {
    next(err);
  }
};

// POST /api/aptitude/submit — Submit answers and get score
export const submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;
    // answers = [{ question_id: 'uuid', selected: 'A' }, ...]

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'Answers array is required' });
    }

    const questionIds = answers.map((a) => a.question_id);

    const { data: questions, error } = await supabase
      .from('aptitude_questions')
      .select('id, correct_option, explanation, question_text')
      .in('id', questionIds);

    if (error) throw error;

    const questionMap = {};
    for (const q of questions) {
      questionMap[q.id] = q;
    }

    let correct = 0;
    const results = answers.map((answer) => {
      const question = questionMap[answer.question_id];
      if (!question) {
        return {
          question_id: answer.question_id,
          selected: answer.selected,
          correct_option: null,
          is_correct: false,
          explanation: 'Question not found',
        };
      }

      const isCorrect = answer.selected === question.correct_option;
      if (isCorrect) correct++;

      return {
        question_id: answer.question_id,
        question_text: question.question_text,
        selected: answer.selected,
        correct_option: question.correct_option,
        is_correct: isCorrect,
        explanation: question.explanation,
      };
    });

    res.json({
      score: correct,
      total: answers.length,
      percentage: Math.round((correct / answers.length) * 100),
      results,
    });
  } catch (err) {
    next(err);
  }
};
