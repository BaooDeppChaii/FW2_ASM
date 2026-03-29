import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; 

const Success = () => {

  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("order"));

  if (!order) return <p>Không có đơn hàng</p>;

  return (
    <div className="success-page">

      <div className="success-card">

        <h2>🎉 Đặt hàng thành công</h2>

        <p>Họ và tên: {order.customer.name}</p>
        <p>SĐT: {order.customer.phone}</p>
        <p>Địa chỉ: {order.customer.address}</p>

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