import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-image">
        <img src="/public/images/mockupregister.png" alt="Store" />
      </div>
      <div className="register-form">
        <h2>Buat Akun Baru</h2>
        <div className="input-group">
            <p>Nama</p>
          <input type="text" />
        </div>
        <div className="input-group">
            <p>No. Telepon</p>
          <input type="text"  />
        </div>
        <div className="input-group">
            <p>E-mail</p>
          <input type="email"  />
        </div>
        <div className="input-group">
            <p>Masukan Kata Sandi</p>
          <input type="password"  />
        </div>
        <button className="register-button">Selanjutnya</button>
      </div>
    </div>
  );
};

export default Register;
