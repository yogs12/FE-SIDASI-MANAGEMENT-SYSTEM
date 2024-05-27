import React from 'react';
import './Navbar_admin.css';

const Navbar_admin = () => {
  return (
    <nav className="navbar_admin">
      <div className="logo_admin">SIDASI</div>
      <ul className="nav-links_admin">
        <li>Beranda</li>
        <li>Profil</li>
        <li>Produk</li>
        <li>Booking</li>
        <li>Transaksi</li>
        <li>Riwayat</li>
        <li>Pelanggan</li>
        <li>Keluar</li>
      </ul>
    </nav>
  );
};

export default Navbar_admin;
