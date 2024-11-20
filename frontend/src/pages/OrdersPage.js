import React, { useEffect } from "react";
import { Order } from "../components/Order";
import HeroSection from '../components/HeroSection';
import ListContainer from "../components/ListContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCustomersOrdersAsync } from "../slices/orderSlices";
import LoadingCard from "../components/OnLoading";
import NoData from "../components/NoData";

const OrdersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomersOrdersAsync())
  }, []);


  const state = useSelector(state => state.order.getCustomersOrders)

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
          {
            state.loading || !state.data ? <LoadingCard /> : !state.data.success ? <NoData /> : state.data.orders.map((order) => (
              <Order key={order._id} order={order} />
            ))
          }
        </ListContainer>

      </div>
 );
};

      export default OrdersPage;