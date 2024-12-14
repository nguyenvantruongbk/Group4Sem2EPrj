import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBranch = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact_info: '',
    manager: '',
    img: '',
  });

  const [error, setError] = useState(null); // Quản lý lỗi
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!formData.name || !formData.location || !formData.contact_info || !formData.manager || !formData.img) {
      setError('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/chain/create_new/${formData.manager}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Tạo cơ sở thành công!');
        setError(null);
        navigate('/list_base'); // Điều hướng về danh sách cơ sở
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Đã có lỗi xảy ra!');
      }
    } catch (error) {
      setError('Tài Khoản Sai');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thêm cơ sở mới</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên cơ sở</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Địa điểm</label>
          <input
            type="text"
            className="form-control"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Liên hệ</label>
          <input
            type="text"
            className="form-control"
            value={formData.contact_info}
            onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Người quản lý</label>
          <input
            type="text"
            className="form-control"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ảnh (URL)</label>
          <input
            type="text"
            className="form-control"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Thêm cơ sở
        </button>
      </form>
    </div>
  );
};

export default AddBranch;
