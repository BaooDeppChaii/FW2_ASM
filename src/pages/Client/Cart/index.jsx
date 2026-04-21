import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteCartItem, getMyCart, updateCartItem } from "../../../api/cartApi";
import './style.css';

const Cart = () => {

  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authRequired, setAuthRequired] = useState(false);

  const cartItems = useMemo(() => {
    const rawItems = cart?.CartItems || cart?.cartItems || cart?.items || [];

    return rawItems.map((item) => {
      const product = item.Product || item.product || {};
      return {
        id: item.id,
        cart_item_id: item.id,
        product_id: item.product_id,
        name: product.name || item.product_name || item.name || "Sản phẩm",
        price: Number(item.price ?? product.price ?? 0),
        image: product.image || item.product_image || item.image || "https://via.placeholder.com/100",
        quantity: Number(item.quantity || 1),
      };
    });
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setAuthRequired(false);
      const res = await getMyCart();
      setCart(res.data.data);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
        setCart(null);
        setAuthRequired(true);
        return;
      }

      alert(error?.response?.data?.message || "Không tải được giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (item, delta) => {
    const nextQuantity = Math.max(1, item.quantity + delta);

    try {
      await updateCartItem(item.cart_item_id, { quantity: nextQuantity });
      await fetchCart();
    } catch (error) {
      alert(error?.response?.data?.message || "Cập nhật số lượng thất bại");
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await deleteCartItem(item.cart_item_id);
      await fetchCart();
    } catch (error) {
      alert(error?.response?.data?.message || "Xóa sản phẩm thất bại");
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Bạn muốn xóa toàn bộ giỏ hàng?")) {
      return;
    }

    try {
      await Promise.all(cartItems.map((item) => deleteCartItem(item.cart_item_id)));
      await fetchCart();
    } catch (error) {
      alert(error?.response?.data?.message || "Xóa toàn bộ giỏ hàng thất bại");
    }
  };

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    navigate("/Checkout", {
      state: {
        cartItems,
        total: subTotal,
      },
    });
  };

  return (
    <div className="cart-page">
      <div className="container">

        <div className="cart-header-wrapper">
          <h2 className="cart-title">Giỏ hàng ({cartItems.length})</h2>

          <div className="cart-controls">
            {cartItems.length > 0 && (
              <button className="btn-clear-all" onClick={clearCart}>
                🗑 Xóa tất cả
              </button>
            )}

            <Link className="btn-add-demo text-decoration-none" to="/product">
              + Tiếp tục mua sắm
            </Link>
          </div>
        </div>
        
        <div className="cart-content">

          <div className="cart-list">

            {loading ? (
              <div className="empty-cart">
                <p>Đang tải giỏ hàng...</p>
              </div>
            ) : authRequired ? (
              <div className="empty-cart">
                <p>Bạn cần đăng nhập để xem giỏ hàng.</p>
                <button
                  className="btn-checkout"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập ngay
                </button>
              </div>
            ) : cartItems.length > 0 ? (
              cartItems.map((item) => (

                <div className="cart-item" key={item.cart_item_id}>

                  <img src={item.image} alt={item.name} className="item-img" />

                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>

                  <div className="item-qty">
                    <button onClick={() => updateQuantity(item, -1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item, 1)}>+</button>
                  </div>

                  <div className="item-total">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </div>

                  <button className="btn-remove" onClick={() => removeItem(item)}>
                    ×
                  </button>

                </div>

              ))
            ) : (
              <div className="empty-cart">
                <p>Giỏ hàng đang trống!</p>
                <button
                  className="btn-checkout"
                  onClick={() => navigate("/product")}
                >
                  Quay lại mua sắm
                </button>
              </div>
            )}

          </div>

          <div className="cart-summary">

            <h3>Tóm tắt đơn hàng</h3>

            <div className="summary-row">
              <span>Tổng tiền hàng:</span>
              <span>{subTotal.toLocaleString()}đ</span>
            </div>

            <hr />

            <div className="summary-row total">
              <span>Tổng cộng:</span>
              <span className="final-price">
                {subTotal.toLocaleString()}đ
              </span>
            </div>

            <button
              className="btn-checkout"
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              Đặt hàng ngay
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;