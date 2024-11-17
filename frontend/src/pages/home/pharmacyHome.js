import React from 'react';
import { useState } from 'react'

import Button from '@mui/material/Button/index.js'
import Post from '../../components/Post.js'
import { Box, Grid2, useMediaQuery } from '@mui/material';
import AddPost from '../../components/AddPost.js'
import Popup from 'reactjs-popup';
import doctor from '../../assets/img/doctorImage2.png';
import camera from '../../assets/img/camera.svg'
export const PharmacyHome = () => {

  // Check if the screen size is small (mobile)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [isOpen, setIsOpen] = useState(false); // State to manage popup visibility

  const posts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3' },
  ];

  return (
    <div className={` ${isOpen ? 'backdrop-brightness-150 ' : ''}`}>
      <div
        className={`bg-[#f0f4f8] bg-gradient-to-tr items-center from-[#d9e9f6] to-[#009dff] min-h-[50vh] p-5 transition-all duration-300 ${isOpen ? 'backdrop-blur-3xl' : ''}`}
      >
        <Box sx={{ marginTop: 4 }}>
          {/* Main Content Container */}
          <Grid2 container spacing={4} alignItems="center" justifyContent="space-between">
            <Grid2 item xs={12} md={6}>
              {/* Buttons Section */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  padding: '50px',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#1b8942',
                    '&:hover': { backgroundColor: '#082544' },
                    color: 'white',
                    padding: isMobile ? '12px 20px' : '12px 30px',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  Add New Order
                </Button>
              </Box>
            </Grid2>

            <Grid2 item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: isMobile ? '20px' : '0',
                }}
              > <img
                  src={doctor}
                  alt="Logo"
                  style={{
                    maxWidth: '100%',
                    width: '700px',
                    height: 'auto',
                  }}
                />
              </Box>
            </Grid2>

          </Grid2>

        </Box>
      </div>
      <div className='mt-6 m-auto'>

        <Popup

          trigger={
            <div className='flex justify-center m-8 '>
              <img src={camera} className='h-20 mr-3 cursor-pointer ' alt='camera' />
              <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 cursor-pointer bg-indigo-900 bg-opacity-40 px-10 shadow-lg h-20  rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold ">Tell us about your product...
                </span>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-2xl ml-3 font-bold">ADD POST</button>
            </div>
          }
          onClose={() => setIsOpen(false)} // Close popup
          open={isOpen}
          modal
          closeOnDocumentClick
        >
          {close => (
            <AddPost />
          )}
        </Popup>

        {posts.map((post) => (
          <div className='mb-4'>
            <Grid2 item xs={12} sm={6} md={4} key={post.id} spacing={2}>
              <Post title={post.title} content={post.content} />
            </Grid2></div>
        ))}
      </div>
    </div>
  );
};
