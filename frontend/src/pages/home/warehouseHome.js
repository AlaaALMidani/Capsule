import React, { useState } from "react";
import Button from "@mui/material/Button/index.js";
import Post from "../../components/Post.js";
import { Box, Grid2, useMediaQuery } from "@mui/material";
import AddPost from "../../components/AddPosts.js";
import Popup from "reactjs-popup";
import doctor from "../../assets/img/doctorImage2.png";
import camera from "../../assets/img/camera.svg";
import AddOrder from "../../components/AddOrders.js";
import HeroSection from "../../components/HeroSection";


const WarehouseHome = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNiNDZiYWY4NDYwNDk0ZjE5ODRiZDkiLCJpYXQiOjE3MzE5Mzc5NzgsImV4cCI6MTczMjAyNDM3OH0.2p2hy1ug8erSlLukGneCn_VfVR3-fNgxY2c9RVPvMuc";
  const posts = [
    { id: 1, title: "Post 1", content: "Content of Post 1" },
    { id: 2, title: "Post 2", content: "Content of Post 2" },
    { id: 3, title: "Post 3", content: "Content of Post 3" },
  ];

  return (
    <div className={`${isOpen ? "backdrop-brightness-150 " : ""}`}>

    
      {/* HeroSection Section */}
      <HeroSection
        isMobile={isMobile}
        imageSrc={require("../../assets/img/pharmaceutical-storage.webp")}
        title="Welcome to Your Supplier..."
        description="Explore the best pharmaceutical solutions and products tailored to meet your needs. We connect pharmacists with trusted suppliers to provide a reliable and secure platform for your professional needs."
        buttonEnabled={false}
        // buttonText="Click Me"
        // buttonAction={() => alert("Button Clicked!")}
      />

      {/* AddOrder Popup */}
      <Popup
        open={isAddOrderOpen}
        onClose={() => setIsAddOrderOpen(false)}
        modal
        closeOnDocumentClick
      >
        <AddOrder onClose={() => setIsAddOrderOpen(false)} token={token} />
      </Popup>

      {/* Existing AddPost Popup */}
      <Popup
        trigger={
          <div className="flex justify-center m-8">
            <img
              src={camera}
              className="h-20 mr-3 cursor-pointer"
              alt="camera"
            />
            <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 cursor-pointer bg-indigo-900 bg-opacity-40 px-10 shadow-lg h-20 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold">
                Tell us about your product...
              </span>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-2xl ml-3 font-bold">
              ADD POST
            </button>
          </div>
        }
        onClose={() => setIsOpen(false)}
        open={isOpen}
        modal
        closeOnDocumentClick
      >
        {(close) => <AddPost />}
      </Popup>

      {/* Posts Section */}
      <div className="mt-6 m-auto">
        {posts.map((post) => (
          <div className="mb-4" key={post.id}>
            <Grid2 item xs={12} sm={6} md={4} spacing={2}>
              <Post title={post.title} content={post.content} />
            </Grid2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WarehouseHome;
