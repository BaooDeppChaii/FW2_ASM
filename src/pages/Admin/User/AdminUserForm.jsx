import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'; // Import toast để thông báo

const AdminUserForm = ({ onSubmit, dataEdit, mode = "create" }) => {
  const isUpdateMode = mode === "update";
  
  // Lấy ID của admin đang đăng nhập từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentAdminId = currentUser.id;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "0",
    active: "1"
  });

  const [errors, setErrors] = useState({});

  // Kiểm tra xem có đang sửa chính tài khoản của mình không
  const isEditingSelf = isUpdateMode && dataEdit && Number(dataEdit.id) === Number(currentAdminId);

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

    // logic chặn khóa chính mình
    if (isEditingSelf && formData.active === "0") {
      err.active = "Bạn không thể tự khóa tài khoản của chính mình!";
      toast.warning("Hành động bị chặn: Bạn không thể tự khóa chính mình.");
    }

    // logic chặn tự giáng chức chính mình (nếu cần)
    if (isEditingSelf && formData.role === "0") {
      err.role = "Bạn không thể tự gỡ quyền Admin của chính mình!";
      toast.warning("Hành động bị chặn: Bạn phải là Admin để quản lý hệ thống.");
    }

    if (!["0", "1"].includes(formData.active)) err.active = "Vui lòng chọn trạng thái";
    if (!["0", "1"].includes(formData.role)) err.role = "Vui lòng chọn vai trò";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      full_name: formData.full_name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role,
      active: formData.active
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form user-form-card">
      <div className="user-form-head">
        <h3>{isUpdateMode ? "Cập nhật tài khoản" : "Tạo tài khoản mới"}</h3>
        {isEditingSelf && (
          <p className="alert-info-mini">🌟 Bạn đang chỉnh sửa tài khoản cá nhân.</p>
        )}
      </div>

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

      <div className="user-row">
        <div className="form-group">
          <label>Vai trò</label>
          <select
            value={formData.role}
            disabled={isEditingSelf} // Khóa luôn không cho chọn nếu là chính mình
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="1">Admin</option>
            <option value="0">User</option>
          </select>
          {isEditingSelf && <small>Bạn không thể thay đổi vai trò của chính mình.</small>}
          {errors.role && <p className="error-text">{errors.role}</p>}
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={formData.active}
            disabled={isEditingSelf} // Khóa luôn không cho chọn nếu là chính mình
            onChange={(e) => setFormData({ ...formData, active: e.target.value })}
          >
            <option value="1">Hoạt động</option>
            <option value="0">Khóa</option>
          </select>
          {isEditingSelf && <small>Bạn không thể tự khóa tài khoản.</small>}
          {errors.active && <p className="error-text">{errors.active}</p>}
        </div>
      </div>

      <button type="submit" className="btn-save">
        {isUpdateMode ? "Lưu thay đổi" : "Tạo tài khoản"}
      </button>
    </form>
  );
};

export default AdminUserForm;