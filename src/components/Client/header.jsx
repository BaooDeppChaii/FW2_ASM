import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <header className="header bg-tech-dark sticky-top py-3 border-bottom border-secondary">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo với style mạnh mẽ */}
        <Link to="/" className="logo text-decoration-none text-white fw-bold fs-3 italic">
          TECH<span className="text-tech-accent">STORE</span>
        </Link>

        {/* Menu điều hướng */}
        <nav className="nav d-flex align-items-center gap-4">
          <Link to="/" className="nav-link text-white text-uppercase fw-semibold p-0">Trang chủ</Link>
          <Link to="/product" className="nav-link text-white text-uppercase fw-semibold p-0">Sản phẩm</Link>
          
          <div className="d-flex gap-3 ms-4">
            <Link to="/login" className="btn btn-outline-info btn-sm px-4 rounded-pill">
              Đăng nhập
            </Link>
            {/* Thêm icon giỏ hàng cho giống web bán hàng thực tế */}
            <Link to="/cart" className="text-white fs-5">
              <i className="bi bi-cart3"></i>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;