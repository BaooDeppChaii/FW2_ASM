import React, { useState } from "react";
import "./style.css";
import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";
import AdminCategoryForm from "./AdminCategoryForm";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Smartphone", slug: "smartphone", products: 45, status: "active" },
    { id: 2, name: "Laptop", slug: "laptop", products: 32, status: "active" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const handleSubmit = (data) => {
    if (dataEdit) {
      // Logic SỬA
      setCategories(categories.map(c => c.id === dataEdit.id ? { ...c, ...data } : c));
    } else {
      // Logic THÊM
      const newCategory = {
        ...data,
        id: Date.now(),
        products: 0,
      };
      setCategories([...categories, newCategory]);
    }
    setShowForm(false);
    setDataEdit(null);
  };

  const handleEdit = (item) => {
    setDataEdit(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter(c => c.id !== id));
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
              <div>
                <h2 className="title-page">Danh mục sản phẩm</h2>
                <p className="subtitle-page">Quản lý cơ cấu nhóm hàng hóa</p>
              </div>
              <button className="btn-add" onClick={() => { setDataEdit(null); setShowForm(true); }}>
                + Thêm danh mục
              </button>
            </div>

            <table className="tech-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Slug</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.id}>
                    <td>#{item.id}</td>
                    <td><strong>{item.name}</strong></td>
                    <td><code>/{item.slug}</code></td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === "active" ? "Đang hiện" : "Đang ẩn"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn-icon edit" onClick={() => handleEdit(item)}>✏️</button>
                      <button className="btn-icon delete" onClick={() => handleDelete(item.id)}>🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL FORM */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>{dataEdit ? "Chỉnh sửa" : "Thêm mới"}</h3>
                <button className="close-x" onClick={() => setShowForm(false)}>&times;</button>
              </div>
              <AdminCategoryForm onSubmit={handleSubmit} dataEdit={dataEdit} />
            </div>
          </div>
        )}
        <Footer />
      </main>
    </div>
  );
};

export default CategoryAdmin;