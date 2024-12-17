import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Spinner, Badge, Form, Button } from "react-bootstrap";

function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); // Ngày hiện tại
  const [updating, setUpdating] = useState(false);

  // Fetch tất cả trạng thái đơn hàng
  const fetchStatuses = async () => {
    try {
      const response = await fetch("http://localhost:8082/status");
      if (!response.ok) throw new Error("Failed to fetch statuses");

      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  // Fetch tất cả đơn hàng theo ngày
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const startDate = `${selectedDate}T00:00:00`;
      const endDate = `${selectedDate}T23:59:59`;
      const response = await fetch(
        `http://localhost:8082/orders/order_date?startDate=${startDate}&endDate=${endDate}`
      );
      if (!response.ok) throw new Error("Failed to fetch orders");

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật trạng thái đơn hàng
  const handleStatusChange = async (orderId, newStatusId) => {
    setUpdating(true);
    try {
      const response = await fetch("http://localhost:8082/orders/update_status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, statusId: newStatusId }),
      });

      if (!response.ok) throw new Error("Failed to update order status");

      // Cập nhật lại danh sách đơn hàng sau khi chỉnh sửa
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
    fetchOrders();
  }, [selectedDate]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quản Lý Đơn Hàng</h2>

      {/* Bộ lọc theo ngày */}
      <div className="mb-3 d-flex justify-content-end">
        <Form.Group controlId="dateFilter">
          <Form.Label>Chọn Ngày:</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Form.Group>
      </div>

      {/* Hiển thị Spinner khi loading */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Chain</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Products</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.user.name}</td>
                    <td>
                        {order.chain.name} <br />
                        <small className="text-muted">{order.chain.location}</small>
                    </td>
                    <td>{order.totalAmount.toLocaleString()} VND</td>
                    <td>
                        <Badge bg="info">{order.status.statusName}</Badge>
                    </td>
                    <td>{order.paymentMethod.methodName}</td>
                    <td>
                        {/* Kiểm tra nếu cartReturnDTOS tồn tại */}
                        {order.cartReturnDTOS?.length > 0 ? (
                        order.cartReturnDTOS.map((product, idx) => (
                            <div key={idx}>
                            {product.product.name} - SL: {product.quantity}
                            </div>
                        ))
                        ) : (
                        <span className="text-muted">Không có sản phẩm</span>
                        )}
                    </td>
                    <td>
                        <Form.Select
                        defaultValue={order.status.statusId}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                        disabled={updating}
                        >
                        <option disabled>Chọn trạng thái</option>
                        {statuses.map((status) => (
                            <option key={status.statusId} value={status.statusId}>
                            {status.statusName}
                            </option>
                        ))}
                        </Form.Select>
                        {updating && (
                        <div className="text-muted small">Đang cập nhật...</div>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>

          </Table>
        </div>
      )}
    </div>
  );
}

export default AdminOrderManagement;
