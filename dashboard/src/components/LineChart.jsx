import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, LineElement, PointElement, LineController, LinearScale, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(LineElement, PointElement, LineController, LinearScale, CategoryScale);

const LineChart = () => {
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/mockOrders.json');
        const data = response.data;

        if (data.ok) {
          const users = data.users?.map(user => ({
            id: user._id,
            name: user.fullName,
            role: user.roleID,
            active: user.active,
          })) || [];
          setUserData(users);

          const orders = data.orders.map(order => ({
            id: order._id,
            status: order.status,
            createdAt: new Date(order.createdAt),
          }));
          setOrderData(orders);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatChartData = (orders) => {
    const dataByDate = {};

    orders.forEach(order => {
      const date = order.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" });

      if (!dataByDate[date]) {
        dataByDate[date] = {
          pending: 0,
          inProgress: 0,
          completed: 0,
          canceled: 0,
        };
      }

      if (order.status === "pending") {
        dataByDate[date].pending += 1;
      } else if (order.status === "inProgress") {
        dataByDate[date].inProgress += 1;
      } else if (order.status === "completed") {
        dataByDate[date].completed += 1;
      } else if (order.status === "canceled") {
        dataByDate[date].canceled += 1;
      }
    });

    const labels = Object.keys(dataByDate);
    const pendingData = labels.map(label => dataByDate[label].pending);
    const inProgressData = labels.map(label => dataByDate[label].inProgress);
    const completedData = labels.map(label => dataByDate[label].completed);
    const canceledData = labels.map(label => dataByDate[label].canceled);

    return {
      labels,
      datasets: [
        {
          label: "Pending Orders",
          data: pendingData,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.4,
        },
        {
          label: "In Progress Orders",
          data: inProgressData,
          borderColor: "rgba(255,159,64,1)",
          backgroundColor: "rgba(255,159,64,0.2)",
          tension: 0.4,
        },
        {
          label: "Completed Orders",
          data: completedData,
          borderColor: "rgba(153,102,255,1)",
          backgroundColor: "rgba(153,102,255,0.2)",
          tension: 0.4,
        },
        {
          label: "Canceled Orders",
          data: canceledData,
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  const chartData = formatChartData(orderData);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Order Statistics Over Time" },
    },
  };

  return (
    <div className="dashboard">
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LineChart;
