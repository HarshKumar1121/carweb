// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { api } from "../api";
// import { Button, TextField, Paper, Typography, Box } from "@mui/material";
// import { useAuth } from "../context/AuthContext";

// export default function Booking() {
//   const { id } = useParams();
//   const { token,email } = useAuth();
  
//   const [car, setCar] = useState(null);
//   const [days, setDays] = useState(1);

//   useEffect(()=>{ 
//     api.get(`/cars/${id}`).then(res=>setCar(res.data));
//   },[id]);

//   const total = car ? days * car.pricePerDay : 0;

//   const confirmBooking = () =>{
//     alert(`Booking Confirmed! \nUser: ${email} \nDays: ${days} \nTotal: ₹${total}`)
//   };

//   if(!car) return <h2 style={{textAlign:"center"}}>Loading...</h2>;

//   return(
//     <Box className="center" sx={{height:"90vh"}}>
//       <Paper sx={{padding:4, width:380, background:"#102020", color:"white"}}>
//         <Typography variant="h5">{car.brand} {car.name}</Typography>

//         <Typography sx={{mt:1}}>₹ {car.pricePerDay}/day</Typography>
//         <TextField
//           sx={{mt:2, input:{color:"white"}}}
//           type="number"
//           label="Number of Days"
//           value={days}
//           onChange={e=>setDays(e.target.value)}
//         />

//         <Typography variant="h6" sx={{mt:2}}>Total Price : <b>₹ {total}</b></Typography>

//         <Button variant="contained" fullWidth sx={{mt:3}} onClick={confirmBooking}>
//           Confirm Booking
//         </Button>
//       </Paper>
//     </Box>
//   );
// }
