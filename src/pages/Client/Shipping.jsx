import React from "react";

const Shipping = () => {
  return (
    <div>
      {/* HERO */}
      <div className="page-hero shipping">
        <h1>🚚 Giao hàng nhanh</h1>
        <p>Nhanh chóng - An toàn - Toàn quốc</p>
      </div>

      <div className="container py-5">

        <div className="row g-4">

          <div className="col-md-4">
            <div className="info-box">
              <h4>⚡ Siêu tốc</h4>
              <p>Giao nội thành chỉ từ 24h</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-box">
              <h4>🌍 Toàn quốc</h4>
              <p>2-4 ngày trên toàn quốc</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-box">
              <h4>💰 Miễn phí</h4>
              <p>Đơn từ 500.000đ</p>
            </div>
          </div>

        </div>

        <div className="mt-5">
          <h5>📦 Quy trình giao hàng</h5>
          <ul>
            <li>Xác nhận đơn hàng</li>
            <li>Đóng gói sản phẩm</li>
            <li>Giao cho đơn vị vận chuyển</li>
            <li>Giao đến tay khách hàng</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Shipping;