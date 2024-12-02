import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../assets/styles/theme";
import Header from "../../components/Header";
import { fetchUsersData } from "../../services/fetchUsersData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalPharmacyOutlinedIcon from "@mui/icons-material/LocalPharmacyOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UserDetailsDialog from "./UserDetailsDialog";


const AllUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [usersData, setUsersData] = useState([]);


  const [selectedUser, setSelectedUser] = useState(null); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const openDialog = (user) => {
    setSelectedUser(user); 
    setIsDialogOpen(true); 
  };
  
  const closeDialog = () => {
    setSelectedUser(null); 
    setIsDialogOpen(false);
  };


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsersData();
      setUsersData(data);
    };

    fetchData();
  }, []);

  const toggleUserStatus = (id) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

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
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { accessLevel } }) => {
        const getIcon = () => {
          switch (accessLevel) {
            case "admin":
              return <AdminPanelSettingsOutlinedIcon />;
            case "pharmacy":
              return <LocalPharmacyOutlinedIcon />;
            case "warehouse":
              return <WarehouseOutlinedIcon />;
            case "driver":
              return <DriveEtaOutlinedIcon />;
            default:
              return null;
          }
        };

        return (
          <Box display="flex" alignItems="center">
            {getIcon()}
            <Typography sx={{ ml: "5px", color: colors.grey[100] }}>
              {accessLevel}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      renderCell: ({ row }) => {
        const [longitude, latitude] = row.location.split(",");
        return (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#4CAF50", 
              "&:hover": { backgroundColor: "#388E3C" }, 
            }}
            onClick={() => {
              const osmUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=16`;
              window.open(osmUrl, "_blank");
            }}
          >
            View on Map
          </Button>
        );
      },
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="outlined"
          color={row.active ? "success" : "error"}
          size="small"
          startIcon={
            row.active ? (
              <CheckCircleOutlineIcon />
            ) : (
              <HighlightOffIcon />
            )
          }
          sx={{
            textTransform: "none",
          }}
          onClick={() => toggleUserStatus(row.id)}
        >
          {row.active ? "Active" : "Inactive"}
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => openDialog(row)}
          sx={{
            textTransform: "none",
          }}
        >
          View Details
        </Button>
      ),
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
        <DataGrid rows={usersData} columns={columns} />
        <UserDetailsDialog
  isOpen={isDialogOpen}
  onClose={closeDialog}
  user={selectedUser}
/>

      </Box>
    </Box>
  );
};

export default AllUsers;
