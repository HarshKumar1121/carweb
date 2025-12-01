// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { api } from "../services/api";
// import { Button, Typography, Box, Paper } from "@mui/material";

// export default function CarDetails() {
//   const { id } = useParams();
//   const nav = useNavigate();
//   const [car, setCar] = useState(null);

//   useEffect(() => {
//     api.get(`/cars/${id}`).then(res => setCar(res.data));
//   }, [id]);

//   if (!car) return <h2 style={{textAlign:"center"}}>Loading...</h2>;

//   return (
//     <Box sx={{ padding:4, display:"flex", justifyContent:"center"}}>
//       <Paper sx={{
//         width:"70%", padding:4, background:"#111827", color:"white",
//         borderRadius:"20px", boxShadow:"0px 0px 30px #00e1ff55"
//       }}>
//         <img
//           src={carPhotos.image}
//           style={{ width:"100%", borderRadius:"14px" }}
//           alt={carPhotos.name}
//         />
        
//         <Typography variant="h4" mt={2}>
//           {carPhotos.brand} {carPhotos.name}
//         </Typography>

//         <Typography variant="h6" color="gray">
//           {carPhotos.model} • {carPhotos.year} • {carPhotos.fuelType} • {carPhotos.seats} seats
//         </Typography>

//         <Typography variant="h5" mt={2} sx={{color:"#00eaff"}}>
//           ₹ {carPhotos.pricePerDay}/day
//         </Typography>

//         <Button 
//           variant="contained" 
//           fullWidth 
//           sx={{marginTop:3, fontSize:18, padding:1.4}}
//           onClick={()=>nav(`/book/${carPhotos.id}`)}
//         >
//           Book This Car 🚗
//         </Button>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useEffect, useState } from "react";
// import "../index.css";          // use your existing CSS
// import { useParams, useNavigate } from "react-router-dom";
// // import { cars } from "../data/cars";  // import mock cars
// import {carPhotos}  from "../components/carphot"; 
// const CarDetails = () => {
//   const [currentCarDetail, setCar] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // find car from mock data using id from URL
//     const carId = Number(id);
//     const found = carPhotos.find((c) => c.id === carId);
//     setCar(found || null);
//     window.scrollTo(0, 0);
//   }, [id]);

//   if (!currentCarDetail) {
//     return (
//       <div className="movie" style={{ color: "white", padding: "40px" }}>
//         <h2>Car not found</h2>
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             marginTop: "16px",
//             padding: "8px 16px",
//             borderRadius: "999px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Go back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="movie">
  
//       <div className="movie__intro">
//         <img
//           className="movie__backdrop"
//           src={currentCarDetail.image}
//           alt={`${currentCarDetail.brand} ${currentCarDetail.name}`}
//         />
//       </div>

    
//       <div className="movie__detail">
//         <div className="movie__detailLeft">
//           <div className="movie__posterBox">
//             <img
//               className="movie__poster"
//               src={currentCarDetail.image}
//               alt={currentCarDetail.name}
//             />
//           </div>
//         </div>

//         <div className="movie__detailRight">
//           <div className="movie__detailRightTop">
//             {/* Car Name */}
//             <div className="movie__name">
//               {currentCarDetail.brand} {currentCarDetail.name}
//             </div>

//             {/* Model as tagline */}
//             <div className="movie__tagline">
//               {currentCarDetail.model || ""}
//             </div>

//             {/* Price + availability */}
//             <div className="movie__rating">
//               ₹ {currentCarDetail.pricePerDay} / day
//               <span className="movie__voteCount">
//                 {currentCarDetail.available ? " • Available" : " • Not available"}
//               </span>
//             </div>

//             {/* Year + fuel */}
//             <div className="movie__runtime">
//               {currentCarDetail.year ? `${currentCarDetail.year} • ` : ""}
//               {currentCarDetail.fuelType || "Fuel type N/A"}
//             </div>

//             {/* Seats */}
//             <div className="movie__releaseDate">
//               {currentCarDetail.seats
//                 ? `${currentCarDetail.seats} seats`
//                 : "Seats info not available"}
//             </div>

//             {/* Chips/badges (genres style) */}
//             <div className="movie__genres">
//               <span className="movie__genre">
//                 Brand: {currentCarDetail.brand}
//               </span>
//               {currentCarDetail.model && (
//                 <span className="movie__genre">
//                   Model: {currentCarDetail.model}
//                 </span>
//               )}
//               {currentCarDetail.fuelType && (
//                 <span className="movie__genre">
//                   Fuel: {currentCarDetail.fuelType}
//                 </span>
//               )}
//               {currentCarDetail.year && (
//                 <span className="movie__genre">
//                   Year: {currentCarDetail.year}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="movie__detailRightBottom">
//             <div className="synopsisText">Car Summary</div>
//             <div>
//               {currentCarDetail.brand} {currentCarDetail.name}{" "}
//               {currentCarDetail.model || ""} is a{" "}
//               {currentCarDetail.seats || ""}-seater{" "}
//               {currentCarDetail.fuelType || ""} car with a rental price of ₹
//               {currentCarDetail.pricePerDay} per day.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* You can add buttons like Book Now, Contact etc here */}
//       {/* <div className="movie__links">
//         <div className="movie__heading">Actions</div>
//         <p>
//           <span className="movie__homeButton movie__Button">
//             Book this car
//           </span>
//         </p>
//       </div> */}
//     </div>
//   );
// };

// export default CarDetails;

// import React, { useEffect, useState } from "react";
// import "../index.css";          // use your existing CSS
// import { useParams, useNavigate } from "react-router-dom";
// // import { cars } from "../data/cars";  // import mock cars
// import {carPhotos}  from "../components/carphot"; 
// const CarDetails = () => {
//   const [currentCarDetail, setCar] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const carId = Number(id);
//     const found = carPhotos.find((c) => c.id === carId);
//     setCar(found || null);
//     window.scrollTo(0, 0);
//   }, [id]);

//   if (!currentCarDetail) {
//     return (
//       <div className="movie" style={{ color: "white", padding: "40px" }}>
//         <h2>Car not found</h2>
//         <button
//           onClick={() => navigate("/")}
//           style={{
//             marginTop: "16px",
//             padding: "8px 16px",
//             borderRadius: "999px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Go back
//         </button>
//       </div>
//     );
//   }

//   return (

// <div className="car-details-page">

// <div className="car-banner">
//   <img src={carPhotos.image} alt="" />
// </div>

// <div className="car-details-container">

//   <div className="car-poster">
//     <img src={carPhotos.image} alt= "" />
//   </div>
//   <div className="car-info">
//     <div>
//       <div className="car-title">{carPhotos.brand} {carPhotos.name}</div>
//       <div className="car-model">{carPhotos.model}</div>

//       <div>
//         <span className="car-price">₹{carPhotos.pricePerDay}/day</span>
//         <span className="car-availability">
//           {carPhotos.available ? "• Available" : "• Not Available"}
//         </span>
//       </div>

//       <div className="car-tags">
//         <span className="car-tag">Fuel: {carPhotos.fuelType}</span>
//         <span className="car-tag">Seats: {carPhotos.seats}</span>
//         <span className="car-tag">Year: {carPhotos.year}</span>
//       </div>
//     </div>

//     <div className="car-summary-section">
//       <div className="car-summary-title">Car Summary</div>
//       <p>
//         {carPhotos.brand} {carPhotos.name} {carPhotos.model}, {carPhotos.seats}-seater {carPhotos.fuelType}.
//         Rent for just ₹{carPhotos.pricePerDay} per day!
//       </p>
//     </div>

//     <div className="car-actions">
//       <button className="car-btn book-btn">Book Now</button>
//       <button className="car-btn back-btn" onClick={() => navigate(-1)}>Back</button>
//     </div>
//   </div>

// </div>
// </div>
//   )}

// export default CarDetails;


import React, { useEffect, useState } from "react";
import "../index.css";
import { useParams, useNavigate } from "react-router-dom";
import { carPhotos } from "../components/carphot";

const CarDetails = () => {
  const [currentCarDetail, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const carId = Number(id);
    const foundCar = carPhotos.find((c) => c.id === carId);
    setCar(foundCar || null);
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentCarDetail) {
    return (
      <div className="movie" style={{ color: "white", padding: "40px" }}>
        <h2>Car Not Found</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="car-details-page">

      <div className="car-banner">
        <img src={currentCarDetail.image} alt="" />
      </div>

      <div className="car-details-container">

        <div className="car-poster">
          <img src={currentCarDetail.image} alt="" />
        </div>

        <div className="car-info">

          <div className="car-title">
            {currentCarDetail.brand} {currentCarDetail.name}
          </div>
          <div className="car-model">{currentCarDetail.model}</div>

          <div>
            <span className="car-price">₹{currentCarDetail.pricePerDay}/day</span>
            <span className="car-availability">
              {currentCarDetail.available ? " • Available" : " • Not Available"}
            </span>
          </div>

          <div className="car-tags">
            <span className="car-tag">Fuel: {currentCarDetail.fuelType}</span>
            <span className="car-tag">Seats: {currentCarDetail.seats}</span>
            <span className="car-tag">Year: {currentCarDetail.year}</span>
          </div>

          <div className="car-summary-section">
            <div className="car-summary-title">Car Summary</div>
            <p>
              {currentCarDetail.brand} {currentCarDetail.name} {currentCarDetail.model},{" "}
              {currentCarDetail.seats}-seater {currentCarDetail.fuelType}. Rent for just 
              ₹{currentCarDetail.pricePerDay} / day!
            </p>
          </div>

          <div className="car-actions">
            <button className="car-btn book-btn">Book Now</button>
            <button className="car-btn back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarDetails;
