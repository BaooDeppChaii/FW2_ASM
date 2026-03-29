import React, { useState } from "react";
import "./style.css";

const Support = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 👉 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // 👉 Xóa lỗi khi user nhập lại
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // 👉 Validate
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập tên";
    }

    if (!form.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung";
    } else if (form.message.length < 10) {
      newErrors.message = "Nội dung phải ít nhất 10 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 👉 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
    }, 2000);
  };

  return (
    <div>
      {/* HERO */}
      <div className="page-hero support">
        <h1>📞 Hỗ trợ 24/7</h1>
        <p>Liên hệ với chúng tôi</p>
      </div>

      <div className="container py-5">
        <div className="form-box">

          <h3>Gửi yêu cầu hỗ trợ</h3>

          {success ? (
            <div
              style={{
                background: "#22c55e",
                color: "white",
                padding: "15px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              ✅ Gửi thành công!
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Tên của bạn"
                value={form.name}
                onChange={handleChange}
                style={{
                  border: errors.name ? "1px solid red" : "1px solid #ddd",
                  padding: "10px",
                  width: "100%",
                  marginBottom: "5px",
                }}
              />
              {errors.name && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.name}
                </p>
              )}

              {/* EMAIL */}
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                style={{
                  border: errors.email ? "1px solid red" : "1px solid #ddd",
                  padding: "10px",
                  width: "100%",
                  marginBottom: "5px",
                }}
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.email}
                </p>
              )}

              {/* MESSAGE */}
              <textarea
                name="message"
                placeholder="Nội dung..."
                value={form.message}
                onChange={handleChange}
                style={{
                  border: errors.message ? "1px solid red" : "1px solid #ddd",
                  padding: "10px",
                  width: "100%",
                  marginBottom: "5px",
                }}
              />
              {errors.message && (
                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.message}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#38bdf8",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Đang gửi..." : "Gửi ngay"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;