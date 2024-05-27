// src/admin/content/Dashboard_admin.jsx
import React from 'react';
import './Dashboard_admin.css';

const Dashboard_admin = () => {
  return (
    <div className="dashboard_admin">
      <div className="cards_admin">
        <div className="card_admin">
          <h3>Update stok lebih mudah</h3>
        </div>
        <div className="card_admin">
          <h3>Meningkatkan Pelayanan Kepada Pelanggan</h3>
        </div>
        <div className="card_admin">
          <h3>Kelola Penjualan Dengan Efisien</h3>
        </div>
      </div>
      <div className="subscription_admin">
        <h3>Cara Berlangganan SIDASI</h3>
        <p>1. Hubungi kami melalui WhatsApp atau Email</p>
        <p>2. Isi formulir dan lakukan pembayaran</p>
        <p>3. Menunggu konfirmasi dan kata sandi akun dari kami</p>
      </div>
    </div>
  );
};

export default Dashboard_admin;
