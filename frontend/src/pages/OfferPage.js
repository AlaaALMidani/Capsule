import React, { useEffect, useState } from 'react';
import { MyOrder } from '../components/MyOrder';
import { Offer } from '../components/Offer';
import { Card } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { gitMyOrdersWithOffers } from "../slices/offerSlices";
import OnLoading from "../components/OnLoading"
const OfferPage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gitMyOrdersWithOffers())
  }, []);


  const state = useSelector(state => state.offer.gitMyOrdersWithOffers)
  console.log(state)
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


        {state.success && state.data && state.data.success > 0 ? (
          state.data.orders.map(({ order }) => (
            <div key={order._id} className="mb-10">
              <MyOrder order={order} />


              <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h3 className="text-xl font-semibold mb-4 text-[#103758]">Offers for this Order:</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.offers.map((offer) => (
                    <Offer key={offer._id} offer={offer} />
                  ))}
                </div>

              </div>
            </div>
          ))
        ) : state.loading ? <OnLoading />:
         (
        <div className="text-gray-500">No orders available.</div>
        )}
      </Card>
    </div>
  );
};

export default OfferPage;

