# Full Stack Quiz Application

This project is a full-stack quiz application built with **React (frontend)** and **Node.js/Express (backend)**, using **SQLite3** as the database. It provides a complete quiz-taking experience with features such as timers, auto-submit, results, and retake functionality.

---

## Features

### Frontend

* Built with React 18 and Vite
* Tailwind CSS for modern styling
* Lucide React for icons
* Component-based architecture
* State management with React hooks
* Timer with auto-submit functionality
* Detailed results with correct/incorrect answers
* Responsive design for different devices

### Backend

* Node.js runtime with Express framework
* RESTful API for quiz data
* SQLite3 for database storage
* CORS enabled for cross-origin requests
* Modular code structure
* Backend test suite with Jest

---

## Component Structure

```
App.jsx
  ├─→ StartScreen
  │     Props: onStart, loading
  │
  ├─→ QuizScreen
  │     Props: quiz, answers, setAnswers, onSubmit, loading
  │     └─→ Timer
  │           Props: timeLeft
  │
  └─→ ResultScreen
        Props: result, onRetake
```

---

## API Endpoints

| Method | Endpoint             | Purpose                    |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/quiz/1`        | Fetch quiz questions       |
| POST   | `/api/quiz/1/submit` | Submit answers & get score |

---

## Project Structure (Backend)

```
server/
├── config
├── controllers
├── coverage
├── models
├── node_modules
├── routes
├── seed
├── .env
├── package-lock.json
├── package.json
├── quiz.db
├── server.js
└── server.test.js
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Avi7877489/Quiz
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Run Backend Tests

```bash
npm test
```

---

## Test Results

```
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 | 
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        3.485 s
Ran all test suites.
```

---

## Common Issues & Fixes

| Problem                   | Solution                      |
| ------------------------- | ----------------------------- |
| Backend won't start       | Check port 3001 availability  |
| Frontend connection error | Ensure backend is running     |
| Styles not loading        | Run `npm install` in frontend |
| Port already in use       | Change port in config files   |
| Database errors           | Restart backend server        |

---

## URLs

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3001](http://localhost:3001)
* API Test: [http://localhost:3001/api/quiz/1](http://localhost:3001/api/quiz/1)

---

## Testing Checklist

* Backend starts on port 3001
* Frontend starts on port 5173
* Can fetch quiz from backend
* Questions display correctly
* Can select answers
* Timer counts down
* Can navigate between questions
* Submit works
* Results display correctly
* Can retake quiz
* All backend tests pass

---

## Learning Outcomes

By completing this project, you will learn:

* Full-stack development workflow
* RESTful API design
* React component architecture
* State management with hooks
* SQLite database operations
* Testing with Jest
* Styling with Tailwind CSS
* Timer implementation
* Form handling and validation
* Modern UI/UX patterns

---

## Pro Tips

* Always start backend first before frontend
* Keep terminals open for both services
* Use `npm run dev` for backend development (auto-reload)
* Check console for errors in both frontend and backend
* Use browser DevTools for debugging frontend issues
* Test API with Postman/Thunder Client before frontend integration

---

