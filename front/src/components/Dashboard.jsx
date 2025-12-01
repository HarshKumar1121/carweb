// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { TextField, Box, Typography } from "@mui/material";
// import CarCard from "./CarCard";
// // import Pagination from "./Pagination";

// import {carPhotos}  from "./carphot"; 
 
// const sampleCars = [
//   { id: 1, name: "Tesla Model S", type: "Electric", price: "$80,000" },
// ];

// function Dashboard() {
//   const { email } = useContext(AuthContext);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const [carsPerPage] = useState(6);

//   const filtered = sampleCars
//     .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) && (filter ? c.type === filter : true));
//   const paged = filtered.slice((page - 1) * carsPerPage, page * carsPerPage);

//   return (
//     <Box mt={5}>
//       <Typography variant="h4" mb={2}>Dashboard</Typography>
//       <Typography variant="subtitle1" mb={2}>Welcome {email || "Guest"}!</Typography>
//       <Box mb={3}>
//         <TextField label="Search Cars" value={search} onChange={e => setSearch(e.target.value)} sx={{ mr: 2 }} />
//         <TextField
//           label="Filter Type"
//           selecte
//           // SelectProps={{ native: false}}
//           value={filter}
//           onChange={e => setFilter(e.target.value)}
//           sx={{ width: 150 }}
//         >
//           <option value="">All Types</option>
//           <option value="Electric">Electric</option>
//           <option value="SUV">SUV</option>
//           <option value="Sedan">Sedan</option>
//           <option value="Coupe">Coupe</option>
//           <option value="Sport">Sport</option>
//           <option value="Hatchback">Hatchback</option>
//         </TextField>
//       </Box>
//       {/* <Box display="flex" flexWrap="wrap" gap={2}>
//         {paged.map(car => <CarCard key={car.id} car={car} />)}
//       </Box> */}
//      <div 
//   className="card-grid" 
//   style={{ display:"flex", flexWrap:"wrap", gap:"20px" }}
// >
//   {carPhotos.map(car => (
//     <div key={car.id}>
//       <img 
//         src={car.image} 
//         alt={car.name}
//         style={{ width:"250px", borderRadius:"8px" }}
//       />
//       <CarCard car={car} />
//     </div>
//   ))}
// </div>
//       {/* <Pagination
//         currentPage={page}
//         totalCount={filtered.length}
//         pageSize={carsPerPage}
//         onPageChange={setPage}
//       /> */}
//     </Box>
//   );
// }

// export default Dashboard;





import React, { useState, useMemo } from "react";
import {carPhotos}  from "./carphot"; 
import CarCard from "../components/CarCard"; 

const PAGE_SIZE = 3;

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔍 Filter cars
  const filtered = useMemo(() => {
    return carPhotos.filter(c =>
      `${c.brand} ${c.name} ${c.model}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // 🔢 Pagination slice
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedCars = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ padding: "20px", textAlign:"center" }}>
      <h1 style={{ color:"white" }}>Car Listings 🚗</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search cars..."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        style={{
          padding:"10px", width:"400px", borderRadius:"8px",
          background:"#111", color:"white", border:"1px solid #444",
        }}
      />

      {/* Car List */}
      <div style={{
        display:"flex", flexWrap:"wrap", gap:"15px",
        justifyContent:"center", marginTop:"25px"
      }}>
        {paginatedCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop:"25px" }}>
        <button
          disabled={page===1}
          onClick={()=> setPage(p=>p-1)}
          style={{marginRight:10,padding:"8px 14px"}}
        >Prev</button>

        <span style={{color:"white"}}>Page {page} of {totalPages}</span>

        <button
          disabled={page===totalPages}
          onClick={()=> setPage(p=>p+1)}
          style={{marginLeft:10,padding:"8px 14px"}}
        >Next</button>
      </div>
    </div>
  );
}






// import React, { useEffect, useState } from "react";
// import { api } from "../api";
// import CarCard from "../components/CarCard";
// import { TextField, Typography } from "@mui/material";

// export default function Dashboard() {
//   const [cars , setCars] = useState([]);
//   const [search , setSearch] = useState("");

//   useEffect(() => {
//     api.get("/cars").then(res => setCars(res.data));
//   }, []);

//   const filtered = cars.filter(c =>
//     `${c.brand} ${c.name}`.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div style={{ padding:30 }}>
//       <Typography variant="h4">Available Cars 🚗</Typography>

//       <TextField
//         label="Search cars..."
//         variant="outlined"
//         sx={{ mt:2, mb:3 , input:{color:"white"} }}
//         onChange={e=>setSearch(e.target.value)}
//       />

//       <div className="card-grid">
//         {filtered.map(car => <CarCard car={car} key={car.id} />)}
//       </div>
//     </div>
//   );
// }


