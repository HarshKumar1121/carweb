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
import About from "./pages/About";
import Features from "./pages/features";
import { AuthProvider } from "./context/AuthContext"; 
import AdminPanel from "./pages/AdminPanel";
import Booking from "./pages/Bookings";
// import CarDetails from "./pages/Bookings";
import { Container } from "@mui/material";
import CarDetails from "./pages/CarDetails";


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
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/car/:id" element={<CarDetails/>}/>
            <Route path="/book/:id" element={<Booking/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>

<Route path="/cars/:id" element={<CarDetails />} />

          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
