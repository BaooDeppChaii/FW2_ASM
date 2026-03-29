import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminCategoryForm from "./AdminCategoryForm";
import "./style.css";

const CategoryUpdate = () => {

  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();

  // data fake (sau này API)
  const category = {
    id: id,
    name: "Smartphone",
    slug: "smartphone",
    status: "active"
  };

  const handleSubmit = (data) => {

    console.log("Update:", data);

    alert("Cập nhật thành công!");

    navigate("/admin/category"); // quay lại list

  };

  return (

    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">
            Cập nhật danh mục
          </h2>

          <div className="form-wrapper">

            <AdminCategoryForm
              onSubmit={handleSubmit}
              dataEdit={category}
            />

          </div>

        </div>

        <Footer />

      </main>

    </div>

  );

};

export default CategoryUpdate;