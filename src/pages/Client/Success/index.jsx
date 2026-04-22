import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css"; 

const Success = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order || JSON.parse(localStorage.getItem("lastCheckout"));

  if (!order) return <p>Không có đơn hàng</p>;

  const orderCode = order?.checkoutResult?.order?.code || "ORD-NEW";

  return (
    <div className="success-page">

      <div className="success-card">

        <h2>Đặt hàng thành công</h2>

        <p>Mã đơn hàng: {orderCode}</p>
        <p>Thời gian: {order.time}</p>

        <p>Họ và tên: {order.customer.name}</p>
        <p>SĐT: {order.customer.phone}</p>
        <p>Địa chỉ: {order.customer.address}</p>
        {order.customer.note ? <p>Ghi chú: {order.customer.note}</p> : null}

        <p>Số sản phẩm: {order.cartItems.length}</p>

        <h3 className="success-total">
          Tổng: {order.total.toLocaleString()}đ
        </h3>

        <button onClick={() => navigate("/")}>
          Về trang chủ
        </button>

      </div>

    </div>
  );
};

export default Success;