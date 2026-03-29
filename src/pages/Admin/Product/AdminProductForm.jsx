import React, { useState, useEffect } from "react";

const AdminProductForm = ({ onSubmit, dataEdit }) => {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    status: "active"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dataEdit) {
      setFormData({
        name: dataEdit.name || "",
        category: dataEdit.category || "",
        price: dataEdit.price || "",
        stock: dataEdit.stock || "",
        image: dataEdit.image || "",
        status: dataEdit.status || "active"
      });
    }
  }, [dataEdit]);

  // validate
  const validate = () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Không được để trống";
    }

    if (!formData.category) {
      newErrors.category = "Chọn danh mục";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Giá không hợp lệ";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Kho không hợp lệ";
    }

    if (!formData.image.trim()) {
      newErrors.image = "Nhập link ảnh";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitLocal = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmitLocal} className="admin-form">

      {/* ẢNH */}
      <div className="form-group">
        <label>Ảnh (URL)</label>

        <input
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="preview-img"
          />
        )}

        {errors.image && <p className="error-text">{errors.image}</p>}
      </div>

      {/* TÊN */}
      <div className="form-group">
        <label>Tên sản phẩm</label>

        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        {errors.name && <p className="error-text">{errors.name}</p>}
      </div>

      {/* DANH MỤC */}
      <div className="form-group">
        <label>Danh mục</label>

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">-- Chọn danh mục --</option>
          <option value="Smartphone">Smartphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Phụ kiện">Phụ kiện</option>
        </select>

        {errors.category && <p className="error-text">{errors.category}</p>}
      </div>

      {/* GIÁ */}
      <div className="form-group">
        <label>Giá bán</label>

        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />

        {errors.price && <p className="error-text">{errors.price}</p>}
      </div>

      {/* KHO */}
      <div className="form-group">
        <label>Số lượng kho</label>

        <input
          type="number"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: e.target.value })
          }
        />

        {errors.stock && <p className="error-text">{errors.stock}</p>}
      </div>

      {/* TRẠNG THÁI */}
      <div className="form-group">
        <label>Trạng thái</label>

        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        >
          <option value="active">Còn hàng</option>
          <option value="hidden">Hết hàng</option>
        </select>
      </div>

      <button type="submit" className="btn-save">
        {dataEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      </button>

    </form>
  );
};

export default AdminProductForm;