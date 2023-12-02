const jwt = require("jsonwebtoken");
//Middleware to check JWT
function verifyJWT(req, res, next) {
    const token = req.headers["authorization"];
  
    if (!token)
      return res.status(401).json({ auth: false, message: "No token provided" });
  
    const cleanToken = token.replace("Bearer ", "");
  
    jwt.verify(cleanToken, JWT, function (err, decoded) {
      if (err) {
        console.error("Error verifying JWT:", err.message);
        return res
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token" });
      }
  
      req.username = decoded.username;
      next();
    });
  }
  module.exports= {verifyJWT};