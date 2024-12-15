import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Modal } from 'react-bootstrap';

const CheckoutPage = () => {
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
  });
  const [showSuccess, setShowSuccess] = useState(false);




  // Fetch branches (No changes to this part)
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

  // Fetch payment methods from API
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await fetch('http://localhost:8082/payment-methods');
        if (response.ok) {
          const data = await response.json();
          setPaymentMethods(data); // Set payment methods from the response
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
    if (!address.name.trim() || !address.phone.trim() || !address.location.trim()) {
      alert('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng.');
      return;
    }

    if (!selectedPaymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    if (!selectedBranch) {
      alert('Vui lòng chọn cơ sở.');
      return;
    }

    Submit_Oder();
    setShowSuccess(true);
  };

  const handleBackToHome = () => {
    navigate('/');
  };



  const [From_Sumit, setFrom_Sumit] = useState({
    name: address.name,
    phone: address.phone,
    location: address.location,
    product:{
      cartItems
    },
    chian_id:selectedBranch,
    totalAmount:totalAmount,
    paymethot_id:selectedPaymentMethod,

  });

  useEffect(() => {
    setFrom_Sumit({
      name: address.name,
      phone: address.phone,
      location: address.location,
      product: {
        cartItems
      },
      chian_id: selectedBranch,
      totalAmount: totalAmount,
      paymethot_id: parseInt(selectedPaymentMethod),
    });
  }, [address, cartItems, selectedBranch, selectedPaymentMethod, totalAmount]);
  
 

  const Submit_Oder = () => {
    console.log(From_Sumit)
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

      {!showSuccess && (
        <>
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

          {/* Phương thức thanh toán */}
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
                      checked={selectedPaymentMethod === method.paymentMethodId}
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
