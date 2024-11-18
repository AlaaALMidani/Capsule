import React, { useEffect, useState } from 'react';
import { OrderServices } from '../services/orderServices'; // Adjust the import according to your file structure

const Test = () => {
    const [orders, setOrders] = useState([]); // Initialize as an empty array
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNiNDZiYWY4NDYwNDk0ZjE5ODRiZDkiLCJpYXQiOjE3MzE5Mzc5NzgsImV4cCI6MTczMjAyNDM3OH0.2p2hy1ug8erSlLukGneCn_VfVR3-fNgxY2c9RVPvMuc"; // Ensure token is valid

    const fetchOrders = async () => {
        try {
            const result = await OrderServices.getAllOrders(token);
            console.log("Fetched Orders:", result); // Log the result for debugging

            // Check if the result has a property indicating an error
            if (result && result.error) {
                console.error("Error from API:", result.error);
                return; // Exit if there is an error
            }

            // Check if result is an array
                setOrders(result.orders);
            
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleAddOrder = async () => {
        const newOrderData = { /* Your order data here */ };
        const result = await OrderServices.addOrder(newOrderData, token);
        console.log("Added Order:", result);
        fetchOrders(); // Refresh order list after adding
    };

    const handleDeleteOrder = async (orderId) => {
        const result = await OrderServices.deleteOrder(orderId, token);
        console.log("Deleted Order:", result);
        fetchOrders(); // Refresh order list after deletion
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Order List</h1>
            {/* <button onClick={handleAddOrder}>Add Order</button> */}
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.name} {/* Adjust according to your order object structure */}
                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Test;