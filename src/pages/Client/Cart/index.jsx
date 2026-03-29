import React, { useState } from 'react';
import './style.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Chuột Gaming Logitech G Pro X", price: 2490000, image: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38", quantity: 1 },
    { id: 2, name: "Bàn phím cơ AKKO 3068", price: 1590000, image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef", quantity: 1 }
  ]);

  const [orderInfo, setOrderInfo] = useState(null);

  // --- 1. CHỨC NĂNG THÊM (Giả lập thêm sản phẩm mới vào giỏ) ---
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

  // --- 2. CHỨC NĂNG SỬA (Cập nhật số lượng) ---
  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  // --- 3. CHỨC NĂNG XÓA (Xóa từng món) ---
  const removeItem = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  // --- 4. CHỨC NĂNG XÓA TẤT CẢ ---
  const clearCart = () => {
    if (window.confirm("Bạn muốn xóa toàn bộ giỏ hàng?")) {
      setCartItems([]);
    }
  };

  const handleCheckout = () => {
    const now = new Date();
    setOrderInfo({
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      time: `${now.toLocaleTimeString('vi-VN')} - ${now.toLocaleDateString('vi-VN')}`
    });
    setCartItems([]);
  };

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (orderInfo) {
    return (
      <div className="cart-page">
        <div className="container order-success-card">
          <h2>🎉 Đặt hàng thành công!</h2>
          <p>Thời gian: {orderInfo.time}</p>
          <p>Tổng tiền: <strong>{orderInfo.total.toLocaleString()}đ</strong></p>
          <button className="btn-checkout" onClick={() => setOrderInfo(null)}>Tiếp tục mua sắm</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header-wrapper">
          <h2 className="cart-title">Giỏ hàng ({cartItems.length})</h2>
          <div className="cart-controls">
            <button className="btn-add-demo" onClick={addItem}>+ Thêm Sản Phẩm</button>
            {cartItems.length > 0 && (
              <button className="btn-clear-all" onClick={clearCart}>🗑 Xóa tất cả</button>
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
                    <p className="item-price">{item.price.toLocaleString()}đ</p>
                  </div>
                  <div className="item-qty">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <div className="item-total">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </div>
                  <button className="btn-remove" onClick={() => removeItem(item.id)}>×</button>
                </div>
              ))
            ) : (
              <div className="empty-cart">
                <p>Giỏ hàng đang trống!</p>
                <button className="btn-checkout" onClick={() => window.location.reload()}>Quay lại mua sắm</button>
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
              <span className="final-price">{subTotal.toLocaleString()}đ</span>
            </div>
            <button className="btn-checkout" disabled={cartItems.length === 0} onClick={handleCheckout}>
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;