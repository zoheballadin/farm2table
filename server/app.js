import express from "express";
import userRoutes from "./controllers/user.js"
import "./dbConnect.js"
const port = 5001;

const app = express();

app.use(express.json())


app.use("/api/user", userRoutes)



app.listen(port, ()=>{
    console.log("Listening on port ", port)
})