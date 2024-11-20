import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button/index.js";
import Post from "../../components/Post.js";
import { Box, Grid2, useMediaQuery } from "@mui/material";
import AddPost from "../../components/AddPosts.js";
import Popup from "reactjs-popup";
import { AiOutlinePlus } from 'react-icons/ai';
import doctor from "../../assets/img/doctorImage2.png";
// import image from "../../assets/img/banner.png";
// import image from "../../assets/img/10371012.png";
import image from "../../assets/img/image.png";
import bgimg from "../../assets/img/white-blue.jpg"
import heroBg from "../../assets/img/hero-bg.png";
import { blue } from "@mui/material/colors";

import HeroSection from "../../components/HeroSection";

import camera from "../../assets/img/camera.svg";
import AddOrder from "../../components/AddOrders.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsAsync } from "../../slices/postSlices.js";
import LoadingCard from "../../components/OnLoading.js";

export const PharmacyHome = () => {
  // Check if the screen size is small (mobile)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostsAsync())
  }, []);
  const state = useSelector(state => state.post.getAllPosts)
  console.log(state)




  return (
    <div className={`${isPostOpen ? "backdrop-brightness-150" : ""}`}>
          <HeroSection
        isMobile={isMobile}
        imageSrc={require("../../assets/img/pharmaceutical-storage.webp")}
        title="Welcome to Your Supplier..."
        description="Explore the best pharmaceutical solutions and products tailored to meet your needs. We connect pharmacists with trusted suppliers to provide a reliable and secure platform for your professional needs."
        buttonEnabled={false}
        // buttonText="Click Me"
        buttonAction={() => setIsAddOrderOpen(true)}
        />        
      <div className="mt-6 m-auto">



        {/* AddOrder Popup */}
        <Popup
          open={isAddOrderOpen}
          onClose={() => setIsAddOrderOpen(false)}
          modal
          closeOnDocumentClick
        >
          <AddOrder onClose={() => setIsAddOrderOpen(false)} />
        </Popup>

        <div className="w-full max-w-[1400px] mx-auto py-8">
          <div className="bg-[#b2dded] shadow-lg rounded-tl-3xl rounded-tr-3xl px-6 py-8 flex flex-col items-center -mt-32 relative z-10">

            <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 cursor-pointer bg-[#147023] bg-opacity-40 px-10 shadow-lg h-20 rounded-2xl flex items-center justify-center mb-6 relative">
              <span className="text-white font-bold">
                Tell us about your product...
              </span>

              <button
                className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow-lg hover:bg-green-700 transition-all duration-300"
                style={{
                  boxShadow: "0 9px 22px rgba(0, 0, 0, 1)",
                }}
              >
                <AiOutlinePlus className="w-6 h-6" />
              </button>
            </div>

            {state.loading ?

              <div className="flex flex-col px-44 mt-20 ">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
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



          </div>
        </div>





      </div>


    </div>
  );
}
