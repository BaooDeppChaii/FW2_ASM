import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminCategoryForm from "./AdminCategoryForm";

import {
  getCategoryById,
  updateCategory
} from "../../../api/categoryApi";

import "./style.css";

const CategoryUpdate = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);

  // LOAD DATA
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await getCategoryById(id);
      setCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE
  const handleSubmit = async (data) => {
    try {
      await updateCategory(id, data);
      alert("Cập nhật thành công!");
      navigate("/admin/category");
    } catch (err) {
      console.log(err);
      alert("Lỗi cập nhật");
    }
  };

  return (
    <div className="admin-container">

      <Sidebar />

      <main className="main-content">

        <Header />

        <div className="content-body">

          <h2 className="title-page">Cập nhật danh mục</h2>
          <p className="category-page-note">
            Sửa thông tin danh mục trực tiếp và lưu thay đổi ngay.
          </p>

          <div className="form-wrapper">

            {/* chỉ render khi load xong */}
            {category && (
              <AdminCategoryForm
                onSubmit={handleSubmit}
                dataEdit={category}
              />
            )}

          </div>

        </div>

        <Footer />

      </main>

    </div>
  );
};

export default CategoryUpdate;