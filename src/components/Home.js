// src/components/Home.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import { loadStripe } from '@stripe/stripe-js';
import { ref, update, get } from 'firebase/database';
import { useAuth } from '../context/AuthContext';
import { database } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Q8Se9AVQ8iROiHBKZHhiTPHcyGblwLx7WZFZuw4JMVtDn3vc9E6AdhKptxGawLfsWnvgZHyppuBAjP6RHqJnxaR00zNrUzNQz');

function Home() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [prices, setPrices] = useState({
        BTC: { price: null, change: null },
        ETH: { price: null, change: null },
        SOL: { price: null, change: null },
    });

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
                const data = await response.json();
                setPrices({
                    BTC: { price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
                    ETH: { price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
                    SOL: { price: data.solana.usd, change: data.solana.usd_24h_change },
                });
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
        const intervalId = setInterval(fetchPrices, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubscription = async (plan) => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        const stripe = await stripePromise;

        try {
            const response = await fetch('http://localhost:4242/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan }),
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
            } else {
                // Call the function to update the user's subscription status
                await updateUserSubscriptionStatus(plan);
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error during subscription:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateUserSubscriptionStatus = async (plan) => {
        if (currentUser) {
            try {
                const userRef = ref(database, `users/${currentUser.uid}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();

                    const updatedSubscriptionStatus = {
                        subscriptionStatus: true, // Set to true when subscribed
                        active1Month: plan === '1 Month' ? true : userData.active1Month || false,
                    active2Months: plan === '2 Months' ? true : userData.active2Months || false,
                    activeLifetime: plan === 'Lifetime' ? true : userData.activeLifetime || false,
                    };

                    await update(userRef, {
                        ...userData,
                        ...updatedSubscriptionStatus,
                    });
                }
            } catch (error) {
                console.error('Error updating subscription status:', error);
            }
        }
    };

    return (
        <div className="home-container">
            {/* Motivational Section with Live Price Tracking */}
            <div className="motivational-section">
                <div className="text-price-wrapper">
                    <div className="motivational-text">
                        <h2>You Are the Next Crypto Millionaire</h2>
                        <p>Sounds too good to be true, right? Every second you wait is costing you money...</p>
                    </div>
                    <div className="live-prices">
                        <h3>Live Prices</h3>
                        <div className="crypto-price">
                            <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022" alt="BTC" className="crypto-logo" />
                            <p>BTC: ${prices.BTC.price ? prices.BTC.price.toLocaleString() : 'Loading...'}</p>
                            <p className={`price-change ${prices.BTC.change >= 0 ? 'positive' : 'negative'}`}>
                                {prices.BTC.change ? prices.BTC.change.toFixed(2) + '%' : ''}
                            </p>
                        </div>
                        <div className="crypto-price">
                            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022" alt="ETH" className="crypto-logo" />
                            <p>ETH: ${prices.ETH.price ? prices.ETH.price.toLocaleString() : 'Loading...'}</p>
                            <p className={`price-change ${prices.ETH.change >= 0 ? 'positive' : 'negative'}`}>
                                {prices.ETH.change ? prices.ETH.change.toFixed(2) + '%' : ''}
                            </p>
                        </div>
                        <div className="crypto-price">
                            <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=022" alt="SOL" className="crypto-logo" />
                            <p>SOL: ${prices.SOL.price ? prices.SOL.price.toLocaleString() : 'Loading...'}</p>
                            <p className={`price-change ${prices.SOL.change >= 0 ? 'positive' : 'negative'}`}>
                                {prices.SOL.change ? prices.SOL.change.toFixed(2) + '%' : ''}
                            </p>
                        </div>
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
                            <div className="plan-icon">🏆</div>
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
