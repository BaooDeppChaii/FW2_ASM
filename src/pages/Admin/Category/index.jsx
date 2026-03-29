import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

const CategoryAdmin = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Smartphone",
      slug: "smartphone",
      products: 45,
      status: "active"
    },
    {
      id: 2,
      name: "Laptop",
      slug: "laptop",
      products: 32,
      status: "active"
    }
  ]);

  const handleDelete = (id) => {

    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {

      setCategories(categories.filter(item => item.id !== id));

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

                <h2 className="title-page">
                  Danh mục sản phẩm
                </h2>

                <p className="subtitle-page">
                  Quản lý cơ cấu nhóm hàng hóa
                </p>

              </div>


              <button

                className="btn-add"

                onClick={() =>
                  navigate("/admin/category/create")
                }

              >

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

                  <th style={{ textAlign: "right" }}>
                    Thao tác
                  </th>

                </tr>

              </thead>


              <tbody>

                {categories.map(item => (

                  <tr key={item.id}>

                    <td>
                      #{item.id}
                    </td>

                    <td>

                      <strong>
                        {item.name}
                      </strong>

                    </td>


                    <td>

                      <code>
                        /{item.slug}
                      </code>

                    </td>


                    <td>

                      <span
                        className={`status-badge ${item.status}`}
                      >

                        {item.status === "active"
                          ? "Đang hiện"
                          : "Đang ẩn"
                        }

                      </span>

                    </td>


                    <td
                      style={{ textAlign: "right" }}
                    >

                      <button

                        className="btn-icon edit"

                        onClick={() =>
                          navigate("/admin/category/update")
                        }

                      >

                        ✏️

                      </button>


                      <button

                        className="btn-icon delete"

                        onClick={() =>
                          handleDelete(item.id)
                        }

                      >

                        🗑️

                      </button>


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