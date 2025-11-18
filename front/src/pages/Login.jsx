// import { useState } from "react";
// import { login } from "../services/api";
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await login({ email, password });
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("email", data.email);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Typography variant="h4" mb={3}>Login</Typography>
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
//           <Button type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default Login;




import React, { useState } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/api/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ padding: 30, width: 350 }}>
        <Typography variant="h5" textAlign="center" mb={2}>Login</Typography>

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

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>

        <Typography mt={2} textAlign="center">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </Typography>
      </Card>
    </div>
  );
}
