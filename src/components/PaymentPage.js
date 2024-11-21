import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { useLocation } from 'react-router-dom';

// Load Stripe public key
const stripePromise = loadStripe('pk_test_51Q8Se9AVQ8iROiHBKZHhiTPHcyGblwLx7WZFZuw4JMVtDn3vc9E6AdhKptxGawLfsWnvgZHyppuBAjP6RHqJnxaR00zNrUzNQz'); // Replace with your actual publishable key

const PaymentPage = () => {
  const location = useLocation();
  const { plan } = location.state || { plan: '' }; // Get the selected plan, default to empty string if none

  // Optional: Show error if plan is not selected
  if (!plan) {
    return <p>Error: No plan selected. Please select a plan to proceed with payment.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <h2>Complete Payment</h2>
      <p>Selected Plan: {plan}</p>
      <PaymentForm plan={plan} />
    </Elements>
  );
};

export default PaymentPage;
