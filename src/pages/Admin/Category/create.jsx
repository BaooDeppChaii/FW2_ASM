import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminCategoryForm from "./AdminCategoryForm";
import { createCategory } from "../../../api/categoryApi";

import "./style.css";

const CategoryCreate = () => {

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createCategory(data);
      alert("Thêm danh mục thành công!");
      navigate("/admin/category"); // quay lại list
    } catch (err) {
      console.log(err);
      alert("Lỗi thêm danh mục");
    }
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Thêm danh mục</h2>

          <div className="form-wrapper">
            <AdminCategoryForm onSubmit={handleSubmit} />
          </div>

        </div>

        <Footer />

      </main>
    </div>
  );
};

export default CategoryCreate;