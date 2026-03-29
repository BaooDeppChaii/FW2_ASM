import React, { useState, useEffect } from "react";

const AdminUserForm = ({ onSubmit, dataEdit }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "active",
    avatar: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataEdit) {
      setFormData({
        name: dataEdit.name || "",
        email: dataEdit.email || "",
        role: dataEdit.role || "User",
        status: dataEdit.status || "active",
        avatar: dataEdit.avatar || ""
      });
    }
  }, [dataEdit]);

  const validate = () => {

    let newErrors = {};

    if (!formData.name) newErrors.name = "Nhập tên";
    if (!formData.email.includes("@")) newErrors.email = "Email sai";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitLocal = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmitLocal} className="admin-form">

      <div className="form-group">
        <label>Avatar (URL)</label>
        <input
          value={formData.avatar}
          onChange={(e) => setFormData({...formData, avatar: e.target.value})}
          placeholder="Nhập ảnh."
        />
        {formData.avatar && <img src={formData.avatar} className="preview-img" />}
      </div>

      <div className="form-group">
        <label>Tên</label>
        <input
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Nhập tên."
        />
        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Nhập email."
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Vai trò</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({...formData, role: e.target.value})}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="form-group">
        <label>Trạng thái</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
        >
          <option value="active">Hoạt động</option>
          <option value="banned">Khóa</option>
        </select>
      </div>

      <button type="submit" className="btn-save">
        {dataEdit ? "Cập nhật" : "Tạo tài khoản"}
      </button>

    </form>
  );
};

export default AdminUserForm;