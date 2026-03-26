import React from 'react';
import './style.css';
import Sidebar from '../../../components/Admin/Sidebar'; 
import Header from '../../../components/Admin/header';
import Footer from '../../../components/Admin/footer';

const UserAdmin = () => {
  const users = [
    { id: 1, name: 'Nguyễn Duy Khang', email: 'khang@techstore.vn', role: 'Admin', joined: '01/01/2024', status: 'active', avatar: 'https://i.pravatar.cc/150?u=khang' },
    { id: 2, name: 'Lê Thùy Chi', email: 'chi.le@gmail.com', role: 'User', joined: '15/02/2024', status: 'active', avatar: 'https://i.pravatar.cc/150?u=chi' },
    { id: 3, name: 'Trần Minh Tâm', email: 'tam.tran@outlook.com', role: 'User', joined: '10/03/2024', status: 'banned', avatar: 'https://i.pravatar.cc/150?u=tam' },
    { id: 4, name: 'Phạm Hoàng Nam', email: 'namph@yahoo.com', role: 'User', joined: '20/03/2024', status: 'active', avatar: 'https://i.pravatar.cc/150?u=nam' },
  ];

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body">
          <div className="data-section">
            <div className="section-header">
              <div>
                <h2 className="title-page">Quản trị người dùng</h2>
                <p className="subtitle-page">Quản lý danh sách khách hàng và phân quyền hệ thống</p>
              </div>
              <button className="btn-add">+ Tạo tài khoản mới</button>
            </div>

            <table className="tech-table">
              <thead>
                <tr>
                  <th>Thành viên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Ngày tham gia</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info-cell">
                        <img src={user.avatar} alt={user.name} className="user-avatar-img" />
                        <div className="user-text">
                          <strong>{user.name}</strong>
                          <span>ID: #{user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{user.joined}</td>
                    <td>
                      <span className={`status-dot ${user.status}`}>
                        {user.status === 'active' ? '● Đang hoạt động' : '● Đã khóa'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-group">
                        <button className="btn-action edit">🔑</button>
                        <button className="btn-action delete">🚫</button>
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

export default UserAdmin;