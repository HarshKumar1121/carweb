import React, { useState } from "react";
import api from "../api";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setErr("");
    try {
      await api.post("/api/signup", { email, password });
      navigate("/login");
    } catch (err) {
      setErr(err.response?.data?.error || "Error signing up");
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
        {err && <Alert severity="error">{err}</Alert>}
        <Button variant="contained" color="primary" type="submit">Sign Up</Button>
      </form>
    </Box>
  );
}

export default Signup;
