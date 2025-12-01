// import { useState, useEffect } from "react";
// import { api } from "../api";
// import { useAuth } from "../context/AuthContext";
// import {
//   Button, TextField, Paper, Box, Typography, Dialog, DialogContent, DialogActions
// } from "@mui/material";

// export default function AdminPanel() {
//   const { token } = useAuth();
//   const [cars,setCars] = useState([]);
//   const [open,setOpen] = useState(false);
//   const [editCar,setEditCar] = useState(null);

//   useEffect(()=>{
//     api.get("/cars").then(res=>setCars(res.data));
//   },[]);

//   const handleEdit = car => { setEditCar(car); setOpen(true); };

//   const updateCar = async()=>{
//     await api.put(`/update/cars/${editCar.id}`,editCar,{headers:{Authorization:`Bearer ${token}`}});
//     setOpen(false);
//     window.location.reload();
//   };

//   const [file,setFile] = useState(null);
//   const [preview,setPreview] = useState("");
  
//   const uploadImage = async () =>{
//     const form = new FormData();
//     form.append("image",file);
  
//     const res = await api.post("/upload",form,{
//       headers:{ "Content-Type":"multipart/form-data" }
//     });
//     return res.data.url; 
//   };
  
//   const addCar = async ()=>{
//     const url = file ? await uploadImage() : null;
  
//     const car = {
//       name:prompt("Car Name"),
//       brand:prompt("Brand"),
//       pricePerDay:prompt("Price"),
//       image:url
//     };
  
//     await api.post("/cars",car,{headers:{Authorization:`Bearer ${token}`}});
//     window.location.reload();
//   };
  

//   const del=(id)=> api.delete(`/delete/cars/${id}`,{headers:{Authorization:`Bearer ${token}`}})
//                 .then(()=>setCars(cars.filter(c=>c.id!==id)));

//   return (
//     <Box sx={{padding:5}}>
//       <Typography variant="h4">Admin Control Panel 🔐</Typography>

//       <Button variant="contained" onClick={addCar} sx={{mt:3}}>+ Add New Car</Button>

//       <div className="card-grid" style={{marginTop:30}}>
//         {cars.map(car=>(
//           <Paper key={car.id} sx={{padding:2, background:"#15212b", color:"white"}}>
//             <img src={car.image} width="100%" style={{borderRadius:6}}/>
//             <h3>{car.brand} {car.name}</h3>
//             <p>₹ {car.pricePerDay}</p>
//             <Button onClick={()=>handleEdit(car)}>Edit</Button>
//             <Button onClick={()=>del(car.id)} sx={{color:"red"}}>Delete</Button>
//             <input type="file" 
//   onChange={(e)=>{ 
//     setFile(e.target.files[0]); 
//     setPreview(URL.createObjectURL(e.target.files[0]));
//   }}
//   style={{marginTop:20,color:"white"}}
// />

// {preview && <img src={preview} width="150" style={{marginTop:10,borderRadius:10}}/>}

//           </Paper>
//         ))}
//       </div>

//       <Dialog open={open} onClose={()=>setOpen(false)}>
//         <DialogContent sx={{bgcolor:"#0f172a",color:"white"}}>
//           <TextField
//             label="Name" fullWidth sx={{mt:2,input:{color:'white'}}}
//             value={editCar?.name}
//             onChange={e=>setEditCar({...editCar,name:e.target.value})}
//           />
//           <TextField
//             label="Brand" fullWidth sx={{mt:2,input:{color:'white'}}}
//             value={editCar?.brand}
//             onChange={e=>setEditCar({...editCar,brand:e.target.value})}
//           />
//           <TextField
//             label="Price" fullWidth sx={{mt:2,input:{color:'white'}}}
//             value={editCar?.pricePerDay}
//             onChange={e=>setEditCar({...editCar,pricePerDay:e.target.value})}
//           />
//           <TextField
//             label="Image URL" fullWidth sx={{mt:2,input:{color:'white'}}}
//             value={editCar?.image}
//             onChange={e=>setEditCar({...editCar,image:e.target.value})}
//           />
//         </DialogContent>

//         <DialogActions sx={{bgcolor:"#000"}}>
//           <Button onClick={updateCar}>Save Changes</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }
