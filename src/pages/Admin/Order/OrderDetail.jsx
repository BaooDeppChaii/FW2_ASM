import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getOrderById, updateOrderStatus } from "../../../api/orderApi";

// Chỉ tiến không lùi
const STATUS_FLOW = {
  pending: { text: "Chờ xử lý", next: "confirmed" },
  confirmed: { text: "Xác nhận", next: "shipping" },
  shipping: { text: "Đang giao", next: "completed" },
  completed: { text: "Hoàn thành", next: null },
};

const OrderDetailAdmin = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const res = await getOrderById(id);
      setOrder(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Lấy trạng thái tiếp theo
  const getNextStatus = (currentStatus) => {
    const cleanStatus = String(currentStatus || "pending").trim().toLowerCase();
    return STATUS_FLOW[cleanStatus]?.next || null;
  };

  // 🔥 UPDATE STATUS - Chỉ tiến được
  const handleChangeStatus = async (newStatus) => {
    try {
      await updateOrderStatus(order.id, newStatus);

      // update UI realtime
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Không tìm thấy đơn hàng</p>;

  const nextStatus = getNextStatus(order.status);
  const canChangeStatus = nextStatus !== null;

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body">
          <div className="data-section">

            <div className="section-header" style={{marginBottom: "25px"}}>
              <h2 className="title-page">Chi tiết đơn hàng #{order.id}</h2>
              <p className="subtitle-page">Quản lý thông tin đơn hàng và trạng thái giao hàng</p>
            </div>

            {/* CUSTOMER & ORDER INFO */}
            <div className="order-info-grid">
              {/* LEFT: Customer Info */}
              <div className="order-card">
                <h3 style={{fontSize: "16px", fontWeight: "700", marginBottom: "15px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px"}}>Thông tin khách hàng</h3>
                <div className="info-row">
                  <span className="label">Họ tên:</span>
                  <span className="value">{order.full_name || order.User?.full_name || "-"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Email:</span>
                  <span className="value">{order.User?.email || order.email || "-"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Số điện thoại:</span>
                  <span className="value">{order.phone || order.User?.phone || "-"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Địa chỉ:</span>
                  <span className="value">{order.address || "-"}</span>
                </div>
              </div>

              {/* RIGHT: Order Details */}
              <div className="order-card">
                <h3 style={{fontSize: "16px", fontWeight: "700", marginBottom: "15px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px"}}>Chi tiết đơn hàng</h3>
                <div className="info-row">
                  <span className="label">Mã đơn:</span>
                  <span className="value" style={{fontWeight: "600", color: "#0f172a"}}>ORD-{order.id}</span>
                </div>
                <div className="info-row">
                  <span className="label">Ngày đặt:</span>
                  <span className="value">{new Date(order.createdAt || order.created_at || Date.now()).toLocaleString("vi-VN")}</span>
                </div>
                <div className="info-row">
                  <span className="label">Phương thức:</span>
                  <span className="value payment-badge">{order.payment_method === "cod" ? "Thanh toán khi nhận" : order.payment_method?.toUpperCase() || "COD"}</span>
                </div>
                <div className="info-row">
                  <span className="label">Tổng tiền:</span>
                  <span className="value" style={{fontSize: "16px", fontWeight: "700", color: "#059669"}}>{Number(order.total_price || order.final_price || 0).toLocaleString()}đ</span>
                </div>
              </div>
            </div>

            {/* STATUS & NOTE */}
            <div className="order-card" style={{marginTop: "20px"}}>
              <h3 style={{fontSize: "16px", fontWeight: "700", marginBottom: "15px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px"}}>Quản lý đơn hàng</h3>
              <div style={{display: "flex", gap: "30px", flexWrap: "wrap"}}>
                <div style={{flex: "1", minWidth: "250px"}}>
                  <label style={{display: "block", fontWeight: "600", marginBottom: "8px", fontSize: "13px", textTransform: "uppercase", color: "#555"}}>Trạng thái</label>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      backgroundColor: canChangeStatus ? "white" : "#f5f5f5",
                      cursor: canChangeStatus ? "pointer" : "not-allowed",
                      opacity: canChangeStatus ? 1 : 0.7
                    }}
                    value={order.status || "pending"}
                    onChange={(e) => handleChangeStatus(e.target.value)}
                    disabled={!canChangeStatus}
                  >
                    <option value={order.status || "pending"}>{STATUS_FLOW[order.status || "pending"]?.text || order.status}</option>
                    {nextStatus && <option value={nextStatus}>{STATUS_FLOW[nextStatus]?.text || nextStatus}</option>}
                  </select>
                  {!canChangeStatus && <p style={{fontSize: "12px", color: "#999", marginTop: "6px"}}>✓ Đơn hàng đã hoàn thành, không thể thay đổi</p>}

                </div>
                <div style={{flex: "1", minWidth: "250px"}}>
                  <label style={{display: "block", fontWeight: "600", marginBottom: "8px", fontSize: "13px", textTransform: "uppercase", color: "#555"}}>Ghi chú đơn hàng</label>
                  <p style={{margin: "0", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "6px", backgroundColor: "#f8f9fa", minHeight: "40px", display: "flex", alignItems: "center"}}>{order.note || "Không có ghi chú"}</p>
                </div>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <h3 style={{ marginTop: "25px", marginBottom: "15px", fontSize: "16px", fontWeight: "700", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px" }}>Sản phẩm trong đơn</h3>

            <table className="modern-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sản phẩm</th>
                  <th style={{textAlign: "right"}}>Số lượng</th>
                  <th style={{textAlign: "right"}}>Đơn giá</th>
                  <th style={{textAlign: "right"}}>Thành tiền</th>
                </tr>
              </thead>

              <tbody>
                {order.OrderDetails?.length > 0 ? (
                  order.OrderDetails.map((item) => (
                    <tr key={item.id}>
                      <td className="id-cell">#{item.id}</td>

                     <td className="user-name">
  {item.Product?.name || item.product?.name || "Không có tên"}
</td>

                      <td style={{textAlign: "right", fontWeight: "500"}}>{item.quantity}</td>

                      <td style={{textAlign: "right", fontWeight: "500"}}>
                        {Number(item.price || 0).toLocaleString()}đ
                      </td>

                      <td style={{textAlign: "right", fontWeight: "700", color: "#059669"}}>
                        {Number((item.price || 0) * (item.quantity || 1)).toLocaleString()}đ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{textAlign: "center", padding: "20px"}}>Không có sản phẩm</td>
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

export default OrderDetailAdmin;