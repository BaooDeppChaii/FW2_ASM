import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminUserForm from "./AdminUserForm";

const UserCreate = () => {

  const navigate = useNavigate();

  const handleSubmit = (data) => {
    console.log(data);
    alert("Tạo user thành công!");
    navigate("/admin/user");
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Tạo tài khoản</h2>

          <AdminUserForm onSubmit={handleSubmit} />

        </div>

        <Footer />

      </main>

    </div>
  );
};

export default UserCreate;