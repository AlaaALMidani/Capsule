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

// import image from "../../assets/img/doctorImage2.png";

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
    <div className={`${isPostOpen ? "backdrop-brightness-150" : ""}`}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: '#a0c9d8',
      }}>
      <div
        className={`bg-center p-[5%] pt-[100px] flex items-center justify-center transition-all duration-300 ${isPostOpen ? "backdrop-blur-3xl" : ""
          } animate-move-right`}
        style={{
          backgroundImage: `url(${heroBg})`,

          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ width: "1400px", height: "100%" }}>
          <Grid2
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {/* Text Section */}
            <Grid2
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: isMobile ? "center" : "left",
                padding: isMobile ? "10px" : "150px",
                maxWidth: isMobile ? "100%" : "60%",
                flexGrow: 1,
              }}
            >
              <h1
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  fontWeight: "700",
                  color: "#156096",
                  marginBottom: "16px",
                }}
              >
                Welcome
              </h1>
              <p
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  lineHeight: isMobile ? 1.4 : 1.6,
                  color: "#555555",
                  wordWrap: "break-word",
                  textAlign: isMobile ? "center" : "left",
                  marginBottom: "16px",
                }}
              >
                We’re here to assist you with your pharmacy needs. Explore the
                options below to add a new order or learn more about our
                services!
              </p>

              {/* Add New Order Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1b8942",
                  "&:hover": { backgroundColor: "#082544" },
                  color: "white",
                  padding: isMobile ? "10px 20px" : "12px 30px",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  width: isMobile ? "80%" : "auto",
                  maxWidth: "250px",
                  margin: "0 auto",
                  fontFamily: "'Roboto', sans-serif", // Using Roboto for the button text
                }}
                onClick={() => setIsAddOrderOpen(true)}
              >
                Add New Order
              </Button>
            </Grid2>

            {/* Image Section */}
            <Grid2
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: isMobile ? "10px" : "20px",
                maxWidth: isMobile ? "100%" : "33%",
                flexGrow: 1,
              }}
            >
              <img
                src={image}
                alt="Doctor"
                style={{
                  width: isMobile ? "70%" : "100%",
                  maxWidth: isMobile ? "200px" : "400px",
                  height: "auto",
                  borderRadius: "8px",
                  transform: "rotate(-180deg)",
                  // filter: "blur(5px)",
                  margin: isMobile ? "0 auto" : "0",
                }}
              />
            </Grid2>
          </Grid2>
        </Box>
      </div>

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
