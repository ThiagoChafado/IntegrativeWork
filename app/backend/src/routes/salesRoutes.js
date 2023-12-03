const express = require("express");
const { db } = require("../database/database");

const router = express.Router();

router.post("/addsale", async (req, res) => {
  try {
    //FINISH
    res.status(200).json({ message: "Sale added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/salesdate/:date/:shopname", async (req, res) => {
  try {
    const date = req.params.date;
    const shopname = req.params.shopname;
    const sales = await db.any(
      "SELECT s.descr, s.sellvalue, s.mtdpayment, sl.sellername FROM sell s NATURAL JOIN seller sl WHERE s.dtcash = $1 AND s.shopname = $2;",
      [date, shopname]
    );
    res.json(sales).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/exitsdate/:date/:shopname", async (req, res) => {
    try {
      const date = req.params.date;
      const shopname = req.params.shopname;
      const exits = await db.any(
        "SELECT s.idout,s.descr,s.outvalue,sl.sellername,s.dtcash FROM sellout s NATURAL JOIN seller sl WHERE dtcash = $1 AND s.shopname=$2;",
        [date, shopname]
      );
      res.json(exits).status(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  });

  router.get("/alldate/:date/:shopname",async (req,res)=>{
    try{
      const date = req.params.date;
      const shopname = req.params.shopname;
      const exits = await db.any(
        "SELECT s.idout,s.descr,s.outvalue,sl.sellername,s.dtcash FROM sellout s NATURAL JOIN seller sl WHERE dtcash = $1 AND s.shopname=$2;",
        [date, shopname]
      );
      const sales = await db.any(
        "SELECT s.descr, s.sellvalue, s.mtdpayment, sl.sellername FROM sell s NATURAL JOIN seller sl WHERE s.dtcash = $1 AND s.shopname = $2;",
        [date, shopname]
      );
      res.json([exits,sales]).status(200);
    }catch(error){
      console.log(error);
      res.sendStatus(400);
    }
  })

module.exports = router;
