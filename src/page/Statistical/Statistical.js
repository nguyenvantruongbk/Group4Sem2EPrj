  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { Bar, Doughnut ,Line  } from 'react-chartjs-2';
  import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,LineElement,PointElement } from 'chart.js';

  import Container from 'react-bootstrap/Container';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';

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
      <>
        <div style={{display:`flex` , justifyContent:`center` }}>
            
          

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
        <h2 style={{ textAlign: 'center', marginTop:`20px` }}>Thống kê Trạng Thái</h2>
      </>
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

  function BieuDoJday({ selectedDate }) {
    const [orders, setOrders] = useState([]);
    const [lineChartData, setLineChartData] = useState({
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
        processData(response.data); // Xử lý dữ liệu cho biểu đồ đường
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    // Xử lý dữ liệu cho biểu đồ đường (Line Chart)
    const processData = (orders) => {
      const labels = [];
      const orderCounts = [];
  
      orders.forEach(order => {
        const orderDate = new Date(order.orderDate);
        const orderTime = `${orderDate.getHours()}:00`; // Lấy giờ trong ngày, làm tròn đến giờ
  
        if (!labels.includes(orderTime)) {
          labels.push(orderTime);
          orderCounts.push(1); // Bắt đầu đếm số lượng đơn hàng
        } else {
          const index = labels.indexOf(orderTime);
          orderCounts[index]++;
        }
      });
  
      setLineChartData({
        labels,
        datasets: [
          {
            label: 'Số lượng đơn hàng theo giờ',
            data: orderCounts,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            tension: 0.4, // Làm mượt đường cong
          },
        ],
      });
    };
  
    // Lấy dữ liệu khi selectedDate thay đổi
    useEffect(() => {
      fetchOrders(selectedDate);
    }, [selectedDate]);
  
    return (
      <div>

        <Line
          data={lineChartData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Số lượng đơn hàng',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Giờ trong ngày',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          }}
        />
      </div>
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
            <Col className="bg-dark shadow-lg p-3 mb-5 rounded text-white"  xs={6} ><BieuDoCot selectedDate={selectedDate} /> <BieuDoJday  selectedDate={selectedDate}/> </Col>
            <Col className="bg-light shadow-lg p-3 mb-5 rounded"><BieuDoTron selectedDate={selectedDate} /></Col>
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
