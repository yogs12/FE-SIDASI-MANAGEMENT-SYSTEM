import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer_admin from './common/footer_admin/Footer_admin';
import Sidebar_admin from './common/header_admin/Sidebar_admin';
import Head_admin from './common/header_admin/Head_admin'; // Corrected the import path
import './AdminLayout.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <Sidebar_admin openSidebarToggle={sidebarOpen} OpenSidebar={toggleSidebar} />
      <div className={`admin-main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="header_admin">
          <Head_admin OpenSidebar={toggleSidebar} />
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
        
          <Footer_admin />
        
      </div>
    </div>
  );
};

export default AdminLayout;
