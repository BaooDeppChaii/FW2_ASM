import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
      if (res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Chào mừng bạn trở lại!");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Đăng nhập thất bại!");
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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          {errors.email && <small className="error-msg">{errors.email}</small>}

          <div className="input-field">
            <i className="bi bi-lock"></i>
            <input
              type="password"
              placeholder="Mật khẩu"
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