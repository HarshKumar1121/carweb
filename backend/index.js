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


// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { PrismaClient } = require("@prisma/client");
// const login = reuire("./authentication/login.js"); 
// const signin = reuire("./authentication/signup.js");

// const {verifyJWT}=requirr("./middleware/auth.js");

// const prisma = new PrismaClient();
// const app = express();

// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT"],
//   credentials: true
// }));

// app.use(express.json());

// const SECRET = "supersecretkey";

// app.get("/",async (req, res) => {

//   console.log("gchvjbkn")
//   res.send("fchgv")
// })

// app.use(signin)
// app.use(login)


// const express = require("express");
// const cors = require("cors");
// const { PrismaClient } = require("@prisma/client");

// const loginRouter = require("./authentication/login.js");
// const signupRouter = require("./authentication/signup.js");
// const { verifyJWT } = require("./middleware/auth.js");

// const prisma = new PrismaClient();
// const app = express();
// const router = express.Router();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT"],
//     credentials: true,
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   console.log("Root route hit");
//   res.send("Backend is running ✅");
// });

// app.use("/auth", signupRouter); 
// app.use("/auth", loginRouter); 


// app.get("/protected", verifyJWT, (req, res) => {
//   res.json({ message: "You accessed a protected route", userId: req.userId });
// });

// app.delete("/delete/users/:id",async(req,res)=>{
//   const {id}= req.params;
//   const dat = await users.prisma.delete({where:id})
// })
// app.delete("/delete/cars/:id",async(req,res)=>{
//   const {id}= req.params;
//   const dat = await casr.prisma.delete({where:id})
// })



// app.update("/update/users/:id",async(req,res)=>{
//   const {id}= req.params;
//   const dat = await users.prisma.update({where:id})
// })
// app.update("/update/cars/:id",async(req,res)=>{
//   const {id}= req.params;
//   const {data}=req.body
//   const dat = await casr.prisma.update({where:id,data:{data}})
// })




// app.listen(4000, () => {
//   console.log("Server running on http://localhost:4000");
// });


const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const loginRouter = require("./authentication/login.js");
const signupRouter = require("./authentication/signup.js");
const { verifyJWT } = require("./middleware/auth.js");

const prisma = new PrismaClient();
const app = express();

// const upload = require("./upload");
// app.post("/upload", upload.single("image"), (req, res) => {
//   res.json({ url: req.file.path }); 
// });


app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("Root route hit");
  res.send("Backend is running ✅");
});

app.use("/auth", signupRouter);
app.use("/auth", loginRouter);

app.get("/protected", verifyJWT, (req, res) => {
  res.json({ message: "You accessed a protected route", userId: req.userId });
});

app.get("/cars", async (req, res) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

app.get("/cars/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const car = await prisma.car.findUnique({ where: { id } });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    console.error("Error fetching car:", err);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});


app.delete("/delete/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.delete({
      where: { id },
    });

    res.json({ message: `User ${id} deleted` });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.delete("/delete/cars/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.car.delete({
      where: { id },
    });

    res.json({ message: `Car ${id} deleted` });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
});

app.put("/update/users/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    res.json({ message: "User updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.put("/update/cars/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body; 

    const updatedCar = await prisma.car.update({
      where: { id },
      data,
    });

    res.json({ message: "Car updated", car: updatedCar });
  } catch (err) {
    console.error("Error updating car:", err);
    res.status(500).json({ error: "Failed to update car" });
  }
});


app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
