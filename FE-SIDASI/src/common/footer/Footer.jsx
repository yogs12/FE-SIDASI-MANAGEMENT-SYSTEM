import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className='container grid2'>
        <div className='box'>
          <h1>Sidasi</h1>
          <div>
          <img src="./images/SlideCard/slide-2.png" alt="" />
          </div>
        </div>
        <div className='box'>
          <h1>Tentang Kami</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quis nostrum vitae explicabo, ut praesentium quod atque, beatae maiores ipsum ex doloremque libero repellat! Quae cupiditate nemo repellat debitis exercitationem.</p>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className='box'>
          <h2>Contact Us</h2>
          <ul>
            <li>Email: Sidasi@gmail.com</li>
            <li>Phone: +1 1123 456 780</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
