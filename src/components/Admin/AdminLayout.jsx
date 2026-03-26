import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './header';
import Footer from './footer';
import './style.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* 1. Sidebar bên trái cố định */}
      <Sidebar />

      {/* 2. Phần bên phải chứa Header, Content và Footer */}
      <main className="main-content">
        <Header />
        
        {/* Outlet là nơi chứa nội dung của Dashboard, Categories, v.v. */}
        <section className="content-body">
          <Outlet />
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default AdminLayout;