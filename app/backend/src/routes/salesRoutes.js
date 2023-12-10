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
      "SELECT s.idsell,s.descr, s.sellvalue, s.mtdpayment, sl.sellername FROM sell s NATURAL JOIN seller sl WHERE s.dtcash = $1 AND s.shopname = $2;",
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

router.get("/sums/:selectedYear/:i/:shopname", async (req, res) => {
  try {
    const selectedYear = req.params.selectedYear;
    const month = req.params.i;
    const shopname = req.params.shopname;
    if (month < 10) {
      const newMonth = `0${month}`;
      const lastDay = new Date(selectedYear, month, 0).getDate();
      const startDate = `${selectedYear}-${newMonth}-01`;
      const endDate = `${selectedYear}-${newMonth}-${lastDay}`;
      const sum = await db.one(
        "SELECT sum(sellvalue) FROM sell WHERE dtcash BETWEEN $1 AND $2 AND shopname = $3;",
        [startDate, endDate, shopname]
      );
      res.json(sum).status(200);
    } else {
      const newMonth = month;
      const lastDay = new Date(selectedYear, newMonth, 0).getDate();
      const startDate = `${selectedYear}-${newMonth}-01`;
      const endDate = `${selectedYear}-${newMonth}-${lastDay}`;
      const sum = await db.one(
        "SELECT sum(sellvalue) FROM sell WHERE dtcash BETWEEN $1 AND $2 AND shopname = $3;",
        [startDate, endDate, shopname]
      );
      res.json(sum).status(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/sellermonth/:month/:shopname",async (req,res)=>{
  const month = req.params.month;
  const shopname = req.params.shopname;
  if (month < 10) {
    const newMonth = `0${month}`;
    const lastDay = new Date(selectedYear, month, 0).getDate();
    const startDate = `${selectedYear}-${newMonth}-01`;
    const endDate = `${selectedYear}-${newMonth}-${lastDay}`;
    const sum = await db.one(
      "SELECT sum(sellvalue) from sell s natural join seller sl where sl.sellername = $1; "
      [startDate, endDate, shopname]
    );
    res.json(sum).status(200);
  } else {
    const newMonth = month;
    const lastDay = new Date(selectedYear, newMonth, 0).getDate();
    const startDate = `${selectedYear}-${newMonth}-01`;
    const endDate = `${selectedYear}-${newMonth}-${lastDay}`;
    const sum = await db.one(
      ""
      [startDate, endDate, shopname]
    );
    res.json(sum).status(200);
  }
})

module.exports = router;
