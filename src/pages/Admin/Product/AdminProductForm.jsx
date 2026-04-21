import React, { useState, useEffect } from "react";
import { getCategories } from "../../../api/categoryApi";

const AdminProductForm = ({ onSubmit, dataEdit }) => {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "",
    image: "",
    description: "", // THÊM MỚI
    status: "1"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCate();
  }, []);

  useEffect(() => {
    if (dataEdit) {
      setFormData({
        name: dataEdit.name || "",
        categoryId: dataEdit.category_id || "",
        price: dataEdit.price || "",
        quantity: dataEdit.quantity ?? 0,
        image: dataEdit.image || "",
        description: dataEdit.description || "", // THÊM MỚI
        status: dataEdit.status ?? "1"
      });
    }
  }, [dataEdit]);

  const uploadToCloudinary = async (fileToUpload) => {
    const formDataCloud = new FormData();
    formDataCloud.append("file", fileToUpload);
    formDataCloud.append("upload_preset", "mon_fw2"); 
    
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drn8e4mtb/image/upload", 
        { method: "POST", body: formDataCloud }
      );
      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error("Lỗi upload Cloudinary:", error);
      return null;
    }
  };

  const validate = () => {
    let err = {};
    if (!formData.name.trim()) err.name = "Vui lòng nhập tên sản phẩm";
    if (!formData.categoryId) err.categoryId = "Vui lòng chọn danh mục";
    if (!formData.price || formData.price <= 0) err.price = "Vui lòng nhập giá hợp lệ";
    if (formData.quantity === "" || formData.quantity < 0) err.quantity = "Vui lòng nhập số lượng hợp lệ";
    if (!dataEdit && !file) err.image = "Vui lòng chọn ảnh";
    if (dataEdit && !formData.image && !file) err.image = "Sản phẩm phải có ảnh";
    if (!formData.description || !formData.description.trim()) {
      err.description = "Vui lòng nhập mô tả sản phẩm";
    } else if (formData.description.trim().length < 10) {
      err.description = "Mô tả sản phẩm phải có ít nhất 10 ký tự";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    let finalImageUrl = formData.image;

    if (file) {
      const uploadedUrl = await uploadToCloudinary(file);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      } else {
        alert("Upload ảnh thất bại!");
        setLoading(false);
        return;
      }
    }

    onSubmit({
      name: formData.name,
      description: formData.description, // GỬI MÔ TẢ ĐI
      price: Number(formData.price),
      image: finalImageUrl,
      quantity: Number(formData.quantity),
      category_id: Number(formData.categoryId),
      status: formData.status
    });
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {/* IMAGE */}
      <div className="form-group">
        <label>Ảnh sản phẩm</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        {errors.image && <small className="error" style={{color: 'red'}}>{errors.image}</small>}
        <div style={{ marginTop: "10px" }}>
          {file ? (
            <img src={URL.createObjectURL(file)} width={120} alt="Preview" />
          ) : formData.image ? (
            <img src={formData.image} width={120} alt="Current" />
          ) : null}
        </div>
      </div>

      {/* NAME */}
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          placeholder="Nhập tên sản phẩm"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      {/* DESCRIPTION - Ô NHẬP MỚI */}
      <div className="form-group">
        <label>Mô tả sản phẩm</label>
        <textarea
          placeholder="Nhập mô tả chi tiết sản phẩm..."
          rows="5"
          style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '4px', 
            border: errors.description ? '1px solid red' : '1px solid #ccc' // Đổi màu viền nếu có lỗi
          }}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {/* Hiển thị dòng thông báo lỗi màu đỏ */}
        {errors.description && <small className="error" style={{ color: 'red' }}>{errors.description}</small>}
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Danh mục</label>
        <select value={formData.categoryId} onChange={(e) => handleChange("categoryId", e.target.value)}>
          <option value="">Chọn danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {errors.categoryId && <small className="error">{errors.categoryId}</small>}
      </div>

      {/* PRICE & QUANTITY */}
      <div className="row" style={{ display: 'flex', gap: '20px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Giá</label>
          <input type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
          {errors.price && <small className="error">{errors.price}</small>}
        </div>

        <div className="form-group" style={{ flex: 1 }}>
          <label>Số lượng</label>
          <input type="number" value={formData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
          {errors.quantity && <small className="error">{errors.quantity}</small>}
        </div>
      </div>

      {/* STATUS */}
      <div className="form-group">
        <label>Trạng thái</label>
        <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)}>
          <option value="1">Còn hàng</option>
          <option value="0">Hết hàng</option>
        </select>
      </div>

      <button type="submit" className="btn-submit" disabled={loading} style={{ marginTop: '20px' }}>
        {loading ? "Đang xử lý..." : (dataEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm")}
      </button>
    </form>
  );
};

export default AdminProductForm;