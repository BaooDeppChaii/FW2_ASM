import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminCategoryForm from "./AdminCategoryForm";
import "./style.css";

const CategoryCreate = () => {

  const handleSubmit = (data) => {
    console.log(data);
    alert("Validate OK!");

    // sau này có thể gọi API
    // fetch("http://localhost:3000/api/categories", ...)
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