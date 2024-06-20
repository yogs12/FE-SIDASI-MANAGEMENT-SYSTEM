import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user && user.id_user) {
      setAuth({
        isAuthenticated: true,
        user,
      });
    }
  }, []);

  const login = ({ id_user, nama, role, token }) => {
    if (id_user && nama && role && token) {
      const user = { id_user, nama, role };
      setAuth({
        isAuthenticated: true,
        user,
      });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);