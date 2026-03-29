import React, { useState } from 'react';
import './style.css';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Tên tài khoản không được trống";
    if (!formData.email.includes("@")) newErrors.email = "Email không hợp lệ";
    if (formData.password.length < 6) newErrors.password = "Mật khẩu tối thiểu 6 ký tự";
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Đăng ký thành công!");
      // Gọi API đăng ký
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Đăng Ký</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên tài khoản</label>
            <input type="text" onChange={(e) => setFormData({...formData, username: e.target.value})} />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input type="password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-login">Đăng Ký</button>
        </form>
      </div>
    </div>
  );
};
export default Register;