
import './style.css';

const Home = () => {
  // Dữ liệu mẫu (Sau này bạn sẽ lấy từ API hoặc Database)
  const products = [
    { id: 1, name: "Bàn phím cơ Akko 3068 v2", price: "1.590.000", img: "https://owlgaming.vn/wp-content/uploads/2022/06/ban-phim-co-akko-3068-v2-rgb-white.jpg" },
    { id: 2, name: "Chuột Logitech G502 Hero", price: "1.050.000", img: "https://cdn2.cellphones.com.vn/x/media/catalog/product/3/c/3c42e4219bbaa920c07c54784edd6269.jpg" },
    { id: 3, name: "Tai nghe Razer BlackShark V2", price: "2.300.000", img: "https://product.hstatic.net/200000637319/product/71u8xpmccxl._ac_sl1500___1__c0f2108126be464790dfaada7b92fdbd_master.jpg" },
    { id: 4, name: "Lót chuột Gaming RGB", price: "450.000", img: "https://hanoicomputercdn.com/media/product/67758_ban_di_chuot_gaming_gms_wt_5_logo_asus_rog_cyberpunk_led_vien_rgb_30_x_70cm.jpg" },
  ];

  return (
    <div className="home-container">
      {/* 1. HERO BANNER */}
   <section className="hero-full d-flex align-items-center">
  <div className="container text-white">

    <h1 className="display-3 fw-bold mb-3">
      GEAR UP <br/>
      <span className="text-info">FOR VICTORY</span>
    </h1>

    <p className="lead mb-4">
      Trải nghiệm những mẫu bàn phím cơ và chuột gaming đỉnh cao nhất năm 2026.
    </p>

    <button className="btn btn-info btn-lg px-5 fw-bold rounded-pill">
      MUA NGAY
    </button>

  </div>
</section>

      {/* 2. DANH MỤC NỔI BẬT */}
   <section className="py-5 container">
  <div className="text-center mb-5 mt-4">
    <h2 className="fw-bold section-title text-uppercase">Danh mục sản phẩm</h2>
  </div>
  
  <div className="row g-4 text-center">
    {[
 { name: 'Chuột Gaming', icon: 'bi-mouse' },
 { name: 'Bàn phím cơ', icon: 'bi-keyboard' },
 { name: 'Tai nghe', icon: 'bi-headphones' },
 { name: 'Lót chuột', icon: 'bi-grid-3x3-gap' }
].map((cat, idx) => (
      <div className="col-6 col-md-3" key={idx}>
        <div className="category-card p-5 shadow-sm rounded-4 border">
          <i className={`bi ${cat.icon} fs-1 d-block mb-3`}></i>
          <h5 className="mb-0 text-uppercase small">{cat.name}</h5>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* 3.  SẢN PHẨM MỚI*/}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold m-0">SẢN PHẨM MỚI</h2>
            <a href="/product" className="text-info text-decoration-none fw-bold">Xem tất cả →</a>
          </div>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <div className="card h-100 product-card border-0 shadow-sm overflow-hidden">
                  <div className="img-wrapper p-3">
                    <img src={item.img} className="card-img-top rounded" alt={item.name} />
                  </div>
                  <div className="card-body text-center">
                    <h6 className="fw-bold product-title">{item.name}</h6>
                    <p className="text-danger fw-bold fs-5 mb-0">{item.price}đ</p>
                  </div>
                  <div className="card-footer bg-white border-0 pb-4 text-center">
                    <button className="btn btn-outline-dark btn-sm rounded-pill px-4">Thêm vào giỏ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  {/* 3. SẢN PHẨM NỔI BẬT */}
          <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h2 className="fw-bold m-0">SẢN PHẨM MỚI</h2>
            <a href="/product" className="text-info text-decoration-none fw-bold">Xem tất cả →</a>
          </div>
          
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((item) => (
              <div className="col" key={item.id}>
                <div className="card h-100 product-card border-0 shadow-sm overflow-hidden">
                  <div className="img-wrapper p-3">
                    <img src={item.img} className="card-img-top rounded" alt={item.name} />
                  </div>
                  <div className="card-body text-center">
                    <h6 className="fw-bold product-title">{item.name}</h6>
                    <p className="text-danger fw-bold fs-5 mb-0">{item.price}đ</p>
                  </div>
                  <div className="card-footer bg-white border-0 pb-4 text-center">
                    <button className="btn btn-outline-dark btn-sm rounded-pill px-4">Thêm vào giỏ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


<section className="intro">
  <div className="container">

    <h2 className="intro-title">TẠI SAO CHỌN TECHSTORE</h2>

    <div className="intro-list">

      <div className="intro-card">
        <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" alt="anh1"/>
        <h4>Giao hàng nhanh</h4>
        <p>Nhận hàng toàn quốc chỉ từ 2-4 ngày</p>
      </div>

      <div className="intro-card">
        <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="anh"/>
        <h4>Hàng chính hãng</h4>
        <p>Cam kết sản phẩm chất lượng cao</p>
      </div>

      <div className="intro-card">
        <img src="https://cdn-icons-png.flaticon.com/512/1250/1250615.png" alt="anh2"/>
        <h4>Hỗ trợ 24/7</h4>
        <p>Luôn sẵn sàng tư vấn cho bạn</p>
      </div>

    </div>

    <hr />

  </div>
</section>

    </div>
  );
};

export default Home;