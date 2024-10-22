// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Access currentUser from AuthContext

  console.log("Current User in ProtectedRoute: ", currentUser); // Debugging log

  if (!currentUser) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }

  return children; // Render the protected component if logged in
};

export default ProtectedRoute;
