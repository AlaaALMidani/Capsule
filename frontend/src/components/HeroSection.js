import React from "react";
import { Box, Grid2 } from "@mui/material";
import Button from "@mui/material/Button";
import heroBg from "../assets/img/hero-bg.png";

const HeroSection = ({
  imageSrc = require("../assets/img/image.png"), 
  title = "Welcome", 
  description = "We’re here to assist you with your pharmacy needs. Explore the options below to add a new order or learn more about our services!", 
  buttonEnabled = true, 
  buttonText = "Add New Order", 
  buttonAction = () => {}, 
  isMobile = false, 
}) => {
  return (
    <div
      className="bg-center p-[5%] pt-[100px] flex items-center justify-center transition-all duration-300"
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
              {title}
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
              {description}
            </p>

            {/* Add New Order Button */}
            {buttonEnabled && (
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
                  fontFamily: "'Roboto', sans-serif",
                }}
                onClick={buttonAction}
              >
                {buttonText}
              </Button>
            )}
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
              src={imageSrc}
              alt="Pills"
              className={`${
                isMobile ? "w-[70%] max-w-[200px]" : "w-full max-w-[400px]"
              } animate-moveUpDown`}
              style={{
                height: "auto",
                margin: isMobile ? "0 auto" : "0",
              }}
            />
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
};

export default HeroSection;
