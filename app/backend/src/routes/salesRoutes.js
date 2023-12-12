const express = require("express");
const { db } = require("../database/database");
const router = express.Router();

//Add a new exit if a cash is valid
router.post("/addexit", async (req, res) => {
  try {
    const sellercpf = req.body.cpf;
    const descr = req.body.outDescr;
    const outValue = req.body.outValue;
    const outValueFloat = parseFloat(outValue);
    const dtcash = req.body.date;
    const shopname = req.body.shopname;

    const add = await db.none(
      "INSERT INTO sellout (descr,outvalue,sellercpf,dtcash,shopname) VALUES ($1,$2,$3,$4,$5);",
      [descr, outValueFloat, sellercpf, dtcash, shopname]
    );
    res.status(200).json({ inserted: true });
  } catch (error) {
    console.log(error);
    if (error.code == "23503") {
      //FK ERROR
      return res.json({ fkerror: true });
    }
    return res.json({ inserted: false });
  }
});

//Add a new sale if the cash is valid
router.post("/addsale", async (req, res) => {
  try {
    const sellercpf = req.body.cpf;

    const descr = req.body.sellDescr;
    const sellvalue = req.body.sellvalue;
    const sellvalueFloat = parseFloat(sellvalue);
    let mtdpayment = req.body.payment;
    if (mtdpayment == "Dinheiro") {
      mtdpayment = 1;
    }
    if (mtdpayment == "Cartão de Crédito") {
      mtdpayment = 2;
    }
    if (mtdpayment == "Cartão de Débito") {
      mtdpayment = 3;
    }
    if (mtdpayment == "Pix") {
      mtdpayment = 4;
    }
    const dtcash = req.body.date;
    const shopname = req.body.shopname;
    const add = await db.none(
      "INSERT INTO sell (descr,sellvalue,mtdpayment,sellercpf,dtcash,shopname) VALUES ($1,$2,$3,$4,$5,$6);",
      [descr, sellvalueFloat, mtdpayment, sellercpf, dtcash, shopname]
    );
    res.status(200).json({ inserted: true });
  } catch (error) {
    console.log(error);
    if (error.code == "23503") {
      //FK ERROR
      return res.json({ fkerror: true });
    }
    return res.json({ inserted: false });
  }
});

//Get sales for salestable page
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

//Get exits for selloutstable page
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

//Gets sum for dashboard 1
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

router.delete("/selldelete/:shopname/:selectedId", async (req, res) => {
  try {
    const aux = req.params.selectedId;
    const selectedId = parseInt(aux);
    const shopname = req.params.shopname;
    const action = await db.none(
      "DELETE FROM sell WHERE idsell = $1 AND shopname = $2",
      [selectedId, shopname]
    );
    return res.json({deleted: true}).status(200);
  } catch (error) {
    console.log(error);
    return res.json({deleted: false}).status(400);
  }
});

//Get sum for dashboard 2
router.get("/sellermonth/:month/:shopname", async (req, res) => {
  const month = req.params.month;
  const shopname = req.params.shopname;
  if (month < 10) {
    const newMonth = `0${month}`;
    const lastDay = new Date(selectedYear, month, 0).getDate();
    const startDate = `${selectedYear}-${newMonth}-01`;
    const endDate = `${selectedYear}-${newMonth}-${lastDay}`;
    const sum = await db.one(
      "SELECT sum(sellvalue) from sell s natural join seller sl where sl.sellername = $1; "[
        (startDate, endDate, shopname)
      ]
    );
    res.json(sum).status(200);
  } else {
    const newMonth = month;
    const lastDay = new Date(selectedYear, newMonth, 0).getDate();
    const startDate = `${selectedYear}-${newMonth}-01`;
    const endDate = `${selectedYear}-${newMonth}-${lastDay}`;
    const sum = await db.one(""[(startDate, endDate, shopname)]);
    res.json(sum).status(200);
  }
});

module.exports = router;
