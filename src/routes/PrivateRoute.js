// src/routes/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the import based on your Auth context location

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth(); // Assuming your Auth context provides currentUser

    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
