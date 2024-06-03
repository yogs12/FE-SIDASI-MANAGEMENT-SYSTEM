import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className='container grid2'>
        <div className='box'>
          <h1>Sidasi</h1>
          <div>
          <img src="./images/Group.png" alt="" />
          </div>
        </div>
        <div className="box"></div>
        <div className='box '>
          <h2>Tentang Kami</h2>
          <p>Selamat datang di Sidasi (Sistem Data dan Informasi), mitra terpercaya Anda dalam sistem manajemen toko yang inovatif dan efisien. Kami berkomitmen untuk menyediakan solusi terbaik bagi bisnis Anda dalam mengelola dan mengoptimalkan operasi toko Anda.</p>
        </div>
        <div className='box align'>
          <h2>Hubungi Kami</h2>
          <ul>
            <li>Email: Sidasi@gmail.com</li>
            <li>Telepon: +62815 4128 8834</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
