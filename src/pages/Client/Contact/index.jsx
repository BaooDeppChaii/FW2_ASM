import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './style.css';

const Support = () => {
  // 1. Tạo state để lưu trữ giá trị form
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });

  // 2. Tạo state để lưu trữ thông báo lỗi
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Xóa lỗi ngay khi người dùng bắt đầu nhập lại
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = "Vui lòng nhập họ và tên";
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }
    if (!formData.message.trim()) newErrors.message = "Nội dung không được để trống";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("TechStore đã nhận được lời nhắn của bạn! ❤️");
      // Reset form sau khi gửi thành công
      setFormData({ fullname: '', email: '', message: '' });
    }
  };

  return (
    <div className="support-container">
      <div className="glow-1"></div>
      <div className="glow-2"></div>

      <div className="content-wrapper container">
        <div className="header-section text-center">
          <h1 className="title-gradient">LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p className="subtitle">TechStore luôn sẵn sàng lắng nghe mọi ý kiến của bạn</p>
        </div>

        <div className="row mt-5 justify-content-center">
          <div className="col-lg-4 mb-4">
            <div className="glass-card info-panel">
              {/* ... Phần thông tin liên hệ giữ nguyên ... */}
              <div className="contact-item">
                <div className="icon-box"><i className="bi bi-geo-alt"></i></div>
                <div><h6>Địa chỉ</h6><p>Ninh Kiều, Cần Thơ</p></div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="bi bi-telephone"></i></div>
                <div><h6>Hotline</h6><p>0909 123 456</p></div>
              </div>
              <div className="contact-item">
                <div className="icon-box"><i className="bi bi-envelope"></i></div>
                <div><h6>Email</h6><p>techstore@gmail.com</p></div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="glass-card form-panel">
              <form onSubmit={handleSubmit} noValidate> {/* noValidate để tắt tooltip mặc định của trình duyệt */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="label-custom">Họ và tên</label>
                    <input 
                      type="text" 
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      className={`input-custom ${errors.fullname ? 'input-error' : ''}`} 
                      placeholder="Nhập tên..." 
                    />
                    {errors.fullname && <small className="error-text">{errors.fullname}</small>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="label-custom">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-custom ${errors.email ? 'input-error' : ''}`} 
                      placeholder="email@example.com" 
                    />
                    {errors.email && <small className="error-text">{errors.email}</small>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="label-custom">Nội dung tin nhắn</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`input-custom ${errors.message ? 'input-error' : ''}`} 
                    rows="5" 
                    placeholder="Bạn cần hỗ trợ gì?"
                  ></textarea>
                  {errors.message && <small className="error-text">{errors.message}</small>}
                </div>

                <button type="submit" className="btn-glow-submit">GỬI YÊU CẦU NGAY</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;