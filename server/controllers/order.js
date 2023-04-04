import express from "express";
import { isAuthenticated } from "../middleware/auth";
import Product from "../models/Product";
import Order from "../models/Order";

const router = express.Router();

router.post("/add", isAuthenticated, async(req,res)=>{
    try {
        req.body.buyer = req.payload.id;
        let product = await Product.findById(req.body.product)
        if(!product){
            return res.status(400).json({error: "Product not found"})
        }
        req.body.product = product._id;
        req.body.seller = product.seller;
        req.body.total = req.body.price * req.body.qty;

        let order = new Order(req.body);
        await order.save()
        Product.findByIdAndUpdate(req.body.product, {$set: {stock: product.stock - req.body.qty}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/", isAuthenticated, async(req,res)=>{      //all orders for user
    try {
        let orders = await Order.find({buyer: req.payload.id}).populate("seller");
        return res.status(200).json(orders)

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/seller", isAuthenticated, async(req,res)=>{        //all orders for seller
    try {
        let orders = await Order.find({seller: req.payload.id}).populate("buyer");
        return res.status(200).json(orders)


    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/:orderId", isAuthenticated, async(req,res)=>{
    try {
        let order = await Order.findById(req.params.orderId)
        if(!order || (!order.buyer.equals(req.payload.id) && !order.seller.equals(req.payload.id))){
            return res.status(400).json({error: "Order not found"})
        }
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})


export default router