import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminProductForm from "./AdminProductForm";
import "./style.css";

const ProductCreate = () => {

  const navigate = useNavigate();

  const handleSubmit = (data) => {

    console.log("Create:", data);

    alert("Thêm sản phẩm thành công!");

    // 👉 sau này gọi API ở đây
    // fetch("/api/products", { method: "POST", body: JSON.stringify(data) })

    navigate("/admin/product"); // quay lại list
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Thêm sản phẩm</h2>

          <div className="form-wrapper">
            <AdminProductForm onSubmit={handleSubmit} />
          </div>

        </div>

        <Footer />

      </main>

    </div>
  );
};

export default ProductCreate;