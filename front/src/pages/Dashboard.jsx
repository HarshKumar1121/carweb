// import { useEffect, useState } from "react";
// import { getDashboardData } from "../services/api";
// import { Container, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const [data, setData] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const res = await getDashboardData(token);
//         setData(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     navigate("/login");
//   };

//   return (
//     <Container>
//       <Typography variant="h4" mt={5}>Dashboard</Typography>
//       <Typography variant="subtitle1" mt={2}>
//         Welcome, {localStorage.getItem("email")}
//       </Typography>
//       <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={handleLogout}>
//         Logout
//       </Button>

//       {/* Example: show protected data from backend */}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </Container>
//   );
// }

// export default Dashboard;



import React from "react";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
      <Card style={{ padding: 40, width: 400, textAlign: "center" }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="h6" mt={2}>Welcome, {email}</Typography>

        <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={logout}>
          Logout
        </Button>
      </Card>
    </div>
  );
}
