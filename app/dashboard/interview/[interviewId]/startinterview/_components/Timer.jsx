"use client";
import React, { useEffect, useState } from "react";

// Timer Component
const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Time Left</span>
        <span className="text-sm font-medium text-gray-900">
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// // 👇 This is the test preview
// const TimerTest = () => {
//   const handleTimeUp = () => {
//     alert("⏰ Time's up!");
//   };

//   return <Timer duration={2} onTimeUp={handleTimeUp} />;
// };

export default Timer;
