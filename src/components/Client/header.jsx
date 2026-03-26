import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <>
    
  {/* TOP BAR */}
      <div className="topbar  text-light py-1 small border-bottom border-secondary">
        <div className="container d-flex justify-content-between">

          {/* bên trái */}
          <div className="d-flex gap-3">
            <span>
               Hotline: <strong>0909 123 456</strong>
            </span>

            <span>
               Email: techstore@gmail.com
            </span>
          </div>

          {/* bên phải */}
          <div className="d-flex gap-3">

            <a href="#" className="text-light text-decoration-none">
              <i className="bi bi-facebook"></i> Facebook
            </a>

            <a href="#" className="text-light text-decoration-none">
              <i className="bi bi-instagram"></i> Instagram
            </a>

            <a href="#" className="text-light text-decoration-none">
              <i className="bi bi-telephone"></i> Liên hệ
            </a>

          </div>

        </div>
      </div>
      {/* HEADER */}
      <header className="header bg-tech-dark sticky-top py-3 border-bottom border-secondary">
        <div className="container d-flex justify-content-between align-items-center">

          {/* logo */}
          <Link to="/" className="logo text-decoration-none text-white fw-bold fs-3 italic">
            TECH<span className="text-tech-accent">STORE</span>
          </Link>

          {/* menu */}
          <nav className="nav d-flex align-items-center gap-4">

            <Link to="/" className="nav-link text-white text-uppercase fw-semibold p-0">
              Trang chủ
            </Link>

            <Link to="/product" className="nav-link text-white text-uppercase fw-semibold p-0">
              Sản phẩm
            </Link>

             <Link to="/detail" className="nav-link text-white text-uppercase fw-semibold p-0">
              Chi tiết
            </Link>

            <div className="d-flex gap-3 ms-4">

              <Link
                to="/login"
                className="btn btn-outline-info btn-sm px-4 rounded-pill"
              >
                Đăng nhập
              </Link>

                <Link
                to="/register"
                className="btn btn-outline-info btn-sm px-4 rounded-pill"
              >
                Đăng ký
              </Link>

              <Link to="/cart" className="text-white fs-5">
                <i className="bi bi-cart3"></i>
              </Link>

            </div>

          </nav>

        </div>
      </header>
      
    </>
  );
};

export default Header;