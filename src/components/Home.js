import React from 'react';
import './Home.css'; // Import the CSS file for styling

// Import the new image from the Image folder inside src
import rightImage from '../Image/RightImage.jpg'; 

function Home() {
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
                <div className="plans-container">
                    <div className="plan">
                        <div className="plan-icon">📅</div>
                        <h3>1 Month</h3>
                        <p className="price">$160</p>
                        <button className="select-plan">Get Started</button>
                    </div>
                    <div className="plan">
                        <div className="plan-icon">📆</div>
                        <h3>2 Months</h3>
                        <p className="price">$240</p>
                        <button className="select-plan">Get Started</button>
                    </div>
                    <div className="plan">
                        <div className="plan-icon">🎁</div>
                        <h3>Lifetime</h3>
                        <p className="price">$1000</p>
                        <button className="select-plan">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;




















