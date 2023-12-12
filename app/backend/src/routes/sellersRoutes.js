const express = require("express");
const bcrypt = require("bcrypt");
const { db } = require("../database/database");

const router = express.Router();

//Get all sellers from a shop
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

router.get("/sellersnoadmin/:shopname", async (req,res)=>{
  try{
    const aux = req.params.shopname;
    const sellers = await db.any(
      "SELECT s.* FROM seller s NATURAL JOIN sellerboard sl WHERE sl.shopname = $1 AND s.isadmin = false",[aux]
    );
    res.json(sellers).status(200);
  }catch(error){
    console.log(error);
    res.sendStatus(400);
  }
})

//Get cpf for add new sales and exits
router.get("/sellers/cpf/:shopname/:selectedseller",async (req,res)=>{
  try{
    const aux = req.params.shopname;
    const aux2 = req.params.selectedseller;
    const seller = await db.one(
      "SELECT s.sellercpf FROM seller s NATURAL JOIN sellerboard sl WHERE sl.shopname = $1 AND s.sellername = $2",[aux,aux2]
    );
    res.json(seller).status(200);
  }catch(error){
    console.log(error);
    res.sendStatus(400);
  }
})

//Used in dashboard 2
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
      "SELECT s.sellername, SUM(se.sellvalue),s.pccommision FROM seller s NATURAL LEFT JOIN sell se NATURAL LEFT JOIN cash c WHERE c.shopname = $1 AND c.dtcash BETWEEN $2 AND $3 GROUP BY s.sellername,s.pccommision;",
      [shopname, startDate, endDate]
    );

    res.json(sum).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//Editing a seller
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

//Adds a new seller
router.post("/sellernew", async (req, res) => {
  try {
    const sellername = req.body.sellername;
    const dtbirth = req.body.dtbirth;
    const pccommision = req.body.pccommision;
    const sellerpass = req.body.sellPass;
    const shopname = req.body.shopname;
    const sellercpf = req.body.sellercpf;
    const newpass =  bcrypt.hashSync(sellerpass, 10);
    const shops = await db.any("SELECT shopname FROM shop;");
    const newSeller = await db.none(
      "INSERT INTO seller VALUES($1,$2,$3,$4,$5,'FALSE');",
      [sellercpf, sellername, newpass, pccommision, dtbirth]
    );
    for(let i =0;i<shops.length;i++){
      const sellboard = await db.none("INSERT INTO sellerboard VALUES($1,$2)", [
        sellercpf,
        shops[i].shopname,
      ]);
    }
    
   
    res.status(200).json({ inserted: true });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

//Deletes a seller
router.delete("/sellerdelete",async (req,res)=>{

  try{
    const sellercpf = req.body.sellercpf;
    console.log(sellercpf)
    const deleting = await db.none("DELETE FROM sellerboard WHERE sellercpf = $1;",[sellercpf])
    const deleting2 = await db.none("DELETE FROM seller WHERE sellercpf = $1;",[sellercpf])
    res.status(200).json({deleted: true});
  }catch(error){
    console.log(error);
    res.sendStatus(400);
  }
})

module.exports = router;
