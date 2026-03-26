import React from 'react';
import './style.css';
// Import các thành phần dùng chung từ folder components
import Sidebar from '../../../components/Admin/Sidebar'; 
import Header from '../../../components/Admin/header';
import Footer from '../../../components/Admin/footer';

const CategoryAdmin = () => {
  // Dữ liệu mẫu danh mục
  const categories = [
    { id: 1, name: 'Smartphone', slug: 'smartphone', products: 45, icon: '📱', status: 'active' },
    { id: 2, name: 'Laptop', slug: 'laptop', products: 32, icon: '💻', status: 'active' },
    { id: 3, name: 'Phụ kiện', slug: 'phu-kien', products: 125, icon: '🎧', status: 'active' },
    { id: 4, name: 'Smartwatch', slug: 'smartwatch', products: 18, icon: '⌚', status: 'hidden' },
    { id: 5, name: 'Âm thanh', slug: 'audio', products: 56, icon: '🔊', status: 'active' },
  ];

  return (
    <div className="admin-container">
      {/* 1. Gọi Sidebar dùng chung */}
      <Sidebar />

      <main className="main-content">
        {/* 2. Gọi Header dùng chung */}
        <Header />

        <div className="content-body">
          <div className="data-section">
            <div className="section-header">
              <div>
                <h2 className="title-page">Danh mục sản phẩm</h2>
                <p className="subtitle-page">Hiển thị và quản lý các nhóm sản phẩm trên cửa hàng</p>
              </div>
              <button className="btn-add">+ Thêm danh mục mới</button>
            </div>

            {/* Bảng danh sách danh mục */}
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Mã ID</th>
                  <th>Tên danh mục</th>
                  <th>Đường dẫn (Slug)</th>
                  <th>Số lượng SP</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.id}>
                    <td><span className="id-badge">#{item.id}</span></td>
                    <td>
                      <div className="cat-info">
                        <span className="cat-icon">{item.icon}</span>
                        <span className="cat-name">{item.name}</span>
                      </div>
                    </td>
                    <td><code className="slug-text">/{item.slug}</code></td>
                    <td><b style={{color: '#294168'}}>{item.products}</b> sản phẩm</td>
                    <td>
                      <span className={`badge ${item.status === 'active' ? 'success' : 'secondary'}`}>
                        {item.status === 'active' ? '● Đang hiện' : '○ Đang ẩn'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-group">
                        <button className="btn-action edit" title="Sửa">✏️</button>
                        <button className="btn-action delete" title="Xóa">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default CategoryAdmin;