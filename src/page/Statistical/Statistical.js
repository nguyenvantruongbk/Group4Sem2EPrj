import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaChartPie, FaRegClock, FaChartLine } from 'react-icons/fa';

// Cấu hình cho biểu đồ
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Để sử dụng biểu đồ tròn (Doughnut)
);

function BieuDoTron({ selectedDate }) {
  const [orders, setOrders] = useState([]);
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchOrders = async (date) => {
    try {
      const startDate = `${date}T00:00:00`;
      const endDate = `${date}T23:59:59`;
      const response = await axios.get(`http://localhost:8082/orders/order_date?startDate=${startDate}&endDate=${endDate}`);
      setOrders(response.data);
      processPieChartData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const processPieChartData = (orders) => {
    const statusCounts = {};
    orders.forEach(order => {
      const statusName = order.status.statusName;
      statusCounts[statusName] = (statusCounts[statusName] || 0) + 1;
    });

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    setPieChartData({
      labels,
      datasets: [{
        label: 'Số lượng đơn hàng theo trạng thái',
        data: data,
        backgroundColor: ['#4BC0C0', '#58DD00', '#FF9F40', '#FF4040'],
      }]
    });
  };

  useEffect(() => {
    fetchOrders(selectedDate);
  }, [selectedDate]);

  return (
    <Card className="bg-light shadow-lg rounded mb-4">
      <Card.Body>
        <h5 className="card-title text-center text-primary"><FaChartPie /> Biểu đồ trạng thái đơn hàng</h5>
        <Doughnut
          data={pieChartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} đơn hàng`
                }
              }
            }
          }}
        />
      </Card.Body>
    </Card>
  );
}

function BieuDoCot({ selectedDate }) {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchOrders = async (date) => {
    try {
      const startDate = `${date}T00:00:00`;
      const endDate = `${date}T23:59:59`;
      const response = await axios.get(`http://localhost:8082/orders/order_date?startDate=${startDate}&endDate=${endDate}`);
      setOrders(response.data);
      processData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const processData = (orders) => {
    const labels = [];
    const totalAmounts = [];
    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      const orderTime = `${orderDate.getHours()}:${orderDate.getMinutes()}`;

      if (!labels.includes(orderTime)) {
        labels.push(orderTime);
        totalAmounts.push(order.totalAmount);
      } else {
        const index = labels.indexOf(orderTime);
        totalAmounts[index] += order.totalAmount;
      }
    });

    setChartData({
      labels,
      datasets: [{
        label: 'Doanh thu theo giờ',
        data: totalAmounts,
        backgroundColor: '#4BC0C0',
      }]
    });
  };

  useEffect(() => {
    fetchOrders(selectedDate);
  }, [selectedDate]);

  return (
    <Card className="bg-light shadow-lg rounded mb-4">
      <Card.Body>
        <h5 className="card-title text-center text-success"><FaRegClock /> Doanh thu theo giờ</h5>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }}
        />
      </Card.Body>
    </Card>
  );
}

function BieuDoJday({ selectedDate }) {
  const [orders, setOrders] = useState([]);
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchOrders = async (date) => {
    try {
      const startDate = `${date}T00:00:00`;
      const endDate = `${date}T23:59:59`;
      const response = await axios.get(`http://localhost:8082/orders/order_date?startDate=${startDate}&endDate=${endDate}`);
      setOrders(response.data);
      processData(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const processData = (orders) => {
    const labels = [];
    const orderCounts = [];

    orders.forEach(order => {
      const orderDate = new Date(order.orderDate);
      const orderTime = `${orderDate.getHours()}:00`;

      if (!labels.includes(orderTime)) {
        labels.push(orderTime);
        orderCounts.push(1);
      } else {
        const index = labels.indexOf(orderTime);
        orderCounts[index]++;
      }
    });

    setLineChartData({
      labels,
      datasets: [{
        label: 'Số lượng đơn hàng theo giờ',
        data: orderCounts,
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        tension: 0.4,
      }]
    });
  };

  useEffect(() => {
    fetchOrders(selectedDate);
  }, [selectedDate]);

  return (
    <Card className="bg-light shadow-lg rounded mb-4">
      <Card.Body>
        <h5 className="card-title text-center text-danger"><FaChartLine /> Số lượng đơn hàng theo giờ</h5>
        <Line
          data={lineChartData}
          options={{
            responsive: true,
            scales: {
              y: { beginAtZero: true, title: { display: true, text: 'Số lượng đơn hàng' } },
              x: { title: { display: true, text: 'Giờ trong ngày' } }
            },
            plugins: {
              legend: { display: true, position: 'top' }
            }
          }}
        />
      </Card.Body>
    </Card>
  );
}

function Statistical() {
  const [selectedDate, setSelectedDate] = useState();

  const fetchCurrentDate = async () => {
    try {
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const currentDate = new Date(response.data.datetime).toISOString().split('T')[0];
      setSelectedDate(currentDate);
    } catch (error) {
      console.error('Error fetching current date:', error);
      setSelectedDate('2024-12-16');
    }
  };

  useEffect(() => {
    fetchCurrentDate();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '10px' }}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ padding: '10px', fontSize: '16px', borderRadius: '8px' }}
        />
      </div>

      <Container className="mt-4">
        <Row className="g-4">
          <Col xs={12} md={6}>
            <BieuDoCot selectedDate={selectedDate} />
            <BieuDoJday selectedDate={selectedDate} />
          </Col>
          <Col xs={12} md={6}>
            <BieuDoTron selectedDate={selectedDate} />
          </Col>
        </Row>
      </Container>

      <footer style={{ textAlign: 'center', marginTop: '15px', backgroundColor: '#f5f5f5', padding: '20px', borderTop: '1px solid #ddd' }}>
        <p>&copy; 2024 Thống Kê Đơn Hàng</p>
      </footer>
    </>
  );
}

export default Statistical;
