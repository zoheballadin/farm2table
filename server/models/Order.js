import mongoose from "mongoose";

let orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    qty: {
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
    price: {
        type :Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    delivery_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "cancelled", "delivered"]
    }
}, {timestamps: true})

let Order = mongoose.model("Order", orderSchema, "orders")

export default Order