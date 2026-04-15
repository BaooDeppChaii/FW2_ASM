import React, { useState, useEffect } from 'react';
import { getProducts } from "../../../api/productApi";
import { getCategories } from "../../../api/categoryApi";
import { Link } from 'react-router-dom';
import "./style.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State phục vụ lọc và tìm kiếm
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
        
        // Bóc tách data từ Axios
        const prodData = resProducts?.data?.data || resProducts?.data || resProducts;
        const catData = resCategories?.data?.data || resCategories?.data || resCategories;

        setProducts(Array.isArray(prodData) ? prodData : []);
        setCategories(Array.isArray(catData) ? catData : []);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hàm xử lý chọn/bỏ chọn danh mục
  const handleCategoryChange = (catId) => {
    setSelectedCategories(prev => 
      prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
    );
  };

  // LOGIC LỌC DỮ LIỆU
  const filteredProducts = products.filter(item => {
    // 1. Lọc theo tên (Tìm kiếm)
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Lọc theo Danh mục (nếu có chọn)
    const matchCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(item.category_id || item._id);

    // 3. Lọc theo giá
    let matchPrice = true;
    const price = Number(item.price);
    if (priceRange === "under500") matchPrice = price < 500000;
    else if (priceRange === "500-1m") matchPrice = price >= 500000 && price <= 1000000;
    else if (priceRange === "1m-2m") matchPrice = price > 1000000 && price <= 2000000;
    else if (priceRange === "above2m") matchPrice = price > 2000000;

    return matchSearch && matchCategory && matchPrice;
  });

  // LOGIC SẮP XẾP
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0; // Mặc định
  });

  if (loading) return <div className="text-center py-5">Đang tải sản phẩm...</div>;

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold">TẤT CẢ SẢN PHẨM</h2>
        <p className="text-muted">Tìm kiếm gear gaming phù hợp với bạn</p>
      </div>

      <div className="row">
        {/* SIDEBAR LỌC */}
        <div className="col-md-3 mb-4">
          {/* Tìm kiếm */}
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

          {/* Danh mục từ Database */}
          <div className="card p-3 shadow-sm mb-4 border-0">
            <h6 className="fw-bold mb-3">Danh mục</h6>
            {categories.map(cat => (
              <div className="form-check mb-2" key={cat.id || cat._id}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`cat-${cat.id}`}
                  checked={selectedCategories.includes(cat.id || cat._id)}
                  onChange={() => handleCategoryChange(cat.id || cat._id)}
                />
                <label className="form-check-label" htmlFor={`cat-${cat.id}`}>
                  {cat.name}
                </label>
              </div>
            ))}
          </div>

          {/* Lọc theo giá */}
          <div className="card p-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">Khoảng giá</h6>
            <select 
              className="form-select" 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
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
            <span className="text-muted">
              Hiển thị <b>{sortedProducts.length}</b> sản phẩm
            </span>
            <select 
              className="form-select w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="default">Sắp xếp mặc định</option>
              <option value="lowToHigh">Giá thấp → cao</option>
              <option value="highToLow">Giá cao → thấp</option>
            </select>
          </div>

          <div className="row g-4">
  {sortedProducts.length > 0 ? (
    sortedProducts.map(item => {
      // BƯỚC 1: Tìm thông tin danh mục của sản phẩm này
      const categoryOfProduct = categories.find(c => 
        String(c.id || c._id) === String(item.category_id)
      );

      return (
        <div className="col-md-4" key={item.id || item._id}>
          <Link to={`/product/${item.id || item._id}`} className="text-decoration-none text-dark">
            <div className="card product-card h-100 shadow-sm border-0 position-relative">
              
              {/* BƯỚC 2: Thêm Badge hiển thị tên danh mục */}
              <span className="badge bg-dark position-absolute m-3 fw-normal" style={{ zIndex: 10, top: 0, left: 0 }}>
                {categoryOfProduct ? categoryOfProduct.name : "Gaming Gear"}
              </span>

              <div className="p-3 text-center">
                <img
                  src={item.image}
                  className="img-fluid rounded"
                  alt={item.name}
                  style={{ height: '180px', objectFit: 'contain' }}
                />
              </div>
              <div className="card-body text-center">
                <h6 className="fw-bold text-truncate">{item.name}</h6>
                <p className="text-danger fw-bold fs-5">
                  {Number(item.price).toLocaleString()}đ
                </p>
                
                {/* Hiển thị số lượng kho nếu Khang muốn */}
                <div className="mb-2">
                   <small className={Number(item.quantity) > 0 ? "text-success" : "text-danger"}>
                      {Number(item.quantity) > 0 ? `Còn hàng: ${item.quantity}` : "Hết hàng"}
                   </small>
                </div>

                <button className="btn btn-outline-dark btn-sm rounded-pill px-4">
                  Xem chi tiết
                </button>
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