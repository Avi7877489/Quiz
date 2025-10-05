const request = require('supertest');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();


const createTestServer = () => {
  const app = express();
  app.use(express.json());
  const db = new sqlite3.Database(':memory:');

  db.serialize(() => {
    db.run(`CREATE TABLE quizzes (id INTEGER PRIMARY KEY, title TEXT, description TEXT, time_limit INTEGER)`);
    db.run(`CREATE TABLE questions (id INTEGER PRIMARY KEY, quiz_id INTEGER, question_text TEXT)`);
    db.run(`CREATE TABLE options (id INTEGER PRIMARY KEY, question_id INTEGER, option_text TEXT, is_correct BOOLEAN)`);
    
    db.run(`INSERT INTO quizzes VALUES (1, 'Test Quiz', 'Test Description', 300)`);
    db.run(`INSERT INTO questions VALUES (1, 1, 'What is 2+2?')`);
    db.run(`INSERT INTO questions VALUES (2, 1, 'What is the capital of France?')`);
    db.run(`INSERT INTO options VALUES (1, 1, '3', 0)`);
    db.run(`INSERT INTO options VALUES (2, 1, '4', 1)`);
    db.run(`INSERT INTO options VALUES (3, 1, '5', 0)`);
    db.run(`INSERT INTO options VALUES (4, 2, 'London', 0)`);
    db.run(`INSERT INTO options VALUES (5, 2, 'Paris', 1)`);
    db.run(`INSERT INTO options VALUES (6, 2, 'Berlin', 0)`);
  });

  app.post('/api/quiz/:id/submit', (req, res) => {
    const { answers } = req.body;
    
    db.all(
      `SELECT q.id as question_id, o.id as option_id, o.is_correct
       FROM questions q JOIN options o ON q.id = o.question_id
       WHERE q.quiz_id = ?`,
      [req.params.id],
      (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const questionsMap = {};
        rows.forEach(row => {
          if (!questionsMap[row.question_id]) {
            questionsMap[row.question_id] = { options: [] };
          }
          questionsMap[row.question_id].options.push({
            option_id: row.option_id,
            is_correct: row.is_correct
          });
        });

        let score = 0;
        const totalQuestions = Object.keys(questionsMap).length;

        Object.keys(questionsMap).forEach(qId => {
          const question = questionsMap[qId];
          const userAnswer = parseInt(answers[qId]);
          const correctOption = question.options.find(opt => opt.is_correct === 1);
          
          if (correctOption && correctOption.option_id === userAnswer) {
            score++;
          }
        });

        res.json({
          score,
          total: totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100)
        });
      }
    );
  });

  return { app, db };
};

describe('Quiz API Tests', () => {
  let app, db;

  beforeEach(() => {
    const server = createTestServer();
    app = server.app;
    db = server.db;
  });

  afterEach(() => {
    if (db) {
      db.close();
    }
  });

  describe('POST /api/quiz/:id/submit', () => {
    test('should calculate correct score with all correct answers', async () => {
      const response = await request(app)
        .post('/api/quiz/1/submit')
        .send({ answers: { '1': 2, '2': 5 } });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(2);
      expect(response.body.total).toBe(2);
      expect(response.body.percentage).toBe(100);
    });

    test('should calculate correct score with partial correct answers', async () => {
      const response = await request(app)
        .post('/api/quiz/1/submit')
        .send({ answers: { '1': 2, '2': 4 } });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(1);
      expect(response.body.total).toBe(2);
      expect(response.body.percentage).toBe(50);
    });

    test('should calculate correct score with all wrong answers', async () => {
      const response = await request(app)
        .post('/api/quiz/1/submit')
        .send({ answers: { '1': 1, '2': 4 } });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(0);
      expect(response.body.total).toBe(2);
      expect(response.body.percentage).toBe(0);
    });

    test('should handle missing answers', async () => {
      const response = await request(app)
        .post('/api/quiz/1/submit')
        .send({ answers: { '1': 2 } });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(1);
      expect(response.body.total).toBe(2);
      expect(response.body.percentage).toBe(50);
    });

    test('should handle empty answers object', async () => {
      const response = await request(app)
        .post('/api/quiz/1/submit')
        .send({ answers: {} });

      expect(response.status).toBe(200);
      expect(response.body.score).toBe(0);
      expect(response.body.total).toBe(2);
      expect(response.body.percentage).toBe(0);
    });
  });
});