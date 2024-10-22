import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import './Header.css';
import logoImage from '../Image/CryptoLogo.jpg';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth(); // Ensure setCurrentUser is available
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); // Update currentUser state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [setCurrentUser]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully.");
      setCurrentUser(null); // Clear current user state
      navigate('/'); // Navigate to the main page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const isAdmin = currentUser?.email === 'rafat@gmail.com'; // Check if the current user is admin

  return (
    <header className="header">
      <div className="header-left">
        <img src={logoImage} alt="Gem Finder" className="logo-image" />
        <a href="/" className="logo-text">Gem Finder</a>
      </div>
      <div className="header-buttons">
        {!currentUser ? ( // User is not logged in
          <>
            <Link to="/signup" className="header-btn">Sign Up</Link>
            <Link to="/login" className="header-btn">Log In</Link>
          </>
        ) : currentUser.blocked ? ( // User is blocked
          <div className="blocked-message">
            Your account is temporarily blocked. Please contact support.
          </div>
        ) : isAdmin ? ( // Admin logged in
          <>
            <button onClick={handleLogout} className="header-btn">Log Out</button> {/* Only Log Out button for admin */}
          </>
        ) : ( // Regular user logged in
          <>
            <Link to="/edit-profile" className="header-btn">Profile</Link> {/* Profile button for regular users */}
            <button onClick={handleLogout} className="header-btn">Log Out</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
