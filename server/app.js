import express from "express";
import userRoutes from "./controllers/user.js"
import productRoutes from "./controllers/product.js"
import orderRoutes from "./controllers/order.js"

import "./dbConnect.js"
import adminRoute from "./controllers/admin.js";

const port = 5001;

const app = express();
// app.use(cors())
app.use(express.json())

app.use("/api/assets", express.static("assets"))
app.use("/api/admin", adminRoute)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoutes)



app.listen(port, ()=>{
    console.log("Listening on port ", port)
})