import React from 'react';
//import Navbar from '../../components/Navbar.jsx';
import pharma from '../../styles/pharma.png';
import Button from '@mui/material/Button/index.js'
import Post from '../../components/Post.js'
import { Box, Grid, useMediaQuery, Typography } from '@mui/material';

export const PharmacyHome = () => {
  // Check if the screen size is small (mobile)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const posts = [
    { id: 1, title: 'Post 1', content: 'Content of Post 1' },
    { id: 2, title: 'Post 2', content: 'Content of Post 2' },
    { id: 3, title: 'Post 3', content: 'Content of Post 3' },
  ];

  return (
    <>
      <div
        style={{
          backgroundColor: '#f0f4f8',
          backgroundImage: 'linear-gradient(to bottom right, #d9e9f6, #b3d4e8)',
          minHeight: '50vh', // full screen height
          padding: '20px',
        }}
      >
        

        <Box sx={{ marginTop: 4 }}>
          {/* Main Content Container */}
          <Grid container spacing={4} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6}>
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

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#103758',
                    '&:hover': { backgroundColor: '#082544' },
                    color: 'white',
                    padding: isMobile ? '12px 20px' : '12px 30px',
                    width: isMobile ? '100%' : 'auto',
                  }}
                >
                  Add New Post
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: isMobile ? '20px' : '0',
                }}
              >
                <img
                  src={pharma}
                  alt="Logo"
                  style={{
                    maxWidth: '100%',
                    width: '700px',
                    height: 'auto',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>


      </div>
      <div className='mt-6'>
        {posts.map((post) => (
          <div className='mb-4'>
            <Grid item xs={12} sm={6} md={4} key={post.id} spacing={2}>
              <Post title={post.title} content={post.content} />
            </Grid></div>
        ))}
      </div>
    </>
  );
};
 