import React, { useState, useEffect } from 'react';
import './style.css'; // Import Tailwind CSS if not already included

const questionsData = [
  {
    id: 1,
    question: 'I am able to handle the level of stress I experience.',
    category: 'Stress Management',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: false
  },
  {
    id: 2,
    question: 'I have physical symptoms of anxiety, such as sweaty palms.',
    category: 'Anxiety',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: true
  },
  {
    id: 3,
    question: 'I cannot get beyond long-past traumatic events or significant losses.',
    category: 'Trauma',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: true
  },
  {
    id: 4,
    question: 'I am able to identify and express my emotions.',
    category: 'Emotional Intelligence',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: false
  },
  {
    id: 5,
    question: 'I frequently drink alcohol and/or use recreational drugs.',
    category: 'Substance Abuse',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: true
  },
  {
    id: 6,
    question: 'When I experience a strong emotion, I usually know why it\'s hitting me.',
    category: 'Emotional Awareness',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: false
  },
  {
    id: 7,
    question: 'I procrastinate and/or avoid dealing with important things in my life.',
    category: 'Procrastination',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: true
  },
  {
    id: 8,
    question: 'I get upset or angry easily.',
    category: 'Anger Management',
    answers: ['Strongly Disagree', 'Disagree', 'Slightly Disagree', 'Neutral', 'Slightly Agree', 'Agree', 'Strongly Agree'],
    negative: true
  }
];

function PsychologicalWellbeingScale() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsData.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [categoryScores, setCategoryScores] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = answerIndex;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setProgress(((currentQuestion + 1) / questionsData.length) * 100);
    } else {
      setShowResults(true);
      calculateCategoryScores();
    }
  };

  const calculateCategoryScores = () => {
    const scores = {};
    selectedAnswers.forEach((answerIndex, index) => {
      const question = questionsData[index];
      const category = question.category;
      const isNegative = question.negative;
      const score = isNegative ? (question.answers.length - 1 - answerIndex) + 1 : answerIndex + 1;

      if (!scores[category]) {
        scores[category] = { total: 0, count: 0 };
      }
      scores[category].total += score;
      scores[category].count += 1;
    });

    Object.keys(scores).forEach(category => {
      scores[category] = (scores[category].total / scores[category].count) * 10;
    });

    setCategoryScores(scores);
  };

  const generateResults = () => {
    let score = 0;
    let totalQuestions = questionsData.length;

    selectedAnswers.forEach((answerIndex, index) => {
      const question = questionsData[index];
      const isNegative = question.negative;

      if (!isNegative) {
        score += answerIndex + 1;
      } else {
        score += (question.answers.length - 1 - answerIndex) + 1;
      }
    });

    const averageScore = (score / totalQuestions) * 10;

    let mentalHealthCategory;
    if (averageScore >= 90) {
      mentalHealthCategory = "Flourishing";
    } else if (averageScore >= 75) {
      mentalHealthCategory = "Coping well";
    } else if (averageScore >= 55) {
      mentalHealthCategory = "Coping";
    } else if (averageScore >= 40) {
      mentalHealthCategory = "Struggling somewhat";
    } else {
      mentalHealthCategory = "Struggling";
    }

    let interpretation;
    if (averageScore >= 90) {
      interpretation = "You are flourishing in your mental health. Your coping mechanisms are very effective, and you are likely experiencing a high level of well-being.";
    } else if (averageScore >= 75) {
      interpretation = "You are coping well in terms of mental health. Your strategies for managing stress and challenges are effective, contributing to your overall well-being.";
    } else if (averageScore >= 55) {
      interpretation = "You are coping adequately with your mental health. While you may face occasional challenges, you have developed some effective coping mechanisms.";
    } else if (averageScore >= 40) {
      interpretation = "You are struggling somewhat with your mental health. You may benefit from developing more coping strategies and seeking support when needed.";
    } else {
      interpretation = "You are currently struggling with your mental health. It's important to prioritize self-care, seek support, and consider professional help if necessary.";
    }

    return (
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-green-800">Results</h2>
        <p className="text-xl mb-2 text-green-700">Your mental health score: {averageScore.toFixed(2)}</p>
        <p className="text-xl mb-2 text-green-700">Mental health category: {mentalHealthCategory}</p>
        <div className="mt-4 w-full">
          <p className="text-lg mb-2 text-green-800">Mental Health Slider:</p>
          <div className="relative w-full h-6 rounded-full overflow-hidden bg-green-200">
            <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{ width: `${averageScore}%` }}></div>
          </div>
          <p className="text-lg mt-2 text-green-700">{mentalHealthCategory}</p>
        </div>
        <p className="text-lg mt-4 text-green-800">{interpretation}</p>
        <div className="range mt-4">
          <p className="text-lg text-green-800">Range:</p>
          <ul className="text-lg text-green-700">
            <li>20-39 — Struggling</li>
            <li>40-54 — Struggling somewhat</li>
            <li>55-74 — Coping</li>
            <li>75-89 — Coping well</li>
            <li>90-100 — Flourishing</li>
          </ul>
        </div>
        <div className="category-scores mt-6">
          <h3 className="text-2xl font-bold mb-2 text-green-800">Category Scores:</h3>
          {Object.entries(categoryScores).map(([category, score]) => (
            <div key={category} className="flex justify-between items-center mb-2">
              <span className="text-lg text-green-700">{category}:</span>
              <span className="text-lg font-bold text-green-800">{score.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => setShowTips(true)}>Get Tips</button>
      </div>
    );
  };

  const renderQuestion = () => {
    const question = questionsData[currentQuestion];
    return (
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-green-800">{question.question}</h2>
        <div className="flex flex-col">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={`p-4 mb-2 rounded-lg ${selectedAnswers[currentQuestion] === index ? 'bg-green-500 text-white' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}
              onClick={() => handleAnswer(index)}
            >
              {answer}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300"
            onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleNextQuestion}
          >
            {currentQuestion < questionsData.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
        <div className="mt-4">
          <div className="relative w-full h-4 bg-green-200 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg text-green-800">Time spent: {Math.floor(timeSpent / 60)}:{('0' + (timeSpent % 60)).slice(-2)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#a5fcad] min-h-screen flex flex-col items-center justify-center">
      {!showResults ? renderQuestion() : generateResults()}
      {showTips && (
        <div className="fixed inset-0 bg-green-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Mental Health Tips</h2>
            <p className="text-lg mb-4 text-green-700">Here are some tips to help improve your mental well-being:</p>
            <ul className="list-disc list-inside text-lg text-green-700">
              <li>Practice mindfulness and relaxation techniques.</li>
              <li>Engage in regular physical exercise.</li>
              <li>Establish and maintain strong social connections.</li>
              <li>Get adequate sleep and maintain a healthy diet.</li>
              <li>Seek professional help if needed.</li>
            </ul>
            <button className="mt-4 px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300" onClick={() => setShowTips(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PsychologicalWellbeingScale;