import React from "react";
import { Box, Typography } from "@mui/material";
// import {caraousel} from "caraousel";

function feature(){
  return (
    <Box mt={5}>
        <Typography>
        <strong>Why choose us?</strong>
        <ul>
          <li>Verified listings and trusted sellers</li>
          <li>Secure bookings and seamless transactions</li>
          <li>Advanced search and filtering</li>
          <li>Responsive design for all devices</li>
          <li>Friendly support team</li>
        </ul>
        Join our community today—experience a better way to buy, sell, and rent cars!
      </Typography>
    </Box>

  );
}

export default feature;
