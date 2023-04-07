import express from "express";
import { isAuthenticated } from "../middleware/auth/index.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

const router = express.Router();

<<<<<<< HEAD
router.post("/add", isAuthenticated, async (req, res) => {
  try {
    req.body.buyer = req.payload.id;
    let product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
=======
router.post("/add", isAuthenticated, async(req,res)=>{
    try {
        console.log(req.body);
        req.body.buyer = req.payload.id;
        let product = await Product.findById(req.body.product)
        console.log(product);
        if(!product){
            return res.status(400).json({error: "Product not found"})
        }
        req.body.price = product.price
        req.body.product = product._id;
        req.body.seller = product.seller;
        req.body.total = req.body.price * req.body.qty;

        let order = new Order(req.body);
        await order.save()
        await Product.findByIdAndUpdate(req.body.product, {$set: {stock: product.stock - req.body.qty}})
        return res.status(200).json({message: "Order placed successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
>>>>>>> 4a0bc7a (A)
    }
    req.body.price = product.price;
    req.body.product = product._id;
    req.body.seller = product.seller;
    req.body.total = req.body.price * req.body.qty;

    let order = new Order(req.body);
    await order.save();
    await Product.findByIdAndUpdate(req.body.product, {
      $set: { stock: product.stock - req.body.qty },
    });
    return res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", isAuthenticated, async (req, res) => {
  //all orders for user
  try {
    let orders = await Order.find({ buyer: req.payload.id })
      .populate("seller")
      .populate("product");
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/seller", isAuthenticated, async (req, res) => {
  //all orders for seller
  try {
    let orders = await Order.find({ seller: req.payload.id })
      .populate("buyer")
      .populate("product");
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:orderId", isAuthenticated, async (req, res) => {
  try {
    let order = await Order.findById(req.params.orderId).populate(
      "product buyer seller"
    );

    if (
      !order ||
      (!order.buyer.equals(req.payload.id) &&
        !order.seller.equals(req.payload.id))
    ) {
      return res.status(400).json({ error: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/:orderId", isAuthenticated, async (req, res) => {
  try {
    let result = await Order.deleteOne({ _id: req.params.orderId });
    console.log(result);
    res.status(200).json({ msg: "Order cancelled" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/search/:username", async (req, res) => {
  try {
    let text = req.params.username;
    const response = await User.find({ _id: text });
    const products = await Product.find({ seller: response[0]._id });
    let data = { products: products, userdata: response };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Failed" });
  }
});

export default router;
