// import React, { useContext, useState } from "react";
// import {api} from "../api";
// import { TextField, Button, Box, Typography, Alert } from "@mui/material";
// // import { AuthContext } from "../AuthContext.js";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setErr("");
//     try {
//       const res = await api.post("/api/login", { email, password });
//       login(res.data.token, res.data.email);
//       navigate("/");
//     } catch (err) {
//       setErr(err.response?.data?.error || "Error logging in");
//     }
//   };

//   return (
//     <Box mt={5}>
//       <Typography variant="h5" mb={2}>Login</Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
//         <TextField label="Password"  color="primary"type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
//         {err && <Alert severity="error">{err}</Alert>}
//         <Button variant="contained" color="primary" type="submit">Login</Button>
//       </form>
//     </Box>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// // import { useAuth } from "../AuthContext";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// export default function LoginPage() {
//   const { login } = useAuth();
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
//       await login(form.email, form.password);
//       navigate("/cars");
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "40px auto" }}>
//       <h2>Login</h2>
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
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         No account? <Link to="/signup">Sign up</Link>
//       </p>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { TextField, Button, Box, Paper, Typography, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login(){
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const [email , setEmail] = useState("");
//   const [password , setPassword] = useState("");
//   const [err , setErr] = useState("");

//   const submit = async(e)=>{
//     e.preventDefault();
//     try{
//       await login(email,password);
//       nav("/");
//     }catch(e){
//       setErr("Invalid credentials");
//     }
//   }

//   return (
//     <Box className="center" sx={{height:"90vh"}}>
//       <Paper sx={{ padding:4 , width:350, bgcolor:"#1e293b" }}>
//         <Typography variant="h5" mb={2}>Login</Typography>

//         {err && <Alert severity="error">{err}</Alert>}

//         <TextField label="Email" fullWidth sx={{mt:2}} onChange={e=>setEmail(e.target.value)}/>
//         <TextField label="Password" type="password" fullWidth sx={{mt:2}} onChange={e=>setPassword(e.target.value)}/>

//         <Button fullWidth sx={{mt:3}} variant="contained" onClick={submit}>
//           Login
//         </Button>
//       </Paper>
//     </Box>
//   );
// }


import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      await login(email, password); 
      navigate("/"); 
    } catch (error) {
      const msg =
        error.response?.data?.error || error.message || "Login failed";
      setErr(msg);
    }
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper sx={{ padding: 4, width: 360, background: "white", color: "blue" }}>
        <Typography variant="h5" mb={2}>
          Login
        </Typography>

        {err && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {err}
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
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Login;
