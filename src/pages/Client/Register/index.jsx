
import './style.css';

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Đăng Ký Tài Khoản</h2>
        <p className="register-subtitle">Gia nhập TechStore để nhận nhiều ưu đãi Gaming Gear</p>
        
        <form className="register-form">
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" placeholder="Nhập họ tên của bạn..." />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="btn-register">Đăng Ký</button>
        </form>

        <div className="register-footer">
          <span>Đã có tài khoản? </span>
          <a href="/login">Đăng nhập ngay</a>
        </div>
      </div>
    </div>
  );
};

export default Register;