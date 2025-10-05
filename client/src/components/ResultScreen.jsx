import React from 'react';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';

export default function ResultScreen({ result, onRetake }) {
  const percentage = result.percentage;
  const passed = percentage >= 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl w-full relative">
        {/* Score Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 mb-6 border border-white/10 shadow-2xl text-center">
          <div className="mb-6">
            <Trophy className={`w-24 h-24 mx-auto ${passed ? 'text-yellow-400' : 'text-gray-400'} animate-bounce`} />
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-white/60 text-xl mb-8">Here is how you performed</p>

          <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 p-1 rounded-2xl mb-8">
            <div className="bg-slate-900 rounded-xl px-12 py-8">
              <div className="text-6xl font-bold text-white mb-2">{percentage}%</div>
              <div className="text-xl text-white/80">{result.score} out of {result.total} correct</div>
            </div>
          </div>

          <div className={`text-2xl font-semibold mb-8 ${passed ? 'text-green-400' : 'text-orange-400'}`}>
            {passed ? '🎉 Congratulations! You passed!' : '💪 Keep practicing!'}
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/10 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">Detailed Results</h3>
          <div className="space-y-4">
            {result.results.map((item, idx) => (
              <div key={item.question_id} className={`p-5 rounded-xl border-2 ${
                item.is_correct 
                  ? 'bg-green-500/10 border-green-500/50' 
                  : 'bg-red-500/10 border-red-500/50'
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {item.is_correct ? (
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-semibold mb-2">Q{idx + 1}. {item.question_text}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-white/70">
                        Your answer: <span className={item.is_correct ? 'text-green-300' : 'text-red-300'}>
                          {item.user_answer}
                        </span>
                      </p>
                      {!item.is_correct && (
                        <p className="text-white/70">
                          Correct answer: <span className="text-green-300">{item.correct_answer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retake Button */}
        <button
          onClick={onRetake}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/50"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  );
}