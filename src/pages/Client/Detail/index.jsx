import "./style.css";

const Detail = () => {

  const product = {
    name: "Chuột Gaming Logitech G Pro X Superlight",
    price: 2490000,
    oldPrice: 2990000,
    brand: "Logitech",
    sku: "LOG-GPROX-01",
    status: "Còn hàng",

    images: [
      "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
    ],

    description:
      "Chuột gaming cao cấp dành cho game thủ chuyên nghiệp. Trọng lượng siêu nhẹ chỉ 63g, cảm biến HERO 25K siêu chính xác.",

    specs: {
      DPI: "25600",
      Weight: "63g",
      Connection: "Wireless",
      Battery: "70 giờ",
      Color: "Black"
    }
  };


  const relatedProducts = [
    {
      id: 1,
      name: "Bàn phím cơ AKKO 3068",
      price: "1.590.000đ",
      img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef"
    },
    {
      id: 2,
      name: "Tai nghe HyperX Cloud II",
      price: "2.090.000đ",
      img: "https://www.tncstore.vn/media/product/250-1153-tai-nghe-kingston-hyperx-cloud-ii-7-1-red-1-songphuong-vn_-600x600.jpg"
    },
    {
      id: 3,
      name: "Lót chuột RGB Gaming",
      price: "350.000đ",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZ4OOZOFERG-aO8psQV-InBG7bPTfuZKODQ&s"
    }
  ];


// Thêm icon nếu bạn có (hoặc dùng text như cũ)
return (
  
  <div className="detail-page">
   
    <div className="container">
      <div className="product-main-card">
        <div className="row">
          {/* Gallery - Bên trái */}
          <div className="col-md-6">
            <div className="image-wrapper">
             
              <img src={product.images[0]} className="detail-main-img" alt={product.name} />
              <div className="detail-thumb">
                {product.images.map((img, i) => (
                  <div className={`thumb-item ${i === 0 ? 'active' : ''}`} key={i}>
                    <img src={img} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info - Bên phải */}
          <div className="col-md-6">
            <div className="product-info-content">
              <span className="brand-tag">{product.brand}</span>
              <h2 className="detail-title">{product.name}</h2>
              
              <div className="detail-price-box">
                <span className="detail-price">{product.price.toLocaleString()}đ</span>
                <span className="detail-old-price">{product.oldPrice.toLocaleString()}đ</span>
              </div>

              <div className="detail-meta-list">
                <div className="meta-item"><span>Mã sản phẩm:</span> <strong>{product.sku}</strong></div>
                <div className="meta-item"><span>Tình trạng:</span> <strong className="status-on">● {product.status}</strong></div>
              </div>

              <p className="short-desc">{product.description}</p>

              <div className="action-area">
                <div className="qty-wrapper">
                   <button className="qty-btn">-</button>
                   <input type="text" value="1" readOnly />
                   <button className="qty-btn">+</button>
                </div>
                
                <div className="btn-group-action">
                  <button className="btn btn-add-cart">Thêm vào giỏ</button>
                  <button className="btn btn-buy-now">Mua ngay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Description */}
      <div className="detail-section info-tabs">
         <h4 className="section-title">Chi tiết sản phẩm</h4>
         <div className="description-content">
            <p>{product.description}</p>
            {/* Bạn có thể map Specs ra đây */}
         </div>
      </div>

      {/* Related Products */}
      <div className="detail-section">
        <h4 className="section-title">Sản phẩm tương tự</h4>
        <div className="row">
          {relatedProducts.map(p => (
            <div className="col-md-3" key={p.id}>
              <div className="related-card-premium">
                <div className="related-img-box">
                    <img src={p.img} alt={p.name} />
                </div>
                <h6>{p.name}</h6>
                <p className="related-price">{p.price}</p>
                <button className="btn-view-quick">Xem nhanh</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

};

export default Detail;