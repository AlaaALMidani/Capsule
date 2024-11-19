import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar.jsx"; 
import Sidebar from "./scenes/global/Sidebar.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import AllUsers from "./scenes/account-management/AllUsers.jsx";
import AddUser from "./scenes/account-management/AddUser.jsx";
import OrdersManagement from "./scenes/orders-management/index.jsx";
import OfferManagement from "./scenes/offer-management/index.jsx";
import InvoiceManagement from "./scenes/invoice-management/index.jsx";
import PostsManagement from "./scenes/posts-management/index.jsx";
import Analytics from "./scenes/analytics/index.jsx";
import Settings from "./scenes/settings/index.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./assets/styles/theme.js";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex">
          <Sidebar isSidebar={isSidebar} />

          <div className="flex-1 transition-all duration-150">
            <Topbar />
            <main className="p-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/account/all-users" element={<AllUsers />} />
                <Route path="/account/add-user" element={<AddUser />} />
                <Route path="/orders-management" element={<OrdersManagement />} />
                <Route path="/offer-management" element={<OfferManagement />} />
                <Route path="/invoice-management" element={<InvoiceManagement />} />
                <Route path="/posts-management" element={<PostsManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
