import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Toggle Menu
  const [MobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="header">
        <div className="container d_flex">
          <div className=""></div>

          <div className="navlink">
            <ul
              className={
                MobileMenu
                  ? "nav-links-MobileMenu"
                  : "link f_flex capitalize"
              }
              onClick={() => setMobileMenu(false)}
            >
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/lacak-pesanan">Lacak Pesanan</Link>
              </li>
              <li>
                <Link to="/contact">Kontak</Link>
              </li>
              <li>
                <Link to="/admin/beranda">Admin</Link>
                
              </li>
            </ul>

            <button
              className="toggle"
              onClick={() => setMobileMenu(!MobileMenu)}
            >
              {MobileMenu ? (
                <i className="fas fa-times close home-btn"></i>
              ) : (
                <i className="fas fa-bars open"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;