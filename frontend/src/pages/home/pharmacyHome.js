import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Popup from "reactjs-popup";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Post from "../../components/Post";
import AddPost from "../../components/AddPosts";
import HeroSection from "../../components/HeroSection";
import AddOrder from "../../components/AddOrders";
import LoadingCard from "../../components/OnLoading";
import { getAllPostsAsync } from "../../slices/postSlices";

export const PharmacyHome = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);

  const { loading, data } = useSelector((state) => state.post.getAllPosts);

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

  const renderPosts = () => (
    <div className="w-full max-w-[1400px] mx-auto">
      {data.posts.map((post) => (
        <div key={post.id} className="mb-1">
          <Post
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
    </div>
  );

  return (
    <div className={isPostOpen ? "backdrop-brightness-150" : ""}>
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
        >
          <AddOrder onClose={() => setIsAddOrderOpen(false)} />
        </Popup>

        {/* Add Post Popup */}
        <Popup
          open={isAddPostOpen}
          onClose={() => setIsAddPostOpen(false)}
          modal
          closeOnDocumentClick
        >
          <AddPost onClose={() => setIsAddPostOpen(false)} />
        </Popup>

        <div className="w-full max-w-[1400px] mx-auto py-8">
          <div className="bg-[#b2dded] shadow-lg rounded-tl-3xl rounded-tr-3xl px-6 py-8 flex flex-col items-center -mt-32 relative z-10">
            {/* Add Post Button */}
            <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 cursor-pointer bg-[#147023] bg-opacity-40 px-10 shadow-lg h-20 rounded-2xl flex items-center justify-center mb-6 relative">
              <span className="text-white font-bold">
                Tell us about your product...
              </span>
              <button
                className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-lg hover:bg-green-700 transition-all duration-300"
                style={{ boxShadow: "0 9px 22px rgba(0, 0, 0, 1)" }}
                onClick={() => setIsAddPostOpen(true)}
              >
                <AiOutlinePlus className="w-6 h-6" />
              </button>
            </div>

            {/* Loading or Posts */}
            {loading ? renderLoadingCards() : data && renderPosts()}
          </div>
        </div>
      </div>
    </div>
  );
};

