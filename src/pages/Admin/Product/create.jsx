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
      console.log(err.response?.data); 
  alert(err.response?.data?.message || "Lỗi thêm sản phẩm");
    }
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