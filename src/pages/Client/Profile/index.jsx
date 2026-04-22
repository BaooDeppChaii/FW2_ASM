import React, { useState, useEffect } from 'react';
import { getUserOrders, getOrderById, cancelOrder } from "../../../api/orderApi"; 
import { updateUser } from "../../../api/userApi"; 
import { toast } from 'react-toastify';
import "./style.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('info');
  
  // Quản lý Modal & Loading chi tiết
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const [passwords, setPasswords] = useState({ oldPass: '', newPass: '', confirmPass: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
          const res = await getUserOrders(storedUser.id);
          const allOrders = res?.data?.data || res?.data || res;
          if (Array.isArray(allOrders)) {
            setOrders(allOrders);
          }
        }
      } catch (error) {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        } else {
          toast.error(error?.response?.data?.message || "Không thể tải thông tin đơn hàng.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // HÀM MỞ CHI TIẾT ĐƠN HÀNG
  const handleOpenDetail = async (order) => {
    setSelectedOrder(order); // Hiện ID đơn hàng ngay lập tức
    setShowModal(true);
    setLoadingDetail(true);

    try {
      // Gọi API lấy đầy đủ sản phẩm dựa trên ID đơn hàng
      const res = await getOrderById(order.id);
      const data = res?.data?.data || res?.data || res;
      setSelectedOrder(data);
    } catch (error) {
      console.error("Lỗi lấy chi tiết sản phẩm:", error);
      toast.error("Không thể tải danh sách sản phẩm");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const normalizeOrderStatus = (status) => {
    const raw = String(status ?? '').trim().toLowerCase();

    if (raw === '0') return 'pending';
    if (raw === '1') return 'confirmed';
    if (raw === '2') return 'shipping';
    if (raw === '3') return 'completed';
    if (raw === 'cancelled' || raw === 'canceled') return 'canceled';

    return raw;
  };

  const canCancelOrder = (status) =>
    normalizeOrderStatus(status) === 'pending';

  const handleCancelOrder = async (order) => {
    if (!order?.id) return;
    if (!canCancelOrder(order.status)) {
      toast.info('Chỉ có thể hủy đơn đang chờ xử lý.');
      return;
    }

    const ok = window.confirm(`Bạn có chắc muốn hủy đơn #${order.id}?`);
    if (!ok) return;

    try {
      setCancellingOrderId(order.id);
      await cancelOrder(order.id);

      setOrders((prev) =>
        prev.map((item) =>
          item.id === order.id ? { ...item, status: 'cancelled' } : item
        )
      );

      setSelectedOrder((prev) =>
        prev && prev.id === order.id ? { ...prev, status: 'cancelled' } : prev
      );

      toast.success('Hủy đơn hàng thành công.');
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        return;
      }

      const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      toast.error(apiMessage || 'Không thể hủy đơn hàng.');
    } finally {
      setCancellingOrderId(null);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!passwords.oldPass) newErrors.oldPass = "Vui lòng nhập mật khẩu cũ.";
    if (!passwords.newPass) {
      newErrors.newPass = "Vui lòng nhập mật khẩu mới.";
    } else if (passwords.newPass.length < 6) {
      newErrors.newPass = "Mật khẩu mới phải từ 6 ký tự.";
    }
    if (passwords.confirmPass !== passwords.newPass) {
      newErrors.confirmPass = "Mật khẩu xác nhận không trùng khớp.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await updateUser(user.id, { password: passwords.newPass, oldPassword: passwords.oldPass });
      toast.success("Đổi mật khẩu thành công!");
      setPasswords({ oldPass: '', newPass: '', confirmPass: '' });
      setErrors({});
    } catch (error) {
      setErrors({ oldPass: error.response?.data?.message || "Mật khẩu cũ không đúng." });
    }
  };

  const renderStatus = (status) => {
    const s = normalizeOrderStatus(status);
    const map = {
      'pending': {t: 'Chờ xử lý', c: 'bg-warning text-dark'},
      'confirmed': {t: 'Đã xác nhận', c: 'bg-primary'},
      'shipping': {t: 'Đang giao', c: 'bg-info text-dark'},
      'completed': {t: 'Hoàn thành', c: 'bg-success'},
      'delivered': {t: 'Đã giao', c: 'bg-success'},
      'canceled': {t: 'Đã hủy', c: 'bg-danger'},
      'cancelled': {t: 'Đã hủy', c: 'bg-danger'}
    };
    const res = map[s] || {t: 'Đang xử lý', c: 'bg-info'};
    return <span className={`badge ${res.c} px-3`}>{res.t}</span>;
  };

  if (loading) return <div className="text-center py-5 text-white bg-dark">Đang tải...</div>;

  return (
    <div className="support-container">
      <div className="glow-1"></div>
      <div className="container content-wrapper py-5">
        <div className="text-center mb-5">
          <h1 className="logo-brand">TEACHSTORE</h1>
          <div className="mx-auto border-bottom-gradient"></div>
        </div>

        <div className="row">
          <div className="col-lg-3 mb-4">
            <div className="glass-card p-3 d-flex flex-column gap-2">
              <button className={`btn-tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                <i className="bi bi-person-circle me-2"></i> Thông tin cá nhân
              </button>
              <button className={`btn-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                <i className="bi bi-bag-check me-2"></i> Lịch sử đơn hàng
              </button>
              <button className={`btn-tab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>
                <i className="bi bi-shield-lock me-2"></i> Đổi mật khẩu
              </button>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="glass-card p-4 shadow-lg min-vh-50">
              
              {activeTab === 'info' && (
                <div className="fade-in">
                  <h4 className="text-white mb-4 border-bottom pb-2">Hồ sơ cá nhân</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="text-info small fw-bold text-uppercase">Họ và tên</label>
                      <div className="info-text">{user?.full_name}</div>
                    </div>
                    <div className="col-md-6">
                      <label className="text-info small fw-bold text-uppercase">Email</label>
                      <div className="info-text">{user?.email}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="fade-in">
                  <h4 className="text-white mb-4 border-bottom pb-2">Lịch sử đơn hàng</h4>
                  <div className="table-responsive">
                    <table className="table table-dark table-hover">
                      <thead>
                        <tr>
                          <th>Mã đơn</th>
                          <th>Ngày đặt</th>
                          <th>Tổng tiền</th>
                          <th>Trạng thái</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o.id}>
                            <td className="text-info fw-bold">#{o.id}</td>
                            <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString('vi-VN') : "---"}</td>
                            <td>{Number(o.total_price || o.final_price || 0).toLocaleString()}đ</td>
                            <td>{renderStatus(o.status)}</td>
                            <td className="d-flex gap-2">
                              <button 
                                className="btn btn-sm btn-outline-info"
                                onClick={() => handleOpenDetail(o)}
                              >
                                Chi tiết
                              </button>
                              {canCancelOrder(o.status) && (
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleCancelOrder(o)}
                                  disabled={cancellingOrderId === o.id}
                                >
                                  {cancellingOrderId === o.id ? 'Đang hủy...' : 'Hủy đơn'}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'password' && (
                <div className="fade-in">
                  <h4 className="text-white mb-4 border-bottom pb-2 text-center">ĐỔI MẬT KHẨU</h4>
                  <form onSubmit={handlePasswordChange} className="col-md-7 mx-auto mt-4" noValidate>
                    <div className="mb-3">
                      <label className="text-white-50 small mb-1">Mật khẩu cũ</label>
                      <input type="password" className={`form-control glass-input ${errors.oldPass ? 'is-invalid' : ''}`} value={passwords.oldPass} onChange={e => setPasswords({...passwords, oldPass: e.target.value})} />
                      {errors.oldPass && <small className="text-danger d-block mt-1">{errors.oldPass}</small>}
                    </div>
                    <div className="mb-3">
                      <label className="text-white-50 small mb-1">Mật khẩu mới</label>
                      <input type="password" className={`form-control glass-input ${errors.newPass ? 'is-invalid' : ''}`} value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} />
                      {errors.newPass && <small className="text-danger d-block mt-1">{errors.newPass}</small>}
                    </div>
                    <div className="mb-4">
                      <label className="text-white-50 small mb-1">Xác nhận mật khẩu</label>
                      <input type="password" className={`form-control glass-input ${errors.confirmPass ? 'is-invalid' : ''}`} value={passwords.confirmPass} onChange={e => setPasswords({...passwords, confirmPass: e.target.value})} />
                      {errors.confirmPass && <small className="text-danger d-block mt-1">{errors.confirmPass}</small>}
                    </div>
                    <button type="submit" className="btn btn-info w-100 fw-bold py-2 btn-glow-action">LƯU THAY ĐỔI</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CHI TIẾT SẢN PHẨM */}
      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.85)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content detail-modal shadow-glow">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title text-info fw-bold">CHI TIẾT ĐƠN HÀNG #{selectedOrder?.id}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body p-4">
                  {loadingDetail ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-info" role="status"></div>
                      <p className="mt-2 text-white-50">Đang lấy danh sách sản phẩm...</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-dark align-middle">
                        <thead className="text-white-50 small">
                          <tr>
                            <th>SẢN PHẨM</th>
                            <th className="text-center">SL</th>
                            <th className="text-end">ĐƠN GIÁ</th>
                            <th className="text-end">TỔNG</th>
                          </tr>
                        </thead>
                        <tbody>
  {(selectedOrder?.OrderDetails || []).length > 0 ? (
    selectedOrder.OrderDetails.map((item, idx) => (
      <tr key={idx}>
<td className="text-white">
          <div className="fw-bold">{item.Product?.name || "Sản phẩm không xác định"}</div>
          {item.Product?.image && (
             <small className="text-muted">Mã SP: {item.product_id}</small>
          )}
        </td>
        <td className="text-center">{item.quantity}</td>
        <td className="text-end text-info">{Number(item.price || 0).toLocaleString()}đ</td>
        <td className="text-end text-warning fw-bold">
          {( (item.quantity || 0) * (item.price || 0) ).toLocaleString()}đ
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="4" className="text-center py-4">Không có dữ liệu</td></tr>
  )}
</tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="modal-footer border-secondary">
                  {canCancelOrder(selectedOrder?.status) && (
                    <button
                      type="button"
                      className="btn btn-outline-danger px-4"
                      onClick={() => handleCancelOrder(selectedOrder)}
                      disabled={cancellingOrderId === selectedOrder?.id}
                    >
                      {cancellingOrderId === selectedOrder?.id ? 'Đang hủy...' : 'Hủy đơn hàng'}
                    </button>
                  )}
                  <button type="button" className="btn btn-secondary px-4" onClick={handleCloseModal}>Đóng</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Profile;