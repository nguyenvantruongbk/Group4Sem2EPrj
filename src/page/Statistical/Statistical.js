import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Cấu hình cho biểu đồ
ChartJS.register(
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

  // Hàm gọi API để lấy dữ liệu đơn hàng theo ngày
  const fetchOrders = async (date) => {
    try {
      const startDate = `${date}T00:00:00`;
      const endDate = `${date}T23:59:59`;
      const response = await axios.get(`http://localhost:8082/orders/order_date?startDate=${startDate}&endDate=${endDate}`);
      setOrders(response.data);
      processPieChartData(response.data); // Cập nhật dữ liệu cho biểu đồ tròn
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Xử lý dữ liệu cho biểu đồ tròn (Doughnut)
  const processPieChartData = (orders) => {
    const statusCounts = {}; // Đếm số lượng đơn hàng theo trạng thái

    orders.forEach(order => {
      const statusName = order.status.statusName;
      if (statusCounts[statusName]) {
        statusCounts[statusName]++;
      } else {
        statusCounts[statusName] = 1;
      }
    });

    // Lấy labels và data cho biểu đồ tròn
    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    setPieChartData({
      labels,
      datasets: [
        {
          label: 'Số lượng đơn hàng theo trạng thái',
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(88, 221, 0, 0.6)', 'rgba(255, 159, 64, 0.6)','rgba(255, 64, 64, 0.6)'],
        },
      ],
    });
  };

  // Lấy dữ liệu khi selectedDate thay đổi
  useEffect(() => {
    fetchOrders(selectedDate);
  }, [selectedDate]);

  return (
    <div >
        <div>
      <h2 style={{ textAlign: 'center' }}>Thống kê đơn hàng theo trạng thái</h2>

      {/* Biểu đồ tròn (Doughnut) */}
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
                label: (tooltipItem) => {
                  return `${tooltipItem.label}: ${tooltipItem.raw} đơn hàng`;
                },
              },
            },
          },
        }}
      />
      </div>
    </div>
  );
}

function BieuDoCot({ selectedDate }) {
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Hàm gọi API để lấy dữ liệu đơn hàng theo ngày
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

    // Duyệt qua tất cả các đơn hàng để lấy dữ liệu
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
      datasets: [
        {
          label: 'Doanh thu theo giờ',
          data: totalAmounts,
          backgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    });
  };

  // Lấy dữ liệu khi selectedDate thay đổi
  useEffect(() => {
    fetchOrders(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div>
        <h2 style={{ textAlign: 'center' }}>Thống kê doanh thu theo giờ</h2>

        {/* Biểu đồ cột */}
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </>
  );
}

function Statistical() {
  const [selectedDate, setSelectedDate] = useState();
  const fetchCurrentDate = async () => {
    try {
      // Gọi API để lấy ngày hiện tại (sử dụng World Time API hoặc API tương tự)
      const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh');
      const currentDate = new Date(response.data.datetime).toISOString().split('T')[0]; // Lấy ngày dưới định dạng 'YYYY-MM-DD'
      setSelectedDate(currentDate);
    } catch (error) {
      console.error('Error fetching current date:', error);
      setSelectedDate('2024-12-16'); // Nếu có lỗi, mặc định là ngày này
    }
  };

  // Gọi hàm fetchCurrentDate khi component được load lần đầu
  useEffect(() => {
    fetchCurrentDate();
  }, []);

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <Container>
        <Row>
          <Col xs={6} ><BieuDoCot selectedDate={selectedDate} /></Col>
          <Col style={{display:`flex` , justifyContent:`center`}}><BieuDoTron selectedDate={selectedDate} /></Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
      </Container>
    </>
  );
}

export default Statistical;
