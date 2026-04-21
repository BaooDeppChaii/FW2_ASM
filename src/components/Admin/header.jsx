import React from 'react';
import { Link } from 'react-router-dom'; // Import Link để chuyển trang không load lại
import './style.css';

const Header = () => {
  return (
    <header className="top-nav">
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm nhanh..." />
      </div>
      
      <div className="header-actions">
        {/* Chuông thông báo */}


        {/* Cụm User Dropdown */}
        <div className="user-dropdown">
          <div className="user-trigger">
            <div className="avatar-circle"></div>
            <div className="user-info-brief">
              <span>Quản trị viên</span>
            </div>
            <span className="arrow-down">▼</span>
          </div>

          {/* Menu sổ xuống khi hover vào user-dropdown */}
          <div className="dropdown-menu">
            <div className="dropdown-header">Tài khoản của tôi</div>
            
            <Link to="/" className="dropdown-item">
              Quay về trang bán hàng
            </Link>
            
            
            
            <div className="divider"></div>
            
            <Link to="/login" className="dropdown-item logout">
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;