import React, { useState } from 'react';
import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Định dạng email không hợp lệ";
    }

    if (!formData.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Dữ liệu đăng nhập hợp lệ:", formData);
      // Gọi API đăng nhập tại đây
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
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className={errors.password ? "input-error" : ""}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn-login">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;