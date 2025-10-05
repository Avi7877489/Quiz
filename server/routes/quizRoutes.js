const express = require('express');
const { getQuiz, submitQuiz } = require('../controllers/quizController');

const router = express.Router();

router.get('/:id', getQuiz);
router.post('/:id/submit', submitQuiz);

module.exports = router;
