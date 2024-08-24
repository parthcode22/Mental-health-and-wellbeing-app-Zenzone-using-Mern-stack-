const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  user: { type: String, required: true }, 
  mood: { type: String, required: true },
  intensity: { type: Number, required: true, min: 1, max: 10 },
  notes: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mood', moodSchema);
