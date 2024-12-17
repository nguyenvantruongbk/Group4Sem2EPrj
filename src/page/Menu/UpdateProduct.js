import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Sử dụng useNavigate thay vì useHistory
import axios from 'axios';

const UpdateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    img: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const { productId } = useParams(); // Lấy productId từ URL
  const navigate = useNavigate(); // Hook điều hướng trang

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ API theo product_id
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/product/${productId}`);
        if (response.status === 200) {
          setProductData(response.data); // Lưu dữ liệu sản phẩm vào state
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin sản phẩm:', error);
        setResponseMessage('Không thể tải thông tin sản phẩm.');
      }
    };

    fetchProductData();
  }, [productId]);

  // Hàm xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Hàm xử lý submit form (cập nhật sản phẩm)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8082/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert('Cập nhật sản phẩm thành công');
        navigate('/list_product'); // Điều hướng trở lại danh sách sản phẩm
      } else {
        alert('Cập nhật sản phẩm không thành công');
      }
    } catch (error) {
      alert('Lỗi kết nối đến máy chủ!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cập Nhật Sản Phẩm</h2>
      <form className="border p-3 rounded shadow-sm bg-light" style={{ maxWidth: '500px', margin: 'auto' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên Sản Phẩm</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Mô Tả</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Giá</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Số Lượng</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            value={productData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="img" className="form-label">Hình Ảnh</label>
          <input
            type="text"
            id="img"
            name="img"
            className="form-control"
            value={productData.img}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Cập Nhật</button>
      </form>
      {responseMessage && (
        <div className={`alert mt-4 ${responseMessage.includes('Lỗi') ? 'alert-danger' : 'alert-success'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
