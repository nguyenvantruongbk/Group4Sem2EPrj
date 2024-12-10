import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Sử dụng useNavigate thay vì useHistory

const UpdateUser = () => {
  const { id } = useParams();  // Lấy ID từ URL
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const navigate = useNavigate();  // Thay vì sử dụng useHistory, dùng useNavigate

  useEffect(() => {
    // Lấy thông tin người dùng từ backend
    axios
      .get(`/user_data/get_user/${id}`)
      .then((response) => {
        setUserData(response.data);  // Giả sử backend trả về dữ liệu người dùng
      })
      .catch((error) => {
        console.error('Lỗi khi tải thông tin người dùng:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/user_data/update_user/${id}`, userData);
      if (response.status === 200) {
        setResponseMessage('Cập nhật thành công!');
        navigate('/');  // Sử dụng navigate để chuyển hướng về trang danh sách
      }
    } catch (error) {
      if (error.response) {
        setResponseMessage(`Lỗi: ${error.response.status}`);
      } else {
        setResponseMessage('Lỗi không xác định.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="border p-3 rounded shadow-sm bg-light" style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone number</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-control"
            value={userData.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Adress</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={userData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">Update</button>
      </form>
      {responseMessage && (
        <div className={`alert mt-4 ${responseMessage.includes('Lỗi') ? 'alert-danger' : 'alert-success'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
