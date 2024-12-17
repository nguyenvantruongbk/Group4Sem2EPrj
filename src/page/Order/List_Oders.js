import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Spinner, Badge } from "react-bootstrap";
import Context from "../../Context/Context";
import { useContext } from "react";

function Call_List_Oder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(Context);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8082/order_products/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Processing":
        return "warning";
      case "Shipping":
        return "info";
      case "Completed":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" /> Loading...
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Đơn Hàng Của Bạn</h2>
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Users</th>
              <th>Cơ sở</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Phương thức</th>
              <th>Sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className="fw-bold">{order.order.orderId}</td>
                <td>{order.order.user.name}</td>
                <td>
                  {order.order.chain.name} <br />
                  <small className="text-muted">{order.order.chain.location}</small>
                </td>
                <td>
                  <strong>{order.order.totalAmount.toLocaleString()} VND</strong>
                </td>
                <td>
                  <Badge bg={getStatusClass(order.order.status.statusName)} className="p-2">
                    {order.order.status.statusName}
                  </Badge>
                </td>
                <td>{order.order.paymentMethod.methodName}</td>
                <td style={{ maxWidth: "300px" }}>
                  <Accordion flush>
                    {order.cartReturnDTOS.map((cartItem, idx) => (
                      <Accordion.Item eventKey={`${index}-${idx}`} key={idx}>
                        <Accordion.Header>{cartItem.product.name}</Accordion.Header>
                        <Accordion.Body>
                          <div
                            className="p-2 border rounded"
                            style={{
                              backgroundColor: "#f9f9f9",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              maxHeight: "150px",
                              overflowY: "auto",
                              fontSize: "0.9rem",
                            }}
                          >
                            <p className="mb-1">
                              <strong>Tên Sản Phẩm:</strong> {cartItem.product.name}
                            </p>
                            <p className="mb-1">
                              <strong>Số Lượng:</strong> {cartItem.quantity}
                            </p>
                            <p className="mb-0">
                              <strong>Giá:</strong>{" "}
                              <span className="text-success fw-bold">
                                {cartItem.price.toLocaleString()} VND
                              </span>
                            </p>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function List_Oders() {
  return <Call_List_Oder />;
}

export default List_Oders;
