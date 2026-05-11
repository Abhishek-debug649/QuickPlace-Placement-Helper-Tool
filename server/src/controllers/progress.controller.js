import { supabase } from '../config/db.js';

// GET /api/progress/patterns — Pattern-wise progress for current user
export const getPatternProgress = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    // Get all questions grouped by pattern
    const { data: questions, error: qErr } = await supabase
      .from('questions')
      .select('id, pattern_tag');

    if (qErr) throw qErr;

    // Get user's solved question IDs
    const { data: solved, error: sErr } = await supabase
      .from('progress')
      .select('question_id')
      .eq('user_id', userId)
      .eq('status', 'solved');

    if (sErr) throw sErr;

    const solvedSet = new Set(solved.map((s) => s.question_id));

    // Aggregate by pattern
    const patternMap = {};
    for (const q of questions) {
      const tag = q.pattern_tag || 'uncategorized';
      if (!patternMap[tag]) patternMap[tag] = { pattern_tag: tag, solved: 0, total: 0 };
      patternMap[tag].total++;
      if (solvedSet.has(q.id)) patternMap[tag].solved++;
    }

    const patterns = Object.values(patternMap)
      .map((p) => ({
        ...p,
        percentage: p.total > 0 ? Math.round((p.solved / p.total) * 1000) / 10 : 0,
      }))
      .sort((a, b) => a.pattern_tag.localeCompare(b.pattern_tag));

    res.json({ patterns });
  } catch (err) {
    next(err);
  }
};

// GET /api/progress/companies — Company-wise progress for current user
export const getCompanyProgress = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const { data: questions, error: qErr } = await supabase
      .from('questions')
      .select('id, company_tag');

    if (qErr) throw qErr;

    const { data: solved, error: sErr } = await supabase
      .from('progress')
      .select('question_id')
      .eq('user_id', userId)
      .eq('status', 'solved');

    if (sErr) throw sErr;

    const solvedSet = new Set(solved.map((s) => s.question_id));

    const companyMap = {};
    for (const q of questions) {
      const tag = q.company_tag;
      if (!tag) continue; // Skip questions without company tag
      if (!companyMap[tag]) companyMap[tag] = { company_tag: tag, solved: 0, total: 0 };
      companyMap[tag].total++;
      if (solvedSet.has(q.id)) companyMap[tag].solved++;
    }

    const companies = Object.values(companyMap).sort((a, b) =>
      a.company_tag.localeCompare(b.company_tag)
    );

    res.json({ companies });
  } catch (err) {
    next(err);
  }
};

// GET /api/progress/heatmap — Daily solve counts, last 365 days
export const getHeatmapData = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const { data, error } = await supabase
      .from('progress')
      .select('solved_at')
      .eq('user_id', userId)
      .eq('status', 'solved')
      .gte('solved_at', oneYearAgo.toISOString());

    if (error) throw error;

    // Group by date
    const dateMap = {};
    for (const row of data) {
      if (!row.solved_at) continue;
      const date = row.solved_at.split('T')[0]; // YYYY-MM-DD
      dateMap[date] = (dateMap[date] || 0) + 1;
    }

    const heatmap = Object.entries(dateMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    res.json({ heatmap });
  } catch (err) {
    next(err);
  }
};

// GET /api/progress/stats — Overall stats
export const getStats = async (req, res, next) => {
  try {
    const userId = req.user.user_id;

    // Total solved
    const { data: solvedData, error: solvedErr } = await supabase
      .from('progress')
      .select('id, solved_at')
      .eq('user_id', userId)
      .eq('status', 'solved');

    if (solvedErr) throw solvedErr;

    const totalSolved = solvedData.length;

    // Questions solved today
    const today = new Date().toISOString().split('T')[0];
    const questionsToday = solvedData.filter(
      (s) => s.solved_at && s.solved_at.startsWith(today)
    ).length;

    // Calculate streaks from solved dates
    const solvedDates = [
      ...new Set(
        solvedData
          .filter((s) => s.solved_at)
          .map((s) => s.solved_at.split('T')[0])
      ),
    ].sort();

    let currentStreak = 0;
    let longestStreak = 0;

    if (solvedDates.length > 0) {
      // Check if the streak includes today or yesterday
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

      let tempStreak = 1;
      longestStreak = 1;

      for (let i = solvedDates.length - 1; i > 0; i--) {
        const curr = new Date(solvedDates[i]);
        const prev = new Date(solvedDates[i - 1]);
        const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 1;
        }
      }

      // Current streak: count backwards from today/yesterday
      const lastDate = solvedDates[solvedDates.length - 1];
      if (lastDate === todayStr || lastDate === yesterdayStr) {
        currentStreak = 1;
        for (let i = solvedDates.length - 1; i > 0; i--) {
          const curr = new Date(solvedDates[i]);
          const prev = new Date(solvedDates[i - 1]);
          const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);
          if (diffDays === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }

    res.json({
      stats: {
        totalSolved,
        currentStreak,
        questionsToday,
        longestStreak,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/progress/:questionId — Mark a question as solved/attempted
export const markSolved = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { questionId } = req.params;
    const { status = 'solved' } = req.body;

    const { data, error } = await supabase
      .from('progress')
      .upsert(
        {
          user_id: userId,
          question_id: questionId,
          status,
          solved_at: status === 'solved' ? new Date().toISOString() : null,
        },
        { onConflict: 'user_id,question_id' }
      )
      .select()
      .single();

    if (error) throw error;

    res.json({ message: `Question marked as ${status}`, progress: data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/progress/:questionId — Unmark a question
export const unmarkQuestion = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { questionId } = req.params;

    const { error } = await supabase
      .from('progress')
      .delete()
      .eq('user_id', userId)
      .eq('question_id', questionId);

    if (error) throw error;

    res.json({ message: 'Question unmarked' });
  } catch (err) {
    next(err);
  }
};
