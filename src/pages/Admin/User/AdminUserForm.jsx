import React, { useState, useEffect } from "react";

const AdminUserForm = ({ onSubmit, dataEdit, mode = "create" }) => {

  const isUpdateMode = mode === "update";

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "0",
    active: "1"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataEdit) {
      setFormData({
        full_name: dataEdit.full_name || "",
        email: dataEdit.email || "",
        password: "",
        role: String(dataEdit.role ?? "0"),
        active: String(dataEdit.active ?? "1")
      });
    }
  }, [dataEdit]);

  const validate = () => {
    let err = {};

    if (!formData.full_name.trim()) err.full_name = "Nhập tên";
    if (!formData.email.trim() || !formData.email.includes("@")) err.email = "Email sai";
    if (!isUpdateMode && !formData.password) {
      err.password = "Nhập password";
    }
    if (isUpdateMode && formData.password && formData.password.length < 6) {
      err.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (!["0", "1"].includes(formData.active)) {
      err.active = "Vui lòng chọn trạng thái";
    }

    if (!["0", "1"].includes(formData.role)) {
      err.role = "Vui lòng chọn vai trò";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isUpdateMode) {
      onSubmit({
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        role: formData.role,
        active: formData.active
      });
      return;
    }

    onSubmit({
      full_name: formData.full_name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      active: formData.active
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">

      {/* NAME */}
      <div className="form-group">
        <label>Tên</label>
        <input
          placeholder="Vui lòng nhập tên"
          value={formData.full_name}
          onChange={(e) =>
            setFormData({ ...formData, full_name: e.target.value })
          }
        />
        {errors.full_name && <p className="error-text">{errors.full_name}</p>}
      </div>

      {/* EMAIL */}
      <div className="form-group">
        <label>Email</label>
        <input
          placeholder="Vui lòng nhập email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      {/* PASSWORD */}
      <div className="form-group">
        <label>{isUpdateMode ? "Password mới" : "Password"}</label>
        <input
          type="password"
          placeholder={isUpdateMode ? "Để trống nếu không đổi mật khẩu" : "Vui lòng nhập mật khẩu"}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
      </div>

      {/* ROLE */}
      <div className="form-group">
        <label>Vai trò</label>
        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
        >
          <option value="">Vui lòng chọn vai trò</option>
          <option value="1">Admin</option>
          <option value="0">User</option>
        </select>
      </div>

      {/* ACTIVE */}
      <div className="form-group">
        <label>Trạng thái</label>
        <select
          value={formData.active}
          onChange={(e) =>
            setFormData({ ...formData, active: e.target.value })
          }
        >
          <option value="">Vui lòng chọn trạng thái</option>
          <option value="1">Hoạt động</option>
          <option value="0">Khóa</option>
        </select>
        {errors.active && <p className="error-text">{errors.active}</p>}
      </div>

      <button type="submit" className="btn-save">
        {isUpdateMode ? "Cập nhật user" : "Tạo tài khoản"}
      </button>

    </form>
  );
};

export default AdminUserForm;