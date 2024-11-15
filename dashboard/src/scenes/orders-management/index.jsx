import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../assets/styles/theme";
import Header from "../../components/Header";
// import OrderIcon from "@mui/icons-material/ShoppingCartOutlined";

const OrdersManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3002/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success && data.orders) {
          const formattedData = data.orders.map((order) => ({
            id: order._id,
            message: order.message,
            location: order.location,
            status: order.status,
            photo: order.photo,
            senderId: order.senderId,
          }));
          setOrdersData(formattedData);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrdersData();
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Typography
          sx={{
            backgroundColor:
              value === "completed"
                ? colors.greenAccent[600]
                : value === "pending"
                ? colors.orangeAccent[700]
                : colors.redAccent[700],
            color: colors.grey[100],
            p: "5px 10px",
            borderRadius: "4px",
            textAlign: "center",
            width: "100%",
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: "photo",
      headerName: "Photo",
      flex: 1,
      renderCell: ({ value }) =>
        value ? (
          <img
            src={value}
            alt="Order"
            style={{
              height: "50px",
              borderRadius: "4px",
              objectFit: "cover",
            }}
          />
        ) : (
          <Typography>No Photo</Typography>
        ),
    },
    { field: "senderId", headerName: "Sender ID", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Manage all orders" />
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
        <DataGrid rows={ordersData} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default OrdersManagement;



