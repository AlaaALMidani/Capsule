import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/register.jsx";
import { Login } from "./pages/login/Login.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Navbar from "./components/Navbar.jsx";
import { PharmacyHome } from "./pages/home/pharmacyHome.js";
import HistoryPage  from "./pages/HistoryPage.js";
import OfferPage from "./pages/OfferPage.js";
import MyPostsPage from "./pages/myPostsPage.js";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex ">
        <div className="flex-1 overflow-y-auto">
          <main className="">
            <Navbar />

            <Routes>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/home" element={<div>home</div>}></Route>
              <Route path="/pharmacyHome" element={<PharmacyHome />}></Route>
              <Route path="/history" element={<HistoryPage />}></Route>
              <Route path="/offers" element={<OfferPage/>}></Route>
              <Route path="/myPosts" element={<MyPostsPage/>}></Route>
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
