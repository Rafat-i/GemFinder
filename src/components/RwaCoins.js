import React from 'react';
import rioLogo from '../Image/rio.png'; // Ensure the path is correct
import rioBoughtPrice from '../Image/rioBoughtPrice.png'; // Ensure the path is correct
import rioSoldPrice from '../Image/rioSoldPrice.png'; // Ensure the path is correct
import './RwaCoins.css';

const RwaCoins = () => {
  return (
    <div className="rwa-coins-container">
      <div className="rwa-coins-content">
        <h1>🌍 Real-World Asset Coins (RWA): A New Era in Crypto 🚀</h1>
        <p>
          Real-world asset (RWA) coins are redefining how we tokenize and trade tangible assets. From 
          real estate to private equity, these coins bridge the gap between traditional investments and blockchain. Here’s a deep dive into one of our most profitable investments. 💎
        </p>

        <h2>💡 Examples of Successful RWA Coins</h2>
        <ul>
          <li>🔹 <strong>Ondo</strong>: Specializes in tokenized treasury products, providing investors access to real-world yield opportunities.</li>
          <li>🔹 <strong>Nxra</strong>: A revolutionary platform enabling seamless access to decentralized finance secured by real-world assets.</li>
        </ul>

        <h2>🎯 Focus Coin: Realio Network (RIO)</h2>
        <div className="coin-details">
          <img src={rioLogo} alt="Realio Network Logo" className="coin-logo" />
          <p>
            <strong>Realio Network</strong> (RIO) stands out as a Layer-1 multi-chain Web3 ecosystem, designed to revolutionize the issuance and management of digitally native real-world assets (RWAs). This platform aims to break down barriers in investing, trading, and leveraging exclusive real estate, private equity, and other RWAs through decentralized finance (DeFi). 🌟
          </p>
          <p>
            At its core, Realio Network operates as a software as a service (SaaS) platform, facilitating the onboarding of issuers and investors and streamlining the offering and sale of private securities. The network is secured by RWAs, ensuring a robust and reliable ecosystem. Realio Network's affiliated registered funding portal, Diamond Hands AF, LLC d/b/a Realio, plays a crucial role in this process. 🔥
          </p>
        </div>

        <h3>💸 Investment Details</h3>
        <p>
          On <strong>June 15, 2023</strong>, I bought Realio Network (RIO) at a price of <strong>$0.11</strong>.
        </p>
        <div className="price-images">
          <img src={rioBoughtPrice} alt="RIO Bought Price" className="price-img" />
          <img src={rioSoldPrice} alt="RIO Sold Price" className="price-img" />
        </div>
        <p>
          💰 <strong>Sold at $2.37</strong> on April 4, 2024, achieving a total profit of{' '}
          <strong>x21 (2100%)</strong>! 🚀
        </p>

        <h4>📊 Profit Examples:</h4>
        <ul>
          <li>💵 If you invested <strong>$1,000</strong>, your return would have been <strong>$21,000</strong>.</li>
          <li>💵 If you invested <strong>$5,000</strong>, your return would have been <strong>$105,000</strong>.</li>
          <li>💵 If you invested <strong>$10,000</strong>, your return would have been <strong>$210,000</strong>.</li>
        </ul>

        <h3>🌟 The Future of RWAs</h3>
        <p>
          With the tokenization of real-world assets, RWA-focused cryptocurrencies like Realio Network (RIO) 
          are breaking barriers in traditional finance. The integration of blockchain with tangible assets creates exciting opportunities for investors. Don't miss out on this transformative trend! 🚀
        </p>
      </div>
    </div>
  );
};

export default RwaCoins;
