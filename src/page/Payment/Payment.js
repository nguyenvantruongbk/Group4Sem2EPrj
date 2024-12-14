import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state?.cart || []; // Nhận dữ liệu từ trang giỏ hàng
  const totalAmount = location.state?.total || 0; // Nhận tổng tiền từ trang giỏ hàng

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    location: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash'); // Phương thức thanh toán mặc định

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotal = () => {
    return totalAmount;
  };

  const handleOrderSubmit = () => {
    alert(`Đặt hàng thành công!\nPhương thức thanh toán: ${paymentMethod}\nTổng tiền: ${calculateTotal().toLocaleString()} VND`);
    // Xử lý logic đặt hàng tại đây (gửi đến server, lưu dữ liệu, v.v.)
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thanh toán</h2>

      {/* Danh sách sản phẩm */}
      <div className="card mb-4">
        <div className="card-header">Giỏ hàng</div>
        <div className="card-body">
          {cartItems.map((item) => (
            <div key={item.productId} className="d-flex align-items-center mb-3">
              <img
                src={item.img}
                alt={item.title}
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <div className="ms-3 flex-grow-1">
                <h5 className="mb-1">{item.name}</h5>
                <p className="mb-1 text-muted">{item.price.toLocaleString()} VND</p>
                <span className="text-muted">Số lượng: {item.quantity}</span>
              </div>
              <p className="mb-0">{(item.price * item.quantity).toLocaleString()} VND</p>
            </div>
          ))}
        </div>
      </div>

      {/* Nhập địa chỉ giao hàng */}
      <div className="card mb-4">
        <div className="card-header">Địa chỉ giao hàng</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={address.name}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <textarea
              className="form-control"
              name="location"
              rows="3"
              value={address.location}
              onChange={handleAddressChange}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Chọn phương thức thanh toán */}
      <div className="card mb-4">
        <div className="card-header">Phương thức thanh toán</div>
        <div className="card-body">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="Cash"
              checked={paymentMethod === 'Cash'}
              onChange={handlePaymentMethodChange}
            />
            <label className="form-check-label">Thanh toán khi nhận hàng (Cash)</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              value="Bank Transfer"
              checked={paymentMethod === 'Bank Transfer'}
              onChange={handlePaymentMethodChange}
            />
            <label className="form-check-label">Chuyển khoản ngân hàng (Bank Transfer)</label>
          </div>
        </div>
      </div>

      {/* Tổng tiền và nút đặt hàng */}
      <div className="card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Tổng tiền: {calculateTotal().toLocaleString()} VND</h5>
          <button className="btn btn-primary" onClick={handleOrderSubmit}>
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
