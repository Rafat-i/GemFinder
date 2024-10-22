// src/components/PaymentPage.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';

// Load Stripe public key
const stripePromise = loadStripe('pk_test_51Q8Se9AVQ8iROiHBKZHhiTPHcyGblwLx7WZFZuw4JMVtDn3vc9E6AdhKptxGawLfsWnvgZHyppuBAjP6RHqJnxaR00zNrUzNQz'); // Replace with your actual publishable key

const PaymentPage = () => {
  const location = useLocation();
  const { amount } = location.state || { amount: 0 }; // Get the amount from state, default to 0 if none

  // Optional: Redirect or show error if amount is invalid
  if (amount <= 0) {
    return <p>Error: Invalid payment amount.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <h2>Complete Payment</h2>
      <p>Amount to be paid: ${(amount / 100).toFixed(2)}</p>
      <PaymentForm amount={amount} />
    </Elements>
  );
};

export default PaymentPage;
