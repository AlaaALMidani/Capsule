import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Register } from "./pages/register/register.jsx";
import { Login } from "./pages/login/Login.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Navbar from "./components/Navbar.js";
import { PharmacyHome } from "./pages/home/pharmacyHome.js";
import HistoryPage from "./pages/HistoryPage.js";
import OfferPage from "./pages/OfferPage.js";
import MyPostsPage from "./pages/myPostsPage/myPostsPage.js";
import OrdersPage from "./pages/OrdersPage.js";
import Notification from "./pages/Notification.js";
import WarehouseHome from "./pages/home/warehouseHome.js";
import { UserHome } from "./pages/home/userHome.js";
import { userType } from "./services/userServices.js";
import { UserTypes } from "./services/userServices.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [theme] = useMode();
  const noNavbarPaths = ["/register", "/login","/"];
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
       <ToastContainer />
      <div className="flex">
        <div className="flex-1 overflow-y-auto">
          <main>
          {!noNavbarPaths.includes(location.pathname) && <Navbar />}
            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/home" element={
                userType === UserTypes.pharmacy ?
                  < PharmacyHome /> :
                  userType === UserTypes.client ?
                    <UserHome /> :
                    userType === UserTypes.warehouse ?
                      <WarehouseHome /> :
                      <Login />

              }></Route>
              <Route path="/history" element={<HistoryPage />}></Route>
              <Route path="/offers" element={<OfferPage />}></Route>
              <Route path="/myPosts" element={<MyPostsPage />}></Route>
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


