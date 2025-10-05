const express = require('express');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
const initDB = require('./models/initDB');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize DB with tables + seed data
initDB();

// Routes
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
