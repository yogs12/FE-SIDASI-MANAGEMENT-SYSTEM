// src/auth/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = () => {
  const { auth } = useAuth();

  return auth.isAuthenticated && auth.user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/masuk" />
  );
};

export default AdminRoute;
