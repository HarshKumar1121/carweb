import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function CarCard({ car }) {
  return (
    <Card sx={{ width: 300, mb: 2 }}>
      <CardMedia component="img" height="160" image={car.img} alt={car.name} />
      <CardContent>
        <Typography variant="h6">{car.name}</Typography>
        <Typography variant="body2">{car.type} - {car.price}</Typography>
      </CardContent>
    </Card>
  );
}

export default CarCard;
