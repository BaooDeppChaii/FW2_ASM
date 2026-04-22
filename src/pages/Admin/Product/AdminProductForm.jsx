import React, { useState, useEffect } from "react";
import { getCategories } from "../../../api/categoryApi";

const AdminProductForm = ({ onSubmit, dataEdit }) => {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "",
    image: "",
    description: "", 
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

  useEffect(() => {
    if (!file) {
      setPreviewFileUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewFileUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

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
    const quantityNumber = Number(formData.quantity);
    if (
      formData.quantity === "" ||
      !Number.isInteger(quantityNumber) ||
      quantityNumber < 0
    ) {
      err.quantity = "Vui lòng nhập số lượng hợp lệ";
    }
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

    const normalizedQuantity = Number.parseInt(formData.quantity, 10);

    onSubmit({
      name: formData.name,
      description: formData.description, // GỬI MÔ TẢ ĐI
      price: Number(formData.price),
      image: finalImageUrl,
      quantity: normalizedQuantity,
      category_id: Number(formData.categoryId),
      status: formData.status
    });
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const previewImage = previewFileUrl || formData.image;
  const previewQuantity = Number(formData.quantity || 0);
  const previewPrice = Number(formData.price || 0);
  const isInStock = formData.status === "1" && previewQuantity > 0;

  return (
    <div className={`product-editor ${dataEdit ? "product-editor--split" : ""}`}>
      <form onSubmit={handleSubmit} className="admin-form product-form-card">
        <div className="product-form-head">
          <h3>{dataEdit ? "Chỉnh sửa sản phẩm" : "Thông tin sản phẩm mới"}</h3>
          <p>Điền đầy đủ thông tin để đồng bộ dữ liệu lên hệ thống.</p>
        </div>

        <div className="form-group">
          <label>Ảnh sản phẩm</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {errors.image && <small className="error">{errors.image}</small>}
          {previewImage && (
            <img src={previewImage} className="preview-img" alt="Preview" />
          )}
        </div>

        <div className="form-group">
          <label>Tên sản phẩm</label>
          <input
            placeholder="Nhập tên sản phẩm"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Mô tả sản phẩm</label>
          <textarea
            placeholder="Nhập mô tả chi tiết sản phẩm..."
            rows="5"
            className={errors.description ? "text-area-input input-error" : "text-area-input"}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {errors.description && <small className="error">{errors.description}</small>}
        </div>

        <div className="form-group">
          <label>Danh mục</label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <small className="error">{errors.categoryId}</small>}
        </div>

        <div className="row product-row">
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            {errors.price && <small className="error">{errors.price}</small>}
          </div>

          <div className="form-group">
            <label>Số lượng</label>
            <input
              type="number"
              min="0"
              step="1"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />
            {errors.quantity && <small className="error">{errors.quantity}</small>}
          </div>
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option value="1">Còn hàng</option>
            <option value="0">Hết hàng</option>
          </select>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Đang xử lý..." : dataEdit ? "Lưu thay đổi" : "Thêm sản phẩm"}
        </button>
      </form>

      {dataEdit && (
        <aside className="product-preview-card">
          <h4>Xem trước sản phẩm</h4>
          <div className="preview-cover">
            {previewImage ? (
              <img src={previewImage} alt={formData.name || "product"} />
            ) : (
              <div className="preview-cover-empty">Chưa có ảnh</div>
            )}
          </div>

          <div className="preview-body">
            <h5>{formData.name || "Tên sản phẩm"}</h5>
            <p>{formData.description || "Mô tả sản phẩm sẽ hiển thị ở đây."}</p>
            <div className="preview-metrics">
              <span>{previewPrice.toLocaleString()}đ</span>
              <span>Kho: {Number.isFinite(previewQuantity) ? previewQuantity : 0}</span>
            </div>
            <span className={`preview-status ${isInStock ? "in-stock" : "out-stock"}`}>
              {isInStock ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>
        </aside>
      )}
    </div>
  );
};

export default AdminProductForm;