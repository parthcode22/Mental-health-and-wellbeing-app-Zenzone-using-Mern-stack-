import React, { useState, useEffect } from 'react';
import { FaCog, FaPlay, FaPause, FaStop } from 'react-icons/fa';
import './style.css';

const useBreathingAnimation = (isAnimating) => {
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    if (!isAnimating) {
      setOpacity(0.5);
      return;
    }

    const interval = setInterval(() => {
      setOpacity((prev) => (prev === 0.5 ? 1 : 0.5));
    }, 4000); // 4 seconds for each breath cycle

    return () => clearInterval(interval);
  }, [isAnimating]);

  return opacity;
};

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

function BreathingCircle({ isAnimating }) {
  const opacity = useBreathingAnimation(isAnimating);

  return (
    <div className="flex justify-center items-center h-64 mb-8">
      <div 
        className="w-48 h-48 rounded-full bg-green-500 transition-opacity duration-4000 ease-in-out"
        style={{ opacity }}
      />
    </div>
  );
}

function Timer({ setIsMeditating, duration }) {
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTime(duration);
  }, [duration]);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setIsMeditating(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, setIsMeditating]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    setIsMeditating(!isRunning);
  };

  const resetTimer = () => {
    setTime(duration);
    setIsRunning(false);
    setIsMeditating(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center mb-8">
      <div className="text-6xl font-light text-green-800 mb-8">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-300"
        >
          {isRunning ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors duration-300"
        >
          <FaStop size={24} />
        </button>
      </div>
    </div>
  );
}

function Settings({ duration, setDuration, setShowSettings }) {
  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value) * 60);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-green-800">Settings</h2>
      <div className="mb-6">
        <label className="block text-green-700 mb-2">Meditation Duration (minutes)</label>
        <input
          type="number"
          value={duration / 60}
          onChange={handleDurationChange}
          className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          min="1"
          max="60"
        />
      </div>
      <button
        onClick={() => setShowSettings(false)}
        className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
      >
        Save Settings
      </button>
    </div>
  );
}

function App() {
  const [isMeditating, setIsMeditating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [duration, setDuration] = useLocalStorage('meditation-duration', 600);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#C3FDBC]">
      <div className="w-full max-w-md">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-green-800">Zen Meditation</h1>
          <button
            onClick={() => setShowSettings(true)}
            className="text-green-200 hover:text-green-700 transition-colors duration-200"
          >
            <FaCog size={24} />
          </button>
        </header>
        {showSettings ? (
          <Settings
            duration={duration}
            setDuration={setDuration}
            setShowSettings={setShowSettings}
          />
        ) : (
          <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
            <BreathingCircle isAnimating={isMeditating} />
            <Timer setIsMeditating={setIsMeditating} duration={duration} />
            <p className="text-center text-green-700 mt-4">
              {isMeditating 
                ? "Breathe in... and out..." 
                : "Press play to start your meditation"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;