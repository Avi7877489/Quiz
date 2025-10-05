const db = require('../config/db');


const getQuiz = (req, res) => {
  const quizId = req.params.id;

  db.get('SELECT * FROM quizzes WHERE id = ?', [quizId], (err, quiz) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    db.all('SELECT * FROM questions WHERE quiz_id = ?', [quizId], (err, questions) => {
      if (err) return res.status(500).json({ error: err.message });

      const questionPromises = questions.map(q => {
        return new Promise((resolve, reject) => {
          db.all(
            'SELECT id, option_text FROM options WHERE question_id = ?',
            [q.id],
            (err, options) => {
              if (err) reject(err);
              resolve({ ...q, options });
            }
          );
        });
      });

      Promise.all(questionPromises)
        .then(questionsWithOptions => {
          res.json({ ...quiz, questions: questionsWithOptions });
        })
        .catch(err => res.status(500).json({ error: err.message }));
    });
  });
};

// Submit quiz and calculate score
const submitQuiz = (req, res) => {
  const quizId = req.params.id;
  const { answers } = req.body;

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Invalid answers format' });
  }

  db.all(
    `SELECT q.id as question_id, o.id as option_id, o.is_correct, q.question_text, o.option_text
     FROM questions q
     JOIN options o ON q.id = o.question_id
     WHERE q.quiz_id = ?`,
    [quizId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      const questionsMap = {};
      rows.forEach(row => {
        if (!questionsMap[row.question_id]) {
          questionsMap[row.question_id] = {
            question_id: row.question_id,
            question_text: row.question_text,
            options: []
          };
        }
        questionsMap[row.question_id].options.push({
          option_id: row.option_id,
          option_text: row.option_text,
          is_correct: row.is_correct
        });
      });

      let score = 0;
      const totalQuestions = Object.keys(questionsMap).length;
      const results = [];

      Object.keys(questionsMap).forEach(qId => {
        const question = questionsMap[qId];
        const userAnswer = parseInt(answers[qId]);
        const correctOption = question.options.find(opt => opt.is_correct === 1);
        const userOption = question.options.find(opt => opt.option_id === userAnswer);
        const isCorrect = correctOption && correctOption.option_id === userAnswer;

        if (isCorrect) score++;

        results.push({
          question_id: parseInt(qId),
          question_text: question.question_text,
          user_answer: userOption ? userOption.option_text : 'Not answered',
          correct_answer: correctOption ? correctOption.option_text : 'Unknown',
          is_correct: isCorrect
        });
      });

      res.json({
        score,
        total: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        results
      });
    }
  );
};

module.exports = { getQuiz, submitQuiz };
