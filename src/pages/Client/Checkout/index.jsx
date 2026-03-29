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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert("Nhập đủ thông tin!");
      return;
    }

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

            <input
              placeholder="Họ tên"
              onChange={(e) => setForm({...form, name: e.target.value})}
            />

            <input
              placeholder="Số điện thoại"
              onChange={(e) => setForm({...form, phone: e.target.value})}
            />

            <textarea
              placeholder="Địa chỉ"
              onChange={(e) => setForm({...form, address: e.target.value})}
            />

            <button type="submit" className="btn-checkout">
              Xác nhận đặt hàng
            </button>

          </form>

          {/* ORDER */}
          <div className="checkout-summary">

            <h3>Đơn hàng</h3>

            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <span>{item.name}</span>
                <span>{item.quantity} x {item.price.toLocaleString()}đ</span>
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