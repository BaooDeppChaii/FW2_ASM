import React from 'react';
import './style.css';
// Import các thành phần dùng chung
import Sidebar from '../../../components/Admin/Sidebar'; 
import Header from '../../../components/Admin/header';
import Footer from '../../../components/Admin/footer';

const TechAdmin = () => {
  return (
    <div className="admin-container">
      {/* 1. Gọi Sidebar đã tách ra */}
      <Sidebar />

      <main className="main-content">
        {/* 2. Gọi Header đã tách ra */}
        <Header />

        <div className="content-body">
          {/* PHẦN THỐNG KÊ (Giữ lại vì là nội dung riêng của Dashboard) */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Doanh thu tháng</h3>
              <div className="value">1.250.000.000đ</div>
              <span className="trend positive">↑ 12%</span>
            </div>
            <div className="stat-card">
              <h3>Đơn hàng mới</h3>
              <div className="value">85</div>
              <span className="trend">Cần xử lý</span>
            </div>
            <div className="stat-card">
              <h3>Tồn kho</h3>
              <div className="value">420</div>
              <span className="trend negative">↓ 5 lỗi</span>
            </div>
          </div>

          {/* BẢNG SẢN PHẨM */}
          <div className="data-section">
            <div className="section-header">
              <h2>Kho hàng thiết bị</h2>
            </div>
            
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Loại</th>
                  <th>Giá bán</th>
                  <th>Kho</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>📱 iPhone 15 Pro Max</strong></td>
                  <td>Smartphone</td>
                  <td>28.990.000đ</td>
                  <td>24</td>
                  <td><span className="badge success">Còn hàng</span></td>
                </tr>
                <tr>
                  <td><strong>💻 MacBook Air M3</strong></td>
                  <td>Laptop</td>
                  <td>26.500.000đ</td>
                  <td>08</td>
                  <td><span className="badge warning">Sắp hết</span></td>
                </tr>
                <tr>
                  <td><strong>🎧 AirPods Pro 2</strong></td>
                  <td>Phụ kiện</td>
                  <td>5.200.000đ</td>
                  <td>105</td>
                  <td><span className="badge success">Còn hàng</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Gọi Footer đã tách ra */}
        <Footer />
      </main>
    </div>
  );
};

export default TechAdmin;