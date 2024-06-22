// src/admin/common/header_admin/Sidebar_admin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar_admin.css';
import logoImage from "../../../components/assets/images/Group.png";

const Sidebar_admin = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <nav className={openSidebarToggle ? "navbar responsive" : "navbar"}>
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li className='nav-item'>
          <Link to="/admin/beranda">
            <i className="fa-solid fa-gauge"></i> Beranda
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/admin/produk">
            <i className="fa-solid fa-box-archive"></i> Produk
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/admin/pesanan">
            <i className="fa-solid fa-receipt"></i> Pesanan
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/admin/transaksi">
            <i className="fa-solid fa-money-check"></i> Transaksi
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/admin/riwayat">
            <i className="fa-solid fa-history"></i> Riwayat
          </Link>
        </li>
        <li className='nav-item'>
          <Link to="/admin/pelanggan">
            <i className="fa-solid fa-users"></i> Pelanggan
          </Link>
        </li>
        <li className='nav-item'>
          <Link  to ="/">
            <i className="fa-solid fa-sign-out-alt"></i> Keluar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar_admin;
