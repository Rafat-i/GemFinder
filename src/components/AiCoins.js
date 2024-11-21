// src/pages/AiCoins.js
import React from 'react';
import taoLogo from '../Image/tao.png'; // Make sure the path is correct
import taoBoughtPrice from '../Image/taoBoughtPrice.png'; // Ensure correct path
import taoSoldPrice from '../Image/taoSoldPrice.png'; // Ensure correct path
import './AiCoins.css';

const AiCoins = () => {
  return (
    <div className="ai-coins-container">
      <div className="ai-coins-content">
        <h1>🚀 AI Coins: The Future of Crypto</h1>
        <p>AI-driven cryptocurrencies are revolutionizing the way blockchain and machine learning intersect. These innovative projects allow miners, developers, and AI enthusiasts to contribute to the development of artificial intelligence while earning rewards in the form of cryptocurrency. Let's explore some of the successful AI coins in the market today! 🤖💡</p>

        <h2>💡 Examples of Successful AI Coins</h2>
        <ul>
          <li>🔹 <strong>Fetch.AI</strong>: A decentralized platform for smart cities and smart transportation.</li>
          <li>🔹 <strong>Render Token</strong>: A decentralized rendering platform powered by AI.</li>
          <li>🔹 <strong>OraiChain</strong>: Building a decentralized AI-powered data marketplace.</li>
          <li>🔹 <strong>OctaSpace</strong>: A blockchain project integrating AI with decentralized cloud computing.</li>
        </ul>

        <h2>🚀 Our Main Focus: Bittensor (TAO)</h2>
        <div className="coin-details">
          <img src={taoLogo} alt="Bittensor Logo" className="coin-logo" />
          <p><strong>Bittensor</strong> is a groundbreaking platform that stands at the intersection of blockchain technology and machine learning. It is designed as a decentralized network that fundamentally changes how artificial intelligence (AI) is developed, shared, and monetized. By utilizing a peer-to-peer intelligence market, Bittensor enables miners to contribute to the training of machine learning models, rewarding them with tokens for the value they provide. 🚀</p>
          <p>At the core of Bittensor's innovation is its use of a token-based economy, where the native cryptocurrency, <strong>TAO</strong>, plays a pivotal role. With a fixed total supply mirroring that of Bitcoin, TAO incentivizes participation and contribution to the network. This approach ensures that the development and distribution of AI technology are not only democratized but also rewarded in a manner that is fair and transparent. 💰</p>
        </div>

        <h3>💸 My Investment Journey with Bittensor</h3>
        <p>On <strong>July 2, 2023</strong>, I bought Bittensor (TAO) at <strong>$46</strong> per coin. Take a look at the price performance! 📈</p>
        
        <div className="price-images">
          <img src={taoBoughtPrice} alt="Bittensor Bought Price" className="price-img" />
          <img src={taoSoldPrice} alt="Bittensor Sold Price" className="price-img" />
        </div>

        <p>💰 <strong>Sold at $639</strong>, on February 18th 2024, making a total profit of <strong>x14 (1400%)</strong>! 🚀</p>

        <h4>📊 Here are some examples of how the investment would have grown:</h4>
        <ul>
          <li>💵 If you invested $1,000, your return would have been <strong>$14,000</strong>.</li>
          <li>💵 If you invested $5,000, your return would have been <strong>$70,000</strong>.</li>
          <li>💵 If you invested $10,000, your return would have been <strong>$140,000</strong>.</li>
        </ul>

        <h3>🔥 The Potential of AI Coins</h3>
        <p>As AI technology continues to evolve, investing in AI-powered cryptocurrencies like Bittensor can offer long-term gains. It’s an exciting time for blockchain, machine learning, and decentralized finance (DeFi). Get ready to jump on board the 🚀!</p>
      </div>
    </div>
  );
};

export default AiCoins;
