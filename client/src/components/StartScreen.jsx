import React from 'react';
import { CheckCircle, Clock, Trophy, ArrowRight, Sparkles } from 'lucide-react';

export default function StartScreen({ onStart, loading }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-2xl w-full relative">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-105">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-yellow-300 animate-spin" style={{animationDuration: '3s'}} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Quiz Master
          </h1>
          <p className="text-xl text-white/90 mb-8 text-center">
            Test your knowledge and challenge yourself with our interactive quiz platform
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-white/80 text-lg">
              <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
              <span>5 carefully crafted questions</span>
            </div>
            <div className="flex items-center text-white/80 text-lg">
              <Clock className="w-6 h-6 mr-3 text-blue-300" />
              <span>10 minutes to complete</span>
            </div>
            <div className="flex items-center text-white/80 text-lg">
              <Trophy className="w-6 h-6 mr-3 text-yellow-300" />
              <span>Instant results with detailed feedback</span>
            </div>
          </div>

          <button
            onClick={onStart}
            disabled={loading}
            className="w-full bg-white text-purple-600 font-bold py-4 px-8 rounded-xl text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
          >
            {loading ? 'Loading...' : 'Start Quiz'}
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}