import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/masuk" />
  );
};

export default PrivateRoute;
