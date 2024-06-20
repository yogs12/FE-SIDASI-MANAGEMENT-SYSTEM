import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return user && user.isAdmin ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/masuk" />
  );
};

export default AdminRoute;
