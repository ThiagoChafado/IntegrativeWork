const express = require("express");
const { db } = require("../database/database");
const { route } = require("./authRoutes");

const router = express.Router();

router.get("/:date/:shopname", async (req, res) => {
  try {
    const date = req.params.date;
    const shopname = req.params.shopname;
    const cash = await db.one(
      "SELECT c.isopen FROM cash c NATURAL JOIN shop s WHERE c.dtcash = $1 AND s.shopname = $2;",
      [date, shopname]
    );
    res.json(cash).status(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
