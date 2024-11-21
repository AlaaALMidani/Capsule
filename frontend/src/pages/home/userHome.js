import React, { useEffect, useState } from "react";
// import { Box, useMediaQuery } from "@mui/material";
import Popup from "reactjs-popup";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Post from "../../components/Post";

import HeroSection from "../../components/HeroSection";
import AddOrder from "../../components/AddOrders";
import LoadingCard from "../../components/OnLoading";
import { getAllPostsAsync } from "../../slices/postSlices";
import ListContainer from "../../components/ListContainer";

export const PharmacyHome = () => {
  const dispatch = useDispatch();

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
 

  const state = useSelector((state) => state.post.getAllPosts);

  useEffect(() => {
    dispatch(getAllPostsAsync());
  }, [dispatch]);

  const renderLoadingCards = () => (
    <div className="flex flex-col px-44 mt-20">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );

  return (
    <div >
      {/* Hero Section */}
      <HeroSection
        imageSrc={require("../../assets/img/image.png")}
        title="Welcome, Trusted Pharmacist!"
        description="As a valued pharmacist, we’re here to support you in managing your pharmacy operations efficiently. Explore tools tailored to help you handle orders, connect with distributors, and better serve your customers. Let’s work together to make healthcare more accessible and reliable."
        buttonEnabled={true}
        buttonText="Order Now"
        buttonAction={() => setIsAddOrderOpen(true)}
      />

      <div className="mt-6 m-auto">
        {/* Add Order Popup */}
        <Popup
          open={isAddOrderOpen}
          onClose={() => setIsAddOrderOpen(false)}
          modal
          closeOnDocumentClick
          contentStyle={{
            width: '50%',
            maxWidth: '600px',
            background: 'white',
            borderRadius: '8px',
            // padding: '20px',
            animation: 'popupAnimation 0.3s ease-out',
          }}
          overlayStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            animation: 'fade-in 0.3s ease-out',
          }}
        >
          <AddOrder onClose={() => setIsAddOrderOpen(false)} />
        </Popup>

        <div className="w-full max-w-[1400px] mx-auto py-8">
          <ListContainer
            title="Latest Posts Offers"
            description="Explore the newest product offers and promotions from suppliers. and Share your own deals to stand out by clicking the button below!"
          >
            {state.loading ?
              <div className="flex flex-col px-44 mt-20 ">
                <LoadingCard />
              </div>
              : <></>}

            {state.data ?
              <div className="w-full max-w-[1400px] mx-auto">
                {state.data.posts.map((post) => (
                  <div className="mb-1">
                    <Post
                      key={post.id}
                      description={post.description}
                      postPhoto={post.postPhoto}
                      productName={post.productName}
                      video={post.video}
                      createdAt={post.createdAt}
                      isLiked={post.isLiked}
                      likesCount={post.likesCount}
                      isMine={true}
                    />
                  </div>
                ))}
              </div> : <div></div>}
          </ListContainer>
        </div>
      </div>
    </div>
  );
};

