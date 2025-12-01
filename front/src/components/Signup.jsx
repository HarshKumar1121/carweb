// import React, { useState } from "react";
// import api from "../api";
// import { TextField, Button, Box, Typography, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setErr("");
//     try {
//       await api.post("/api/signup", { email, password });
//       navigate("/login");
//     } catch (err) {
//       setErr(err.response?.data?.error || "Error signing up");
//     }
//   };

//   return (
//     <Box mt={5}>
//       <Typography variant="h5" mb={2}>Sign Up</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
//         <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
//         {err && <Alert severity="error">{err}</Alert>}
//         <Button variant="contained" color="primary" type="submit">Sign Up</Button>
//       </form>
//     </Box>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    try {
      await signup(email, password);
      setSuccess("Signup successful! User stored in database.");
      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      const msg =
        error.response?.data?.error || error.message || "Signup failed";
      setErr(msg);
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ padding: 4, width: 360, background: "white", color: "blue" }}>
        <Typography variant="h5" mb={2}>
          Sign Up
        </Typography>

        {err && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth>
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Signup;


// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function SignupPage() {
//   const { signup } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await signup(form.email, form.password);
//       navigate("/cars");
//     } catch (err) {
//       setError(err.response?.data?.error || "Signup failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "40px auto" }}>
//       <h2>Sign up</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <button type="submit">Sign up</button>
//       </form>
//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { TextField, Button, Paper, Box, Typography } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Signup(){
//   const { signup } = useAuth();
//   const nav = useNavigate();
//   const [form, setForm] = useState({ email:"", password:"" });

//   const submit = async()=>{
//     await signup(form.email,form.password);
//     nav("/");
//   };

//   return (
//     <Box className="center" sx={{height:"90vh"}}>
//       <Paper sx={{ padding:4 , width:350, bgcolor:"#1e293b" }}>
//         <Typography variant="h5" mb={2}>Create Account</Typography>

//         <TextField label="Email" fullWidth sx={{mt:2}} 
//           onChange={e=>setForm({...form,email:e.target.value})} />
//         <TextField label="Password" type="password" fullWidth sx={{mt:2}}
//           onChange={e=>setForm({...form,password:e.target.value})}/>

//         <Button variant="contained" fullWidth sx={{mt:3}} onClick={submit}>
//           Sign up
//         </Button>
//       </Paper>
//     </Box>
//   );
// }
