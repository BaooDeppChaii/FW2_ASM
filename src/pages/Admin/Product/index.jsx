import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import {
  getProducts,
  deleteProduct
} from "../../../api/productApi";

const ProductAdmin = () => {

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // load data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // delete
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      try {
        await deleteProduct(id);
        fetchData(); // reload lại list
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
                <h2 className="title-page">Quản lý sản phẩm</h2>
                <p className="subtitle-page">
                  Danh sách sản phẩm
                </p>
              </div>

              <button
                className="btn-add"
                onClick={() => navigate("/admin/product/create")}
              >
                + Thêm sản phẩm
              </button>

            </div>

            {/* TABLE */}
            <table className="tech-table">

              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá</th>
                  <th>Kho</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>

              <tbody>

                {products.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-img-thumb"
                      />
                    </td>

                    <td>
                      <strong>{item.name}</strong>
                      <div style={{ fontSize: 12 }}>#{item.id}</div>
                    </td>

                    <td>
                      <span className="cat-tag">
                       {item.Category?.name}
                      </span>
                    </td>

                    <td>
                      <b className="price-text">
                        {Number(item.price).toLocaleString()}đ
                      </b>
                    </td>

                   <td>{item.quantity ?? 0}</td> 

<td>
                   <span className={`status-pill ${item.quantity > 0 ? "online" : "offline"}`}>
                  {item.quantity > 0 ? "Còn hàng" : "Hết hàng"}
                </span></td>

                    <td style={{ textAlign: "right" }}>
                      <div className="action-group">

                        <button
                          className="btn-action edit"
                          onClick={() =>
                            navigate(`/admin/product/update/${item.id}`)
                          }
                        >
                          ✏️
                        </button>

                        <button
                          className="btn-action delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          🗑️
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

export default ProductAdmin;