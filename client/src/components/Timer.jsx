import React from 'react';
import { Clock } from 'lucide-react';

export default function Timer({ timeLeft }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center bg-white/10 px-6 py-3 rounded-xl">
      <Clock className={`w-6 h-6 mr-2 ${timeLeft < 60 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`} />
      <span className={`text-2xl font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-white'}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}