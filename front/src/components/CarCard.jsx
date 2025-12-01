// import React from "react";
// import { Card, CardContent, CardMedia, Typography } from "@mui/material";

// function CarCard({ car }) {
//   return (
//     <Card sx={{ width: 300, mb: 2 }}>
//       <CardMedia component="img" height="160" image={car.img} alt={car.name} />
//       <CardContent>
//         <Typography variant="h6">{car.name}</Typography>
//         <Typography variant="body2">{car.type} - {car.price}</Typography>
//       </CardContent>
//     </Card>
//   );
// }

// export default CarCard;

// src/components/CarCard.jsx
// export default function CarCard({ car, onDelete }) {
//   return (
//     <div className="car-card">
//       <div className="car-image">
//         {car.image ? (
//           <img src={car.image} alt={car.name} />
//         ) : (
//           <div className="placeholder">No Image</div>
//         )}
//       </div>
//       <div className="car-body">
//         <h3>{car.name}</h3>
//         <p className="car-brand">
//           {car.brand} {car.model ? `• ${car.model}` : ""}
//         </p>
//         <p className="car-meta">
//           {car.year && <span>{car.year}</span>}
//           {car.fuelType && <span>{car.fuelType}</span>}
//           {car.seats && <span>{car.seats} seats</span>}
//         </p>
//         <p className="car-price">₹{car.pricePerDay} / day</p>
//         <p className={`car-availability ${car.available ? "available" : "not-available"}`}>
//           {car.available ? "Available" : "Unavailable"}
//         </p>
//       </div>
//       {onDelete && (
//         <button className="btn btn-danger" onClick={() => onDelete(car.id)}>
//           Delete
//         </button>
//       )}
//     </div>
//   );
// }


// import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

// export default function CarCard({ car }) {
//   return (
//     <Card sx={{ background:"#1e293b" , color:"white" }}>
//       <CardMedia
//         component="img"
//         height="150"
//         image={car.image || "hi"}
//       />
//       <CardContent>
//         <Typography variant="h6">{car.brand} {car.name}</Typography>
//         <Typography variant="body2" color="white">
//           {car.model} • {car.year} • {car.seats} Seats
//         </Typography>
//         <Typography sx={{ mt:1 }}><b>₹ {car.pricePerDay}</b> / day</Typography>

//         <Button variant="contained" sx={{ mt:2, width:"100%" }}>
//           View Details
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <Card sx={{ width: 270, background: "#1e293b", color: "white" }}>
      <CardMedia
        component="img"
        height="150"
        image={car.image}
        alt={car.name}
      />
      <CardContent>
        <Typography variant="h6">
          {car.brand} {car.name}
        </Typography>
        <Typography variant="body2" color="gray">
          {car.model} • {car.year} • {car.seats} Seats
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <b>₹ {car.pricePerDay}</b> / day
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2, width: "100%" }}
          component={Link} to={`/cars/${car.id}`}  
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default CarCard;
