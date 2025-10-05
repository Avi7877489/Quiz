import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';



export default function App() {
  const [screen, setScreen] = useState('start');
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/quiz/1');
      const data = await response.json();
      setQuiz(data);
      setScreen('quiz');
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Failed to load quiz. Make sure the backend is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (finalAnswers) => {
    setLoading(true);
    try {
      const response = await fetch('/api/quiz/1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers })
      });
      const data = await response.json();
      setResult(data);
      setScreen('result');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setScreen('start');
    setQuiz(null);
    setAnswers({});
    setResult(null);
  };

  return (
    <>
      {screen === 'start' && (
        <StartScreen onStart={fetchQuiz} loading={loading} />
      )}
      
      {screen === 'quiz' && quiz && (
        <QuizScreen 
          quiz={quiz}
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
      
      {screen === 'result' && result && (
        <ResultScreen result={result} onRetake={resetQuiz} />
      )}
    </>
  );
}