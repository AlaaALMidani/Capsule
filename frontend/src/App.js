import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/register.jsx";
import { Login } from "./pages/login/Login.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import Navbar from './components/Navbar.jsx'
import { PharmacyHome } from "./pages/home/PharmacyHome.js";
import {PharmacyHistory} from "./pages/history/PharmacyHistory.js"
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
        <div className="flex ">
          <div className="flex-1 overflow-y-auto">
            <main className="p-4">
              <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/home" element={<div>home</div>}></Route>
                <Route path="/nav" element={<Navbar/>}></Route>
                <Route path="/pharmacyHome" element={<PharmacyHome/>}></Route>
                <Route path="/pharmacyHome/history" element={<PharmacyHistory/>}></Route>
              </Routes>
            </main>
          </div>
        </div>
  );
}


export default App;
