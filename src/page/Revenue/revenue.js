// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const SalesManagement = () => {
//   const [sales, setSales] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [newRevenue, setNewRevenue] = useState(0);
//   const [editingSale, setEditingSale] = useState(null);
//   const [role, setRole] = useState(''); // Role: 'director', 'manager', 'employee', 'customer'

//   // Fetch sales data
//   useEffect(() => {
//     axios
//       .get('/chain_sales/list')
//       .then((response) => {
//         setSales(response.data);
//         setLoading(false);
//       })
//       .catch((error) => console.error('Error fetching sales data:', error));

//     // Simulate getting role (replace with real role fetching logic)
//     setRole('director'); // Example: hardcoded role
//   }, []);

//   const handleAddRevenue = () => {
//     const newSale = { chain_id: 1, totalRevenue: newRevenue }; // Example chain_id
//     axios
//       .post('/chain_sales/create', newSale)
//       .then((response) => {
//         setSales([...sales, response.data]);
//         setNewRevenue(0);
//       })
//       .catch((error) => console.error('Error creating sales record:', error));
//   };

//   const handleDeleteSale = (salesId) => {
//     axios
//       .delete(`/chain_sales/delete`, { data: { sales_id: salesId } })
//       .then(() => {
//         setSales(sales.filter((sale) => sale.sales_id !== salesId));
//       })
//       .catch((error) => console.error('Error deleting sales record:', error));
//   };

//   const handleUpdateSale = (salesId, updatedRevenue) => {
//     const updatedSale = { sales_id: salesId, totalRevenue: updatedRevenue };
//     axios
//       .post('/chain_sales/update', updatedSale)
//       .then(() => {
//         setSales(
//           sales.map((sale) =>
//             sale.sales_id === salesId ? { ...sale, totalRevenue: updatedRevenue } : sale
//           )
//         );
//         setEditingSale(null);
//       })
//       .catch((error) => console.error('Error updating sales record:', error));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (role !== 'director' && role !== 'employee') {
//     return <div>Access Denied. You do not have permission to view this page.</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Quản lý doanh thu</h2>

//       {/* Add Revenue */}
//       <div className="mb-3">
//         <input
//           type="number"
//           className="form-control me-2"
//           placeholder="Nhập doanh thu mới"
//           value={newRevenue}
//           onChange={(e) => setNewRevenue(e.target.value)}
//         />
//         <button className="btn btn-success mt-2" onClick={handleAddRevenue}>
//           Thêm doanh thu
//         </button>
//       </div>

//       {/* Sales Table */}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Chain ID</th>
//             <th>Doanh thu</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sales.map((sale) => (
//             <tr key={sale.sales_id}>
//               <td>{sale.sales_id}</td>
//               <td>{sale.chain_id}</td>
//               <td>
//                 {editingSale === sale.sales_id ? (
//                   <input
//                     type="number"
//                     className="form-control"
//                     defaultValue={sale.totalRevenue}
//                     onBlur={(e) =>
//                       handleUpdateSale(sale.sales_id, parseFloat(e.target.value))
//                     }
//                   />
//                 ) : (
//                   sale.totalRevenue
//                 )}
//               </td>
//               <td>
//                 <button
//                   className="btn btn-warning me-2"
//                   onClick={() => setEditingSale(sale.sales_id)}
//                 >
//                   Cập nhật
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDeleteSale(sale.sales_id)}
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesManagement;


import React, { useState } from 'react';

const SalesManagement = () => {
  const [sales, setSales] = useState([
    { sales_id: 1, chain_id: 1, totalRevenue: 100000 },
    { sales_id: 2, chain_id: 2, totalRevenue: 200000 },
  ]);
  const [newRevenue, setNewRevenue] = useState(0);
  const [editingSale, setEditingSale] = useState(null);
  const [role, setRole] = useState('director'); // Hardcoded role for testing

  const handleAddRevenue = () => {
    const newSale = {
      sales_id: sales.length + 1, // Generate a new ID
      chain_id: Math.floor(Math.random() * 100) + 1, // Random chain ID
      totalRevenue: parseFloat(newRevenue),
    };
    setSales([...sales, newSale]);
    setNewRevenue(0);
  };

  const handleDeleteSale = (salesId) => {
    setSales(sales.filter((sale) => sale.sales_id !== salesId));
  };

  const handleUpdateSale = (salesId, updatedRevenue) => {
    setSales(
      sales.map((sale) =>
        sale.sales_id === salesId ? { ...sale, totalRevenue: updatedRevenue } : sale
      )
    );
    setEditingSale(null);
  };

  if (role !== 'director' && role !== 'employee') {
    return <div>Access Denied. You do not have permission to view this page.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Quản lý doanh thu</h2>

      {/* Add Revenue */}
      <div className="mb-3">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Nhập doanh thu mới"
          value={newRevenue}
          onChange={(e) => setNewRevenue(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleAddRevenue}>
          Thêm doanh thu
        </button>
      </div>

      {/* Sales Table */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Chain ID</th>
            <th>Doanh thu</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.sales_id}>
              <td>{sale.sales_id}</td>
              <td>{sale.chain_id}</td>
              <td>
                {editingSale === sale.sales_id ? (
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={sale.totalRevenue}
                    onBlur={(e) =>
                      handleUpdateSale(sale.sales_id, parseFloat(e.target.value))
                    }
                  />
                ) : (
                  sale.totalRevenue
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditingSale(sale.sales_id)}
                >
                  Cập nhật
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteSale(sale.sales_id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesManagement;
