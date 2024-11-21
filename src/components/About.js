// src/components/About.js
import React from 'react';
import './About.css'; // Make sure this is linked properly

// Import images
import coinbaseLogo from '../Image/coinbase.png';
import binanceLogo from '../Image/binance.png';
import krakenLogo from '../Image/kraken.png';
import ledgerLogo from '../Image/ledger.png';
import metamaskLogo from '../Image/metamask.png';
import uniswapLogo from '../Image/uniswap.png';

const About = () => {
  return (
    <div className="about-page-container">
      {/* Main Content */}
      <div className="about-content">
        <h1>✨ About Us</h1>
        <p>Welcome to <strong>Gem Finder</strong>! 💎 We are a platform dedicated to providing exclusive cryptocurrency insights to help you make informed investment decisions. 🚀</p>
        <p>Our mission is to help users find undervalued crypto gems and maximize their investment opportunities. 🌟</p>

        {/* "Our Philosophy" added here */}
        <p>
          🕒 If you're looking to get rich quick in 30 days, this group may not be for you. We focus on taking advantage of long-term crypto cycles. 
          We believe in strategic, informed decisions and patience, as crypto investments grow over time. 💡 Our approach is about understanding market trends and making calculated moves to maximize returns in the long run.
          We are not day traders who get liquidated for small gains. We are investors, and historically, investors always win against day traders. 📈
        </p>

        <h2>💰 What is Cryptocurrency?</h2>
        <p>Cryptocurrency is a type of digital or virtual currency that uses cryptography for security. 🔒 It operates independently of a central authority or government. 🌐 If you're new to crypto, don't worry! We've made it simple to start. 😊</p>

        <h2>🛒 How to Start Buying Cryptocurrency</h2>
        <p>To start buying cryptocurrency, follow these easy steps:</p>
        <ol>
          <li>🔍 Choose a cryptocurrency exchange like Binance, Coinbase, or Kraken.</li>
          <li>📝 Sign up and verify your identity on the exchange.</li>
          <li>💳 Deposit funds into your account using a bank transfer or credit card.</li>
          <li>🎉 Buy your first cryptocurrency!</li>
        </ol>

        <h3>🏦 Recommended Centralized Exchanges:</h3>
        <div className="exchanges">
          {/* Use imported images */}
          <img src={coinbaseLogo} alt="Coinbase" />
          <img src={binanceLogo} alt="Binance" />
          <img src={krakenLogo} alt="Kraken" />
        </div>

        {/* New section for Decentralized Exchanges */}
        <h2>🔑 Why Use Decentralized Exchanges (DEX)?</h2>
        <p>
          When you keep your crypto on centralized exchanges, you are essentially trusting them with your keys. 🛡️ 
          However, in the world of crypto, the phrase <strong>"Not your keys, not your coins"</strong> rings true. 💡
          Centralized exchanges are vulnerable to hacking and can be subject to regulations that might freeze or seize your assets. ❌
          On the other hand, decentralized exchanges give you control over your assets because they are non-custodial, meaning you hold your own private keys. 🔓 
          This makes them a safer choice for long-term storage of crypto. 🌟
        </p>

        <h3>🌐 Recommended Decentralized Exchanges:</h3>
        <div className="exchanges">
          {/* Use imported images for DEX */}
          <img src={ledgerLogo} alt="Ledger" />
          <img src={metamaskLogo} alt="MetaMask" />
          <img src={uniswapLogo} alt="Uniswap" />
        </div>
      </div>
    </div>
  );
};

export default About;
