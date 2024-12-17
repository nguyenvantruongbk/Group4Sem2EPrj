import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  // Sử dụng useNavigate thay vì useHistory


//Khai Báo Biến Toàn Cục
import Context from '../../Context/Context';
import { useContext } from 'react';

const UpdateUser = () => {
  
  const {token,removeToken} =useContext(Context)

 const [userData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    img:'',
  });

  useEffect(() => {
    // Gọi API để lấy thông tin người dùng
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8082/user_data/get_user',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm Bearer token vào header
            },
          }
        );
        if (response.status === 200) {
          setFormData(response.data); // Lưu thông tin người dùng vào state
        }
      } catch (error) {
        console.error('Lỗi khi tải thông tin người dùng:', error);
        setResponseMessage('Không thể tải thông tin người dùng.');
      }
    };

    fetchUserData();
  }, [token]);
 

  const [responseMessage, setResponseMessage] = useState('');

  const navigate = useNavigate();  // Thay vì sử dụng useHistory, dùng useNavigate


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...userData, [name]: value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
   
    try{

        const response = await fetch('http://localhost:8082/user_data/update_user',{
            method:'PUT',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(userData)
        })

        if (response.ok){
            alert('Cap nhat THanh Cong');
            window.location.reload();
            
     
        }else{
         
            alert('0 Cap nhat THanh Cong');
        }
        

    }catch(error){
        alert('Lỗi kết nối đến máy chủ!');
        
    }
}


 
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cập nhật người dùng</h2>
      <form className="border p-3 rounded shadow-sm bg-light" style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên</label>
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
          <label htmlFor="phone_number" className="form-label">Số điện thoại</label>
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
          <label htmlFor="address" className="form-label">Địa chỉ</label>
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
        <button type="submit" onClick={handleSubmit} className="btn btn-danger w-100">Update</button>
      </form>
      {responseMessage && (
        <div className={`alert mt-4 ${responseMessage.includes('Lỗi') ? 'alert-danger' : 'alert-success'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default UpdateUser;
