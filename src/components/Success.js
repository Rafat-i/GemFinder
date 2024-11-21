import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ref, update, get } from 'firebase/database';
import { database } from '../Firebase';
import './Success.css';

const Success = () => {
  const { currentUser } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState(null); // Local state to hold subscription data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);

        // Log the full URL
        console.log('Current URL:', window.location.href);

        // Get the URL parameters
        const queryParams = new URLSearchParams(window.location.search);
        let plan = queryParams.get('plan');

        // Log the extracted plan
        console.log('Extracted plan from URL:', plan);

        if (!plan) {
          // Apply fallback if plan is not found in the URL
          plan = '1 Month';
          console.log('Fallback plan applied: 1 Month');
        } else {
          plan = decodeURIComponent(plan).trim();
          console.log('Decoded plan:', plan);
        }

        let updatedSubscriptionStatus = {
          subscriptionStatus: true,
          active1Month: false,
          active2Months: false,
          activeLifetime: false,
        };

        // Correctly handle the selected plan
        if (plan === '1 Month') {
          updatedSubscriptionStatus.active1Month = true;
          console.log('Setting active1Month to true');
        } else if (plan === '2 Months') {
          updatedSubscriptionStatus.active2Months = true;
          console.log('Setting active2Months to true');
        } else if (plan === 'Lifetime') {
          updatedSubscriptionStatus.activeLifetime = true;
          console.log('Setting activeLifetime to true');
        } else {
          console.error('Unknown plan:', plan);
          return;
        }

        console.log('Updated Subscription Status before update:', updatedSubscriptionStatus);

        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            console.log('User data before update:', snapshot.val());
            await update(userRef, updatedSubscriptionStatus);
            console.log('Subscription status updated successfully');

            // Re-fetch the updated data from Firebase
            const updatedSnapshot = await get(userRef);
            if (updatedSnapshot.exists()) {
              setSubscriptionData(updatedSnapshot.val()); // Set the updated subscription data
            }
          } else {
            console.error('User data does not exist');
          }
        } catch (error) {
          console.error('Error updating subscription status:', error);
        }
      } else {
        console.error('No current user found');
      }

      setLoading(false);
    };

    updateSubscriptionStatus();
  }, [currentUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="success-container">
      <h1 className="success-title">Payment Successful!</h1>
      <p className="success-message">Thank you for your payment. Your transaction was successful.</p>
      {subscriptionData && (
        <div>
          <h3>Your Subscription Status:</h3>
          <p>Active 1 Month: {subscriptionData.active1Month ? 'Yes' : 'No'}</p>
          <p>Active 2 Months: {subscriptionData.active2Months ? 'Yes' : 'No'}</p>
          <p>Active Lifetime: {subscriptionData.activeLifetime ? 'Yes' : 'No'}</p>
        </div>
      )}
      <a href="/" className="home-button">Go to Home</a>
    </div>
  );
};

export default Success;
