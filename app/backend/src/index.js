//imports
require("dotenv").config({ path: "../.env" });
const bcrypt = require("bcrypt");
const pgp = require("pg-promise")({});
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const PORT = process.env.DB_PORT;
const NAME = process.env.DB_NAME;
const JWT = process.env.JWT_SECRET;
const db = pgp(`postgres://${USER}:${PASS}@localhost:${PORT}/${NAME}`);
const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

app.listen(port, () => console.log(`Server running on port ${port}...`));

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
//Password: hashing,compare,send token for superuser
app.post("/loginsuper", async (req, res) => {
  try {
    const superuser = req.body.username;
    const password = req.body.password;
    const userdb = await db.one("SELECT username FROM adminuser;");
    if (superuser == userdb.username) {
      const passdb = await db.one("SELECT adminpass FROM adminuser");
      const isValid = await bcrypt.compare(password, passdb.adminpass);
      if (isValid) {
        console.log("Logged");
        const token = jwt.sign({ superuser }, JWT, {
          expiresIn: "1h",
        });
        res.json({ auth: true, token: token });
      } else {
        console.log("Invalid password");
      }
    } else {
      console.log("Invalid username");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const selluser = req.body.username;
    const password = req.body.password;
    const userdb = await db.one(
      "SELECT sellername FROM seller WHERE sellername=$1;",
      [selluser]
    );
    if (selluser == userdb.sellername) {
      const passdb = await db.one(
        "SELECT sellerpass FROM seller WHERE sellername=$1;",
        [selluser]
      );
      const isValid = await bcrypt.compare(password, passdb.sellerpass);
      if (isValid) {
        console.log("Logged");
        const token = jwt.sign({ selluser }, JWT, {
          expiresIn: "1h",
        });
        res.json({ auth: true, token: token, seller:selluser });
      } else {
        console.log("Invalid password");
      }
    } else {
      console.log("Invalid username");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/logout")

//Checks if the token is valid
app.get("/verifyToken", verifyJWT, (req, res) => {
  res.status(200).json({ valid: true, message: "Token is valid" });
});

app.post("/addsale", async (req, res) => {
  //Continue
});

app.get("/salesdate/:date/:shopname", async (req, res) => {
  try {
    const aux = req.params.date;
    const aux2 = req.params.shopname;
    const sales = await db.any(
      "SELECT s.descr,s.sellvalue,s.mtdpayment,sl.sellername FROM sell s NATURAL JOIN seller sl WHERE s.dtcash = $1 AND s.shopname=$2;",
      [aux, aux2]
    );
    res.json(sales).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/exitsdate/:date/:shopname", async (req, res) => {
  try {
    const aux = req.params.date;
    const aux2 = req.params.shopname;
    console.log(aux);
    const exits = await db.any(
      "SELECT s.idout,s.descr,s.outvalue,sl.sellername,s.dtcash FROM sellout s NATURAL JOIN seller sl WHERE dtcash = $1 AND s.shopname=$2;",
      [aux, aux2]
    );
    res.json(exits).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/sellers/:shopname", async (req, res) => {
  try {
    const aux = req.params.shopname
    const sellers = await db.any("SELECT * FROM seller;");
    res.json(sellers).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/shops", async (req, res) => {
  try {
    const shops = await db.any("SELECT shopname FROM shop;");
    res.json(shops).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
