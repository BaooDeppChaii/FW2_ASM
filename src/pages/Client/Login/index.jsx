import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email không được để trống";
    if (!formData.password) newErrors.password = "Mật khẩu không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await axios.post("http://localhost:3000/users/login", payload);
      const { user, token } = res.data;

      // 1. Check active ngay khi nhận data từ Backend
      if (String(user.active) === "0") {
        toast.error("Tài khoản của bạn đã bị khóa!");
        return;
      }

      // 2. Lưu thông tin nếu acc ổn
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Chào mừng ${user.full_name} đã quay trở lại!`);

      // 3. Điều hướng dựa trên quyền
      if (Number(user.role) === 1) {
        navigate("/");
      } else {
        navigate("/");
      }

      // Để các component khác cập nhật lại Header/User info mà không cần F5
      window.dispatchEvent(new Event("storage")); 

    } catch (err) {
      // 4. Bắt mã lỗi 403 (bị khóa) hoặc 401 (sai pass) từ Backend
      const message = err.response?.data?.message || "Đăng nhập thất bại!";
      toast.error(message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <h2>LOGIN</h2>
          <p>Truy cập vào TechStore của bạn</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <i className="bi bi-envelope"></i>
            <input
              type="text"
              placeholder="Email của bạn"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          {errors.email && <small className="error-msg">{errors.email}</small>}

          <div className="input-field">
            <i className="bi bi-lock"></i>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          {errors.password && <small className="error-msg">{errors.password}</small>}

          <button type="submit" className="btn-glow">XÁC NHẬN</button>
        </form>

        <div className="login-footer">
          <span>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></span>
        </div>
      </div>
    </div>
  );
};

export default Login;