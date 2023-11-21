import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app=express();

const port = 3001;

app.listen(port,()=>console.log("Server started at port 3001.\n"));
dotenv.config();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});


