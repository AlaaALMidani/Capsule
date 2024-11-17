import React from 'react';
import Navbar from '../../components/Navbar.jsx';
import pharma from '../../styles/pharma.png';
import Button from '@mui/material/Button/index.js';

export const PharmacyHome = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#f0f4f8', 
          backgroundImage: 'linear-gradient(to bottom right, #d9e9f6, #b3d4e8)', 
          minHeight: '50vh', 
          padding: '20px',
          
        }}
      >
        <Navbar />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
         
          <div style={{ display: 'flex', gap: '30px' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#1b8942',
                '&:hover': { backgroundColor: '#082544' }, 
                color: 'white', 
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
              }}
            >
              Add New Post
            </Button>
          </div>

     
          <img
            src={pharma}
            alt="Logo"
            style={{ maxWidth: '300px', height: 'auto' }}
          />
        </div>
      </div>
    </>
  );
};
