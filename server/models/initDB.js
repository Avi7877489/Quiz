const db = require('../config/db');

const initDB = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        time_limit INTEGER
      )
    `);

    db.run(`
      CREATE TABLE questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER,
        question_text TEXT NOT NULL,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
      )
    `);

    db.run(`
      CREATE TABLE options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER,
        option_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT 0,
        FOREIGN KEY (question_id) REFERENCES questions(id)
      )
    `);

    // Seed quiz
    db.run(
      `INSERT INTO quizzes (title, description, time_limit) VALUES (?, ?, ?)`,
      ['JavaScript Fundamentals', 'Test your knowledge of JavaScript basics', 600],
      function () {
        const quizId = this.lastID;

        // Q1
        db.run(`INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)`,
          [quizId, 'What is the output of: typeof null?'], function () {
            const q1Id = this.lastID;
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q1Id, 'object', 1]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q1Id, 'null', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q1Id, 'undefined', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q1Id, 'number', 0]);
          });

        // Q2
        db.run(`INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)`,
          [quizId, 'Which method adds an element to the end of an array?'], function () {
            const q2Id = this.lastID;
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q2Id, 'push()', 1]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q2Id, 'pop()', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q2Id, 'shift()', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q2Id, 'unshift()', 0]);
          });

        // Q3
        db.run(`INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)`,
          [quizId, 'What does "===" check in JavaScript?'], function () {
            const q3Id = this.lastID;
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q3Id, 'Value and type equality', 1]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q3Id, 'Only value equality', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q3Id, 'Only type equality', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q3Id, 'Reference equality', 0]);
          });

        // Q4
        db.run(`INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)`,
          [quizId, 'Which keyword is used to declare a block-scoped variable?'], function () {
            const q4Id = this.lastID;
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q4Id, 'let', 1]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q4Id, 'var', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q4Id, 'const', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q4Id, 'function', 0]);
          });

        // Q5
        db.run(`INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)`,
          [quizId, 'What is a closure in JavaScript?'], function () {
            const q5Id = this.lastID;
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q5Id, 'A function with access to its outer scope', 1]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q5Id, 'A closed loop', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q5Id, 'A private class', 0]);
            db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [q5Id, 'An error type', 0]);
          });
      }
    );
  });
};

module.exports = initDB;
