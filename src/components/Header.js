import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../Firebase'; // Import Firebase auth
import './Header.css';
import logoImage from '../Image/CryptoLogo.jpg'; // Make sure the image path is correct
import { useAuth } from '../context/AuthContext'; // Import AuthContext

const Header = () => {
  const { currentUser } = useAuth(); // Get the current user from context
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      console.log("User signed out successfully."); // Optional: handle post-logout actions here
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error("Error signing out: ", error); // Handle errors if needed
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logoImage} alt="Gem Finder" className="logo-image" />
        <a href="/" className="logo-text">Gem Finder</a>
      </div>
      <div className="header-buttons">
        {!currentUser ? ( // Check if the user is logged in
          <>
            <Link to="/signup" className="header-btn">Sign Up</Link>
            <Link to="/login" className="header-btn">Log In</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="header-btn">Log Out</button> // Logout button
        )}
      </div>
    </header>
  );
};

export default Header;
