// import { useState } from "react";
// import { signup } from "../services/api";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signup({ email, password });
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Typography variant="h4" mb={3}>Signup</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField 
//             fullWidth label="Email" type="email" margin="normal" 
//             value={email} onChange={(e) => setEmail(e.target.value)} 
//           />
//           <TextField 
//             fullWidth label="Password" type="password" margin="normal" 
//             value={password} onChange={(e) => setPassword(e.target.value)} 
//           />
//           {error && <Typography color="error">{error}</Typography>}
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>Signup</Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default Signup;


import React, { useState } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/api/signup", form);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ padding: 30, width: 350 }}>
        <Typography variant="h5" textAlign="center" mb={2}>Create Account</Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
          Signup
        </Button>

        <Typography mt={2} textAlign="center">
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Card>
    </div>
  );
}
