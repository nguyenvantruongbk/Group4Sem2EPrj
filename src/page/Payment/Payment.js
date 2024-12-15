import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; // Import thư viện Confetti
import { Modal } from 'react-bootstrap'; // Import Modal từ Bootstrap

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  const totalAmount = location.state?.total || 0;

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    location: '',
    
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [showSuccess, setShowSuccess] = useState(false); // State hiển thị modal chúc mừng

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
    if (!address.name.trim() || !address.phone.trim() || !address.location.trim()) {
      alert('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng.');
      return;
    }

    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán.');
      return;
    }













    // Hiển thị modal chúc mừng
    setShowSuccess(true);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thanh toán</h2>

      {/* Modal Chúc mừng */}
      {showSuccess && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} /> {/* Hiệu ứng pháo hoa */}
          <Modal show={showSuccess} centered>
            <Modal.Body className="text-center p-5">
              <h1 className="text-success mb-4">🎉 Chúc mừng! 🎉</h1>
              <p className="fs-4">Đơn hàng của bạn đã được đặt thành công!</p>
              <p className="fs-5 mb-4">Cảm ơn bạn đã mua sắm cùng chúng tôi.</p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleBackToHome}
                style={{
                  background: 'linear-gradient(90deg, #ff8c00, #ff0080)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  padding: '10px 20px',
                }}
              >
                Quay lại trang chủ
              </button>
            </Modal.Body>
          </Modal>
        </>
      )}

      {/* Nội dung chính */}
      {!showSuccess && (
        <>
          <div className="card mb-4">
            <div className="card-header">Giỏ hàng</div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.productId} className="d-flex align-items-center mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-1 text-muted">{item.price.toLocaleString()} VND</p>
                    <span className="text-muted">Số lượng: {item.quantity}</span>
                  </div>
                  <p className="mb-0">{(item.price * item.quantity).toLocaleString()} VND</p>
                </div>
              ))}
            </div>
          </div>

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

          <div className="card">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Tổng tiền: {calculateTotal().toLocaleString()} VND</h5>
              <button className="btn btn-primary" onClick={handleOrderSubmit}>
                Đặt hàng
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;

