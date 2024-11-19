import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/register.jsx";
import { Login } from "./pages/login/Login.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Navbar from "./components/Navbar.js";
import { PharmacyHome } from "./pages/home/pharmacyHome.js";
import HistoryPage  from "./pages/HistoryPage.js";
import OfferPage from "./pages/OfferPage.js";
import MyPostsPage from "./pages/myPostsPage/myPostsPage.js";
import OrdersPage from "./pages/OrdersPage.js";
import Notification from "./pages/Notification.js";
import WarehouseHome from "./pages/home/warehouseHome.js";
import { UserHome } from "./pages/home/userHome.js";



function App() {
  const [theme] = useMode();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <div className="flex">
        <div className="flex-1 overflow-y-auto">
          <main>
            <Navbar />
            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/pharmacyHome" element={<PharmacyHome />}></Route>
              <Route path="/clintHome" element={<UserHome/>}></Route>
              <Route path="/warehouseHome" element={<WarehouseHome/>}></Route>
              <Route path="/deliveryHome" element={<div>home</div>}></Route>
              <Route path="/history" element={<HistoryPage />}></Route>
              <Route path="/offers" element={<OfferPage/>}></Route>
              <Route path="/myPosts" element={<MyPostsPage/>}></Route>
              <Route path="/orders" element={<OrdersPage />}></Route>
              <Route path="/notifications" element={<Notification />}></Route>
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
