import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProducts } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import './style.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [resProducts, resCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        // Bóc tách dữ liệu linh hoạt để tránh bị undefined
        const prodData = resProducts?.data?.data || resProducts?.data || resProducts;
        const catData = resCategories?.data?.data || resCategories?.data || resCategories;

        setProducts(Array.isArray(prodData) ? prodData : []);
        setCategories(Array.isArray(catData) ? catData : []);

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  // Hàm render card sản phẩm để dùng chung cho cả 2 mục
  const renderProductCard = (item) => {
    const categoryOfProduct = categories.find(c => c.id === item.category_id || c._id === item.category_id);
    
    return (
      <div className="col" key={item.id || item._id}>
        {/* Bọc Link ở đây */}
        <Link to={`/product/${item.id || item._id}`} className="text-decoration-none">
          <div className="card h-100 product-card border-0 shadow-sm">
            <span className="badge bg-dark position-absolute m-3 fw-normal">
              {categoryOfProduct ? categoryOfProduct.name : "Gaming Gear"}
            </span>
            <div className="p-3">
              <img 
                src={item.image} 
                className="card-img-top rounded" 
                alt={item.name} 
                style={{ height: '200px', objectFit: 'contain' }}
              />
            </div>
            <div className="card-body text-center">
              {/* Tên sản phẩm màu đen */}
              <h6 className="fw-bold text-truncate text-dark">{item.name}</h6>
              <p className="text-danger fw-bold">{Number(item.price).toLocaleString()}đ</p>
            </div>
            <div className="text-center pb-3 px-3">
              <button className="btn btn-outline-dark btn-sm rounded-pill w-100">
                Xem chi tiết
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  };
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-info" role="status"></div>
        <span className="ms-3 fw-bold">Đang tải dữ liệu...</span>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-full d-flex align-items-center">
        <div className="container text-white">
          <h1 className="display-3 fw-bold mb-3">
            TECH STORE <br />
            <span className="text-info">NEXT GEN GEAR</span>
          </h1>
          <Link to="/product" className="btn btn-info btn-lg px-5 fw-bold rounded-pill">MUA NGAY</Link>
        </div>
      </section>

      {/* DANH MỤC LẤY TỪ DATABASE */}
      <section className="py-5 container">
        <div className="text-center mb-5">
          <h2 className="fw-bold section-title text-uppercase">Danh mục sản phẩm</h2>
        </div>
        <div className="row g-4 text-center">
          {categories.map((cat) => (
            <div className="col-6 col-md-3" key={cat.id || cat._id}>
              <Link to={`/product?category=${cat.id || cat._id}`} className="text-decoration-none text-dark">
                <div className="category-card p-5 shadow-sm rounded-4 border bg-white h-100">
                  <i className={`bi ${cat.icon || 'bi-tag'} fs-1 d-block mb-3 text-info`}></i>
                  <h5 className="mb-0 text-uppercase small fw-bold">{cat.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- MỤC 1: SẢN PHẨM NỔI BẬT (Hiện 4 cái đầu) --- */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold m-0 text-uppercase">Sản phẩm nổi bật</h2>
            <Link to="/product" className="text-info text-decoration-none fw-bold">Xem tất cả →</Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {/* Lấy từ sản phẩm 0 đến 4 */}
            {products.slice(0, 4).map((item) => renderProductCard(item))}
          </div>
        </div>
      </section>
      

      {/* --- MỤC 2: SẢN PHẨM MỚI NHẤT (Hiện 4 cái tiếp theo) --- */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold m-0 text-uppercase">Sản phẩm mới nhất</h2>
            <Link to="/product" className="text-info text-decoration-none fw-bold">Xem tất cả →</Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {/* Lấy từ sản phẩm 4 đến 8 */}
            {products.slice(4, 8).map((item) => renderProductCard(item))}
          </div>
        </div>
      </section>

      {/* CHÍNH SÁCH DỊCH VỤ */}
      <section className="py-5 border-top bg-white">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <i className="bi bi-truck fs-2 text-info"></i>
              <h5 className="mt-3 fw-bold">Giao hàng nhanh</h5>
              <p className="text-muted small">Nhận hàng trong 24h tại nội thành</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-shield-check fs-2 text-info"></i>
              <h5 className="mt-3 fw-bold">Chính hãng 100%</h5>
              <p className="text-muted small">Bảo hành lỗi 1 đổi 1 tận nơi</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-headset fs-2 text-info"></i>
              <h5 className="mt-3 fw-bold">Hỗ trợ 24/7</h5>
              <p className="text-muted small">Giải đáp mọi thắc mắc kỹ thuật</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;