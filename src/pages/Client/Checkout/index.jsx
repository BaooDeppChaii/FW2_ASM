import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const Checkout = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const { cartItems = [], total = 0 } = state || {};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [errors, setErrors] = useState({});

  // validate giống register
  const validate = () => {

    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    else if (!/^[0-9]{9,11}$/.test(form.phone)) {
      newErrors.phone = "SĐT không hợp lệ";
    }

    if (!form.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    const order = {
      customer: form,
      cartItems,
      total,
      time: new Date().toLocaleString()
    };

    localStorage.setItem("order", JSON.stringify(order));

    localStorage.removeItem("cart");

    navigate("/success");

  };


  return (

    <div className="checkout-page">

      <div className="checkout-container">

        <h2 className="checkout-title">Thanh toán</h2>

        <div className="checkout-content">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="checkout-form">

            <h3>Thông tin khách hàng</h3>


            {/* name */}
            <input
              placeholder="Họ tên"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            {errors.name && (
              <span className="error-text">
                {errors.name}
              </span>
            )}


            {/* phone */}
            <input
              placeholder="Số điện thoại"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            {errors.phone && (
              <span className="error-text">
                {errors.phone}
              </span>
            )}


            {/* address */}
            <textarea
              placeholder="Địa chỉ"
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            {errors.address && (
              <span className="error-text">
                {errors.address}
              </span>
            )}


            <button
              type="submit"
              className="btn-checkout"
            >
              Xác nhận đặt hàng
            </button>

          </form>



          {/* ORDER */}
          <div className="checkout-summary">

            <h3>Đơn hàng</h3>

            {cartItems.map(item => (

              <div
                key={item.id}
                className="checkout-item"
              >

                <span>{item.name}</span>

                <span>
                  {item.quantity} x {item.price.toLocaleString()}đ
                </span>

              </div>

            ))}

            <hr />

            <h2 className="total-price">
              {total.toLocaleString()}đ
            </h2>

          </div>


        </div>

      </div>

    </div>

  );

};

export default Checkout;