


import React from "react";
import { Box, Typography } from "@mui/material";

function About() {
  return (
    <Box mt={5}>
      <Typography variant="h4" mb={2}>About Our Car Selling & Rental Platform</Typography>
      <Typography mb={2}>
        Welcome to our Car Selling and Rental platform! Our mission is to make buying, selling, and renting cars easy, transparent, and accessible for everyone.
      </Typography>
      <Typography mb={2}>
        Whether you're looking to purchase your dream car or need a reliable vehicle for a short-term rental, we've got you covered. Our extensive selection of cars ranges from the latest electric vehicles to luxury and family options. Our user-friendly dashboard allows you to browse, search, and filter cars with ease, making it simple to find exactly what you need.
      </Typography>
      <Typography mb={2}>
        For car owners and dealerships, we offer a secure and feature-rich environment to list your cars, manage inventory, and connect with verified buyers and renters.
      </Typography>
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

export default About;
