import React from 'react';
import { Tabs } from 'antd';
import { CurrentOrderCard } from '../components/CurrentOrderCard';
import { PreviosOrderCard } from '../components/PreviosOrderCard';

const { TabPane } = Tabs;

const fakeCurrentOrders = [
  {
    _id: 'order1',
    senderId: 'user123',
    status: 'inProgress',
    createdAt: '2024-11-01',
    message: '3 packs of aspirin',
    photo: '/static/images/cards/medicine.jpg',
    location: 'New York, NY',
  },
];

const fakePreviousOrders = [
  {
    _id: 'order2',
    senderId: 'user123',
    status: 'completed',
    createdAt: '2024-10-15',
    message: '2 packs of paracetamol',
    photo: '/static/images/cards/medicine.jpg',
    location: 'Los Angeles, CA',
  },
  {
    _id: 'order3',
    senderId: 'user123',
    status: 'completed',
    createdAt: '2024-09-10',
    message: '1 pack of ibuprofen',
    photo: '/static/images/cards/medicine.jpg',
    location: 'Chicago, IL',
  },
];

const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center m-10 p-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Order History</h2>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Current Order" key="1">
            <div className="flex flex-col items-center space-y-6 py-4">
              {fakeCurrentOrders.map((order) => (
                <CurrentOrderCard key={order._id} order={order} />
              ))}
            </div>
          </TabPane>
          <TabPane tab="Previous Order" key="2">
            <div className="flex flex-col items-center space-y-6 py-4">
              {fakePreviousOrders.map((order) => (
                <PreviosOrderCard key={order._id} order={order} />
              ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default HistoryPage;
