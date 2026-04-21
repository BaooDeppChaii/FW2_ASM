import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProducts } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import './style.css';

// --- HÀM HỖ TRỢ: Tự động lấy icon dựa trên tên danh mục ---
const getIconByCategory = (name) => {
  const lowerName = name?.toLowerCase() || "";
  if (lowerName.includes("chuột") || lowerName.includes("mouse")) return "bi-mouse2";
  if (lowerName.includes("phím") || lowerName.includes("keyboard")) return "bi-keyboard";
  if (lowerName.includes("tai nghe") || lowerName.includes("headset")) return "bi-headset";
  if (lowerName.includes("màn hình") || lowerName.includes("monitor")) return "bi-display";
  if (lowerName.includes("laptop")) return "bi-laptop";
  
  return "bi-box-seam"; // Icon mặc định nếu không khớp tên nào
};

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

        const prodData = resProducts?.data?.data || resProducts?.data || resProducts;
        const catData = resCategories?.data?.data || resCategories?.data || resCategories;

        const availableProducts = Array.isArray(prodData) 
          ? prodData.filter(item => Number(item.quantity) > 0) 
          : [];

        setProducts(availableProducts); 
        
        setCategories(Array.isArray(catData) ? catData : []);

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const renderProductCard = (item) => {
    const categoryOfProduct = categories.find(c => c.id === item.category_id || c._id === item.category_id);
    
    return (
      <div className="col" key={item.id || item._id}>
        <Link to={`/product/${item.id || item._id}`} className="text-decoration-none">
          <div className="card h-100 product-card border-0 shadow-sm transition-hover">
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
          <Link to="/product" className="btn btn-info btn-lg px-5 fw-bold rounded-pill shadow">MUA NGAY</Link>
        </div>
      </section>

      {/* DANH MỤC LẤY TỪ DATABASE - ĐÃ CẬP NHẬT ICON VÀ LINK LỌC */}
      <section className="py-5 container">
        <div className="text-center mb-5">
          <h2 className="fw-bold section-title text-uppercase">Danh mục sản phẩm</h2>
        </div>
        <div className="row g-4 text-center">
          {categories.map((cat) => (
            <div className="col-6 col-md-3" key={cat.id || cat._id}>
              {/* Truyền tham số category vào URL để trang Product biết đường mà lọc */}
              <Link to={`/product?category=${cat.id || cat._id}`} className="text-decoration-none text-dark">
                <div className="category-card p-5 shadow-sm rounded-4 border bg-white h-100 transition-hover">
                  {/* Sử dụng icon từ database nếu có, không thì tự lấy theo tên */}
                  <i className={`bi ${cat.icon || getIconByCategory(cat.name)} fs-1 d-block mb-3 text-info`}></i>
                  <h5 className="mb-0 text-uppercase small fw-bold">{cat.name}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SẢN PHẨM NỔI BẬT */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold m-0 text-uppercase border-start border-info border-4 ps-3">Sản phẩm nổi bật</h2>
            <Link to="/product" className="text-info text-decoration-none fw-bold">Xem tất cả →</Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.slice(0, 4).map((item) => renderProductCard(item))}
          </div>
        </div>
      </section>
      
      {/* SẢN PHẨM MỚI NHẤT */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold m-0 text-uppercase border-start border-info border-4 ps-3">Sản phẩm mới nhất</h2>
            <Link to="/product" className="text-info text-decoration-none fw-bold">Xem tất cả →</Link>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.slice(4, 8).map((item) => renderProductCard(item))}
          </div>
        </div>
      </section>

      {/* CHÍNH SÁCH DỊCH VỤ */}
      <section className="py-5 border-top bg-white">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="p-4 rounded-3 hover-shadow transition-all">
                <i className="bi bi-truck fs-1 text-info"></i>
                <h5 className="mt-3 fw-bold">Giao hàng nhanh</h5>
                <p className="text-muted small">Nhận hàng trong 24h tại nội thành</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 hover-shadow transition-all">
                <i className="bi bi-shield-check fs-1 text-info"></i>
                <h5 className="mt-3 fw-bold">Chính hãng 100%</h5>
                <p className="text-muted small">Bảo hành lỗi 1 đổi 1 tận nơi</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 rounded-3 hover-shadow transition-all">
                <i className="bi bi-headset fs-1 text-info"></i>
                <h5 className="mt-3 fw-bold">Hỗ trợ 24/7</h5>
                <p className="text-muted small">Giải đáp mọi thắc mắc kỹ thuật</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;