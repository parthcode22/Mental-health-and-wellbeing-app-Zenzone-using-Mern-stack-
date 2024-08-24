import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Meditation from './Components/Meditation';
import MoodTracker from './Components/MoodTracker';
import Games from './Components/Games';
import BreathingExercise from './Components/BreathingExercise';
import PsychologicalWellbeingScale from './Components/PsychologicalWellbeingScale';
import Chatbot from './Components/Chatbot';
import Home from './Components/Home';
import TherapistDirectory from './Components/TherapistDirectory';
import CommunityForum from './Components/CommunityForum';
import MoodSummary from './Components/MoodSummary';
function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/moodtracker" element={<MoodTracker />} />
          <Route path="/games" element={<Games />} />
          <Route path="/breathingexercise" element={<BreathingExercise />} />
          <Route path="/psychologicalwellbeingscale" element={<PsychologicalWellbeingScale />} />
          <Route path="/TherapistDirectory" element={<TherapistDirectory />} />
          <Route path="/CommunityForum" element={<CommunityForum />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
    </Router>
  );
}

export default App;
