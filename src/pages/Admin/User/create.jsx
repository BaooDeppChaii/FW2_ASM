import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../api/userApi";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminUserForm from "./AdminUserForm";

const UserCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password
      });

      alert("Tạo user thành công!");
      navigate("/admin/user");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Lỗi");
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body center-form">
          <h2 className="title-page">Tạo tài khoản</h2>

          <div className="form-card">
            <AdminUserForm onSubmit={handleSubmit} />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default UserCreate;