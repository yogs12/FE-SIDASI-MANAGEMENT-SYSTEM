import React from 'react';
import './Head_admin.css'; // Ensure you have appropriate styling in Head.css

const Head_admin = ({ OpenSidebar }) => {
  return (
    <header className='admin_header'>
      <div className='admin_header-right'>
        <i className="fa-solid fa-bell admin_header-icon"></i>
        <i className="fa-solid fa-user-circle admin_header-icon"></i>
      </div>
    </header>
  );
};

export default Head_admin;
