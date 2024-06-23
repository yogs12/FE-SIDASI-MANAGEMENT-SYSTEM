// src/common/header/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { auth } = useAuth();

  return (
    <header className="header">
      <div className="container d_flex">
        <div className=""></div>

        <div className="navlink">
          <ul
            className={mobileMenu ? 'nav-links-MobileMenu' : 'link f_flex capitalize'}
            onClick={() => setMobileMenu(false)}
          >
            <li>
              <Link to="/">Beranda</Link>
            </li>
            <li>
              <Link to="/lacak-pesanan">Lacak Pesanan</Link>
            </li>
            {auth.user && auth.user.role === 'admin' && (
              <li>
                <Link to="/admin/beranda">Admin</Link>
              </li>
            )}
          </ul>

          <button className="toggle" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? (
              <i className="fas fa-times close home-btn"></i>
            ) : (
              <i className="fas fa-bars open"></i>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
