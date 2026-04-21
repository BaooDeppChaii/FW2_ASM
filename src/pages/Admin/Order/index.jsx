import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";
import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getOrders } from "../../../api/orderApi";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 FIX STATUS 100% CHỐNG SAI DB
const getStatusBadge = (status) => {
  const cleanStatus = String(status || "")
    .trim()
    .toLowerCase();

  const map = {
    pending: { text: "Chờ xử lý", class: "st-warning" },
    confirmed: { text: "Xác nhận", class: "st-primary" },
    shipping: { text: "Đang giao", class: "st-info" },
    completed: { text: "Hoàn thành", class: "st-success" },
    cancelled: { text: "Đã hủy", class: "st-danger" },
  };

  const current = map[cleanStatus];

  return (
    <span className={`status-pill ${current?.class || "st-dark"}`}>
      {current?.text || status || "Không rõ"}
    </span>
  );
};

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body">
          <div className="data-section">

            <div className="section-header">
              <h2 className="title-page">Quản lý đơn hàng</h2>
              <p className="subtitle-page">
                Tổng đơn: {orders.length}
              </p>
            </div>

            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Ngày tạo</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th className="text-right">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td className="id-cell">#{order.id}</td>

                      <td className="user-name">
                        {order.full_name || order.User?.full_name || "Khách vãng lai"}
                      </td>

                      <td>
                        {order.phone || order.User?.phone || "-"}
                      </td>

                      <td className="date-cell">
                        {order.createdAt || order.created_at
                          ? new Date(order.createdAt || order.created_at).toLocaleDateString("vi-VN")
                          : "-"}
                      </td>

                      <td className="price-cell">
                        {Number(order.total_price || order.final_price || 0).toLocaleString()}đ
                      </td>

                      <td>{getStatusBadge(order.status)}</td>

                      <td className="text-right">
                        <button
                          className="btn-view"
                          onClick={() =>
                            navigate(`/admin/orders/${order.id}`)
                          }
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "30px" }}>
                      Không có đơn hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default OrderAdmin;