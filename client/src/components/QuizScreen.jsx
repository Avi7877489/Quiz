import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import Timer from './Timer';

export default function QuizScreen({ quiz, answers, setAnswers, onSubmit, loading }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.time_limit);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswer = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      </div>

      <div className="max-w-4xl mx-auto py-8 relative">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/10 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{quiz.title}</h2>
              <p className="text-white/60">Question {currentQuestion + 1} of {quiz.questions.length}</p>
            </div>
            <Timer timeLeft={timeLeft} />
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-6 border border-white/10 shadow-xl transform transition-all duration-300 hover:bg-white/10">
          <h3 className="text-2xl font-semibold text-white mb-8 leading-relaxed">
            {question.question_text}
          </h3>

          <div className="space-y-4">
            {question.options.map((option, idx) => {
              const isSelected = answers[question.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(question.id, option.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                    isSelected
                      ? 'bg-purple-500/30 border-purple-400 shadow-lg shadow-purple-500/50'
                      : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 ${
                      isSelected ? 'bg-purple-500 border-purple-400' : 'border-white/40'
                    }`}>
                      <span className="text-white font-bold">{String.fromCharCode(65 + idx)}</span>
                    </div>
                    <span className="text-white text-lg">{option.option_text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(prev => prev - 1)}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-md border border-white/20"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
              <CheckCircle className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}