import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer_admin from './common/footer_admin/Footer_admin';
import Sidebar_admin from './common/header_admin/Sidebar_admin';
import Head_admin from './common/header_admin/head_admin'; // Pindahkan komponen ini ke layout
import './AdminLayout.css'; // Jika ada CSS khusus untuk layout

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header className="header_admin">
        <Head_admin />
      </header>
      <div className="admin-content">
        <Sidebar_admin /> {/* Sidebar_admin seharusnya hanya di sini */}
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
      <Footer_admin />
    </div>
  );
};

export default AdminLayout;
