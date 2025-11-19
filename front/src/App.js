// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route 
//           path="/dashboard" 
//           element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
// import About from "./pages/About";
// import Features from "./pages/Features";
import { AuthProvider } from "./context/AuthContext";
import { Container } from "@mui/material";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/features" element={<Features />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
