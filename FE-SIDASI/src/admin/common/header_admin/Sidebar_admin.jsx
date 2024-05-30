import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar_admin.css';

const Sidebar_admin = () => {
  return (
    <nav className="navbar_admin">
      <div className="logo_admin">SIDASI</div>
      <ul className="nav-links_admin">
        <li>
          <Link to="/admin/dashboard">Beranda</Link>
        </li>
        <li>
          <Link to="/admin/profil">Profil</Link>
        </li>
        <li>
          <Link to="/admin/produk">Produk</Link>
        </li>
        <li>
          <Link to="/admin/booking">Booking</Link>
        </li>
        <li>
          <Link to="/admin/transaksi">Transaksi</Link>
        </li>
        <li>
          <Link to="/admin/riwayat">Riwayat</Link>
        </li>
        <li>
          <Link to="/admin/pelanggan">Pelanggan</Link>
        </li>
        <li>
          <Link to="/admin/keluar">Keluar</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar_admin;
