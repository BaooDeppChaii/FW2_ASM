
import './style.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Đăng Nhập</h2>
        <p className="login-subtitle">Chào mừng bạn quay lại với TechStore</p>
        
        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="example@gmail.com" required />
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label>Mật khẩu</label>
              <a href="/forgot-password" className="forgot-link">Quên mật khẩu?</a>
            </div>
            <input type="password" placeholder="••••••••" required />
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
          </div>

          <button type="submit" className="btn-login">Đăng Nhập</button>
        </form>

        <div className="login-footer">
          <span>Chưa có tài khoản? </span>
          <a href="/register">Đăng ký ngay</a>
        </div>
      </div>
    </div>
  );
};

export default Login;