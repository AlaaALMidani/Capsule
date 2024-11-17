import React from 'react';
import Navbar from '../../components/Navbar.jsx';
import pharma from '../../styles/pharma.png';
import Button from '@mui/material/Button/index.js'
import { Box, Grid, useMediaQuery, Typography } from '@mui/material';

export const PharmacyHome = () => {
  // Check if the screen size is small (mobile)
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <div
      style={{
        backgroundColor: '#f0f4f8',
        backgroundImage: 'linear-gradient(to bottom right, #d9e9f6, #b3d4e8)',
        minHeight: '100vh', // full screen height
        padding: '20px',
      }}
    >
      <Navbar />

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
            {/* Image Section */}
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
                  width: '300px', // Image size adjusts but keeps the aspect ratio
                  height: 'auto',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
