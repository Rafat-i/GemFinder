import React from 'react';
import ghxLogo from '../Image/ghx.png'; // Ensure the path is correct
import ghxBoughtPrice from '../Image/ghxBoughtPrice.png'; // Ensure the path is correct
import ghxSoldPrice from '../Image/ghxSoldPrice.png'; // Ensure the path is correct
import './GamingCoins.css';

const GamingCoins = () => {
  return (
    <div className="gaming-coins-container">
      <div className="gaming-coins-content">
        <h1>🎮 Gaming Coins: Revolutionizing the Crypto World 🚀</h1>
        <p>
          Gaming coins are a gateway to the future of blockchain and play-to-earn platforms. From
          incentivizing gamers to leveraging computing power, these coins are making waves! Here’s
          a deep dive into one of our most successful investments. 💎
        </p>

        <h2>💡 Examples of Successful Gaming Coins</h2>
        <ul>
          <li>🔹 <strong>Naka</strong>: Empowering gamers with a play-to-earn ecosystem and community-driven incentives.</li>
          <li>🔹 <strong>Creo</strong>: A revolutionary gaming token facilitating decentralized asset ownership and transactions.</li>
        </ul>

        <h2>🎯 Focus Coin: GamerCoin (GHX)</h2>
        <div className="coin-details">
          <img src={ghxLogo} alt="GamerCoin Logo" className="coin-logo" />
          <p>
            <strong>GamerCoin</strong> is the native token of the GamerHash platform, which has been
            operating since 2017. With over <strong>780,000+ gamers</strong>, the platform allows
            users to earn money by sharing their PC’s excess computing power. 🌟
          </p>
          <p>
            Now expanding into AI services, GamerHash enables GPU power for <strong>3D rendering</strong>,
            <strong>data analysis</strong>, and <strong>LLM models</strong>. With its innovative
            architecture, it’s a prime example of the new <strong>DePIN</strong> label. 🔥
          </p>
        </div>

        <h3>💸 Investment Details</h3>
        <p>
          On <strong>January 10, 2024</strong>, I bought GamerCoin (GHX) at a price of <strong>$0.025</strong>.
        </p>
        <div className="price-images">
          <img src={ghxBoughtPrice} alt="GamerCoin Bought Price" className="price-img" />
          <img src={ghxSoldPrice} alt="GamerCoin Sold Price" className="price-img" />
        </div>
        <p>
          💰 <strong>Sold at $0.34</strong> on March 17, 2024, achieving a total profit of{' '}
          <strong>x15 (1500%)</strong>! 🚀
        </p>

        <h4>📊 Profit Examples:</h4>
        <ul>
          <li>💵 If you invested <strong>$1,000</strong>, your return would have been <strong>$15,000</strong>.</li>
          <li>💵 If you invested <strong>$5,000</strong>, your return would have been <strong>$75,000</strong>.</li>
          <li>💵 If you invested <strong>$10,000</strong>, your return would have been <strong>$150,000</strong>.</li>
        </ul>

        <h3>🎮 The Rise of Gaming Coins</h3>
        <p>With the gaming industry booming, gaming-focused cryptocurrencies like GamerCoin (GHX) are redefining how gamers monetize their passion. The integration of blockchain with gaming platforms creates exciting opportunities for players and investors alike. Level up your portfolio with the next-gen gaming tokens! 🚀</p>

      </div>
    </div>
  );
};

export default GamingCoins;
