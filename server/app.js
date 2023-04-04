import express from "express";

const port = 5001;

const app = express();





app.listen(port, ()=>{
    console.log("Listening on port ", port)
})