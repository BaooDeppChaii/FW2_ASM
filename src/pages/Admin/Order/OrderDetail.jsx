import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getOrderById, updateOrderStatus } from "../../../api/orderApi";

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

  // 🔥 UPDATE STATUS
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

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body">
          <div className="data-section">

            <h2>Chi tiết đơn hàng #{order.id}</h2>

            {/* INFO ORDER */}
            <div className="order-box">
              <p><b>Khách hàng:</b> {order.User?.full_name}</p>
              <p><b>Email:</b> {order.User?.email}</p>

              <p>
                <b>Tổng tiền:</b>{" "}
                {Number(order.total_price).toLocaleString()}đ
              </p>

              {/* 🔥 STATUS EDIT */}
        <div className="mb-3">
  <label className="form-label fw-bold">Trạng thái</label>

  <select
    className="form-select w-50"
    value={order.status}
    onChange={(e) => handleChangeStatus(e.target.value)}
  >
    <option value="pending"> Chờ xử lý</option>
    <option value="confirmed"> Xác nhận</option>
    <option value="shipping"> Đang giao</option>
    <option value="completed">Hoàn thành</option>
  </select>
</div>

              <p><b>Ghi chú:</b> {order.note || "-"}</p>

            <p>
  <b>Ngày tạo:</b>{" "}
  {new Date(order.createdAt || order.created_at || Date.now())
    .toLocaleString("vi-VN")}
</p>
            </div>

            {/* ORDER DETAILS */}
            <h3 style={{ marginTop: "20px" }}>Sản phẩm trong đơn</h3>

            <table className="tech-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng</th>
                </tr>
              </thead>

              <tbody>
                {order.OrderDetails?.length > 0 ? (
                  order.OrderDetails.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>

                      <td>{item.Product?.name}</td>

                      <td>{item.quantity}</td>

                      <td>
                        {Number(item.price).toLocaleString()}đ
                      </td>

                      <td>
                        {Number(item.price * item.quantity).toLocaleString()}đ
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Không có sản phẩm</td>
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