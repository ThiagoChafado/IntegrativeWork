//imports
require("dotenv").config({ path: "../.env" });
const bcrypt  = require("bcrypt");
const pgp = require("pg-promise")({});
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const PORT = process.env.DB_PORT;
const NAME = process.env.DB_NAME;
const JWT = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL
const db = pgp(`${DB_URL}`);
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

  const token = req.headers['authorization'];
  
  if (!token) return res.status(401).json({ auth: false, message: "No token provided" });

  const cleanToken = token.replace("Bearer ", "");
  

  jwt.verify(cleanToken, JWT, function (err, decoded) {
    if (err) {
      console.error("Error verifying JWT:", err.message);
      return res.status(500).json({ auth: false, message: "Failed to authenticate token" });
    }

    req.username = decoded.username;
    next();
  });
}

//Password: hashing,compare,send token
app.post("/login",  async (req,res) =>{
  try{
    const superuser = req.body.username
    const password = req.body.password 
    hashPassword = await bcrypt.hash(password,10);

    const userdb = await db.one("SELECT superuser FROM adminuser;")
    console.log(userdb.superuser);
    if (superuser === userdb.superuser){
      const passdb = await db.one("SELECT pass FROM adminuser");
      const isValid = await bcrypt.compare(password,passdb.pass);
      if(isValid){
        console.log("Logged")
        const token = jwt.sign({superuser},JWT,{
          expiresIn:"1h"
        })
        res.json({auth:true,token:token});
      }else{
        console.log("Invalid password");
      }
    }else{
      console.log("Invalid username")
    }

  }catch(error){
    console.log(error)
  }
  
})

//Checks if the token is valid
app.get("/verifyToken", verifyJWT, (req, res) => {
  res.status(200).json({ valid: true, message: "Token is valid" });
});

app.post("/addsale", async (req, res) => {
  //Continue
});


app.put("")
app.get("/salesdate/:date", async (req, res) => {
  try {
    const aux = req.params.date;
    console.log(aux);
    const sales = await db.any(
      "SELECT s.idsell,s.descr,s.sellvalue,s.mtdpayment,sl.sellername,s.dtcash FROM sell s JOIN seller sl ON s.sellercpf=sl.cpf WHERE dtcash = $1;",
      [aux]
    );
    await res.json(sales).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/exitsdate/:date", async (req, res) => {
  try {
    const aux = req.params.date;
    console.log(aux);
    const exits = await db.any(
      "SELECT s.idout,s.descr,s.outvalue,sl.sellername,s.dtcash FROM sellout s JOIN seller sl ON s.sellercpf = sl.cpf WHERE dtcash = $1;",
      [aux]
    );
    res.json(exits).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/sellers", async (req, res) => {
  try {
    const sellers = await db.any(
      "SELECT * FROM seller;"
    );
    res.json(sellers).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/hi",(req,res)=>{
  res.sendStatus(400);
})
