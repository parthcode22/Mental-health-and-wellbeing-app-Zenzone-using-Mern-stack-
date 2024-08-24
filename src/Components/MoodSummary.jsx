import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoodSummary = () => {
  const [summary, setSummary] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMoodSummary();
  }, [date]);

  const fetchMoodSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/moods/summary/${date}?user=testUser`);
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching mood summary:', error);
      setError('Failed to fetch mood summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const convertToIST = (utcDate) => {
    const date = new Date(utcDate);
    // Convert to IST (UTC+5:30)
    const istDate = new Date(date.getTime() + (330 * 60 * 1000)); // 330 minutes = 5 hours 30 minutes
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }).format(istDate);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!summary) return null;

  return (
    <div>
      <h2>Mood Summary for {date}</h2>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <p>Total entries: {summary.totalEntries}</p>
      <p>Dominant mood: {summary.dominantMood}</p>
      <p>Average intensity: {summary.averageIntensity.toFixed(2)}</p>
      <h3>Mood Counts:</h3>
      <ul>
        {Object.entries(summary.moodCounts).map(([mood, count]) => (
          <li key={mood}>{mood}: {count}</li>
        ))}
      </ul>
      <h3>Mood Progression:</h3>
      <ul>
        {summary.moodProgression.map((entry, index) => (
          <li key={index}>
            {convertToIST(entry.timestamp)}: {entry.mood} (Intensity: {entry.intensity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodSummary;