import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Box, Typography } from "@mui/material";
import CarCard from "./CarCard";
// import Pagination from "./Pagination";

// import { carPhotos } from "../carPhotos"; 


const sampleCars = [
  { id: 1, name: "Tesla Model S", type: "Electric", price: "$80,000" },
];
// , img: carPhotos[0]

function Dashboard() {
  const { email } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [carsPerPage] = useState(6);

  const filtered = sampleCars
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) && (filter ? c.type === filter : true));
  const paged = filtered.slice((page - 1) * carsPerPage, page * carsPerPage);

  return (
    <Box mt={5}>
      <Typography variant="h4" mb={2}>Dashboard</Typography>
      <Typography variant="subtitle1" mb={2}>Welcome {email || "Guest"}!</Typography>
      <Box mb={3}>
        <TextField label="Search Cars" value={search} onChange={e => setSearch(e.target.value)} sx={{ mr: 2 }} />
        <TextField
          label="Filter Type"
          select
          SelectProps={{ native: true }}
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{ width: 150 }}
        >
          <option value="">All Types</option>
          <option value="Electric">Electric</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Coupe">Coupe</option>
          <option value="Sport">Sport</option>
          <option value="Hatchback">Hatchback</option>
        </TextField>
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2}>
        {paged.map(car => <CarCard key={car.id} car={car} />)}
      </Box>
      {/* <Pagination
        currentPage={page}
        totalCount={filtered.length}
        pageSize={carsPerPage}
        onPageChange={setPage}
      /> */}
    </Box>
  );
}

export default Dashboard;

