import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
import { tokens } from "../../assets/styles/theme";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { fetchUsersData } from "../../services/fetchUsersData";


const AllUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [usersData, setUsersData] = useState([]);



  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/admin/allUsers',  {
    
          headers: {
              'Cache-Control': 'no-cache' // Disable caching for this request
          }
      });
        // const response = await fetch('/mockData.json');
        const data = await response.json();
          console.log(data)
        // if (data && data.users) {
        //   const formattedData = data.users.map((item) => ({
        //     id: item._id,
        //     name: item.fullName,
        //     phone: item.phoneNumber,
        //     location: item.location,
        //     active: item.active ? "Active" : "Inactive",
        //     accessLevel:
        //       item.roleID === 1
        //         ? "admin"
        //         : item.roleID === 2
        //         ? "user"
        //         : item.roleID === 3
        //         ? "pharmacy"
        //         : item.roleID === 4
        //         ? "warehouse"
        //         : "driver",
        //   }));
        //   setTeamData(formattedData);
        // } else {
        //   console.error("Unexpected response format:", data);
        // }
        const response = await fetch('/mockData.json');
        const data = await response.json();
        if (data && data.users) {
          const formattedData = data.users.map((item) => ({
            id: item._id,
            name: item.fullName,
            phone: item.phoneNumber,
            location: item.location,
            active: item.active ? "Active" : "Inactive",
            accessLevel:
              item.roleID === 1
                ? "admin"
                : item.roleID === 2
                ? "user"
                : item.roleID === 3
                ? "pharmacy"
                : item.roleID === 4
                ? "warehouse"
                : "driver",
          }));
          setTeamData(formattedData);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }

    const fetchData = async () => {
      const data = await fetchUsersData();
      setUsersData(data);
  };

    fetchData();
  }, []);



//   useEffect(() => {
//     const fetchUsersData = async () => {
//       try {
//         const response = await fetch(`/mockUsers.json`);
//         const data = await response.json();
//         if (data && data.users) {
//           const formattedData = data.users.map((item) => ({
//             id: item._id,
//             name: item.fullName,
//             phone: item.phoneNumber,
//             location: item.location,
//             active: item.active ? "Active" : "Inactive",
//             accessLevel:
//               item.roleID === 1
//                 ? "admin"
//                 : item.roleID === 2
//                 ? "user"
//                 : item.roleID === 3
//                 ? "pharmacy"
//                 : item.roleID === 4
//                 ? "warehouse"
//                 : "driver",
//           }));
//           setUsersData(formattedData);
//         } else {
//           console.error("Unexpected response format:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching Users data:", error);
//       }
//     };
  
//     fetchUsersData();
//   }, []);
  
  

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { accessLevel } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              accessLevel === "admin"
                ? colors.greenAccent[600]
                : accessLevel === "user"
                ? colors.greenAccent[700]
                : accessLevel === "pharmacy"
                ? colors.blueAccent[700]
                : accessLevel === "warehouse"
                ? colors.orangeAccent[700]
                : colors.redAccent[700]
            }
            borderRadius="4px"
          >
            {accessLevel === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {accessLevel === "user" && <LockOpenOutlinedIcon />}
            {accessLevel === "pharmacy" && <LocalPharmacyOutlinedIcon />}
            {accessLevel === "warehouse" && <WarehouseOutlinedIcon />}
            {accessLevel === "driver" && <DriveEtaOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {accessLevel}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Accounts" subtitle="All Users Retested" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={usersData} columns={columns} />
      </Box>
    </Box>
  );
};

export default AllUsers;





// 1 admin
// 2 user 
// 3 pharmacy
// 4 warehouse
//  5 driver


// fullName: { type: String, required: true },
// phoneNumber: { type: String, required: true, unique: true },
// password: { type: String, required: true },
// location: { type: String, },
// active: { type: Boolean },
// token: { type: String },
// roleID: { type: Number, required: true }
