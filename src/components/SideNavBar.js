// src/components/SideNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './SideNavBar.css';  // Add styling for your sidebar

const SideNavBar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/ai-coins">AI Coins</Link></li>
        <li><Link to="/gaming-coins">Gaming Coins</Link></li>
        <li><Link to="/rwa-coins">RWA Coins</Link></li>
        <li><Link to="/success-stories">Success Stories</Link></li>
      </ul>
    </div>
  );
};

export default SideNavBar;
