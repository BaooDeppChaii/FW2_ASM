import React, { useState, useEffect } from "react";

const AdminCategoryForm = ({ onSubmit, dataEdit }) => {

  const [formData, setFormData] = useState({
    name: "",
    status: "1"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataEdit) {
      setFormData({
        name: dataEdit.name || "",
        status: dataEdit.status ?? "1"
      });
    }
  }, [dataEdit]);

  const createSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/([^0-9a-z-\s])/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }; 

  const handleChangeName = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    });
  };

  const validate = () => {
    let err = {};

    if (!formData.name.trim()) {
      err.name = "Không được để trống";
    }

    setErrors(err); 
    return Object.keys(err).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;  

    onSubmit({
      ...formData,
      slug: createSlug(formData.name) // Tạo slug từ tên danh mục
    });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form category-form-card">
      <div className="category-form-head">
        <h3>{dataEdit ? "Cập nhật danh mục" : "Tạo danh mục mới"}</h3>
        <p>Danh mục được dùng để nhóm sản phẩm và hiển thị trên menu cửa hàng.</p>
      </div>

      <div className="form-group">
        <label>Tên danh mục</label>

        <input
          value={formData.name}
          onChange={handleChangeName}
          placeholder="Nhập tên danh mục"
        />

        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Trạng thái</label>

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        >
          <option value="1">Đang hiện</option>
          <option value="0">Đang ẩn</option>
        </select>
      </div>

      <button type="submit" className="btn-save">
        {dataEdit ? "Lưu thay đổi" : "Thêm danh mục"}
      </button>
    </form>
  );
};

export default AdminCategoryForm;