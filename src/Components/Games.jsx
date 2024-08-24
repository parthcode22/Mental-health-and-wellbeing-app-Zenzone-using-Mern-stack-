import React, { useState, useEffect } from 'react';

const colors = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
];

const Games = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [showSequence, setShowSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true); // State to control instructions modal

  useEffect(() => {
    if (isPlaying && !showSequence && sequence.length === 0) {
      addColorToSequence();
    }
  }, [isPlaying, showSequence, sequence]);

  useEffect(() => {
    if (showSequence) {
      const timer = setTimeout(() => {
        if (currentIndex < sequence.length) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setShowSequence(false);
          setCurrentIndex(0);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSequence, currentIndex, sequence]);

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setIsPlaying(true);
    setGameOver(false);
    setShowSequence(false);
    setCurrentIndex(0);
    setShowInstructions(false); // Hide instructions when game starts
  }

  const addColorToSequence = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence(prevSequence => [...prevSequence, newColor]);
    setShowSequence(true);
    setCurrentIndex(0);
  }

  const handleColorClick = (color) => {
    if (!isPlaying || showSequence) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    if (color !== sequence[playerSequence.length]) {
      setIsPlaying(false);
      setGameOver(true);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(prevScore => prevScore + 1);
      setPlayerSequence([]);
      if (score + 1 === 10) {
        setIsPlaying(false);
        setGameOver(true);
      } else {
        setTimeout(() => addColorToSequence(), 1000);
      }
    }
  }

  return (
    <div className="bg-[#a5fcad] min-h-screen flex flex-col items-center justify-center p-4">
      {showInstructions && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-800">How to Play</h2>
            <p className="text-lg mb-4">In this game, you'll need to remember and repeat a sequence of colors. The sequence will be shown to you one color at a time. Once the sequence is shown, you'll need to click the colors in the same order to continue. If you make a mistake, the game is over!</p>
            <ul className="list-disc list-inside text-lg mb-4">
              <li>Click "Start Game" to begin.</li>
              <li>Watch the sequence of colors being displayed.</li>
              <li>Click the colors in the same order to repeat the sequence.</li>
              <li>If you repeat the sequence correctly, a new color will be added.</li>
              <li>If you make a mistake, the game ends.</li>
            </ul>
            <button 
              onClick={startGame}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-4 text-green-800">Color Memory</h1>
      <p className="text-xl mb-4 text-green-700">Score: {score}</p>

      {!isPlaying && !gameOver && !showInstructions && (
        <button 
          onClick={() => setShowInstructions(true)} // Show instructions again
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
        >
          How to Play
        </button>
      )}

      {gameOver && (
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-green-800 mb-2">
            {score === 10 ? "Congratulations! You've completed the game!" : "Game Over!"}
          </p>
          <p className="text-xl text-green-700 mb-4">Your final score: {score}</p>
          <button 
            onClick={startGame}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
          >
            Play Again
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <button
            key={index}
            className={`w-16 h-16 rounded-full ${color} hover:opacity-80 transition-opacity duration-300`}
            onClick={() => handleColorClick(color)}
            disabled={!isPlaying || showSequence}
          />
        ))}
      </div>

      {isPlaying && (
        <div className="mt-8">
          <p className="text-lg text-green-800 mb-2">
            {showSequence ? "Remember this sequence:" : "Your turn! Repeat the sequence."}
          </p>
          <div className="flex space-x-2">
            {sequence.map((color, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full ${showSequence && index === currentIndex ? color : 'bg-gray-300'} 
                ${showSequence && index === currentIndex ? 'animate-pulse' : ''}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Games;
