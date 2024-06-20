import React, { useState } from "react";
import logo from "../../components/assets/images/logo_3.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "./Search.css";

const Search = ({ CartItems }) => {
  const [showProfile, setShowProfile] = useState(false);
  const { auth, logout } = useAuth();

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    logout();
    console.log("Logout berhasil");
  };

  return (
    <section className="search">
      <div className="container c_flex">
        <div className="logo_header">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="search-box f_flex">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Cari yang anda inginkan" />
          <span>kategori</span>
        </div>

        <div className="icon f_flex width">
          <div className="profile-container">
            <i className="fa fa-user icon-circle" onClick={toggleProfile}></i>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-menu">
                  <Link to="/Profil">Profil</Link>
                  <button onClick={handleLogout}>Keluar</button>
                </div>
              </div>
            )}
          </div>
          {auth.isAuthenticated && auth.user && (
            <div className="user-info">
              <span>{auth.user.nama}{auth.user.role}</span>
            </div>
          )}
          <div className="cart">
            <Link to="/cart">
              <i className="fa fa-shopping-bag icon-circle"></i>
              <span className="cart-item-count">
                {CartItems && CartItems.length
                  ? CartItems.reduce((total, item) => total + item.qty, 0)
                  : 0}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
