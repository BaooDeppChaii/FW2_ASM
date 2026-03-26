import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">TECH<span>STORE</span></div>
      <nav className="menu">
        <NavLink to="/admin" end className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          📊 Tổng quan
        </NavLink>
        
        <NavLink to="/admin/category" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          📂 Danh mục
        </NavLink>
        
        <NavLink to="/admin/product" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          💻 Sản phẩm
        </NavLink>
        
        <NavLink to="/admin/user" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          👥 Người dùng
        </NavLink>
        
        <NavLink to="/admin/order" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          📦 Đơn hàng
        </NavLink>
        
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
          ⚙️ Hệ thống
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;