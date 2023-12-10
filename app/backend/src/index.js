// index.js
require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const { verifyJWT } = require("./middlewares/middlewares");
const authRoutes = require("./routes/authRoutes");
const salesRoutes = require("./routes/salesRoutes");
const sellersRoutes = require("./routes/sellersRoutes");
const shopsRoutes = require("./routes/shopsRoutes");
const cashRoutes = require("./routes/cashRoutes")

const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.use("/auth", authRoutes);
app.use("/sales", salesRoutes);
app.use("/sellers", sellersRoutes);
app.use("/shops", shopsRoutes);
app.use("/cash", cashRoutes);


app.get("/verifyToken", verifyJWT, (req, res) => {
  res.status(200).json({ valid: true, message: "Token is valid" });
});

app.listen(port, () => console.log(`Server running on port ${port}...`));
