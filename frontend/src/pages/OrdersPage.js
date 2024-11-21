import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import HeroSection from "../components/HeroSection";
import ListContainer from "../components/ListContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCustomersOrdersAsync } from "../slices/orderSlices";
import LoadingCard from "../components/OnLoading";
import NoData from "../components/NoData";
import { Order } from "../components/Order";
import AddOffer from "../components/AddOffers";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null); // Track the order being worked on

  useEffect(() => {
    dispatch(getCustomersOrdersAsync());
  }, [dispatch]);

  const state = useSelector((state) => state.order.getCustomersOrders);

  const handleAddOffer = (order) => {
    setCurrentOrder(order); // Set the current order for the offer
    setIsAddOfferOpen(true); // Open the popup
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Explore Customer Orders"
        description="Review and manage customer requests efficiently. Stay updated with their needs and respond to orders seamlessly."
        imageSrc={require("../assets/img/MedicineDelivery.png")}
        buttonEnabled={false}
      />

      {/* Add Offer Popup */}
      <Popup
        open={isAddOfferOpen}
        onClose={() => setIsAddOfferOpen(false)}
        modal
        closeOnDocumentClick
        contentStyle={{
          width: "50%",
          maxWidth: "600px",
          background: "white",
          borderRadius: "8px",
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <AddOffer
          onClose={() => setIsAddOfferOpen(false)}
          order={currentOrder} // Pass the current order to AddOffer if needed
        />
      </Popup>

      {/* Customer Orders List */}
      <ListContainer
        title="Customer Orders"
        description="Here is a list of all Customer orders."
      >
        {state.loading || !state.data ? (
          <LoadingCard />
        ) : !state.data.success ? (
          <NoData />
        ) : (
          state.data.orders.map((order) => (
            <Order
              key={order._id}
              order={order}
              onAddOffer={() => handleAddOffer(order)} // Pass the callback
            />
          ))
        )}
      </ListContainer>
    </div>
  );
};

export default OrdersPage;
