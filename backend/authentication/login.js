
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

const SECRET = "supersecretkey"; 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "24h" });

  return res.status(200).json({
    message: "Login successful",
    token,
    email: user.email,
  });
});

module.exports = router;






// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { PrismaClient } = require("@prisma/client");

// // const {verifyJWT}=requirr("./middleware/auth.js");

// const prisma = new PrismaClient();
// const app = express();

// const router = express.Router();

// app.use(express.json());

// const SECRET = "supersecretkey";

// router.post("/api/login", async (req, res) => {
//     const { email, password } = req.body;
  
//     if (!email || !password) {
//       return res.status(400).json({ error: "Email and password required" });
//     }
  
//     const use = await prisma.user.findUnique({
//       where: { email }
//     });
  
//     if (!use) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }
  
//     const valid = await bcrypt.compare(password, use.password);
  
//     if (!valid) {
//       return res.status(401).json({ error: "Invalid email or password" });
//     }
  
//     const token = jwt.sign({ id: use.id }, SECRET, { expiresIn: "24h" });
  
//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       email: use.email
//     });
//   });


// module.exports=router ;


// authentication/login.js