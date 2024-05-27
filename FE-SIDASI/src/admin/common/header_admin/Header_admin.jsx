import React from 'react';
import Navbar_admin from './Navbar_admin.jsx';
import Head_admin from './head_admin.jsx';
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
