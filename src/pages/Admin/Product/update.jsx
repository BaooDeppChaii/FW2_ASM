import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminProductForm from "./AdminProductForm";
import "./style.css";

const ProductUpdate = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  // 👉 data fake (sau này lấy API theo id)
  const product = {
    id,
    name: "iPhone 15 Pro Max",
    category: "Smartphone",
    price: 28990000,
    stock: 15,
    image: "https://via.placeholder.com/150",
    status: "active"
  };

  const handleSubmit = (data) => {

    console.log("Update:", data);

    alert("Cập nhật sản phẩm thành công!");

    // 👉 sau này gọi API
    // fetch(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(data) })

    navigate("/admin/product");
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Cập nhật sản phẩm</h2>

          <div className="form-wrapper">
            <AdminProductForm
              onSubmit={handleSubmit}
              dataEdit={product}
            />
          </div>

        </div>

        <Footer />

      </main>

    </div>
  );
};

export default ProductUpdate;