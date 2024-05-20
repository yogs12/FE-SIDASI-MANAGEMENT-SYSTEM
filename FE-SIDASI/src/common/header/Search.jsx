import React, { useState } from "react";
import logo from "../../components/assets/images/logo_2.png";
import { Link } from "react-router-dom";
import "./Search.css"; 

const Search = ({ cartItems }) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    console.log("Logout berhasil");
  };

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width'>
            <img src={logo} alt='' />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Cari yang anda inginkan' />
            <span>kategori</span>
          </div>

          <div className='icon f_flex width'>
            <div className='profile-container'>
              <i className='fa fa-user icon-circle' onClick={toggleProfile}></i>
              {showProfile && (
                <div className='profile-dropdown'>
                  <div className='profile-menu'>
                    <Link to='/profile'>Profil</Link>
                    <button onClick={handleLogout}>Keluar</button>
                  </div>
                </div>
              )}
            </div>
            <div className='cart'>
              <Link to='/cart'>
                <i className='fa fa-shopping-bag icon-circle'></i>
                {/* Tambahkan span untuk menampilkan jumlah produk */}
                <span className="cart-item-count">{cartItems && cartItems.length ? cartItems.reduce((total, item) => total + item.qty, 0) : 0}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
