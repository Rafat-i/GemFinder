// src/components/Cancel.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Cancel.css'; // Import the CSS file

const Cancel = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle Try Again button click
  const handleTryAgain = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="cancel-container">
      <h1 className="cancel-title">Payment Canceled</h1>
      <p className="cancel-message">Your payment has been canceled. If this was a mistake, you can try again.</p>
      <div className="button-container">
        <a href="/" className="home-button">Go to Home</a>
        <button className="retry-button" onClick={handleTryAgain}>Try Again</button>
      </div>
    </div>
  );
};

export default Cancel;
