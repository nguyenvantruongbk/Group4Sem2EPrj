import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
//Khai Báo Biến Toàn Cục
import Context from "../../Context/Context";
import { useContext } from "react";

function Call_List_Oder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, removeToken } = useContext(Context);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:8082/order_products/user", {
                    method: "GET", // Specify the HTTP method
                    headers: {
                        "Content-Type": "application/json", // Ensure proper content type
                        Authorization: `Bearer ${token}`, // Replace with your token
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
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "Processing":
                return "text-warning font-weight-bold";
            case "Shipping":
                return "text-info font-weight-bold";
            case "Completed":
                return "text-success font-weight-bold";
            case "Cancelled":
                return "text-danger font-weight-bold";
            default:
                return "text-secondary";
        }
    };

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    return (
        <div className="container-fluid mt-5">
            <h2 className="text-center mb-4">Đơn Hàng Của Bạn</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Chain</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order.orderId}</td>
                                <td>
                                    {order.order.user.name} <br />
                                </td>
                                <td>
                                    {order.order.chain.name} <br />
                                    {order.order.chain.location}
                                </td>
                                <td>{order.order.totalAmount.toLocaleString()} VND</td>
                                <td className={getStatusClass(order.order.status.statusName)}>
                                    {order.order.status.statusName}
                                </td>
                                <td>{order.order.paymentMethod.methodName}</td>
                                {/* <td>
                                    
                                    {order.cartReturnDTOS.map((cartItem, idx) => (
                                     <div 
                                     key={idx} 
                                     className="mb-2 p-3 bg-light border rounded shadow-sm"
                                        >
                                            <strong>{cartItem.product.name}</strong>  <br/> 
                                            SL: {cartItem.quantity}    <br/> 
                                            {cartItem.price.toLocaleString()} VND
                                        </div>
                                    ))}
                                </td> */}
                                <td>
                                    
                                <Accordion defaultActiveKey={null}>
                                    {order.cartReturnDTOS.map((cartItem, idx) => (
                                         <Accordion.Item eventKey={`${idx}`}>
                                                <Accordion.Header>{cartItem.product.name}</Accordion.Header>
                                                <Accordion.Body>
                                                    <div 
                                                key={idx} 
                                                className="mb-2 p-3 bg-light border rounded shadow-sm"
                                                    >
                                                        <strong>{cartItem.product.name}</strong>  <br/> 
                                                        Số Lượng: {cartItem.quantity}    <br/> 
                                                        {cartItem.price.toLocaleString()} VND
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
    return (
        <>
            <Call_List_Oder />
        </>
    );
}

export default List_Oders;
