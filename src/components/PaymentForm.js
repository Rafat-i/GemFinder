import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use `useNavigate` instead of `useHistory`

const PaymentForm = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use `useNavigate` for redirecting

  const createCheckoutSession = async () => {
    console.log('Sending plan to backend:', plan); // Debug: Log the selected plan
    try {
      const response = await axios.post('http://localhost:4242/create-checkout-session', {
        plan, // Send the selected plan to the backend
      });

      const stripe = window.Stripe('pk_test_51Q8Se9AVQ8iROiHBKZHhiTPHcyGblwLx7WZFZuw4JMVtDn3vc9E6AdhKptxGawLfsWnvgZHyppuBAjP6RHqJnxaR00zNrUzNQz'); // Replace with your Stripe publishable key
      const { error } = await stripe.redirectToCheckout({ sessionId: response.data.id });

      if (error) {
        setError(error.message);
      } else {
        // If there's no error, assume the payment went through successfully
        // Redirect to success page with the selected plan
        navigate(`/success?plan=${encodeURIComponent(plan)}`);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error); // Log full error details
      setError('Failed to create checkout session. Please try again.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    createCheckoutSession().finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      {error && (
        <>
          <p style={{ color: 'red' }}>{error}</p>
          <button type="button" onClick={handleSubmit}>
            Try Again
          </button>
        </>
      )}
    </form>
  );
};

export default PaymentForm;
