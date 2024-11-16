import { useEffect, useState } from 'react';
import { Chart, LineElement, PointElement, LineController, LinearScale, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(LineElement, PointElement, LineController, LinearScale, CategoryScale);


const LineChart = () => {
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/mockOrders.json"); 
        const data = await response.json();

        if (data.ok) {

          const users = data.users.map(user => ({
            id: user._id,
            name: user.fullName,
            role: user.roleID,
            active: user.active,
          }));
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


  const chartData = {
    labels: orderData.map(order =>
      order.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    ),
    datasets: [
      {
        label: "Orders Over Time",
        data: orderData.map(order => order.status === "pending" ? 1 : 0), // مثال
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Order Statistics" },
    },
  };

  return (
    <div className="dashboard">
      <h1>User & Order Statistics</h1>
      <div>
        <h2>Total Users: {userData.length}</h2>
        <h2>Active Users: {userData.filter(user => user.active).length}</h2>
        <h2>Total Orders: {orderData.length}</h2>
      </div>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default LineChart;


