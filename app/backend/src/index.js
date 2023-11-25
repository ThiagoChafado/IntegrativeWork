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

app.get("/", (req, res) => {
    res.send("Hello, world!");
});



app.get("/salesdate/:date",async (req,res) => {
        
    try{
        const aux = (req.params.date);
        console.log(aux);
        const sales = await db.any("SELECT * FROM sell WHERE dtcash = $1;",[aux]);
        res.json(sales).status(200);
        
        
    }catch (error){
        console.log(error);
        res.sendStatus(400);
    }
});




