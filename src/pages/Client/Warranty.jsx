import React from "react";
import "./style.css";

const Warranty = () => {
  return (
    <div>
      <div className="page-hero warranty">
        <h1>🛡️ Hàng chính hãng</h1>
        <p>Cam kết 100% chất lượng</p>
      </div>

      <div className="container py-5">
        <div className="row g-4">

          <div className="col-md-4">
            <div className="info-box glow">
              <h4>✅ Chính hãng</h4>
              <p>Nguồn gốc rõ ràng</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-box glow">
              <h4>🔁 Đổi trả</h4>
              <p>7 ngày miễn phí</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="info-box glow">
              <h4>🔧 Bảo hành</h4>
              <p>6-24 tháng</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Warranty;