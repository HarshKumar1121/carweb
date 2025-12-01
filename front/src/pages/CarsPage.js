// // src/pages/CarsPage.js
// import React, { useEffect, useMemo, useState } from "react";
// import { api, authHeaders } from "../api";
// import { useAuth } from "../context/AuthContext";

// const PAGE_SIZE = 6;

// const HERO_IMAGES = [
//   "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
//   "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
// ];

// export default function CarsPage() {
//   const { token, email, logout } = useAuth();

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // filters & search
//   const [search, setSearch] = useState("");
//   const [brandFilter, setBrandFilter] = useState("all");
//   const [availability, setAvailability] = useState("all"); // all | available | unavailable
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   // pagination
//   const [page, setPage] = useState(1);

//   // add car form
//   const [newCar, setNewCar] = useState({
//     name: "",
//     brand: "",
//     model: "",
//     year: "",
//     pricePerDay: "",
//     fuelType: "",
//     seats: "",
//     image: "",
//   });
//   const [saving, setSaving] = useState(false);

//   // hero carousel
//   const [heroIndex, setHeroIndex] = useState(0);

//   useEffect(() => {
//     async function fetchCars() {
//       try {
//         const res = await api.get("/cars");
//         setCars(res.data);
//       } catch (e) {
//         console.error(e);
//         setErr("Failed to load cars");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchCars();
//   }, []);


//   useEffect(() => {
//     const id = setInterval(() => {
//       setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
//     }, 5000);
//     return () => clearInterval(id);
//   }, []);

//   const brands = useMemo(() => {
//     const set = new Set(cars.map((c) => c.brand).filter(Boolean));
//     return ["all", ...Array.from(set)];
//   }, [cars]);

//   const filteredCars = useMemo(() => {
//     let result = [...cars];

//     if (search.trim()) {
//       const q = search.toLowerCase();
//       result = result.filter((c) =>
//         `${c.name} ${c.brand} ${c.model || ""}`.toLowerCase().includes(q)
//       );
//     }

//     if (brandFilter !== "all") {
//       result = result.filter((c) => c.brand === brandFilter);
//     }

//     if (availability === "available") {
//       result = result.filter((c) => c.available);
//     } else if (availability === "unavailable") {
//       result = result.filter((c) => !c.available);
//     }

//     if (minPrice) {
//       const p = Number(minPrice);
//       result = result.filter((c) => c.pricePerDay >= p);
//     }
//     if (maxPrice) {
//       const p = Number(maxPrice);
//       result = result.filter((c) => c.pricePerDay <= p);
//     }

//     return result;
//   }, [cars, search, brandFilter, availability, minPrice, maxPrice]);

//   const totalPages = Math.max(1, Math.ceil(filteredCars.length / PAGE_SIZE));

//   const paginatedCars = useMemo(() => {
//     const start = (page - 1) * PAGE_SIZE;
//     return filteredCars.slice(start, start + PAGE_SIZE);
//   }, [filteredCars, page]);

//   useEffect(() => {
//     if (page > totalPages) setPage(1);
//   }, [totalPages, page]);

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setNewCar((prev) => ({ ...prev, [name]: value }));
//   }

//   async function handleAddCar(e) {
//     e.preventDefault();
//     if (!token) {
//       alert("Please login to add a car.");
//       return;
//     }
//     setSaving(true);
//     try {
//       const payload = {
//         name: newCar.name,
//         brand: newCar.brand,
//         model: newCar.model || null,
//         year: newCar.year ? Number(newCar.year) : null,
//         pricePerDay: Number(newCar.pricePerDay),
//         fuelType: newCar.fuelType || null,
//         seats: newCar.seats ? Number(newCar.seats) : null,
//         image: newCar.image || null,
//       };

//       // you don't yet have POST /cars in your backend snippet,
//       // if you add it, this will work. If not, comment this out.
//       const res = await api.post("/cars", payload, authHeaders(token));
//       const created = res.data.car || res.data;
//       setCars((prev) => [...prev, created]);

//       setNewCar({
//         name: "",
//         brand: "",
//         model: "",
//         year: "",
//         pricePerDay: "",
//         fuelType: "",
//         seats: "",
//         image: "",
//       });
//     } catch (e) {
//       console.error(e);
//       alert(e.response?.data?.error || "Failed to add car");
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleDelete(id) {
//     if (!token) {
//       alert("Please login to delete a car.");
//       return;
//     }
//     if (!window.confirm("Delete this car?")) return;
//     try {
//       await api.delete(`/delete/cars/${id}`, authHeaders(token));
//       setCars((prev) => prev.filter((c) => c.id !== id));
//     } catch (e) {
//       console.error(e);
//       alert(e.response?.data?.error || "Failed to delete car");
//     }
//   }

//   function handleHeroPrev() {
//     setHeroIndex((prev) =>
//       prev === 0 ? HERO_IMAGES.length - 1 : prev - 1
//     );
//   }

//   function handleHeroNext() {
//     setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
//   }

//   if (loading) {
//     return (
//       <div className="page-center">
//         <div className="spinner" />
//         <p>Loading cars...</p>
//       </div>
//     );
//   }

//   if (err) {
//     return (
//       <div className="page-center">
//         <p className="error-text">{err}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="cars-page">
//       {/* Hero */}
//       <section
//         className="hero-carousel"
//         style={{ backgroundImage: `url(${HERO_IMAGES[heroIndex]})` }}
//       >
//         <div className="hero-overlay">
//           <div className="hero-content">
//             <h1>Find your perfect ride</h1>
//             <p>Search, filter and manage your cars in one beautiful dashboard.</p>
//             <div className="hero-badges">
//               <span>JWT Auth</span>
//               <span>Prisma + Postgres</span>
//               <span>React Filters & Pagination</span>
//             </div>
//           </div>
//           <div className="hero-controls">
//             <button onClick={handleHeroPrev}>&lt;</button>
//             <button onClick={handleHeroNext}>&gt;</button>
//           </div>
//         </div>
//       </section>

//       {/* Top bar */}
//       <section className="top-bar">
//         <div>
//           <h2>Cars Inventory</h2>
//           <p>Manage cars with advanced search and filters.</p>
//         </div>
//         <div className="top-bar-user">
//           {email && <span className="user-email">{email}</span>}
//           <button className="btn-outline" onClick={logout}>
//             Logout
//           </button>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="filters-card">
//         <input
//           className="filter-input"
//           type="text"
//           placeholder="Search by name, brand, model..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setPage(1);
//           }}
//         />

//         <select
//           className="filter-select"
//           value={brandFilter}
//           onChange={(e) => {
//             setBrandFilter(e.target.value);
//             setPage(1);
//           }}
//         >
//           {brands.map((b) => (
//             <option key={b} value={b}>
//               {b === "all" ? "All brands" : b}
//             </option>
//           ))}
//         </select>

//         <select
//           className="filter-select"
//           value={availability}
//           onChange={(e) => {
//             setAvailability(e.target.value);
//             setPage(1);
//           }}
//         >
//           <option value="all">All cars</option>
//           <option value="available">Only available</option>
//           <option value="unavailable">Only unavailable</option>
//         </select>

//         <input
//           className="filter-input"
//           type="number"
//           placeholder="Min price"
//           value={minPrice}
//           onChange={(e) => {
//             setMinPrice(e.target.value);
//             setPage(1);
//           }}
//         />
//         <input
//           className="filter-input"
//           type="number"
//           placeholder="Max price"
//           value={maxPrice}
//           onChange={(e) => {
//             setMaxPrice(e.target.value);
//             setPage(1);
//           }}
//         />
//       </section>

//       {/* Cars grid */}
//       <section className="cars-grid">
//         {filteredCars.length === 0 ? (
//           <p className="muted">No cars match your search.</p>
//         ) : (
//           paginatedCars.map((car) => (
//             <div key={car.id} className="car-card">
//               <div className="car-card-image">
//                 {car.image ? (
//                   <img src={car.image} alt={car.name} />
//                 ) : (
//                   <div className="car-card-placeholder">No image</div>
//                 )}
//               </div>
//               <div className="car-card-body">
//                 <h3>{car.name}</h3>
//                 <p className="car-card-brand">
//                   {car.brand} {car.model ? `• ${car.model}` : ""}
//                 </p>
//                 <p className="car-card-meta">
//                   {car.year && <span>{car.year}</span>}
//                   {car.fuelType && <span>{car.fuelType}</span>}
//                   {car.seats && <span>{car.seats} seats</span>}
//                 </p>
//                 <p className="car-card-price">₹{car.pricePerDay} / day</p>
//                 <p
//                   className={
//                     "car-card-availability " +
//                     (car.available ? "available" : "not-available")
//                   }
//                 >
//                   {car.available ? "Available" : "Unavailable"}
//                 </p>
//               </div>
//               <div className="car-card-footer">
//                 <button
//                   className="btn-danger"
//                   onClick={() => handleDelete(car.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </section>

//       {/* Pagination */}
//       {filteredCars.length > 0 && (
//         <div className="pagination">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => p - 1)}
//           >
//             Prev
//           </button>
//           <span>
//             Page <strong>{page}</strong> of{" "}
//             <strong>{totalPages}</strong>
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Add car */}
//       <section className="add-car-card">
//         <div className="add-car-header">
//           <h3>Add new car</h3>
//           {!token && (
//             <span className="muted">
//               Login is required to add or delete cars.
//             </span>
//           )}
//         </div>
//         <form className="add-car-form" onSubmit={handleAddCar}>
//           <input
//             name="name"
//             placeholder="Name*"
//             value={newCar.name}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             name="brand"
//             placeholder="Brand*"
//             value={newCar.brand}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             name="model"
//             placeholder="Model"
//             value={newCar.model}
//             onChange={handleInputChange}
//           />
//           <input
//             name="year"
//             type="number"
//             placeholder="Year"
//             value={newCar.year}
//             onChange={handleInputChange}
//           />
//           <input
//             name="pricePerDay"
//             type="number"
//             placeholder="Price per day*"
//             value={newCar.pricePerDay}
//             onChange={handleInputChange}
//             required
//           />
//           <input
//             name="fuelType"
//             placeholder="Fuel type"
//             value={newCar.fuelType}
//             onChange={handleInputChange}
//           />
//           <input
//             name="seats"
//             type="number"
//             placeholder="Seats"
//             value={newCar.seats}
//             onChange={handleInputChange}
//           />
//           <input
//             name="image"
//             placeholder="Image URL"
//             value={newCar.image}
//             onChange={handleInputChange}
//           />
//           <button type="submit" className="btn-primary" disabled={saving}>
//             {saving ? "Saving..." : "Add car"}
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

