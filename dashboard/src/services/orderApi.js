export const fetchOrderStatistics = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/admin/allOrders");
      const data = await response.json();
  
      if (data && data.orders) {
        const statistics = data.orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});
        return statistics;
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error fetching order statistics:", error);
      throw error;
    }
  };
  