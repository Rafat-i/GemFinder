// src/components/Success.js
import React from 'react';
import './Success.css'; // Import the CSS file

const Success = () => {
  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">Thank you for your payment. Your transaction was successful.</p>
      <a href="/" className="home-button">Go to Home</a>
    </div>
  );
};

export default Success;
