// src/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
  const { auth } = useAuth();

  return auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/masuk" />
  );
};

export default PrivateRoute;
