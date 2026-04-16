import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullname.trim()) newErrors.fullname = "Họ tên không được trống";
    if (!formData.username.trim()) newErrors.username = "Tên tài khoản không được trống";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Định dạng Email không hợp lệ";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // --- FIX LẠI CỔNG 3000 VÀ ĐƯỜNG DẪN /users/register ---
      const res = await axios.post("http://localhost:3000/users/register", {
        full_name: formData.fullname, // Khớp với BE: const { full_name, ... } = req.body
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (res.status === 201 || res.status === 200) {
        // Lưu thông tin để đăng nhập ngay lập tức
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);

        alert("Đăng ký thành công! Chào mừng bạn.");
        navigate("/"); 
        window.location.reload(); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Hiển thị lỗi trùng email từ BE trả về
        setErrors({ email: error.response.data.message });
      } else {
        alert("Lỗi kết nối server (Kiểm tra xem BE đã bật chưa nhé Khang)!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page"> {/* Dùng chung class nền với Login */}
      <div className="login-box register-box"> {/* Thêm class để tùy chỉnh riêng nếu cần */}
        <div className="login-header">
          <h2>REGISTER</h2>
          <p>Tham gia cộng đồng TechStore</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Họ và tên */}
          <div className="input-field">
            <i className="bi bi-person"></i>
            <input
              type="text"
              placeholder="Họ và tên"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
          </div>
          {errors.fullname && <small className="error-msg">{errors.fullname}</small>}

          {/* Tên tài khoản */}
          <div className="input-field">
            <i className="bi bi-person-badge"></i>
            <input
              type="text"
              placeholder="Tên tài khoản"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          {errors.username && <small className="error-msg">{errors.username}</small>}

          {/* Email */}
          <div className="input-field">
            <i className="bi bi-envelope"></i>
            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          {errors.email && <small className="error-msg">{errors.email}</small>}

          {/* Mật khẩu */}
          <div className="input-field">
            <i className="bi bi-lock"></i>
            <input
              type="password"
              placeholder="Mật khẩu (ít nhất 6 ký tự)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {errors.password && <small className="error-msg">{errors.password}</small>}

          {/* Xác nhận mật khẩu */}
          <div className="input-field">
            <i className="bi bi-shield-lock"></i>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          {errors.confirmPassword && <small className="error-msg">{errors.confirmPassword}</small>}

          <button type="submit" className="btn-glow" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : "ĐĂNG KÝ NGAY"}
          </button>
        </form>

        <div className="login-footer">
          <span>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Register;