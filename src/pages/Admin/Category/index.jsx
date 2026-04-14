import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import {
  getCategories,
  deleteCategory
} from "../../../api/categoryApi";

const CategoryAdmin = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteCategory(id);
        fetchData();
      } catch (err) {
        console.log(err);
      }
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
                <p className="subtitle-page">
                  Quản lý cơ cấu nhóm hàng hóa
                </p>
              </div>

              <button
                className="btn-add"
                onClick={() => navigate("/admin/category/create")}
              >
                + Thêm danh mục
              </button>

            </div>

            {/* TABLE GIỮ NGUYÊN STYLE CŨ */}
            <table className="tech-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên danh mục</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>

              <tbody>
                {categories.map(item => (
                  <tr key={item.id}>

                    <td>#{item.id}</td>

                    <td>
                      <strong>{item.name}</strong>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status-badge ${
                          item.status === "1" ? "active" : "hidden"
                        }`}
                      >
                        {item.status === "1"
                          ? "Đang hiện"
                          : "Đang ẩn"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "8px"
                        }}
                      >

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(`/admin/category/update/${item.id}`)
                          }
                        >
                          Sửa
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Xóa
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

        <Footer />

      </main>
    </div>
  );
};

export default CategoryAdmin;