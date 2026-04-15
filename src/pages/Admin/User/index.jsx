import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getUsers, deleteUser } from "../../../api/userApi";

const UserAdmin = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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

  const handleDelete = async (id) => {
    if (window.confirm("Khóa user này?")) {
      try {
        await deleteUser(id);
        fetchData();
      } catch (err) {
        console.log(err);
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
                <p className="subtitle-page">
                  Danh sách tài khoản hệ thống
                </p>
              </div>

              <button
                className="btn-add"
                onClick={() => navigate("/admin/user/create")}
              >
                + Tạo tài khoản
              </button>

            </div>

            {/* TABLE */}
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

                {users.map((u) => (

                  <tr key={u.id}>

                    <td>#{u.id}</td>

                    <td>
                      <strong>{u.full_name}</strong>
                    </td>

                    <td>{u.email}</td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={`status-badge ${
                         Number(u.role) === 1 ? "active" : "hidden"
                        }`}
                      >
                        {Number(u.role) === 1 ? "Admin" : "User"}
                      </span>
                    </td>

                    {/* STATUS */}
                  <td>
  <span
    className={`status-badge ${
      u.active === "1" ? "active" : "hidden"
    }`}
  >
    {u.active === "1"
      ? "Đang hoạt động"
      : "Đã khóa"}
  </span>
</td>

                    {/* ACTION */}
                    <td style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px"
                        }}
                      >

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(`/admin/user/update/${u.id}`)
                          }
                        >
                          Sửa
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(u.id)}
                        >
                          Khóa
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