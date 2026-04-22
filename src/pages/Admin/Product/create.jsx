import React from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminProductForm from "./AdminProductForm";

import { createProduct } from "../../../api/productApi";

import "./style.css";

const ProductCreate = () => {

  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createProduct(data); 
      alert("Thêm sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
      const message = err?.response?.data?.message || err?.response?.data?.error || "Lỗi thêm sản phẩm";
      alert(message);
    }
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Thêm sản phẩm</h2>
          <p className="product-page-note">
            Tạo sản phẩm mới với thông tin đầy đủ để hiển thị chuẩn trên cửa hàng.
          </p>

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