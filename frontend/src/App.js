import React from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/register.jsx";
import { Login } from "./pages/login/Login.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMode } from "./theme.js";
import Navbar from "./components/Navbar.jsx";
import { PharmacyHome } from "./pages/home/pharmacyHome.js";
import HistoryPage from "./pages/HistoryPage.js";

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
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<div>Home</div>} />
              <Route path="/nav" element={<Navbar />} />
              <Route path="/pharmacyHome" element={<PharmacyHome />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
