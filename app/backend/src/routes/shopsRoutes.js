const express = require("express");
const { db } = require("../database/database");

const router = express.Router();

//Adds a new shop
router.get("/shops", async (req, res) => {
  try {
    const shops = await db.any("SELECT shopname FROM shop;");
    res.json(shops).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
