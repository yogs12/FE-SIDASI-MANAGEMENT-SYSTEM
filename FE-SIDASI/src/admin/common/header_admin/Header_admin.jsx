// src/admin/common/header_admin/Header_admin.jsx
import React from 'react';
import Navbar_admin from '../navbar_admin/Navbar_admin.jsx';
import Head_admin from './head_admin.jsx';  // head_admin.jsx berada di folder yang sama
import './Header_admin.css';

const Header_admin = () => {
  return (
    <header className="header_admin">
      <Navbar_admin />
      <Head_admin />
    </header>
  );
};

export default Header_admin;
