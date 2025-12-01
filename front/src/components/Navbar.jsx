// import React, { useContext } from "react";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Navbar() {
//   const { token, logout } = useContext(AuthContext);

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>Car Platform</Typography>
//         <Button color="inherit" component={Link} to="/">Dashboard</Button>
//         <Button color="inherit" component={Link} to="/about">About</Button>
//         <Button color="inherit" component={Link} to="/features">Features</Button>
//         {!token && <Button color="inherit" component={Link} to="/login">Loginnnnnn</Button>}
//         {!token && <Button color="inherit" component={Link} to="/signup">Sign Up</Button>}
//         {token && <Button color="inherit" onClick={logout}>Logout</Button>}
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();   

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Car Platform
        </Typography>

        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
        <Button color="inherit" component={Link} to="/features">
          Features
        </Button>

        {!token && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
          </>
        )}

        {token && (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
