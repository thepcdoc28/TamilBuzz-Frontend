import React from 'react';
import './StaticPages.css';
import ExitToMenuButton from '../../components/ExitToMenuButton/ExitToMenuButton';

function About() {
  return (
    <div className="static-page-container">
      <ExitToMenuButton />
      <h1>About Us</h1>
      <p>Welcome to TamilBuzz, your number one source for all things Tamil Cinema.</p>
      <p>We're dedicated to providing you the very best of movie reviews, ratings, and updates.</p>
    </div>
  );
}

export default About;
