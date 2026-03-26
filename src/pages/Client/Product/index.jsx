
import "./style.css";

const Product = () => {

  // dữ liệu giả
  const products = [
    { id: 1, name: "Bàn phím cơ Akko 3068 v2", price: "1.590.000", img: "https://owlgaming.vn/wp-content/uploads/2022/06/ban-phim-co-akko-3068-v2-rgb-white.jpg" },
    { id: 2, name: "Chuột Logitech G502 Hero", price: "1.050.000", img: "https://cdn2.cellphones.com.vn/x/media/catalog/product/3/c/3c42e4219bbaa920c07c54784edd6269.jpg" },
    { id: 3, name: "Tai nghe Razer BlackShark V2", price: "2.300.000", img: "https://product.hstatic.net/200000637319/product/71u8xpmccxl._ac_sl1500___1__c0f2108126be464790dfaada7b92fdbd_master.jpg" },
    { id: 4, name: "Lót chuột Gaming RGB", price: "450.000", img: "https://hanoicomputercdn.com/media/product/67758_ban_di_chuot_gaming_gms_wt_5_logo_asus_rog_cyberpunk_led_vien_rgb_30_x_70cm.jpg" },
    { id: 5, name: "Chuột Razer Basilisk", price: "1.200.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtL_QSPAYCMRlQ9KKqv6mCNc_3V_IXtSg2iA&s" },
    { id: 6, name: "Bàn phím cơ Dareu EK87", price: "890.000", img: "https://cdni.dienthoaivui.com.vn/x,webp,q100/https://dashboard.dienthoaivui.com.vn/uploads/wp-content/uploads/images/phu-kien_ban-phim-co-co-day-dareu-ek87-v2-multi-led-den-2.jpg" },
    { id: 7, name: "Tai nghe HyperX Cloud II", price: "1.990.000", img: "https://www.phongcachxanh.vn/cdn/shop/files/tai-nghe-kingston-hyperx-cloud-earbud-ii-39123979698421.jpg?v=1685008069&width=1000" },
    { id: 8, name: "Lót chuột SteelSeries QcK", price: "390.000", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD-hyist-rkKGaD9BNCpzEb-XH8NdABhO1CQ&s" },
  ];

  return (
    <div className="container py-5">

      {/* tiêu đề */}
      <div className="mb-4">
        <h2 className="fw-bold">TẤT CẢ SẢN PHẨM</h2>
        <p className="text-muted">Tìm kiếm gear gaming phù hợp với bạn</p>
      </div>

      <div className="row">

        {/* sidebar */}
        <div className="col-md-3 mb-4">

          {/* search */}
          <div className="card p-3 shadow-sm mb-4">
            <h6 className="fw-bold mb-3">Tìm kiếm</h6>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên sản phẩm..."
            />
          </div>

          {/* category */}
          <div className="card p-3 shadow-sm mb-4">
            <h6 className="fw-bold mb-3">Danh mục</h6>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Chuột Gaming</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Bàn phím cơ</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Tai nghe</label>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">Lót chuột</label>
            </div>

          </div>

          {/* price */}
          <div className="card p-3 shadow-sm">
            <h6 className="fw-bold mb-3">Khoảng giá</h6>

            <select className="form-select">
              <option>Tất cả</option>
              <option>Dưới 500k</option>
              <option>500k - 1 triệu</option>
              <option>1 - 2 triệu</option>
              <option>Trên 2 triệu</option>
            </select>

          </div>

        </div>

        {/* product list */}
        <div className="col-md-9">

          {/* sort */}
          <div className="d-flex justify-content-between mb-4">

            <span className="text-muted">
              Hiển thị {products.length} sản phẩm
            </span>

            <select className="form-select w-auto">
              <option>Sắp xếp mặc định</option>
              <option>Giá thấp → cao</option>
              <option>Giá cao → thấp</option>
              <option>Mới nhất</option>
            </select>

          </div>

          {/* grid */}
          <div className="row g-4">

            {products.map(item => (

              <div className="col-md-4" key={item.id}>

                <div className="card product-card h-100 shadow-sm border-0">

                  <div className="p-3">
                    <img
                      src={item.img}
                      className="img-fluid"
                      alt={item.name}
                    />
                  </div>

                  <div className="card-body text-center">

                    <h6 className="fw-bold">
                      {item.name}
                    </h6>

                    <p className="text-danger fw-bold fs-5">
                      {item.price}đ
                    </p>

                    <button className="btn btn-outline-dark btn-sm rounded-pill px-4">
                      Thêm vào giỏ
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Product;