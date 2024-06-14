import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Verification.css';

const Verification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerification = () => {
    // Handle verification logic here
    // If verification is successful, set the state to true
    setIsVerified(true);
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="verification-container">
      <div className="verification-image">
        <img src="/public/images/mockupregister.png" alt="Store" />
      </div>
      <div className="verification-form">
        <h2>Masukkan Kode verifikasi</h2>
        <p>
          Masukkan kode verifikasi yang dikirim ke nomor <br />
          <span className="phone-number">+6281234567890</span> melalui <span className="whatsapp">WhatsApp</span>
        </p>
        <div className="code-inputs">
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
          <input type="text" maxLength="1" />
        </div>
        <button className="verify-button" onClick={handleVerification}>Selesai</button>
      </div>

      {isVerified && (
        <div className="popup">
          <div className="popup-content">
            <FontAwesomeIcon icon={faCheckCircle} className="check-icon" />
            <h2>Verifikasi Berhasil</h2>
            <button className="login-button" onClick={handleLogin}>Masuk</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;
