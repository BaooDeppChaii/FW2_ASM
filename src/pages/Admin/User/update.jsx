import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminUserForm from "./AdminUserForm";

const UserUpdate = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const user = {
    id,
    name: "Nguyễn Duy Khang",
    email: "khang@techstore.vn",
    role: "Admin",
    status: "active",
    avatar: "https://i.pravatar.cc/150"
  };

  const handleSubmit = (data) => {
    console.log("Update:", data);
    alert("Cập nhật thành công!");
    navigate("/admin/user");
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Cập nhật user</h2>

          <AdminUserForm
            onSubmit={handleSubmit}
            dataEdit={user}
          />

        </div>

        <Footer />

      </main>

    </div>
  );
};

export default UserUpdate;