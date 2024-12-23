import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Modal } from 'react-bootstrap';

// Khai báo biến toàn cục
import Context from '../../Context/Context';

const CheckoutPage = () => {
  const { token } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cart || [];
  const totalAmount = location.state?.total || 0;

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    location: '',
    email: '', // Thêm trường email
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('atStore'); // Mặc định là mua tại quầy

  // Fetch branches
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:8082/chain/get_all', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });

        if (response.ok) {
          const data = await response.json();
          setBranches(
            data.map((item) => ({
              id: item.chain_id,
              name: item.name,
              location: item.location,
            }))
          );
        } else {
          console.error('Lỗi khi lấy dữ liệu từ server');
        }
      } catch (error) {
        console.error('Lỗi kết nối:', error);
      }
    };

    fetchBranches();
  }, []);

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('http://localhost:8082/payment-methods');
        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data);
        } else {
          console.error('Lỗi khi lấy phương thức thanh toán');
        }
      } catch (error) {
        console.error('Lỗi kết nối:', error);
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const calculateTotal = () => {
    return totalAmount;
  };

  const handleBranchSelection = (branchId) => {
    setSelectedBranch(branchId);
  };

  const handleOrderSubmit = () => {
    if (deliveryOption === 'delivery') {
      if (
        !address.name.trim() ||
        !address.phone.trim() ||
        !address.location.trim() ||
        !address.email.trim()
      ) {
        alert('Vui lòng điền đầy đủ thông tin (bao gồm email) cho địa chỉ giao hàng.');
        return;
      }

      if (!selectedPaymentMethod) {
        alert('Vui lòng chọn phương thức thanh toán.');
        return;
      }
    }

    if (!selectedBranch) {
      alert('Vui lòng chọn cơ sở.');
      return;
    }

    // Gửi đơn hàng
    Submit_Order();
  };

  const Submit_Order = async () => {
    const orderData = {
      name: address.name,
      phone: address.phone,
      location: address.location,
      email: address.email, // Bao gồm email
      product: cartItems,
      chain_id: selectedBranch, // Sửa chính tả
      totalAmount: totalAmount,
      paymentMethodId: parseInt(selectedPaymentMethod, 10), // Sửa chính tả và thêm radix
    };

    try {
      const response = await fetch('http://localhost:8082/orders', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        const errorData = await response.json();
        console.error('Lỗi khi tạo hóa đơn:', errorData);
        alert('Lỗi khi tạo hóa đơn');
      }
    } catch (error) {
      console.error('Lỗi khi tạo hóa đơn Server:', error);
      alert('Lỗi khi tạo hóa đơn Server');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thanh toán</h2>

      {showSuccess && (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <Modal show={showSuccess} centered>
            <Modal.Body className="text-center p-5">
              <h1 className="text-success mb-4">🎉 Chúc mừng! 🎉</h1>
              {deliveryOption === 'atStore' ? (
                <p className="fs-4">
                  Đơn hàng của bạn đã được tạo thành công! <br />
                  Quý khách vui lòng ra bàn số{' '}
                  <strong>{Math.floor(Math.random() * 20) + 1}</strong> đợi trong giây lát.
                </p>
              ) : (
                <p className="fs-4">Đơn hàng của bạn đã được đặt thành công!</p>
              )}
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

      {!showSuccess && (
        <>
          {/* Phương thức nhận hàng */}
          <div className="card mb-4">
            <div className="card-header">Vui lòng chọn:</div>
            <div className="card-body">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="deliveryOption"
                  value="atStore"
                  checked={deliveryOption === 'atStore'}
                  onChange={() => setDeliveryOption('atStore')}
                />
                <label className="form-check-label">Mua tại quầy</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  checked={deliveryOption === 'delivery'}
                  onChange={() => setDeliveryOption('delivery')}
                />
                <label className="form-check-label">Đặt giao hàng</label>
              </div>
            </div>
          </div>

          {/* Chọn Cơ Sở */}
          <div className="card mb-4">
            <div className="card-header">Chọn Cơ Sở</div>
            <div className="card-body">
              {branches.length > 0 ? (
                branches.map((branch) => (
                  <div key={branch.id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="branch"
                      value={branch.id}
                      checked={selectedBranch === branch.id}
                      onChange={() => handleBranchSelection(branch.id)}
                    />
                    <label className="form-check-label">
                      {branch.name} - {branch.location}
                    </label>
                  </div>
                ))
              ) : (
                <p>Đang tải danh sách cơ sở...</p>
              )}
            </div>
          </div>

          {/* Giỏ hàng */}
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

          {/* Địa chỉ giao hàng */}
          {deliveryOption === 'delivery' && (
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
                    required
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={address.email}
                    onChange={handleAddressChange}
                    required
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
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Phương thức thanh toán */}
          {deliveryOption === 'delivery' && (
            <div className="card mb-4">
              <div className="card-header">Phương thức thanh toán</div>
              <div className="card-body">
                {paymentMethods.length > 0 ? (
                  paymentMethods.map((method) => (
                    <div key={method.paymentMethodId} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value={method.paymentMethodId}
                        checked={selectedPaymentMethod === String(method.paymentMethodId)}
                        onChange={handlePaymentMethodChange}
                      />
                      <label className="form-check-label">
                        {method.methodName} - {method.description}
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Đang tải phương thức thanh toán...</p>
                )}
              </div>
            </div>
          )}

          {/* Tổng tiền */}
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
