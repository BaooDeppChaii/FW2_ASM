import "./style.css";

const Footer = () => {
  return (
    <footer className="footer bg-tech-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Cột 1: Giới thiệu */}
          <div className="col-md-4 mb-4">
            <h3 className="fw-bold mb-3">TECH<span className="text-tech-accent">STORE</span></h3>
            <p className="text-white-50">
              Đơn vị dẫn đầu cung cấp các thiết bị Gaming Gear, Bàn phím cơ và Chuột máy tính cao cấp.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="col-md-4 mb-4 text-md-center">
            <h5 className="fw-bold mb-3">HỖ TRỢ</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2">Chính sách bảo hành</li>
              <li className="mb-2">Hướng dẫn mua hàng</li>
              <li className="mb-2">Liên hệ góp ý</li>
            </ul>
          </div>

          {/* Cột 3: Liên hệ */}
          <div className="col-md-4 mb-4 text-md-end">
            <h5 className="fw-bold mb-3">LIÊN HỆ</h5>
            <p className="mb-1 text-white-50">Email: <span className="text-info">techstore@gmail.com</span></p>
            <p className="mb-1 text-white-50">Hotline: 1900 1234</p>
            <div className="mt-3 d-flex justify-content-md-end gap-3">
              <i className="bi bi-facebook fs-4"></i>
              <i className="bi bi-youtube fs-4"></i>
              <i className="bi bi-tiktok fs-4"></i>
            </div>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-white-50 small">
          © 2026 TechStore. All rights reserved. Thiết kế bởi Quân.
        </div>
      </div>
    </footer>
  );
};

export default Footer;