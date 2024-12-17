import React, { useState, useEffect } from 'react';
import FileUpload from '../../components/Function/Upload/FileUpload'; // Thêm import FileUpload

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    img: '',
    chian_id: '', // Cơ sở được chọn
  });

  const [branches, setBranches] = useState([]);
  const [menuProducts, setMenuProducts] = useState([]); // Danh sách sản phẩm trong menu
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://localhost:8082/chain/get_all', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), // Gửi dữ liệu nếu cần thiết
        });

        if (response.ok) {
          const data = await response.json();
          setBranches(
            data.map((item) => ({
              id: item.chain_id,
              name: item.name,
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

  const handleFileSelect = (file) => {
    setFormData({ ...formData, img: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Hiển thị xem trước dữ liệu sản phẩm
    setPreviewData(formData);
  };

  const Sumit_Produtct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/product/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Đẩy dữ liệu sản phẩm lên API
      });

      if (response.ok) {
        const data = await response.json();
        alert('Sản phẩm đã được tạo thành công!');

        // Reset form sau khi thêm sản phẩm
        setFormData({
          name: '',
          description: '',
          price: '',
          stock: '',
          img: '',
          chian_id: '',
        });
        setPreviewData(null);
      } else {
        console.error('Lỗi khi tạo sản phẩm');
      }
    } catch (error) {
      console.error('Lỗi kết nối:', error);
    }
  };

  const handleUpdateToMenu = () => {
    // Thêm sản phẩm vào menu giả lập
    const newProduct = {
      ...formData,
      id: menuProducts.length + 1, // Giả lập ID sản phẩm
    };
    setMenuProducts([...menuProducts, newProduct]);
    alert('Sản phẩm đã được cập nhật vào menu!');

    // Reset form sau khi cập nhật
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      img: '',
      chian_id: '',
    });
    setPreviewData(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Giá (VNĐ)</label>
          <input
            type="number"
            className="form-control"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượng</label>
          <input
            type="number"
            className="form-control"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            required
          />
        </div>

        {/* FileUpload component to select image */}
        <div className="mb-3">
          <label className="form-label">Ảnh sản phẩm</label>
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        <div className="mb-3">
          <label className="form-label">Chọn cơ sở</label>
          <select
            className="form-select"
            value={formData.chian_id}
            onChange={(e) =>
              setFormData({ ...formData, chian_id: e.target.value })
            }
            required
          >
            <option value="">-- Chọn cơ sở --</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Xem trước sản phẩm
        </button>
      </form>

      {previewData && (
        <div className="mt-5">
          <h3 className="text-center">Xem trước sản phẩm</h3>
          <table className="table table-bordered mt-3">
            <tbody>
              <tr>
                <th>Tên sản phẩm</th>
                <td>{previewData.name}</td>
              </tr>
              <tr>
                <th>Mô tả</th>
                <td>{previewData.description}</td>
              </tr>
              <tr>
                <th>Giá</th>
                <td>{previewData.price} VNĐ</td>
              </tr>
              <tr>
                <th>Số lượng</th>
                <td>{previewData.stock}</td>
              </tr>
              <tr>
                <th>Ảnh</th>
                <td>
                  {previewData.img && (
                    <img
                      src={previewData.img}
                      alt="Preview"
                      style={{ width: '150px' }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th>Cơ sở</th>
                <td>
                  {
                    branches.find(
                      (branch) => branch.id.toString() === previewData.chian_id
                    )?.name
                  }
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-3">
            <button
              className="btn btn-success"
              onClick={Sumit_Produtct}
            >
              Cập nhật sản phẩm vào menu
            </button>
          </div>
        </div>
      )}

      {menuProducts.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center">Danh sách sản phẩm trong menu</h3>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Cơ sở</th>
                <th>Giá</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              {menuProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    {
                      branches.find(
                        (branch) => branch.id.toString() === product.chian_id
                      )?.name
                    }
                  </td>
                  <td>{product.price} VNĐ</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
