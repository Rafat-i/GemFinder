// src/components/Cancel.js
import React from 'react';
import './Cancel.css'; // Import the CSS file

const Cancel = () => {
  return (
    <div className="cancel-container">
      <h1 className="cancel-title">Payment Canceled</h1>
      <p className="cancel-message">Your payment has been canceled. If this was a mistake, you can try again.</p>
      <div className="button-container">
        <a href="/" className="home-button">Go to Home</a>
        <a href="/payment" className="retry-button">Try Again</a>
      </div>
    </div>
  );
};

export default Cancel;
