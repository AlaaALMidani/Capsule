import React from "react";  
// Uncomment and update imports as needed  
// import { Routes, Route } from "react-router-dom";  
// import { Register } from "./pages/register/register.jsx";  
// import { Login } from "./pages/login/Login.jsx";  
// import { CssBaseline, ThemeProvider } from "@mui/material";  
// import { ColorModeContext, useMode } from "./theme.js";  
//import UserHome from './pages/home/userHome.js'; 
import HistoryPage from "./pages/HistoryPage.js";

function App() {  
  // const [theme, colorMode] = useMode();  
  // const [isSidebar, setIsSidebar] = useState(true);  

  return (  
      // <div className="flex ">  
      //   <div className="flex-1 overflow-y-auto">  
      //     <main className="p-4">  
      //       <Routes>  
      //         <Route path="/register" element={<Register />}></Route>  
      //         <Route path="/login" element={<Login/>}></Route>  
      //         <Route path="/home" element={<div>home</div>}></Route>  
      //       </Routes>  
      //     </main>  
      //   </div>  
      // </div>  
      <div>  
        {/* <UserHome />   */}
        <HistoryPage/>
      </div>  
  );  
}  

export default App;