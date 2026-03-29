import React, { useState, useEffect } from "react";

const AdminCategoryForm = ({ onSubmit, dataEdit }) => {
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [error, setError] = useState(""); // Lưu thông báo lỗi

  useEffect(() => {
    if (dataEdit) setFormData(dataEdit);
  }, [dataEdit]);

  const handleLocalSubmit = (e) => {
    e.preventDefault();
    // BẮT LỖI TẠI ĐÂY
    if (formData.name.trim().length < 3) {
      setError("Tên danh mục phải ít nhất 3 ký tự!");
      return;
    }
    setError(""); // Xóa lỗi nếu hợp lệ
    onSubmit(formData); // Gửi dữ liệu về file index.jsx
  };

  return (
    <form onSubmit={handleLocalSubmit}>
      <div className="form-group">
        <label>Tên danh mục</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      </div>
      <button type="submit" className="btn-save">Lưu lại</button>
    </form>
  );
};

export default AdminCategoryForm;