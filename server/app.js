import express from "express";
import userRoutes from "./controllers/user.js"
import productRoutes from "./controllers/product.js"
import orderRoutes from "./controllers/order.js"
import config from "config"
import "./dbConnect.js"
import adminRoute from "./controllers/admin.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = config.get("PORT");

const app = express();
// app.use(cors())
app.use(express.json())

app.use("/api/assets", express.static("assets"))
app.use("/api/admin", adminRoute)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoutes)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(port, ()=>{
    console.log("Listening on port ", port)
})