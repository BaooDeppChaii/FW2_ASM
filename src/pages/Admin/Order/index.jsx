import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import "./style.css";
import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getOrders, adminCancelOrder } from "../../../api/orderApi";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
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

  const handleAdminCancel = async (order) => {
    const ok = window.confirm(`Bạn có chắc muốn hủy đơn #${order.id}?`);
    if (!ok) return;

    try {
      setCancellingId(order.id);
      await adminCancelOrder(order.id);

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: 'cancelled' } : o
        )
      );

      toast.success('Hủy đơn hàng thành công.');
    } catch (error) {
      const apiMsg = error?.response?.data?.message || error?.message || 'Không thể hủy đơn.';
      toast.error(apiMsg);
    } finally {
      setCancellingId(null);
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
    canceled: { text: "Đã hủy", class: "st-danger" },
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
                          style={{ marginRight: '8px' }}
                        >
                          Xem chi tiết
                        </button>
                        {String(order.status || '').trim().toLowerCase() !== 'cancelled' && (
                          <button
                            className="btn-view"
                            onClick={() => handleAdminCancel(order)}
                            disabled={cancellingId === order.id}
                            style={{ background: '#dc3545' }}
                          >
                            {cancellingId === order.id ? 'Đang hủy...' : 'Hủy đơn'}
                          </button>
                        )}
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