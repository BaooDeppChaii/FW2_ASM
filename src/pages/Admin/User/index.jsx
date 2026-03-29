import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

import Sidebar from '../../../components/Admin/Sidebar'; 
import Header from '../../../components/Admin/header';
import Footer from '../../../components/Admin/footer';

const UserAdmin = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyễn Duy Khang', email: 'khang@techstore.vn', role: 'Admin', joined: '01/01/2024', status: 'active', avatar: 'https://i.pravatar.cc/150?u=khang' },
    { id: 2, name: 'Lê Thùy Chi', email: 'chi.le@gmail.com', role: 'User', joined: '15/02/2024', status: 'active', avatar: 'https://i.pravatar.cc/150?u=chi' },
    { id: 3, name: 'Trần Minh Tâm', email: 'tam.tran@outlook.com', role: 'User', joined: '10/03/2024', status: 'banned', avatar: 'https://i.pravatar.cc/150?u=tam' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Khóa user này?")) {
      setUsers(users.filter(u => u.id !== id));
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
                <h2 className="title-page">Quản trị người dùng</h2>
                <p className="subtitle-page">Quản lý user</p>
              </div>

              <button 
                className="btn-add"
                onClick={() => navigate("/admin/user/create")}
              >
                + Tạo tài khoản
              </button>

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
                        <img src={user.avatar} alt="" className="user-avatar-img" />
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

                        <button
                          className="btn-action edit"
                          onClick={() => navigate(`/admin/user/update/`)}
                        >
                          🔑
                        </button>

                        <button
                          className="btn-action delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          🚫
                        </button>

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