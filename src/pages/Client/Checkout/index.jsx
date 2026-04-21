import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkoutCart, getMyCart } from "../../../api/cartApi";
import "./style.css";

const Checkout = () => {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(state?.cartItems || []);
  const [loadingCart, setLoadingCart] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment_method: "cod"
  });

  const [errors, setErrors] = useState({});

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    [cartItems]
  );

  const total = subtotal;

  useEffect(() => {
    const fetchCartIfNeeded = async () => {
      if (state?.cartItems?.length) {
        return;
      }

      try {
        setLoadingCart(true);
        const res = await getMyCart();
        const cart = res?.data?.data;
        const rawItems = cart?.CartItems || cart?.cartItems || cart?.items || [];

        const mappedItems = rawItems.map((item) => {
          const product = item.Product || item.product || {};
          return {
            id: item.id,
            name: product.name || item.product_name || item.name || "Sản phẩm",
            price: Number(item.price ?? product.price ?? 0),
            image: product.image || item.product_image || item.image || "https://via.placeholder.com/80",
            quantity: Number(item.quantity || 1)
          };
        });

        setCartItems(mappedItems);
      } catch (error) {
        if (error?.response?.status === 401) {
          alert("Bạn cần đăng nhập để thanh toán");
          navigate("/login");
          return;
        }
        alert(error?.response?.data?.message || "Không tải được giỏ hàng");
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCartIfNeeded();
  }, [navigate, state?.cartItems]);

  // validate giống register
  const validate = () => {

    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    }
    else if (!/^[0-9]{9,11}$/.test(form.phone)) {
      newErrors.phone = "SĐT không hợp lệ";
    }

    if (!form.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    }

    if (!form.payment_method) {
      newErrors.payment_method = "Vui lòng chọn phương thức thanh toán";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;
    if (cartItems.length === 0) {
      alert("Giỏ hàng đang trống");
      return;
    }

    try {
      setSubmitting(true);
      const res = await checkoutCart({
        full_name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        payment_method: form.payment_method,
        shipping_fee: 0,
        discount: 0,
      });

      const checkoutInfo = {
        customer: form,
        cartItems,
        total,
        time: new Date().toLocaleString(),
        checkoutResult: res?.data || null,
      };

      localStorage.setItem("lastCheckout", JSON.stringify(checkoutInfo));

      navigate("/success", {
        state: {
          order: checkoutInfo,
        },
      });
    } catch (error) {
      if (error?.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        navigate("/login");
        return;
      }

      alert(error?.response?.data?.message || "Thanh toán thất bại");
    } finally {
      setSubmitting(false);
    }
  };


  return (

    <div className="checkout-page">

      <div className="checkout-container">

        <h2 className="checkout-title">Thanh toán</h2>

        <div className="checkout-content">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="checkout-form">

            <h3>Thông tin khách hàng</h3>

            <div className="form-row">
              <div className="form-col">
                <label>Họ tên</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="Nhập họ tên"
                />
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>
              <div className="form-col">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <span className="error-text">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <label>Địa chỉ giao hàng</label>
                <textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  placeholder="Nhập địa chỉ nhận hàng"
                />
                {errors.address && (
                  <span className="error-text">{errors.address}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <label>Phương thức thanh toán</label>
                <select
                  value={form.payment_method}
                  onChange={(e) =>
                    setForm({ ...form, payment_method: e.target.value })
                  }
                >
                  <option value="cod">COD - Thanh toán khi nhận hàng</option>
                  <option value="momo">MoMo - Ví điện tử</option>
                  <option value="vnpay">VNPay - Cổng thanh toán</option>
                </select>
                {errors.payment_method && (
                  <span className="error-text">
                    {errors.payment_method}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn-checkout"
              disabled={submitting || loadingCart || cartItems.length === 0}
            >
              {submitting ? "Đang xử lý..." : "Xác nhận đặt hàng"}
            </button>

          </form>



          {/* ORDER SUMMARY */}
          <div className="checkout-summary">
            <div className="summary-header">
              <h3>Chi tiết đơn hàng</h3>
              <span className="item-count">({cartItems.length} sản phẩm)</span>
            </div>

            {loadingCart ? (
              <p>Đang tải giỏ hàng...</p>
            ) : cartItems.length === 0 ? (
              <p>Giỏ hàng đang trống</p>
            ) : (
              <div className="items-list">
                {cartItems.map(item => {
                  const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);
                  return (
                    <div key={item.id} className="summary-item">
                      <img src={item.image} alt={item.name} className="item-image" />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p className="item-qty">{item.quantity} x {item.price.toLocaleString()}đ = <strong>{itemTotal.toLocaleString()}đ</strong></p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="summary-breakdown">
              <div className="breakdown-row total">
                <span>Tổng cộng:</span>
                <strong className="final-price">{total.toLocaleString()}đ</strong>
              </div>
            </div>
          </div>


        </div>

      </div>

    </div>

  );

};

export default Checkout;