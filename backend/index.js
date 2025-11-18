// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const SECRET = "supersecretkey"; // Replace with a secure key in production

// // In-memory user store (use a real database in production)
// const users = [];

// // Sample car data
// const cars = [
//   {
//     id: 1,
//     name: "Tesla Model S",
//     price: 1250000,
//     type: "Electric",
//     rental: true,
//     images: [
//       "https://images.unsplash.com/photo-1511918984145-48de785d4c4d",
//       "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
//     ],
//     year: 2021,
//   },
//   // Add more cars
// ];

// // --- SIGNUP ---
// app.post("/api/signup", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: "Email and password required" });

//   // Check if the email is already registered
//   if (users.find(u => u.email === email))
//     return res.status(409).json({ error: "Email already registered" });

//   // Hash password and store
//   const hashed = await bcrypt.hash(password, 10);
//   const user = { email, password: hashed };
//   users.push(user);

//   // Create JWT
//   const token = jwt.sign({ email }, SECRET, { expiresIn: "12h" });
//   res.json({ user: { email }, token });
// });

// app.get("/", (req, res) => {
//     res.send("API is working!");
//   });
  
// // --- LOGIN ---
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find(u => u.email === email);
//   if (!user)
//     return res.status(400).json({ error: "Invalid credentials" });

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid)
//     return res.status(400).json({ error: "Invalid credentials" });

//   // Create JWT
//   const token = jwt.sign({ email }, SECRET, { expiresIn: "12h" });
//   res.json({ user: { email }, token });
// });

// // --- Middleware: JWT Verification ---
// function verifyJWT(req, res, next) {
//   const auth = req.headers.authorization;
//   if (!auth || !auth.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Missing or invalid token" });
//   }
//   const token = auth.split(" ")[1];
//   try {
//     req.user = jwt.verify(token, SECRET);
//     next();
//   } catch {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }

// // --- PROTECTED Cars API ---
// app.get("/api/cars", verifyJWT, (req, res) => {
//   const { search = "", filter = "", page = 1 } = req.query;
//   let filtered = cars.filter(car =>
//     car.name.toLowerCase().includes(search.toLowerCase()) &&
//     (filter === "" || car.type === filter)
//   );
//   const PAGE_SIZE = 2;
//   const total = filtered.length;
//   const start = (page - 1) * PAGE_SIZE;
//   const end = start + PAGE_SIZE;
//   res.json({
//     cars: filtered.slice(start, end),
//     total
//   });
// });

// app.listen(4000, () => {
//   console.log("Server running on http://localhost:4000");
// });




// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { PrismaClient } = require("@prisma/client");

// const app = express();
// const prisma = new PrismaClient();

// const SECRET = "supersecretkey";

// app.use(cors());
// app.use(bodyParser.json());

// app.post("/api/signup", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: "Email and password required" });

//   try {
//     const hash = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { email, password: hash }
//     });
//     const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "12h" });
//     res.json({ user: { email: user.email }, token });
//   } catch (err) {
//     if (err.code === "P2002") return res.status(409).json({ error: "Email already registered" });
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // --- LOGIN ---
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(400).json({ error: "Invalid credentials" });

//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(400).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "12h" });
//   res.json({ user: { email: user.email }, token });
// });

// function verifyJWT(req, res, next) {
//   const auth = req.headers.authorization;
//   if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing or invalid token" });
//   const token = auth.split(" ")[1];
//   try {
//     req.user = jwt.verify(token, SECRET);
//     next();
//   } catch {
//     res.status(401).json({ error: "Invalid token" });
//   }
// }

// app.post("/api/cars", verifyJWT, async (req, res) => {
//   const { name, price, type, rental, images, year } = req.body;
//   try {
//     const car = await prisma.car.create({
//       data: {
//         name, price, type, rental, images: JSON.stringify(images), year
//       }
//     });
//     res.json({ car });
//   } catch (err) {
//     res.status(400).json({ error: "Error adding car" });
//   }
// });

// // --- GET CARS (Protected) ---
// app.get("/api/cars", verifyJWT, async (req, res) => {
//   const { search = "", filter = "", page = 1 } = req.query;
//   const PAGE_SIZE = 2;
//   const where = {
//     AND: [
//       { name: { contains: search, mode: "insensitive" } },
//       filter ? { type: filter } : {}
//     ]
//   };
//   const [cars, total] = await Promise.all([
//     prisma.car.findMany({
//       where,
//       skip: (parseInt(page) - 1) * PAGE_SIZE,
//       take: PAGE_SIZE
//     }),
//     prisma.car.count({ where })
//   ]);
//   const prepared = cars.map(car => ({
//     ...car,
//     images: JSON.parse(car.images)
//   }));
//   res.json({ cars: prepared, total });
// });

// app.get("/", (req, res) => {
//   res.send("API is working!");
// });

// app.listen(4000, () => {
//   console.log("Server running on http://localhost:4000");
// });



// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const mysql = require("mysql2/promise");

// const {PrismaClient}= require('@prisma/client');
// const prisma= new PrismaClient();



// const app = express();
// app.use(cors(
//   {
//     origin:'http://localhost:3000',
//     methods:['GET','PUT','POST'],
//     credentials:true
//   }
// ));
// app.use(express.json())
// app.use(bodyParser.json());

// const SECRET = "supersecretkey";

// // app.get("/",async (req,res)=>{
// //   console.log("hi")
// //   res.send("fxdcghvbj")
// // })


// app.post("/api/signup", async (req, res) => {
//   const { email, password } = req.body;
//     if (!email || !password){
//     return res.status(400).json({ error: "Email and password required" })
//     }

//     const person= await prisma.user.findUnique({
//       where:{
//         email
//       }})

//       if(person){
//         res.status(401).send("user already there")
//       }

//     const data= await prisma.user.create({
//       data:{
//       email:req.body.email,
//       password:req.body.password
//     }});
    
//     res.status(201).send("working")
// });


// app.post("/api/login", async (req, res) => {
//   // console.log(req.body);

//   const { email, password } = req.body;

//     if (!email || !password){
//     return res.status(400).json({ error: "Email and password required" })
//     }

//   // const data= await prisma.user.findFirst({
//   //   where :{
//   //     email : req.body.email
//   //   }
//   res.status(200).json(data)    
//   });










// function verifyJWT(req, res, next) {
//     const auth = req.headers.authorization;
//     if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing or invalid token" });
  
//     const token = auth.split(" ")[1];
//     try {
//       req.user = jwt.verify(token, SECRET);
//       next();
//     } catch {
//       res.status(401).json({ error: "Invalid token" });
//     }
//   }


// // app.get("/api/cars", verifyJWT, async (req, res) => {
// //   try {
// //     const [cars] = await pool.query("SELECT * FROM Car");
// //     const carsWithImages = cars.map(car => ({
// //       ...car,
// //       images: JSON.parse(car.images)
// //     }));
// //     res.json({ cars: carsWithImages, total: cars.length });
// //   } catch (err) {
// //     res.status(500).json({ error: "Internal server error" });
// //   }
// // });

// app.listen(4000, () => {
//   console.log("Server running on http://localhost:4000");
// });


const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));

app.use(express.json());

const SECRET = "supersecretkey";

app.get("/",async (req, res) => {

  console.log("gchvjbkn")
  res.send("fchgv")
})

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  let person = await prisma.user.findUnique({ where: { email } });

  if (person) return res.status(400).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
  res.status(201).json({ message: "User created successfully" });
});

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ error: "Email and password required" });
//   const user = await prisma.user.findUnique({
//     where: { email }
//   });
//   if (!user) return res.status(401).json({ error: "Invalid credentials" });
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) return res.status(401).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
//     expiresIn: "24h"
//   });

//   res.status(200).json({
//     message: "Login successful",
//     token
//   });
// });

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const use= await prisma.user.findUnique({
    where: { email }
  });

  if (!use) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, use.password);

  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: use.id }, SECRET, { expiresIn: "24h" });

  return res.status(200).json({
    message: "Login successful",
    token,
    email: use.email
  });
});


function verifyJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer "))
    return res.status(401).json({ error: "Missing or invalid token" });

  const token = auth.split(" ")[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});