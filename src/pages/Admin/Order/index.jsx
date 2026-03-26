import React from 'react';
import './style.css';
import Sidebar from '../../../components/Admin/Sidebar'; 
import Header from '../../../components/Admin/header';
import Footer from '../../../components/Admin/footer';

const OrderAdmin = () => {
  const orders = [
    { id: 'ORD-8821', customer: 'Nguyễn Văn A', date: '20/03/2024', total: '28.990.000đ', status: 'completed', payment: 'Chuyển khoản' },
    { id: 'ORD-8822', customer: 'Trần Thị B', date: '21/03/2024', total: '5.200.000đ', status: 'shipping', payment: 'COD' },
    { id: 'ORD-8823', customer: 'Lê Văn C', date: '21/03/2024', total: '15.500.000đ', status: 'pending', payment: 'Ví Momo' },
    { id: 'ORD-8824', customer: 'Phạm Minh D', date: '22/03/2024', total: '45.000.000đ', status: 'cancelled', payment: 'Chuyển khoản' },
    { id: 'ORD-8825', customer: 'Hoàng An', date: '22/03/2024', total: '1.200.000đ', status: 'completed', payment: 'COD' },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return <span className="badge success">✔️ Hoàn thành</span>;
      case 'shipping': return <span className="badge info">🚚 Đang giao</span>;
      case 'pending': return <span className="badge warning">⏳ Chờ xử lý</span>;
      case 'cancelled': return <span className="badge danger">❌ Đã hủy</span>;
      default: return <span className="badge">Liên hệ</span>;
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body">
          <div className="data-section">
            <div className="section-header">
              <div>
                <h2 className="title-page">Quản lý đơn hàng</h2>
                <p className="subtitle-page">Theo dõi và cập nhật trạng thái đơn hàng từ khách hàng</p>
              </div>

            </div>

            <table className="tech-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td><b className="order-id">{order.id}</b></td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td><strong className="order-price">{order.total}</strong></td>
                    <td><span className="payment-method">{order.payment}</span></td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-action view">👁️</button>
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

export default OrderAdmin;