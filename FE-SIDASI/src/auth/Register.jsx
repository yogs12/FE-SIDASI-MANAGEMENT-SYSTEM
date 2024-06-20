// src/auth/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [nama, setNama] = useState('');
  const [no_hp, setNoHp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/register', { nama, no_hp, email, password });
      navigate('/masuk');  // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-image">
        <img src="/public/images/mockupregister.png" alt="Store" />
      </div>
      <div className="register-form">
        <h2>Buat Akun Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <p>Nama</p>
            <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>
          <div className="input-group">
            <p>No. Telepon</p>
            <input type="text" value={no_hp} onChange={(e) => setNoHp(e.target.value)} />
          </div>
          <div className="input-group">
            <p>Alamat Anda</p>
            <input type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </div>
          <div className="input-group">
            <p>E-mail</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <p>Masukan Kata Sandi</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="register-button">Selanjutnya</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
