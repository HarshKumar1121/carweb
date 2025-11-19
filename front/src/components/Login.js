import React, { useContext, useState } from "react";
import api from "../api";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.post("/api/login", { email, password });
      login(res.data.token, res.data.email);
      navigate("/");
    } catch (err) {
      setErr(err.response?.data?.error || "Error logging in");
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {err && <Alert severity="error">{err}</Alert>}
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </Box>
  );
}

export default Login;
