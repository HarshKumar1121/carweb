

// const jwt = require("jsonwebtoken")


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

// modules.export = verifyJWT ;