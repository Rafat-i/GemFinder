// AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser && currentUser.email === 'rafat@gmail.com'; // Adjust as needed

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
