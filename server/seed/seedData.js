function seedData(db) {
  db.run(`INSERT INTO quizzes (title, description, time_limit) VALUES (?, ?, ?)`, 
    ['JavaScript Fundamentals', 'Test your knowledge of JavaScript basics', 600], function() {
      const quizId = this.lastID;

      const insertQn = (question, options) => {
        db.run(`INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)`,
          [quizId, question], function() {
            const qId = this.lastID;
            options.forEach(opt => {
              db.run(`INSERT INTO options (question_id, option_text, is_correct) VALUES (?, ?, ?)`, [qId, opt.text, opt.correct]);
            });
          });
      };

      insertQn('What is the output of: typeof null?', [
        { text: 'object', correct: 1 },
        { text: 'null', correct: 0 },
        { text: 'undefined', correct: 0 },
        { text: 'number', correct: 0 }
      ]);

      insertQn('Which method adds an element to the end of an array?', [
        { text: 'push()', correct: 1 },
        { text: 'pop()', correct: 0 },
        { text: 'shift()', correct: 0 },
        { text: 'unshift()', correct: 0 }
      ]);

      insertQn('What does "===" check in JavaScript?', [
        { text: 'Value and type equality', correct: 1 },
        { text: 'Only value equality', correct: 0 },
        { text: 'Only type equality', correct: 0 },
        { text: 'Reference equality', correct: 0 }
      ]);

      insertQn('Which keyword is used to declare a block-scoped variable?', [
        { text: 'let', correct: 1 },
        { text: 'var', correct: 0 },
        { text: 'const', correct: 0 },
        { text: 'function', correct: 0 }
      ]);

      insertQn('What is a closure in JavaScript?', [
        { text: 'A function with access to its outer scope', correct: 1 },
        { text: 'A closed loop', correct: 0 },
        { text: 'A private class', correct: 0 },
        { text: 'An error type', correct: 0 }
      ]);
    });
}

module.exports = seedData;
