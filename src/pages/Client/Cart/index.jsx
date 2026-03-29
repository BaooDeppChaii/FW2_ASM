import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

const Cart = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chuột Gaming Logitech G Pro X", price: 2490000, image: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38", quantity: 1 },
    { id: 2, name: "Bàn phím cơ AKKO 3068", price: 1590000, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef", quantity: 1 }
  ]);

  // ❌ bỏ orderInfo
  // const [orderInfo, setOrderInfo] = useState(null);

  // thêm
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "Sản phẩm mới " + (cartItems.length + 1),
      price: 500000,
      image: "https://via.placeholder.com/100",
      quantity: 1
    };
    setCartItems([...cartItems, newItem]);
  };

  // sửa số lượng
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // xóa
  const removeItem = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  // xóa hết
  const clearCart = () => {
    if (window.confirm("Bạn muốn xóa toàn bộ giỏ hàng?")) {
      setCartItems([]);
    }
  };

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // 🔥 CHỈNH CHỖ NÀY
  const handleCheckout = () => {

    if (cartItems.length === 0) return;

    navigate("/checkout", {
      state: {
        cartItems,
        total: subTotal
      }
    });

  };

  return (
    <div className="cart-page">
      <div className="container">

        <div className="cart-header-wrapper">
          <h2 className="cart-title">Giỏ hàng ({cartItems.length})</h2>

          <div className="cart-controls">
            <button className="btn-add-demo" onClick={addItem}>
              + Thêm Sản Phẩm
            </button>

            {cartItems.length > 0 && (
              <button className="btn-clear-all" onClick={clearCart}>
                🗑 Xóa tất cả
              </button>
            )}
          </div>
        </div>
        
        <div className="cart-content">

          <div className="cart-list">

            {cartItems.length > 0 ? (
              cartItems.map((item) => (

                <div className="cart-item" key={item.id}>

                  <img src={item.image} alt={item.name} className="item-img" />

                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>

                  <div className="item-qty">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>

                  <div className="item-total">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </div>

                  <button className="btn-remove" onClick={() => removeItem(item.id)}>
                    ×
                  </button>

                </div>

              ))
            ) : (
              <div className="empty-cart">
                <p>Giỏ hàng đang trống!</p>
                <button
                  className="btn-checkout"
                  onClick={() => window.location.reload()}
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