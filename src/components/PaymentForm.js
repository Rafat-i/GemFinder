// src/components/PaymentForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:4242/create-checkout-session', {
        plan, // Send the selected plan to the backend
      });

      const sessionId = response.data.id;

      // Redirect to Stripe Checkout
      const stripe = window.Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError('Failed to create checkout session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default PaymentForm;
