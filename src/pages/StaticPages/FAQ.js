import React from 'react';
import './StaticPages.css';
import ExitToMenuButton from '../../components/ExitToMenuButton/ExitToMenuButton';

function FAQ() {
  return (
    <div className="static-page-container">
      <ExitToMenuButton />
      <h1>Frequently Asked Questions</h1>
      <div className="faq-item">
        <h3>How do I create an account?</h3>
        <p>Click on the profile icon or go to the Login page to sign up.</p>
      </div>
      <div className="faq-item">
        <h3>How can I review a movie?</h3>
        <p>Navigate to any movie's page and scroll down to the reviews section to leave your rating and review.</p>
      </div>
    </div>
  );
}

export default FAQ;
