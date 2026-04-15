import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminUserForm from "./AdminUserForm";

import { getUserById, updateUser } from "../../../api/userApi";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOAD USER
  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await getUserById(id);
      setUser(res.data.data);

    } catch (err) {
      console.log("GET USER ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE
const handleSubmit = async (data) => {
  try {
    const payload = {
      full_name: data.full_name,
      email: data.email,
      role: data.role,
      active: data.active,
    };

    // 🔥 CHỈ GỬI PASSWORD NẾU CÓ NHẬP
    if (data.password && data.password.trim() !== "") {
      payload.password = data.password;
    }

    await updateUser(id, payload);

    alert("Cập nhật thành công!");
    navigate("/admin/user");

  } catch (err) {
    console.log("UPDATE ERROR:", err.response?.data);
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
              <h2 className="title-page">Cập nhật user</h2>
            </div>

            {loading && <p>Đang tải dữ liệu...</p>}

            {!loading && user && (
              <AdminUserForm
                dataEdit={user}
                onSubmit={handleSubmit}
              />
            )}

          </div>

        </div>

        <Footer />

      </main>
    </div>
  );
};

export default UserUpdate;