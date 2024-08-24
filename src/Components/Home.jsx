import React from 'react';
import Spline from '@splinetool/react-spline';
import './home.css';

export default function Home() {
  return (
    <div className="home-container">
      <main className="main-content">
        <div className="spline-container">
          <Spline scene="https://prod.spline.design/JpG7iH9cFkBujBIT/scene.splinecode" />
        </div>
      
      </main>
    </div>
  );
}