import React, { useState, useEffect } from 'react';

const BreathingExercise = () => {
  const [phase, setPhase] = useState('exhale');
  const [cycle, setCycle] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;

    if (isStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 && isStarted) {
      if (phase === 'exhale') {
        setPhase('inhale');
        setTimer(5);
      } else if (phase === 'inhale') {
        setPhase('exhale');
        setTimer(5);
        if (cycle < 8) {
          setCycle((prevCycle) => prevCycle + 1);
        } else {
          setIsStarted(false);
          setIsCompleted(true);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isStarted, timer, phase, cycle]);

  const handleStart = () => {
    setIsStarted(true);
    setPhase('exhale');
    setTimer(5);
    setCycle(1);
    setIsCompleted(false);
  };

  const handleReset = () => {
    setIsStarted(false);
    setPhase('exhale');
    setCycle(1);
    setIsCompleted(false);
  };

  const animationStyle = {
    animation: phase === 'inhale' ? 'breatheIn 5s ease-in-out infinite' : 'breatheOut 5s ease-in-out infinite',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-green">
      <div className="max-w-lg w-full p-6 bg-green-300 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Breathing Exercise</h1>
        <div className="relative w-full h-96 bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Animation element */}
          <div
            className="w-32 h-32 rounded-full bg-blue-500"
            style={animationStyle}
          ></div>
        </div>
        <div className="flex justify-center mt-8 text-black">
          {isStarted ? (
            <p className="text-lg font-semibold">
              {phase === 'exhale' ? 'Exhale' : phase === 'inhale' ? 'Inhale' : ''}
            </p>
          ) : (
            <button
              className="py-2 px-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600"
              onClick={handleStart}
            >
              Start
            </button>
          )}
        </div>
        {isStarted && (
          <div className="flex justify-center mt-4 text-black">
            <p className="text-lg font-semibold text-black">
              Cycle: {cycle} / 8
            </p>
          </div>
        )}
        {isStarted && (
          <div className="flex justify-center mt-4 text-black">
            <p className="text-lg font-semibold text-black">
              {timer}s remaining
            </p>
          </div>
        )}
        {!isStarted && cycle === 8 && (
          <div className="flex justify-center mt-8 text-black">
            <button
              className="py-2 px-4 bg-green-500 text-black rounded-lg text-lg font-semibold hover:bg-green-600"
              onClick={handleReset}
            >
              Start Again
            </button>
          </div>
        )}
        {!isStarted && isCompleted && (
          <div className="text-center mt-4 text-lg font-semibold text-green-500">
            Congratulations! You completed the breathing exercise.
            <br />
            Great job! Take a moment to relax and breathe freely.
          </div>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
