const express = require("express");
const { db } = require("../database/database");

const router = express.Router();

router.get("/sellers/:shopname", async (req, res) => {
  try {
    const aux = req.params.shopname
    const sellers = await db.any("SELECT * FROM seller;");
    res.json(sellers).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
