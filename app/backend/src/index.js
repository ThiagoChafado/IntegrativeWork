require('dotenv').config({ path: '../.env' });
const db = require('/home/thiagoalmeida/Desktop/Projects/integrador/app/backend/src/database.js');
const cors=require('cors');
const PORT = process.env.PORT;
const express=require('express');

const app=express();

app.use(cors());
app.use(express.json());


const port = 3001;



app.listen(port, () => console.log(`Server running on port ${port}...`));
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/sales",async (req,res) => {
    try{
        
        const sales = await db.query("SELECT * FROM  sell;");
        res.json(sales).status(200);
        /*const idSell = req.body.idsell
        const sellerName = req.body.sellername;
        const dtBirth = req.body.dtbirth;
        const pcCommision = req.body.pccommision;
        console.log(`idSell:${idSell}, sellerName:${sellerName},dtBirth:${dtBirth},pcCommision:${pcCommision}`);
        */
    }catch (error){
        console.log(error);
        res.sendStatus(400);
    }
});


