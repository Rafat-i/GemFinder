import React, { useState } from 'react';
import './Home.css'; // Import the CSS file for styling
import rightImage from '../Image/RightImage.jpg'; 
import { loadStripe } from '@stripe/stripe-js'; // Stripe library for payments

// Initialize Stripe with your public key
const stripePromise = loadStripe('pk_test_51Q8Se9AVQ8iROiHBKZHhiTPHcyGblwLx7WZFZuw4JMVtDn3vc9E6AdhKptxGawLfsWnvgZHyppuBAjP6RHqJnxaR00zNrUzNQz'); // Replace with your actual Stripe public key

function Home() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle subscription click
    const handleSubscription = async (plan) => {
        setLoading(true);
        setErrorMessage('');

        const stripe = await stripePromise;

        try {
            const response = await fetch('http://localhost:4242/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan }), // Send selected plan to backend
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                setErrorMessage(result.error.message);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            {/* Motivational Section with Larger Image */}
            <div className="motivational-section">
                <div className="text-image-wrapper">
                    <div className="motivational-text">
                        <h2>You Are the Next Crypto Millionaire</h2>
                        <p>Sounds too good to be true, right? Every second you wait is costing you money...</p>
                    </div>
                    <div className="motivational-image">
                        <img src={rightImage} alt="Crypto Success" className="right-image" />
                    </div>
                </div>
            </div>
            
            {/* About Us Section */}
            <div className="about-us-section">
                <h2>Why Choose Us?</h2>
                <div className="about-us-content">
                    <div className="about-us-item">
                        <h3>Join Our Family</h3>
                        <p>We're a team of passionate individuals committed to your success.</p>
                    </div>
                    <div className="about-us-item">
                        <h3>Gem Finder</h3>
                        <p>Our mission is to make DEX trading safer from malicious contracts, exit scams ("rug pulls"), and hacks.</p>
                    </div>
                    <div className="about-us-item">
                        <h3>Advanced Charts Analysis</h3>
                        <p>Our expert analyst provides a detailed technical analysis on every call possible.</p>
                    </div>
                    <div className="about-us-item">
                        <h3>Advanced Entry and Exit Strategies</h3>
                        <p>Get Sniper entries and exits for low-risk crypto investments.</p>
                    </div>
                    <div className="about-us-item">
                        <h3>Full Customer Support</h3>
                        <p>Have your questions answered by our experts 24/7 or find your answer in our Q&A.</p>
                    </div>
                </div>
            </div>
            
            {/* Additional Text */}
            <p className="additional-text">
                Discover the potential of life-changing and undervalued crypto gems with every plan. Your gateway to smarter investing starts here!
            </p>
            
            {/* Subscription Plan Section */}
            <div className="subscription-section">
                <h2>Choose Your Plan</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {loading ? (
                    <p className="loading-message">Creating checkout session...</p>
                ) : (
                    <div className="plans-container">
                        <div className="plan">
                            <div className="plan-icon">📅</div>
                            <h3>1 Month</h3>
                            <p className="price">$160</p>
                            <button className="select-plan" onClick={() => handleSubscription('1 Month')}>Get Started</button>
                        </div>
                        <div className="plan">
                            <div className="plan-icon">📆</div>
                            <h3>2 Months</h3>
                            <p className="price">$240</p>
                            <button className="select-plan" onClick={() => handleSubscription('2 Months')}>Get Started</button>
                        </div>
                        <div className="plan">
                            <div className="plan-icon">🎁</div>
                            <h3>Lifetime</h3>
                            <p className="price">$1000</p>
                            <button className="select-plan" onClick={() => handleSubscription('Lifetime')}>Get Started</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
