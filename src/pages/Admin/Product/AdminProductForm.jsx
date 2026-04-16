import React, { useState, useEffect } from "react";
import { getCategories } from "../../../api/categoryApi";

const AdminProductForm = ({ onSubmit, dataEdit }) => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    quantity: "",
    image: "",
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
        status: dataEdit.status ?? "1"
      });
    }
  }, [dataEdit]);

  const validate = () => {
    let err = {};

    if (!formData.name.trim()) err.name = "Vui lòng nhập tên sản phẩm";
    if (!formData.categoryId) err.categoryId = "Vui lòng chọn danh mục";
    if (!formData.price || formData.price <= 0) err.price = "Vui lòng nhập giá hợp lệ";
    if (formData.quantity === "" || formData.quantity < 0)
      err.quantity = "Vui lòng nhập số lượng hợp lệ";
    if (!formData.image.trim()) err.image = "Vui lòng nhập link ảnh";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name,
      description: "",
      price: Number(formData.price),
      image: formData.image,
      quantity: Number(formData.quantity),
      category_id: Number(formData.categoryId),
      status: formData.status
    });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">

      {/* IMAGE */}
      <div className="form-group">
        <label>Ảnh</label>
        <input
          placeholder="Vui lòng nhập link ảnh"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />
        {errors.image && <small className="error">{errors.image}</small>}

        {formData.image && (
          <img src={formData.image} width={80} alt="" />
        )}
      </div>

      {/* NAME */}
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          placeholder="Vui lòng nhập tên sản phẩm"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Danh mục</label>
        <select
          value={formData.categoryId}
          onChange={(e) => handleChange("categoryId", e.target.value)}
        >
          <option value="">Vui lòng chọn danh mục</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <small className="error">{errors.categoryId}</small>}
      </div>

      {/* PRICE */}
      <div className="form-group">
        <label>Giá</label>
        <input
          type="number"
          placeholder="Vui lòng nhập giá"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        {errors.price && <small className="error">{errors.price}</small>}
      </div>

      {/* QUANTITY */}
      <div className="form-group">
        <label>Số lượng</label>
        <input
          type="number"
          placeholder="Vui lòng nhập số lượng"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
        {errors.quantity && <small className="error">{errors.quantity}</small>}
      </div>

      {/* STATUS */}
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

      <button type="submit" className="btn-submit">
  {dataEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
</button>
    </form>
  );
};

export default AdminProductForm;