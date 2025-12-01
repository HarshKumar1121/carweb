
const express = require("express");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  res.status(201).json({
    message: "User created successfully",
    id: user.id,
    email: user.email,
  });
});

module.exports = router;







// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
// const app = express();


// app.use(express.json());

// const SECRET = "supersecretkey";

// const router = express.Router();

// app.post("/api/signup", async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });
  
//     let person = await prisma.user.findUnique({ where: { email } });
  
//     if (person) return res.status(400).json({ error: "User already exists" });
  
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     await prisma.user.create({
//       data: {
//         email,
//         password: hashedPassword
//       }
//     });
//     res.status(201).json({ message: "User created successfully" });
//   });


// exports.module=router ;

// authentication/signup.js