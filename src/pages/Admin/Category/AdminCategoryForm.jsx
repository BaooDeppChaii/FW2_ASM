import React, { useState, useEffect } from "react";

const AdminCategoryForm = ({ onSubmit, dataEdit }) => {
  const [formData, setFormData] = useState({ name: "", slug: "", status: "active" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataEdit) {
      setFormData(dataEdit);
    } else {
      setFormData({ name: "", slug: "", status: "active" });
    }
    setErrors({});
  }, [dataEdit]);

  // Hàm tạo slug tự động từ tên
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/(\s+)/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChangeName = (e) => {
    const nameValue = e.target.value;
    setFormData({
      ...formData,
      name: nameValue,
      slug: createSlug(nameValue), // Tự động tạo slug khi gõ tên
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Tên danh mục không được để trống";
    else if (formData.name.length < 3) newErrors.name = "Tên phải ít nhất 3 ký tự";
    
    if (!formData.slug.trim()) newErrors.slug = "Slug không được để trống";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleLocalSubmit} className="admin-form">
      <div className="form-group">
        <label>Tên danh mục</label>
        <input
          type="text"
          className={errors.name ? "input-error" : ""}
          value={formData.name}
          onChange={handleChangeName}
          placeholder="Ví dụ: Điện thoại iPhone"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Slug (Đường dẫn)</label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
        {errors.slug && <span className="error-text">{errors.slug}</span>}
      </div>

      <div className="form-group">
        <label>Trạng thái</label>
        <select 
          value={formData.status} 
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="active">Đang hiện</option>
          <option value="hidden">Đang ẩn</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-save">
          {dataEdit ? "Cập nhật danh mục" : "Thêm mới danh mục"}
        </button>
      </div>
    </form>
  );
};

export default AdminCategoryForm;