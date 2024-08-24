import React, { useState } from 'react';
import axios from 'axios';
import MoodSummary from './MoodSummary';
import './MoodTracker.css';

const MoodTracker = () => {
  const [mood, setMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const moods = [
    { name: 'Ecstatic', emoji: '🤩' },
    { name: 'Happy', emoji: '😊' },
    { name: 'Calm', emoji: '😌' },
    { name: 'Neutral', emoji: '😐' },
    { name: 'Sad', emoji: '😢' },
    { name: 'Anxious', emoji: '😰' },
    { name: 'Angry', emoji: '😠' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/moods', {
        user: 'testUser',
        mood,
        intensity,
        notes,
        date: new Date().toISOString().split('T')[0]
      });
      alert('Mood entry submitted successfully!');
      setMood('');
      setIntensity(5);
      setNotes('');
      setShowSummary(true);
    } catch (error) {
      console.error('Error submitting mood entry:', error);
      alert('Failed to submit mood entry. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <div className="mood-tracker">
        <h2>How are you feeling?</h2>
        <form onSubmit={handleSubmit}>
          <div className="mood-selector">
            {moods.map((m) => (
              <button
                key={m.name}
                type="button"
                onClick={() => setMood(m.name)}
                className={`mood-button ${mood === m.name ? 'selected' : ''}`}
              >
                <span className="mood-emoji">{m.emoji}</span>
                <span className="mood-name">{m.name}</span>
              </button>
            ))}
          </div>
          <div className="intensity-slider">
            <label htmlFor="intensity">Intensity (1-10):</label>
            <input
              type="range"
              id="intensity"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              required
            />
          </div>
          <div className="notes-input">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <button className="toggle-summary" onClick={() => setShowSummary(!showSummary)}>
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </button>
        {showSummary && <MoodSummary />}
      </div>
    </div>
  );
};

export default MoodTracker;