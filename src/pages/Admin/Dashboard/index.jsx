import React, { useEffect, useMemo, useState } from "react";
import "./style.css";

import Sidebar from "../../../components/Admin/Sidebar";
import Header from "../../../components/Admin/header";
import Footer from "../../../components/Admin/footer";

import { getOrders } from "../../../api/orderApi";
import { getProducts } from "../../../api/productApi";
import { getUsers } from "../../../api/userApi";

const formatMoney = (value) =>
  Number(value || 0).toLocaleString("vi-VN") + "đ";

const getListData = (res) => {
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data)) return res.data;
  return [];
};

const DashboardAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [orderRes, productRes, userRes] = await Promise.all([
          getOrders(),
          getProducts(),
          getUsers()
        ]);

        setOrders(getListData(orderRes));
        setProducts(getListData(productRes));
        setUsers(getListData(userRes));
      } catch (err) {
        console.log(err);
        setError("Không thể tải dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const pendingOrders = orders.filter(
      (o) => String(o.status || "").trim().toLowerCase() === "pending"
    ).length;

    const monthlyRevenue = orders
      .filter((o) => {
        const createdDate = new Date(o.createdAt || o.created_at);
        return (
          !Number.isNaN(createdDate.getTime()) &&
          createdDate.getMonth() === now.getMonth() &&
          createdDate.getFullYear() === now.getFullYear()
        );
      })
      .reduce(
        (sum, o) => sum + Number(o.total_price || o.final_price || 0),
        0
      );

    const totalStock = products.reduce(
      (sum, p) => sum + Number(p.quantity || 0),
      0
    );

    const activeUsers = users.filter((u) => String(u.active) === "1").length;

    return {
      monthlyRevenue,
      pendingOrders,
      totalStock,
      activeUsers
    };
  }, [orders, products, users]);

  const topStockProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.quantity || 0) - Number(a.quantity || 0))
      .slice(0, 6);
  }, [products]);

  const latestOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.created_at).getTime() -
          new Date(a.createdAt || a.created_at).getTime()
      )
      .slice(0, 6);
  }, [orders]);

  const maxQty = Math.max(
    ...topStockProducts.map((item) => Number(item.quantity || 0)),
    1
  );

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="content-body">
          <div className="dashboard-intro">
            <h1>Bảng điều khiển</h1>
            <p>Thống kê vận hành realtime từ đơn hàng, sản phẩm và người dùng</p>
          </div>

          {loading ? (
            <div className="state-box">Đang tải dữ liệu...</div>
          ) : error ? (
            <div className="state-box error">{error}</div>
          ) : (
            <>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Doanh thu tháng</h3>
                  <div className="value">{formatMoney(stats.monthlyRevenue)}</div>
                  <span className="trend positive">Tính theo đơn đã tạo tháng này</span>
                </div>

                <div className="stat-card">
                  <h3>Đơn hàng chờ xử lý</h3>
                  <div className="value">{stats.pendingOrders}</div>
                  <span className="trend">Trạng thái pending</span>
                </div>

                <div className="stat-card">
                  <h3>Tổng tồn kho</h3>
                  <div className="value">{stats.totalStock}</div>
                  <span className="trend">Tổng quantity của toàn bộ sản phẩm</span>
                </div>

                <div className="stat-card">
                  <h3>Tài khoản hoạt động</h3>
                  <div className="value">{stats.activeUsers}</div>
                  <span className="trend">active = 1</span>
                </div>
              </div>

              <div className="dashboard-panels">
                <section className="data-section chart-section">
                  <div className="section-header">
                    <h2>Top tồn kho sản phẩm</h2>
                  </div>

                  {topStockProducts.length === 0 ? (
                    <div className="state-box small">Chưa có dữ liệu sản phẩm</div>
                  ) : (
                    <div className="stock-chart">
                      {topStockProducts.map((item) => {
                        const qty = Number(item.quantity || 0);
                        const widthPercent = Math.max(
                          8,
                          Math.round((qty / maxQty) * 100)
                        );

                        return (
                          <div className="bar-row" key={item.id}>
                            <div className="bar-label" title={item.name}>
                              {item.name}
                            </div>
                            <div className="bar-track">
                              <div
                                className="bar-fill"
                                style={{ width: `${widthPercent}%` }}
                              ></div>
                            </div>
                            <div className="bar-value">{qty}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                <section className="data-section">
                  <div className="section-header">
                    <h2>Đơn hàng mới nhất</h2>
                  </div>

                  <table className="tech-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Trạng thái</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestOrders.length > 0 ? (
                        latestOrders.map((order) => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.full_name || order.User?.full_name || "Khách"}</td>
                            <td>
                              <span className="badge warning">
                                {order.status || "Không rõ"}
                              </span>
                            </td>
                            <td>
                              <strong>
                                {formatMoney(order.total_price || order.final_price || 0)}
                              </strong>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                            Chưa có đơn hàng
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </section>
              </div>
            </>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default DashboardAdmin;