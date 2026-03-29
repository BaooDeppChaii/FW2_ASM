import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

import Sidebar from '../../../components/Admin/Sidebar'; 
import Header from '../../../components/Admin/header';
import Footer from '../../../components/Admin/footer';

const ProductAdmin = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 15 Pro Max', category: 'Smartphone', price: '28.990.000đ', stock: 15, image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'MacBook Air M3 2024', category: 'Laptop', price: '32.500.000đ', stock: 8, image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'AirPods Pro Gen 2', category: 'Phụ kiện', price: '5.200.000đ', stock: 0, image: 'https://via.placeholder.com/50' },
    { id: 4, name: 'Samsung S24 Ultra', category: 'Smartphone', price: '26.990.000đ', stock: 12, image: 'https://via.placeholder.com/50' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa?")) {
      setProducts(products.filter(item => item.id !== id));
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
                <p className="subtitle-page">Danh sách các thiết bị công nghệ</p>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn-add"
                  onClick={() => navigate("/admin/product/create")}
                >
                  + Thêm sản phẩm
                </button>
              </div>

            </div>

            <table className="tech-table">

              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Giá bán</th>
                  <th>Kho</th>
                  <th>Trạng thái</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>

              <tbody>

                {products.map((item) => (

                  <tr key={item.id}>

                    <td>
                      <img src={item.image} alt={item.name} className="product-img-thumb" />
                    </td>

                    <td>
                      <div className="product-name-cell">
                        <strong>{item.name}</strong>
                        <span>ID: #{item.id}</span>
                      </div>
                    </td>

                    <td>
                      <span className="cat-tag">{item.category}</span>
                    </td>

                    <td>
                      <b className="price-text">{item.price}</b>
                    </td>

                    <td>{item.stock}</td>

                    <td>
                      <span className={`status-pill ${item.stock > 0 ? 'online' : 'offline'}`}>
                        {item.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>

                      <div className="action-group">

                        <button
                          className="btn-action edit"
                          onClick={() => navigate(`/admin/product/update/`)}
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