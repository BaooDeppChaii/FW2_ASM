import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Đăng Ký Tài Khoản</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              className={errors.fullname ? "input-error" : ""}
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            />
            {errors.fullname && <span className="error-text">{errors.fullname}</span>}
          </div>

          <div className="form-group">
            <label>Tên tài khoản</label>
            <input
              type="text"
              className={errors.username ? "input-error" : ""}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className={errors.email ? "input-error" : ""}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              className={errors.password ? "input-error" : ""}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              className={errors.confirmPassword ? "input-error" : ""}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Đang xử lý..." : "ĐĂNG KÝ NGAY"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;