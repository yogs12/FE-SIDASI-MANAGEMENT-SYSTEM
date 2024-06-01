import React from 'react';
import './Dashboard_admin.css';
import dashboardImage from '/images/dashboard.png'; // Sesuaikan path ke gambar

const Dashboard_admin = () => {
  return (
    <div className="dashboard_admin">
      <div className="top-box">
        <div className="top-box-content">
          <h1>SIDASI</h1>
          <h2>Solusi Mudah Update Stok Toko Anda!</h2>
          <p>Sidasi bertekad untuk menjadi mitra terpercaya bagi bisnis anda.</p>
        </div>
        <img src={dashboardImage} alt="Dashboard" className="top-box-image" />
      </div>
      <div className="cards_admin">
        <div className="card_admin">
          <i className="fas fa-database"></i> {/* Tambahkan ikon di sini */}
          <h3>Update stok lebih mudah</h3>
        </div>
        <div className="card_admin">
          <i className="fas fa-users"></i> {/* Tambahkan ikon di sini */}
          <h3>Meningkatkan Pelayanan Kepada Pelanggan</h3>
        </div>
        <div className="card_admin">
          <i className="fas fa-chart-line"></i> {/* Tambahkan ikon di sini */}
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
