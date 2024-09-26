// AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ element }) => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.email === 'rafat@gmail.com'; // Adjust as needed

  return isAdmin ? element : <Navigate to="/login" />;
};

export default AdminRoute;
