const express = require('express');
const router = express.Router();
const Mood = require('./mood');

// Remove the import of validateMoodEntry if it's not defined elsewhere
// const { validateMoodEntry, handleErrors } = require('./utils/validators');

// If you want to keep some basic validation, you can define it here:
const validateMoodEntry = (req, res, next) => {
  const { mood, intensity } = req.body;
  if (!mood || typeof intensity !== 'number' || intensity < 1 || intensity > 10) {
    return res.status(400).json({ message: 'Invalid mood entry' });
  }
  next();
};

// Middleware to get mood entry by ID
const getMood = async (req, res, next) => {
  try {
    const mood = await Mood.findById(req.params.id);
    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }
    res.mood = mood;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all mood entries
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new mood entry
router.post('/', validateMoodEntry, async (req, res) => {
  const mood = new Mood({
    user: req.body.user,
    mood: req.body.mood,
    intensity: req.body.intensity,
    notes: req.body.notes,
    date: req.body.date ? new Date(req.body.date) : undefined
  });

  try {
    const newMood = await mood.save();
    res.status(201).json(newMood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ... (rest of your routes remain the same)

// Summary route
router.get('/summary/:date', async (req, res) => {
  try {
    const dateParam = req.params.date;
    const date = new Date(dateParam);

    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD format." });
    }

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    const moods = await Mood.find({
      user: req.query.user,
      date: {
        $gte: date,
        $lt: nextDate
      }
    }).sort('date');

    if (moods.length === 0) {
      return res.status(404).json({ message: "No mood entries found for this date" });
    }

    const summary = {
      date: date.toISOString().split('T')[0],
      averageIntensity: 0,
      dominantMood: '',
      moodCounts: {},
      totalEntries: moods.length,
      moodProgression: moods.map(mood => ({
        mood: mood.mood,
        intensity: mood.intensity,
        timestamp: mood.date
      }))
    };

    let totalIntensity = 0;
    moods.forEach(mood => {
      totalIntensity += mood.intensity;
      summary.moodCounts[mood.mood] = (summary.moodCounts[mood.mood] || 0) + 1;
    });

    summary.averageIntensity = totalIntensity / moods.length;
    summary.dominantMood = Object.keys(summary.moodCounts).reduce((a, b) => 
      summary.moodCounts[a] > summary.moodCounts[b] ? a : b
    );

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;