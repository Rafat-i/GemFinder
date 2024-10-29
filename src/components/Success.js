// src/components/Success.js
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ref, update, get } from 'firebase/database';
import { database } from '../Firebase';
import './Success.css';

const Success = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        
        // Get the URL parameters
        const queryParams = new URLSearchParams(window.location.search);
        const plan = decodeURIComponent(queryParams.get('plan') || ''); // Decode the URL parameter

        // Log the plan for debugging
        console.log('Plan from URL:', plan);

        // Prepare updated subscription status
        const updatedSubscriptionStatus = {
          subscriptionStatus: true, // This should always be set to true
          active1Month: false,
          active2Months: false,
          activeLifetime: false,
        };

        // Set the active status based on the plan
        if (plan === '1 Month') {
          updatedSubscriptionStatus.active1Month = true;
        } else if (plan === '2 Months') {
          updatedSubscriptionStatus.active2Months = true;
        } else if (plan === 'Lifetime') {
          updatedSubscriptionStatus.activeLifetime = true;
        }

        // Log updated values for debugging
        console.log('Updated Subscription Status:', updatedSubscriptionStatus);

        try {
          // Get current user data before updating
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            await update(userRef, updatedSubscriptionStatus);
            console.log('Subscription status updated successfully');
          } else {
            console.error('User data does not exist');
          }
        } catch (error) {
          console.error('Error updating subscription status:', error);
        }
      } else {
        console.error('No current user found');
      }
    };

    updateSubscriptionStatus();
  }, [currentUser]);

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">Thank you for your payment. Your transaction was successful.</p>
      <a href="/" className="home-button">Go to Home</a>
    </div>
  );
};

export default Success;
