import React, { useState, useEffect } from 'react';
import { getProducts } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import { Link, useSearchParams } from 'react-router-dom'; // Thêm useSearchParams
import "./style.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 1. Khai báo searchParams để lấy query từ URL
  const [searchParams] = useSearchParams();
  const categoryIdFromUrl = searchParams.get("category");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resCategories] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        const prodData = resProducts?.data?.data || resProducts?.data || resProducts;
        const catData = resCategories?.data?.data || resCategories?.data || resCategories;

        setProducts(Array.isArray(prodData) ? prodData : []);
        setCategories(Array.isArray(catData) ? catData : []);

        // 2. LOGIC QUAN TRỌNG: Nếu URL có category, tự động chọn checkbox đó
        if (categoryIdFromUrl) {
          setSelectedCategories([categoryIdFromUrl]); 
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryIdFromUrl]); // Chạy lại nếu URL thay đổi

  const handleCategoryChange = (catId) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  // LOGIC LỌC DỮ LIỆU (Giữ nguyên của Khang, đã chuẩn rồi)
  const filteredProducts = products.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategories.length === 0 || 
                         selectedCategories.some(id => String(id) === String(item.category_id));

    let matchPrice = true;
    const price = Number(item.price);
    if (priceRange === "under500") matchPrice = price < 500000;
    else if (priceRange === "500-1m") matchPrice = price >= 500000 && price <= 1000000;
    else if (priceRange === "1m-2m") matchPrice = price > 1000000 && price <= 2000000;
    else if (priceRange === "above2m") matchPrice = price > 2000000;

    return matchSearch && matchCategory && matchPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  if (loading) return <div className="text-center py-5">Đang tải sản phẩm...</div>;

  return (
    <div className="container py-5">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2 className="fw-bold">TẤT CẢ SẢN PHẨM</h2>
          <p className="text-muted">Tìm kiếm gear gaming phù hợp với bạn</p>
        </div>
        {/* Nút reset nhanh bộ lọc nếu cần */}
        {selectedCategories.length > 0 && (
          <button className="btn btn-sm btn-link text-danger" onClick={() => setSelectedCategories([])}>
            Xóa tất cả lọc danh mục
          </button>
        )}
      </div>

      <div className="row">
        {/* SIDEBAR LỌC */}
        <div className="col-md-3 mb-4">
          <div className="card p-3 shadow-sm mb-4 border-0">
            <h6 className="fw-bold mb-3">Tìm kiếm</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="card p-3 shadow-sm mb-4 border-0">
            <h6 className="fw-bold mb-3">Danh mục</h6>
            {categories.map(cat => {
              const cid = String(cat.id || cat._id); // Ép kiểu chuỗi để so sánh cho chuẩn
              return (
                <div className="form-check mb-2" key={cid}>
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id={`cat-${cid}`}
                    // Nếu ID này nằm trong mảng selectedCategories thì nó sẽ hiện dấu tích
                    checked={selectedCategories.includes(cid)} 
                    onChange={() => handleCategoryChange(cid)}
                  />
                  <label className="form-check-label" htmlFor={`cat-${cid}`}>
                    {cat.name}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="card p-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">Khoảng giá</h6>
            <select className="form-select" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="under500">Dưới 500k</option>
              <option value="500-1m">500k - 1 triệu</option>
              <option value="1m-2m">1 - 2 triệu</option>
              <option value="above2m">Trên 2 triệu</option>
            </select>
          </div>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between mb-4 align-items-center">
            <span className="text-muted">Hiển thị <b>{sortedProducts.length}</b> sản phẩm</span>
            <select className="form-select w-auto" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="default">Sắp xếp mặc định</option>
              <option value="lowToHigh">Giá thấp → cao</option>
              <option value="highToLow">Giá cao → thấp</option>
            </select>
          </div>

          <div className="row g-4">
            {sortedProducts.length > 0 ? (
              sortedProducts.map(item => {
                const categoryOfProduct = categories.find(c => String(c.id || c._id) === String(item.category_id));
                return (
                  <div className="col-md-4" key={item.id || item._id}>
                    <Link to={`/product/${item.id || item._id}`} className="text-decoration-none text-dark">
                      <div className="card product-card h-100 shadow-sm border-0 position-relative">
                        <span className="badge bg-dark position-absolute m-3 fw-normal" style={{ zIndex: 10, top: 0, left: 0 }}>
                          {categoryOfProduct ? categoryOfProduct.name : "Gear"}
                        </span>
                        <div className="p-3 text-center">
                          <img src={item.image} className="img-fluid rounded" alt={item.name} style={{ height: '180px', objectFit: 'contain' }} />
                        </div>
                        <div className="card-body text-center">
                          <h6 className="fw-bold text-truncate">{item.name}</h6>
                          <p className="text-danger fw-bold fs-5">{Number(item.price).toLocaleString()}đ</p>
                          <div className="mb-2">
                             <small className={Number(item.quantity) > 0 ? "text-success" : "text-danger"}>
                                {Number(item.quantity) > 0 ? `Còn hàng: ${item.quantity}` : "Hết hàng"}
                             </small>
                          </div>
                          <button className="btn btn-outline-dark btn-sm rounded-pill px-4">Xem chi tiết</button>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">Không tìm thấy sản phẩm nào khớp với bộ lọc.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;