import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">ZenZone</Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          Menu
        </button>
        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li className="dropdown">
            <span>Therapy Room</span>
            <ul className="dropdown-menu">
              <li><Link to="/meditation" onClick={toggleMenu}>Meditation</Link></li>
              <li><Link to="/moodtracker" onClick={toggleMenu}>Mood Tracker</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <span>Self Help Tools</span>
            <ul className="dropdown-menu">
              <li><Link to="/games" onClick={toggleMenu}>Games</Link></li>
              <li><Link to="/breathingexercise" onClick={toggleMenu}>Breathing Exercise</Link></li>
              <li><Link to="/psychologicalwellbeingscale" onClick={toggleMenu}>Psychological Well-being Scale</Link></li>
            </ul>
          </li>
          <li><Link to="/TherapistDirectory" onClick={toggleMenu}>Therapist Directory</Link></li>
          <li className="dropdown">
            <span>Help & Support</span>
            <ul className="dropdown-menu">
              <li><Link to="/communityforum" onClick={toggleMenu}>Community Forum</Link></li>
              <li><Link to="/chatbot" onClick={toggleMenu}>Chatbot</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;