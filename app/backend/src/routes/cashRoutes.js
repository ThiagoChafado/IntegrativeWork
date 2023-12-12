const express = require("express");
const { db } = require("../database/database");
const { route } = require("./authRoutes");

const router = express.Router();


//Checks if the cash is open for seecash page
router.get("/:date/:shopname", async (req, res) => {
  try {
    const date = req.params.date;
    const shopname = req.params.shopname;
    const cash = await db.any(
      "SELECT c.isopen,c.change,c.dtcash FROM cash c NATURAL JOIN shop s WHERE c.dtcash = $1 AND s.shopname = $2;",
      [date, shopname]
    );
    
    res.json(cash).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//Open a new cash
router.post("/opencash", async (req, res) => {
  try {
    const date = req.body.date;
    const shopname = req.body.shopname;
    const change = req.body.change;
    const newCash = await db.none(
      "INSERT INTO cash VALUES ($1,$2,$3,'TRUE');",
      [date, change, shopname]
    );
    res.status(200).json({ check: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//Close a cash
router.put("/closecash", async (req, res) => {
  try {
    const date = req.body.date;
    const shopname = req.body.shopname;
    const closeCash = await db.none(
      "UPDATE cash SET isopen = false WHERE dtcash = $1 AND shopname = $2",
      [date, shopname]
    );
    res.status(200).json({closed:true});
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});
module.exports = router;
