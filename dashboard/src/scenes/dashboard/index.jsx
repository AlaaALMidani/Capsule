import React, { useEffect, useState } from 'react';

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StartBox";
import ProgressCircle from "../../components/ProgressCirde";

import { tokens } from "../../assets/styles/theme";
import { fetchUsersData } from '../../services/fetchUsersData.js'; 



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsersData();
      setUsers(userData);
    };

    getUsers();
  }, []);
  



  const [userStats, setUserStats] = useState({
    pharmacy: 0,
    user: 0,
    warehouse: 0,
    driver: 0,
  });

  useEffect(() => {
    const getUserData = async () => {
      const users = await fetchUsersData();
      const stats = {
        pharmacy: users.filter((user) => user.accessLevel === "pharmacy").length,
        user: users.filter((user) => user.accessLevel === "user").length,
        warehouse: users.filter((user) => user.accessLevel === "warehouse").length,
        driver: users.filter((user) => user.accessLevel === "driver").length,
      };
      setUserStats(stats);
    };

    getUserData();
  }, []);
///////////////////////////////////////////////////////////////////////////////////////////////////




  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
  gridColumn="span 3"
  background={`linear-gradient(135deg, ${colors.primary[300]}, ${colors.greenAccent[400]})`}
  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
  borderRadius="12px"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  p="20px"
>
  <StatBox
    title={userStats.pharmacy}
    subtitle="Pharmacies"
    progress="0.75"
    increase="+14%"
    icon={
      <LocalPharmacyIcon
        sx={{
          color: colors.grey[100],
          fontSize: "36px",
          marginBottom: "10px",
        }}
      />
    }
  />
</Box>

<Box
  gridColumn="span 3"
  background={`linear-gradient(135deg, ${colors.primary[300]}, ${colors.greenAccent[400]})`}
  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
  borderRadius="12px"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  p="20px"
>
  <StatBox
    title={userStats.user}
    subtitle="Users"
    progress="0.50"
    increase="+21%"
    icon={
      <PersonIcon
        sx={{
          color: colors.grey[100],
          fontSize: "36px",
          marginBottom: "10px",
        }}
      />
    }
  />
</Box>

<Box
  gridColumn="span 3"
  background={`linear-gradient(135deg, ${colors.primary[300]}, ${colors.greenAccent[400]})`}
  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
  borderRadius="12px"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  p="20px"
>
  <StatBox
    title={userStats.warehouse}
    subtitle="Warehouses"
    progress="0.30"
    increase="+5%"
    icon={
      <WarehouseIcon
        sx={{
          color: colors.grey[100],
          fontSize: "36px",
          marginBottom: "10px",
        }}
      />
    }
  />
</Box>

<Box
  gridColumn="span 3"
  background={`linear-gradient(135deg, ${colors.primary[300]}, ${colors.greenAccent[400]})`}
  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
  borderRadius="12px"
  display="flex"
  flexDirection="column"
  alignItems="center"
  justifyContent="center"
  p="20px"
>
  <StatBox
    title={userStats.driver}
    subtitle="Drivers"
    progress="0.80"
    increase="+43%"
    icon={
      <LocalShippingIcon
        sx={{
          color: colors.grey[100],
          fontSize: "36px",
          marginBottom: "10px",
        }}
      />
    }
  />
</Box>



        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Order Status:
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Statistics on requests by status
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>







        <Box
      gridColumn="span 4"
      gridRow="span 3"
      backgroundColor={colors.primary[400]}
      overflow="auto"
      borderRadius="8px"
      className="scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-700"

    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[400]}`}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Latest Users
        </Typography>
      </Box>

      {users.map((user) => (
        <Box
          key={user.id}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor={colors.blueAccent[800]}
          borderRadius="8px"
          p="15px"
          m="10px"
        >
          <Box display="flex" alignItems="center" gap="15px">
            <PersonIcon style={{ color: colors.greenAccent[500], fontSize: "30px" }} />
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              >
                {user.name}
              </Typography>
              <Typography color={colors.grey[100]} display="flex" alignItems="center" gap="5px">
                <PhoneIcon fontSize="small" /> {user.phone}
              </Typography>
              <Typography color={colors.grey[100]} display="flex" alignItems="center" gap="5px">
                <LocationOnIcon fontSize="small" /> {user.location}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
          >
            <Typography color={user.active === "Active" ? colors.greenAccent[500] : colors.redAccent[500]}>
              {user.active === "Active" ? (
                <CheckCircleIcon style={{ color: colors.greenAccent[500] }} />
              ) : (
                <CancelIcon style={{ color: colors.redAccent[500] }} />
              )}
              {user.active}
            </Typography>
          </Box>

          <Typography
            color={colors.grey[100]}
            backgroundColor={colors.blueAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            {user.accessLevel}
          </Typography>
        </Box>
      ))}
    </Box>





        {/* ROW 3 */}
        <Box
  gridColumn="span 6"
  gridRow="span 2"
  backgroundColor={colors.primary[400]}
  p="30px"
  borderRadius="8px"
  boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
>
  {/* Title */}
  <Typography
    variant="h5"
    fontWeight="600"
    color={colors.primary[100]}
    textAlign="center"
  >
    Active & Inactive
  </Typography>
  <Typography
    variant="body2"
    color={colors.grey[100]}
    textAlign="center"
    mt="8px"
  >
    Overview of active vs inactive users
  </Typography>

  {/* Content */}
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    mt="25px"
  >
    {/* Progress Circle */}
    <ProgressCircle size="125" progress={0.75} />
    <Box display="flex" justifyContent="space-between" width="100%" mt="20px">
      {/* Active Users */}
      <Box display="flex" alignItems="center" gap="10px">
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: colors.greenAccent[500],
          }}
        />
        <Typography variant="body1" color={colors.primary[100]}>
          Active Users: 75%
        </Typography>
      </Box>
      {/* Inactive Users */}
      <Box display="flex" alignItems="center" gap="10px">
        <Box
          sx={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: colors.grey[500],
          }}
        />
        <Typography variant="body1" color={colors.primary[100]}>
          Inactive Users: 25%
        </Typography>
      </Box>
    </Box>
  </Box>
</Box>



        
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            User Distribution
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

          
          </Box>
        </Box>

  );
};

export default Dashboard;