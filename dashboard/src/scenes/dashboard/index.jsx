import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../assets/styles/theme";
import { mockTransactions } from "../../Data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonIcon from "@mui/icons-material/Person";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StartBox";
// import ProgressCircle from "../../components/ProgressCirde";
// import ProgressCircle from "../../components/ProgressCircle";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Active Accounts", value: 80 },
  { name: "Inactive Accounts", value: 20 },
];

const COLORS = ["#00C49F", "#FF8042"];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="16px"
          borderRadius="8px"
          boxShadow={3}
        >
          <StatBox
            title="1020"
            subtitle="Pharmacy Accounts"
            progress="0.85"
            increase="+5%"
            icon={<LocalPharmacyIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="16px"
          borderRadius="8px"
          boxShadow={3}
        >
          <StatBox
            title="1240"
            subtitle="Warehouse Accounts"
            progress="0.70"
            increase="+3%"
            icon={<WarehouseIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="16px"
          borderRadius="8px"
          boxShadow={3}
        >
          <StatBox
            title="350"
            subtitle="Driver Accounts"
            progress="0.60"
            increase="+7%"
            icon={<DeliveryDiningIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="16px"
          borderRadius="8px"
          boxShadow={3}
        >
          <StatBox
            title="5000"
            subtitle="User Accounts"
            progress="0.90"
            increase="+10%"
            icon={<PersonIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        <Box gridColumn="span 8" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Order Status:
            </Typography>
            <IconButton>
              <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
            </IconButton>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>{transaction.user}</Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2" 
          backgroundColor={colors.primary[400]}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="26px"
          borderRadius="8px"
          boxShadow={3}
        >
          <PieChart width={300} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]}>
          <Typography variant="h5" fontWeight="400" sx={{ padding: "10px" }}>
            Sales Quantity
          </Typography>
          <Box height="250px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} padding="30px">
          <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
