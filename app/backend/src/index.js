require('dotenv').config({ path: '../.env' });
const pgp = require("pg-promise")({});
const USER = process.env.DB_USER;
const PASS = process.env.DB_PASS;
const PORT = process.env.DB_PORT;
const NAME = process.env.DB_NAME;
const db = pgp(`postgres://${USER}:${PASS}@localhost:${PORT}/${NAME}`);
const cors=require('cors');
const express=require('express');

const app=express();

app.use(cors());
app.use(express.json());


const port = 3001;



app.listen(port, () => console.log(`Server running on port ${port}...`));

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/sales",async (req,res) => {
    try{
        
        const sales = await db.any("SELECT * FROM  sell;");
        res.json(sales).status(200);
        const idSell = sales.idsell
        const sellerName = req.body.sellername;
        const dtBirth = req.body.dtbirth;
        const pcCommision = req.body.pccommision;
        console.log(`idSell:${idSell}, sellerName:${sellerName},dtBirth:${dtBirth},pcCommision:${pcCommision}`);
        
    }catch (error){
        console.log(error);
        res.sendStatus(400);
    }
});


