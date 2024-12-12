
import React, { useState, useEffect } from 'react';

const BranchList = () => {
  const [branches, setBranches] = useState([]);
  const [editId, setEditId] = useState(null); // ID của cơ sở đang chỉnh sửa
  const [formData, setFormData] = useState({}); // Lưu thông tin chỉnh sửa

  // Fake dữ liệu ban đầu
  useEffect(() => {
    const fakeBranches = [
      {
        id: 1,
        name: 'Cơ sở 1',
        location: 'Hà Nội',
        contact_info: '0123456789',
        img: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Cơ sở 2',
        location: 'TP HCM',
        contact_info: '0987654321',
        img: 'https://via.placeholder.com/150',
      },
    ];
    setBranches(fakeBranches);
  }, []);

  // Hàm kích hoạt chế độ chỉnh sửa
  const handleEdit = (branch) => {
    setEditId(branch.id);
    setFormData(branch); // Gán dữ liệu của cơ sở cần chỉnh sửa
  };

  // Hàm lưu chỉnh sửa
  const handleSave = () => {
    setBranches(
      branches.map((branch) =>
        branch.id === editId ? { ...branch, ...formData } : branch
      )
    );
    setEditId(null); // Thoát chế độ chỉnh sửa
  };

  // Hàm hủy chỉnh sửa
  const handleCancel = () => {
    setEditId(null);
    setFormData({});
  };

  // Hàm xóa cơ sở
  const handleDeleteBranch = (branchId) => {
    setBranches(branches.filter((branch) => branch.id !== branchId));
  };

  // Hàm thêm cơ sở mới
  const handleAddBranch = () => {
    const newBranch = {
      id: branches.length + 1, // Tạo ID tạm
      name: 'Cơ sở mới',
      location: 'Địa chỉ mới',
      contact_info: '0123456789',
      img: 'https://via.placeholder.com/150',
    };
    setBranches([...branches, newBranch]);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Danh sách cơ sở</h2>
      <button className="btn btn-success mb-3" onClick={handleAddBranch}>
        Thêm cơ sở mới
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Địa điểm</th>
            <th>Liên hệ</th>
            <th>Ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              {editId === branch.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.contact_info}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact_info: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.img}
                      onChange={(e) =>
                        setFormData({ ...formData, img: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      Lưu
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Hủy
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{branch.name}</td>
                  <td>{branch.location}</td>
                  <td>{branch.contact_info}</td>
                  <td>
                    <img
                      src={branch.img}
                      alt={branch.name}
                      style={{ width: '100px' }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleEdit(branch)}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteBranch(branch.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BranchList;


// ================================================== ĐÃ CÓ BE VÀ DB =================================================================

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BranchList = () => {
//   const [branches, setBranches] = useState([]);
//   const [editId, setEditId] = useState(null); // ID của cơ sở đang chỉnh sửa
//   const [formData, setFormData] = useState({}); // Lưu thông tin chỉnh sửa
//   const [loading, setLoading] = useState(true);

//   const [list_Base,setlist_Base] = useState

//   // Lấy danh sách cơ sở từ backend
//   useEffect(() => {
//     axios
//       .get('http://localhost:8082/chain/get_all')
//       .then((response) => {
//         setBranches(response.data);
//         setLoading(false);
//       })
//       .catch((error) => console.error('Lỗi khi lấy danh sách cơ sở:', error));
//   }, []);

//   // Hàm thêm cơ sở mới
//   const handleAddBranch = () => {
//     const newBranch = {
//       name: 'Cơ sở mới',
//       location: 'Địa chỉ mới',
//       contact_info: '0123456789',
//       img: 'https://via.placeholder.com/150',
//     };

//     axios
//       .post('/chain/create/1', newBranch) // Giả sử user_id là 1
//       .then((response) => {
//         setBranches([...branches, response.data]);
//       })
//       .catch((error) => console.error('Lỗi khi thêm cơ sở:', error));
//   };

//   // Hàm lưu chỉnh sửa cơ sở
//   const handleSave = () => {
//     axios
//       .post('/chain/update', { ...formData, chainid: editId })
//       .then(() => {
//         setBranches(
//           branches.map((branch) =>
//             branch.id === editId ? { ...branch, ...formData } : branch
//           )
//         );
//         setEditId(null);
//       })
//       .catch((error) => console.error('Lỗi khi cập nhật cơ sở:', error));
//   };

//   // Hàm xóa cơ sở
//   const handleDeleteBranch = (branchId) => {
//     axios
//       .delete(`/chain/delete/${branchId}`)
//       .then(() => {
//         setBranches(branches.filter((branch) => branch.id !== branchId));
//       })
//       .catch((error) => console.error('Lỗi khi xóa cơ sở:', error));
//   };

//   if (loading) {
//     return <div>Đang tải...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Danh sách cơ sở</h2>
//       <button className="btn btn-success mb-3" onClick={handleAddBranch}>
//         Thêm cơ sở mới
//       </button>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Tên</th>
//             <th>Địa điểm</th>
//             <th>Liên hệ</th>
//             <th>Ảnh</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {branches.map((branch) => (
//             <tr key={branch.id}>
//               {editId === branch.id ? (
//                 <>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.location}
//                       onChange={(e) =>
//                         setFormData({ ...formData, location: e.target.value })
//                       }
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.contact_info}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           contact_info: e.target.value,
//                         })
//                       }
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.img}
//                       onChange={(e) =>
//                         setFormData({ ...formData, img: e.target.value })
//                       }
//                     />
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-success me-2"
//                       onClick={handleSave}
//                     >
//                       Lưu
//                     </button>
//                     <button
//                       className="btn btn-secondary"
//                       onClick={() => setEditId(null)}
//                     >
//                       Hủy
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>{branch.name}</td>
//                   <td>{branch.location}</td>
//                   <td>{branch.contact_info}</td>
//                   <td>
//                     <img
//                       src={branch.img}
//                       alt={branch.name}
//                       style={{ width: '100px' }}
//                     />
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-warning me-2"
//                       onClick={() => {
//                         setEditId(branch.id);
//                         setFormData(branch);
//                       }}
//                     >
//                       Chỉnh sửa
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDeleteBranch(branch.id)}
//                     >
//                       Xóa
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BranchList;
