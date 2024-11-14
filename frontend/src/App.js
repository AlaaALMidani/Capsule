import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/register/register.jsx";
import { Login } from "./pages/login/Login.jsx";
import Topbar from "./scenes/global/Topbar.jsx";
// import Sidebar from "./scenes/global/Sidebar.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import Team from "./scenes/team/index.jsx";
import Invoices from "./scenes/invoices/index.jsx";
import Contacts from "./scenes/contacts/index.jsx";
import Bar from "./scenes/bar/index.jsx";
import Form from "./scenes/form/index.jsx";
import Line from "./scenes/line/index.jsx";
import Pie from "./scenes/pie/index.jsx";
import Calendar from "./scenes/calendar/calender.jsx";
import Geography from "./scenes/geography/index.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";

function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex ">
          {/* Sidebar */}
          {/* <Sidebar isSidebar={isSidebar} className="w-64" /> */}
          
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <main className="p-4">
              <Routes>
              <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/home" element={<div>home </div>}></Route>
                <Route path="/" element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
