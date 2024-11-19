import React from "react";
import { AddOffer } from "../components/AddOffer";


const fakeOrders = [
  {
    id: 1,
    message: "Order for 50 units of Product A.",
    location: "123 Main St, Cityville",
    status: "completed",
    offerMessage: "Get 10% off your next order!",
  },
  {
    id: 2,
    message: "Order for 30 units of Product B.",
    location: "456 Elm St, Townsville",
    status: "pending",
    offerMessage: "Free shipping on orders over $100!",
  },
  {
    id: 3,
    message: "Order for 20 units of Product C.",
    location: "789 Oak St, Villagetown",
    status: "inProgress",
    offerMessage: "Buy one, get one free on select items!",
  },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10 p-[5%] pt-[100px] space-y-10">
      {fakeOrders.map((order) => (
        <AddOffer key={order.id} offerMessage={order.offerMessage} />
      ))}
    </div>
  );
};

export default OrdersPage;