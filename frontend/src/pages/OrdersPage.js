import React, { useEffect } from "react";
import { Order } from "../components/Order";
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center mt-10 p-[5%] pt-[100px] space-y-10">
      {
        state.loading || !state.data ? <LoadingCard /> : !state.data.success ? <NoData /> : state.data.orders.map((order) => (
          <Order key={order._id} order={order} />
        ))
      }

    </div>
  );
};

export default OrdersPage;