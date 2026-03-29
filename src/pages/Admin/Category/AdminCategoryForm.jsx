import React, { useState, useEffect } from "react";

const AdminCategoryForm = ({ onSubmit, dataEdit }) => {

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: "active"
  });

  const [errors, setErrors] = useState({});


  // nếu là update → đổ dữ liệu cũ vào form
  useEffect(() => {

    if (dataEdit) {

      setFormData({
        name: dataEdit.name || "",
        slug: dataEdit.slug || "",
        status: dataEdit.status || "active"
      });

    }

  }, [dataEdit]);


  // tạo slug tự động từ name
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


  // nhập name → slug tự tạo
  const handleChangeName = (e) => {

    const value = e.target.value;

    setFormData({

      ...formData,

      name: value,

      slug: createSlug(value)

    });

  };


  // validate
  const validate = () => {

    let newErrors = {};


    if (!formData.name.trim()) {

      newErrors.name = "Không được để trống";

    }

    else if (formData.name.length < 3) {

      newErrors.name = "Ít nhất 3 ký tự";

    }


    if (!formData.slug.trim()) {

      newErrors.slug = "Slug không hợp lệ";

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

    <form
      onSubmit={handleSubmitLocal}
      className="admin-form"
    >

      <div className="form-group">

        <label>
          Tên danh mục
        </label>


        <input

          type="text"

          value={formData.name}

          onChange={handleChangeName}

          className={errors.name ? "input-error" : ""}

        />


        {errors.name && (

          <p className="error-text">

            {errors.name}

          </p>

        )}

      </div>


      <div className="form-group">

        <label>
          Slug
        </label>


        <input

          type="text"

          value={formData.slug}

          onChange={(e) =>

            setFormData({

              ...formData,

              slug: e.target.value

            })

          }

        />


        {errors.slug && (

          <p className="error-text">

            {errors.slug}

          </p>

        )}

      </div>


      <div className="form-group">

        <label>
          Trạng thái
        </label>


        <select

          value={formData.status}

          onChange={(e) =>

            setFormData({

              ...formData,

              status: e.target.value

            })

          }

        >

          <option value="active">
            Đang hiện
          </option>


          <option value="hidden">
            Đang ẩn
          </option>

        </select>

      </div>


      <button
        type="submit"
        className="btn-save"
      >

        {dataEdit
          ? "Cập nhật danh mục"
          : "Thêm danh mục"
        }

      </button>

    </form>

  );

};

export default AdminCategoryForm;