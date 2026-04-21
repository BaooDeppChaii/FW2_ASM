import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../../api/productApi";
import { addCartItem } from "../../../api/cartApi";
import { toast } from 'react-toastify'; // 1. Import toast
import './style.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const res = await getProducts();
        const allProducts = res?.data?.data || res?.data || res;
        const currentProduct = allProducts.find(p => String(p.id || p._id) === String(id));
        
        if (currentProduct) {
          setProduct(currentProduct);
          setMainImage(currentProduct.image); 
          const related = allProducts.filter(p => 
            (String(p.category_id) === String(currentProduct.category_id)) && 
            (String(p.id || p._id) !== String(id))
          );
          setRelatedProducts(related.slice(0, 4));
        }
      } catch (error) {
        console.error("Lỗi tải chi tiết sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
    window.scrollTo(0, 0);
    setBuyQuantity(1);
  }, [id]);

  const handleQuantity = (type) => {
    const stock = Number(product?.quantity || 0); 
    if (type === 'plus') {
      if (buyQuantity < stock) {
        setBuyQuantity(prev => prev + 1);
      } else {
        // Thay alert bằng toast cho đồng bộ
        toast.warning(`Số lượng trong kho chỉ còn ${stock} sản phẩm!`);
      }
    } else if (type === 'minus' && buyQuantity > 1) {
      setBuyQuantity(prev => prev - 1);
    }
  };

  // --- LOGIC THÊM GIỎ HÀNG MỚI ---
  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addCartItem({
        product_id: product.id,
        quantity: buyQuantity,
      });

      // 2. Hiện thông báo kèm tên sản phẩm
      toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
      
      // 3. KHÔNG navigate sang /cart nữa để user ở lại mua tiếp

    } catch (error) {
      const status = error?.response?.status;
      if (status === 401) {
        toast.error("Bạn cần đăng nhập trước khi thêm vào giỏ hàng.");
        navigate("/login");
        return;
      }
      toast.error(error?.response?.data?.message || "Thêm vào giỏ thất bại!");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="text-center py-5 fw-bold">Đang tải dữ liệu từ hệ thống...</div>;
  if (!product) return <div className="text-center py-5">Sản phẩm không tồn tại!</div>;

  const currentStock = Number(product.quantity || 0);

  return (
    <div className="detail-page py-5">
      <div className="container">
        <div className="product-main-card shadow-sm bg-white rounded-4 p-4 border-0">
          <div className="row">
            {/* Cột Trái: Hình ảnh */}
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="image-wrapper text-center p-3 bg-light rounded-4">
                <img 
                  src={mainImage} 
                  className="detail-main-img img-fluid" 
                  alt={product.name} 
                  style={{ maxHeight: '450px', objectFit: 'contain', mixBlendMode: 'multiply' }} 
                />
              </div>
            </div>

            {/* Cột Phải: Thông tin chi tiết */}
            <div className="col-md-6">
              <div className="product-info-content ps-md-4">
                <nav aria-label="breadcrumb" className="small mb-2">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Trang chủ</Link></li>
                    <li className="breadcrumb-item"><Link to="/product" className="text-decoration-none text-muted">Sản phẩm</Link></li>
                    <li className="breadcrumb-item active text-truncate" style={{maxWidth: '200px'}}>{product.name}</li>
                  </ol>
                </nav>

                <h2 className="detail-title fw-bold mb-3">{product.name}</h2>
                
                <div className="detail-price-box mb-4">
                  <span className="detail-price text-danger fs-2 fw-bold">
                    {Number(product.price).toLocaleString()}đ
                  </span>
                </div>

                <div className="detail-meta-list mb-4 p-3 bg-light rounded-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <span className="text-muted small d-block">Mã sản phẩm:</span>
                      <strong>#{product.id || product._id}</strong>
                    </div>
                    <div className="col-6">
                      <span className="text-muted small d-block">Tình trạng:</span>
                      <strong className={currentStock > 0 ? "text-success" : "text-danger"}>
                        {currentStock > 0 ? `● Còn hàng (${currentStock})` : "● Hết hàng"}
                      </strong>
                    </div>
                  </div>
                </div>

                <p className="short-desc text-secondary mb-4">
                  {product.description || "Mô tả đang được cập nhật..."}
                </p>

                <div className="action-area border-top pt-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <span className="fw-bold">Số lượng:</span>
                    <div className="qty-wrapper d-flex border rounded-pill bg-white overflow-hidden">
                       <button className="btn btn-link text-dark px-3 text-decoration-none shadow-none" onClick={() => handleQuantity('minus')}>-</button>
                       <input type="text" className="border-0 text-center fw-bold bg-transparent" value={buyQuantity} style={{width: '50px'}} readOnly />
                       <button className="btn btn-link text-dark px-3 text-decoration-none shadow-none" onClick={() => handleQuantity('plus')}>+</button>
                    </div>
                  </div>
                  
                  <div className="btn-group-action d-flex">
                    <button 
                      className="btn btn-dark btn-lg w-100 rounded-pill fw-bold text-white"
                      disabled={currentStock <= 0 || addingToCart}
                      onClick={handleAddToCart}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      {currentStock <= 0
                        ? "HẾT HÀNG"
                        : addingToCart
                          ? "Đang thêm..."
                          : "Thêm vào giỏ hàng"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        <div className="detail-section mt-5 pt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
             <h4 className="fw-bold m-0 text-uppercase border-start border-4 border-primary ps-3">Sản phẩm tương tự</h4>
             <Link to="/product" className="text-primary text-decoration-none small fw-bold">XEM TẤT CẢ</Link>
          </div>
          <div className="row g-4">
            {relatedProducts.length > 0 ? relatedProducts.map(p => (
              <div className="col-6 col-md-3" key={p.id || p._id}>
                <Link to={`/product/${p.id || p._id}`} className="text-decoration-none text-dark">
                  <div className="card h-100 border-0 shadow-sm p-3 product-card-hover rounded-4">
                    <div className="text-center mb-3">
                        <img src={p.image} className="img-fluid" alt={p.name} style={{height: '160px', objectFit: 'contain'}} />
                    </div>
                    <h6 className="text-truncate fw-bold mb-2">{p.name}</h6>
                    <p className="text-danger fw-bold mb-0">{Number(p.price).toLocaleString()}đ</p>
                  </div>
                </Link>
              </div>
            )) : (
              <div className="col-12 py-4 text-center bg-light rounded-3">
                <span className="text-muted">Không có sản phẩm nào cùng danh mục.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;