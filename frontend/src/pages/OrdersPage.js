import React from "react";
import { Order } from "../components/Order";
import HeroSection from '../components/HeroSection';
import ListContainer from "../components/ListContainer";

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
    <div>

      <HeroSection
       title='Explore Customer Orders'
        description='Review and manage customer requests efficiently. Stay updated with their needs and respond to orders seamlessly.'
        imageSrc={require("../assets/img/MedicineDelivery.png")}
        buttonEnabled={false}
      />
      <ListContainer
         title="Customer Orders"
         description="Here is a list of all Customer orders."
         >
        {fakeOrders.map((order) => (
          <Order key={order.id} offerMessage={order.offerMessage} />
        ))}
      </ListContainer>



    </div>
  );
};

export default OrdersPage;