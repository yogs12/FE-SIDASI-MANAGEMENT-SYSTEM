import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      console.log('Server response:', response.data);

      if (response.data.role && response.data.token) {
        const userData = {
          nama: response.data.nama || 'Unknown User',
          role: response.data.role,
          token: response.data.token
        };
        login(userData);  // Set user data in context
        localStorage.setItem('token', response.data.token);  // Save token to localStorage

        // Redirect based on role
        if (response.data.role === 'admin') {
          navigate('/admin');  // Redirect admin to admin dashboard
        } else {
          navigate('/');  // Redirect user to main page
        }
      } else {
        console.error('Incomplete response data:', response.data);
        // Handle incomplete response data error
      }
      
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Selamat datang</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <p>E-Mail</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <p>Kata Sandi</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="#" className="forgot-password">Lupa Kata Sandi?</a>
          </div>
          <button type="submit" className="login-button">Masuk</button>
        </form>
        <button className="register-button" onClick={() => navigate('/daftar')}>Daftar</button>
      </div>
      <div className="login-image">
        <img src="/images/mockuplogin.png" alt="Store" />
      </div>
    </div>
  );
};

export default Login;
