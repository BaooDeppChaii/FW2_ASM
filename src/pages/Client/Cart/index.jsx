
import './style.css';

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Chuột Gaming Logitech G Pro X Superlight",
      price: 2490000,
      image: "https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38",
      quantity: 1,
    },
    {
      id: 2,
      name: "Bàn phím cơ AKKO 3068",
      price: 1590000,
      image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
      quantity: 1,
    }
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="container">
        <h2 className="cart-title">Giỏ hàng của bạn</h2>
        
        <div className="cart-content">
          {/* Danh sách sản phẩm bên trái */}
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">{item.price.toLocaleString()}đ</p>
                </div>
                <div className="item-qty">
                  <button>-</button>
                  <input type="text" value={item.quantity} readOnly />
                  <button>+</button>
                </div>
                <div className="item-total">
                  {(item.price * item.quantity).toLocaleString()}đ
                </div>
                <button className="btn-remove">×</button>
              </div>
            ))}
          </div>

          {/* Tổng kết bên phải */}
          <div className="cart-summary">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="summary-row">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Tổng cộng:</span>
              <span className="final-price">{total.toLocaleString()}đ</span>
            </div>
            <button className="btn-checkout">Tiến hành thanh toán</button>
            <a href="/" className="back-to-shop">← Tiếp tục mua sắm</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;