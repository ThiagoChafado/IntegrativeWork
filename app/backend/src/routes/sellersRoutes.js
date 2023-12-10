const express = require("express");
const { db } = require("../database/database");

const router = express.Router();

router.get("/sellers/:shopname", async (req, res) => {
  try {
    const aux = req.params.shopname;
    const sellers = await db.any(
      "SELECT s.* FROM seller s NATURAL JOIN sellerboard sl WHERE sl.shopname = $1;",
      [aux]
    );
    res.json(sellers).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/sellersells/:shopname/:selectedMonth", async (req, res) => {
  try {
    const shopname = req.params.shopname;
    const month = req.params.selectedMonth; 
    let extract = month.split("-");
    const newMonth = extract[1];
    const year = extract[0];
    const lastDay = new Date(year, newMonth, 0).getDate();
    const startDate = `${year}-${newMonth}-01`;
    const endDate = `${year}-${newMonth}-${lastDay}`;
    
    const sum = await db.any(
      "SELECT s.sellername, SUM(se.sellvalue) FROM seller s NATURAL LEFT JOIN sell se NATURAL LEFT JOIN cash c WHERE c.shopname = $1 AND c.dtcash BETWEEN $2 AND $3 GROUP BY s.sellername;",
      [shopname, startDate, endDate]
    );

    res.json(sum).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});


router.put("/sellersedit", async (req, res) => {
  try {
    const sellername = req.body.sellername;
    const dtbirth = req.body.dtbirth;
    const pccommision = req.body.pccommision;
    const shopname = req.body.shopname;
    const sellercpf = req.body.sellercpf;
    const editing = await db.none(
      "UPDATE seller SET sellername = $1,dtbirth = $2,pccommision = $3 WHERE sellercpf = $4 AND sellercpf in (SELECT sellercpf FROM sellerboard WHERE shopname = $5);",
      [sellername, dtbirth, pccommision, sellercpf, shopname]
    );
    res.status(200).json({ update: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
