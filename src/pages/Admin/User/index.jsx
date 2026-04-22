import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // Import toast để thông báo chuyên nghiệp hơn
import "./style.css";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getUsers, updateUser } from "../../../api/userApi";

const UserAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // 1. Lấy thông tin Admin hiện tại từ LocalStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentAdminId = currentUser.id;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleActive = async (user) => {
    // 2. Kiểm tra nếu Admin đang tự thực hiện thao tác trên chính mình
    if (Number(user.id) === Number(currentAdminId)) {
      toast.error("Bạn không thể tự khóa tài khoản của chính mình!");
      return;
    }

    const nextActive = user.active === "1" ? "0" : "1";
    const actionText = nextActive === "0" ? "khóa" : "mở khóa";

    if (window.confirm(`Bạn có chắc muốn ${actionText} user này?`)) {
      try {
        await updateUser(user.id, { active: nextActive });
        fetchData();
        toast.success(`${actionText === "khóa" ? "Đã khóa" : "Đã mở khóa"} thành công!`);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Cập nhật trạng thái thất bại");
      }
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
                <h2 className="title-page">Quản lý người dùng</h2>
                <p className="subtitle-page">Danh sách tài khoản hệ thống</p>
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
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  // 3. Xác định xem hàng này có phải là chính mình không
                  const isSelf = Number(u.id) === Number(currentAdminId);
                  
                  return (
                    <tr key={u.id} className={isSelf ? "row-current-admin" : ""}>
                      <td>#{u.id} {isSelf && <span style={{fontSize: '10px', color: '#666'}}>(Bạn)</span>}</td>
                      <td><strong>{u.full_name}</strong></td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`status-badge ${Number(u.role) === 1 ? "active" : "hidden"}`}>
                          {Number(u.role) === 1 ? "Admin" : "User"}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${u.active === "1" ? "active" : "hidden"}`}>
                          {u.active === "1" ? "Đang hoạt động" : "Đã khóa"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/admin/user/update/${u.id}`)}
                          >
                            Sửa
                          </button>

                          {/* 4. Vô hiệu hóa nút Khóa/Mở khóa nếu là chính mình */}
                          <button
                            className={`btn btn-sm ${u.active === "1" ? "btn-danger" : "btn-success"}`}
                            onClick={() => handleToggleActive(u)}
                            disabled={isSelf} // Chặn click
                            style={isSelf ? { opacity: 0.5, cursor: "not-allowed" } : {}} // Hiệu ứng mờ
                            title={isSelf ? "Bạn không thể tự khóa chính mình" : ""}
                          >
                            {u.active === "1" ? "Khóa" : "Mở khóa"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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