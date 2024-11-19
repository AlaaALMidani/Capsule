import React, { useEffect, useState } from 'react';
import { MyOrder } from '../components/MyOrder';
import { Offer } from '../components/Offer';
import { Card } from 'antd';

const OfferPage = () => {
  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState('');

  // Mock data for multiple orders
  const mockOrders = [
    
    {
      _id: 'order123',
      createdAt: '2024-11-18',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order123.',
      location: 'New York',
    },
    {
      _id: 'order5',
      createdAt: '2024-11-19',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order5.',
      location: 'Los Angeles',
    },
    {
      _id: 'order123',
      createdAt: '2024-11-18',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order123.',
      location: 'New York',
    },
    {
      _id: 'order5',
      createdAt: '2024-11-19',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order5.',
      location: 'Los Angeles',
    },{
      _id: 'order123',
      createdAt: '2024-11-18',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order123.',
      location: 'New York',
    },
    {
      _id: 'order5',
      createdAt: '2024-11-19',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order5.',
      location: 'Los Angeles',
    },{
      _id: 'order123',
      createdAt: '2024-11-18',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order123.',
      location: 'New York',
    },
    {
      _id: 'order5',
      createdAt: '2024-11-19',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order5.',
      location: 'Los Angeles',
    },{
      _id: 'order123',
      createdAt: '2024-11-18',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order123.',
      location: 'New York',
    },
    {
      _id: 'order5',
      createdAt: '2024-11-19',
      photo: 'https://via.placeholder.com/300',
      message: 'Order message for order5.',
      location: 'Los Angeles',
    },
  ];

  // Mock data for offers related to the orders
  const mockOffers = [
    {
      _id: 'offer1',
      senderID: 'user1',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 100,
      message: 'I can do it for $100',
      sentAt: '2024-11-18',
      estimatedCost: 120,
    },
    {
      _id: 'offer2',
      senderID: 'user3',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 80,
      message: 'I can do it for $80',
      sentAt: '2024-11-19',
      estimatedCost: 90,
    },
    {
      _id: 'offer3',
      senderID: 'user4',
      receiverID: 'user2',
      orderID: 'order5',
      cost: 70,
      message: 'I can do it for $70',
      sentAt: '2024-11-20',
      estimatedCost: 85,
    },
    {
      _id: 'offer1',
      senderID: 'user1',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 100,
      message: 'I can do it for $100',
      sentAt: '2024-11-18',
      estimatedCost: 120,
    },
    {
      _id: 'offer2',
      senderID: 'user3',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 80,
      message: 'I can do it for $80',
      sentAt: '2024-11-19',
      estimatedCost: 90,
    },
    {
      _id: 'offer3',
      senderID: 'user4',
      receiverID: 'user2',
      orderID: 'order5',
      cost: 70,
      message: 'I can do it for $70',
      sentAt: '2024-11-20',
      estimatedCost: 85,
    },{
      _id: 'offer1',
      senderID: 'user1',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 100,
      message: 'I can do it for $100',
      sentAt: '2024-11-18',
      estimatedCost: 120,
    },
    {
      _id: 'offer2',
      senderID: 'user3',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 80,
      message: 'I can do it for $80',
      sentAt: '2024-11-19',
      estimatedCost: 90,
    },
    {
      _id: 'offer3',
      senderID: 'user4',
      receiverID: 'user2',
      orderID: 'order5',
      cost: 70,
      message: 'I can do it for $70',
      sentAt: '2024-11-20',
      estimatedCost: 85,
    },{
      _id: 'offer1',
      senderID: 'user1',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 100,
      message: 'I can do it for $100',
      sentAt: '2024-11-18',
      estimatedCost: 120,
    },
    {
      _id: 'offer2',
      senderID: 'user3',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 80,
      message: 'I can do it for $80',
      sentAt: '2024-11-19',
      estimatedCost: 90,
    },
    {
      _id: 'offer3',
      senderID: 'user4',
      receiverID: 'user2',
      orderID: 'order5',
      cost: 70,
      message: 'I can do it for $70',
      sentAt: '2024-11-20',
      estimatedCost: 85,
    },{
      _id: 'offer1',
      senderID: 'user1',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 100,
      message: 'I can do it for $100',
      sentAt: '2024-11-18',
      estimatedCost: 120,
    },
    {
      _id: 'offer2',
      senderID: 'user3',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 80,
      message: 'I can do it for $80',
      sentAt: '2024-11-19',
      estimatedCost: 90,
    },
    {
      _id: 'offer3',
      senderID: 'user4',
      receiverID: 'user2',
      orderID: 'order5',
      cost: 70,
      message: 'I can do it for $70',
      sentAt: '2024-11-20',
      estimatedCost: 85,
    },{
      _id: 'offer1',
      senderID: 'user1',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 100,
      message: 'I can do it for $100',
      sentAt: '2024-11-18',
      estimatedCost: 120,
    },
    {
      _id: 'offer2',
      senderID: 'user3',
      receiverID: 'user2',
      orderID: 'order123',
      cost: 80,
      message: 'I can do it for $80',
      sentAt: '2024-11-19',
      estimatedCost: 90,
    },
    {
      _id: 'offer3',
      senderID: 'user4',
      receiverID: 'user2',
      orderID: 'order5',
      cost: 70,
      message: 'I can do it for $70',
      sentAt: '2024-11-20',
      estimatedCost: 85,
    },
  ];

  // Function to simulate fetching orders and their offers
  const fetchOrdersAndOffers = () => {
    try {
      setOrders(mockOrders); // Set the orders
      setOffers(mockOffers); // Set the offers
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchOrdersAndOffers();
  }, []);

  // Function to get offers related to a specific order ID
  const getOffersForOrder = (orderId) => {
    return offers.filter((offer) => offer.orderID === orderId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10 px-5 py-10 space-y-10">
      <Card
        style={{
          width: '100%',
          maxWidth: '60%',
          margin: '0 auto',
        }}
        bodyStyle={{ padding: 20 }}
      >
        {error && <div className="text-red-500">{error}</div>}

        {/* Display the orders and their related offers */}
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="mb-10">
              <MyOrder order={order}  />

              {/* Display offers related to this specific order */}
              <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h3 className="text-xl font-semibold mb-4 text-[#103758]">Offers for this Order:</h3>
                {getOffersForOrder(order._id).length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getOffersForOrder(order._id).map((offer) => (
                      <Offer key={offer._id} offer={offer} />
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No offers available for this order.</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No orders available.</div>
        )}
      </Card>
    </div>
  );
};

export default OfferPage;

