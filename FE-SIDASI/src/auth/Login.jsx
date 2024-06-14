import React from 'react';
import './Login.css'; // Import the CSS file

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Selamat datang</h2>
        <div className="input-group">
            <p>E-Mail</p>
          <input type="text" />
        </div>
        <div className="input-group">
            <p>Kata Sandi</p>
          <input type="password" />
          <a href="#" className="forgot-password">Lupa Kata Sandi?</a>
        </div>
        <button className="login-button">Masuk</button>
        <button className="register-button">Daftar</button>
      </div>
      <div className="login-image">
        <img src="/public/images/mockuplogin.png" alt="Store" />
      </div>
    </div>
  );
};

export default Login;
