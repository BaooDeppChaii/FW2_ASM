import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminProductForm from "./AdminProductForm";

import {
  getProductById,
  updateProduct
} from "../../../api/productApi";

import "./style.css";

const ProductUpdate = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // LOAD DATA
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE
  const handleSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/product");
    } catch (err) {
      console.log(err);
      alert("Lỗi cập nhật sản phẩm");
    }
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Cập nhật sản phẩm</h2>

          <div className="form-wrapper">

            {product && (
              <AdminProductForm
                onSubmit={handleSubmit}
                dataEdit={product}
              />
            )}

          </div>

        </div>

        <Footer />

      </main>

    </div>
  );
};

export default ProductUpdate;