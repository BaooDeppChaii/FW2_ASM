import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Kiểm tra trạng thái đăng nhập khi component load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    alert("Đã đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <>
      {/* TOP BAR Giữ nguyên của Khang */}
      <div className="topbar text-light py-1 small border-bottom border-secondary">
        <div className="container d-flex justify-content-between">
          <div className="d-flex gap-3">
            <span>Hotline: <strong>0909 123 456</strong></span>
            <span>Email: techstore@gmail.com</span>
          </div>
          <div className="d-flex gap-3">
            <a href="#" className="text-light text-decoration-none"><i className="bi bi-facebook"></i> Facebook</a>
            <a href="#" className="text-light text-decoration-none"><i className="bi bi-instagram"></i> Instagram</a>
            <Link to="/contact" className="text-light text-decoration-none"><i className="bi bi-telephone"></i> Liên hệ</Link>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="header bg-tech-dark sticky-top py-3 border-bottom border-secondary">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" className="logo text-decoration-none text-white fw-bold fs-3 italic">
            TECH<span className="text-tech-accent">STORE</span>
          </Link>

          {/* Menu */}
          <nav className="nav d-flex align-items-center gap-4">
            <Link to="/" className="nav-link text-white text-uppercase fw-semibold p-0">Trang chủ</Link>
            <Link to="/product" className="nav-link text-white text-uppercase fw-semibold p-0">Sản phẩm</Link>
            <Link to="/contact" className="nav-link text-white text-uppercase fw-semibold p-0">Liên hệ</Link>

            <div className="d-flex gap-3 ms-4 align-items-center">
              {user ? (
                /* DROPDOWN KHI ĐÃ ĐĂNG NHẬP */
                <div className="dropdown">
                  <button 
                    className="btn btn-link text-white dropdown-toggle p-0 d-flex align-items-center gap-2 text-decoration-none" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle fs-4"></i>
                    <span>{user.full_name}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary" aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item text-white" to="/profile"><i className="bi bi-person me-2"></i>Hồ sơ</Link></li>
                    
                    {/* KIỂM TRA ROLE ADMIN (Nếu role là 1 hoặc '1' tùy DB của Khang) */}
                    {(user.role === 1 || user.role === '1') && (
                      <li><Link className="dropdown-item text-info fw-bold" to="/admin"><i className="bi bi-speedometer2 me-2"></i>Trang Quản Trị</Link></li>
                    )}
                    
                    <li><hr className="dropdown-divider border-secondary" /></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Đăng xuất</button></li>
                  </ul>
                </div>
              ) : (
                /* NÚT KHI CHƯA ĐĂNG NHẬP */
                <>
                  <Link to="/login" className="btn btn-outline-info btn-sm px-4 rounded-pill">Đăng nhập</Link>
                  <Link to="/register" className="btn btn-outline-info btn-sm px-4 rounded-pill">Đăng ký</Link>
                </>
              )}

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