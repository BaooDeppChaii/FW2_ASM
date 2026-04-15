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

  // LOAD CATEGORY
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

  // FILL EDIT
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

    if (!formData.name.trim()) err.name = "Không được để trống";
    if (!formData.categoryId) err.categoryId = "Chọn danh mục";
    if (!formData.price || formData.price <= 0) err.price = "Giá không hợp lệ";
    if (formData.quantity === "" || formData.quantity < 0)
      err.quantity = "Kho không hợp lệ";
    if (!formData.image.trim()) err.image = "Nhập link ảnh";

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

  return (
    <form onSubmit={handleSubmit} className="admin-form">

      {/* IMAGE */}
      <div className="form-group">
        <label>Ảnh</label>
        <input
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />
        {formData.image && (
          <img src={formData.image} width={80} />
        )}
      </div>

      {/* NAME */}
      <div className="form-group">
        <label>Tên</label>
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
      </div>

      {/* CATEGORY */}
      <div className="form-group">
        <label>Danh mục</label>
        <select
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
        >
          <option value="">-- chọn --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div className="form-group">
        <label>Giá</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
      </div>

      {/* QUANTITY */}
      <div className="form-group">
        <label>Kho</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />
      </div>

      {/* STATUS */}
      <div className="form-group">
        <label>Trạng thái</label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
        >
          <option value="1">Còn hàng</option>
          <option value="0">Hết hàng</option>
        </select>
      </div>

      <button>
        {dataEdit ? "Cập nhật" : "Thêm"}
      </button>
    </form>
  );
};

export default AdminProductForm;