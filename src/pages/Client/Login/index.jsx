import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:3000/users/login", formData);

      // 💥 LƯU TOKEN + ROLE
      localStorage.setItem("token", res.data.token);

      alert("Đăng nhập thành công!");

      navigate("/admin"); // vào admin

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login lỗi");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2 className="login-title">Đăng Nhập</h2>

        <form className="login-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="example@gmail.com"
              className={errors.email ? "input-error" : ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
              className={errors.password ? "input-error" : ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-login">
            Đăng Nhập
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;