import mongoose, { mongo } from "mongoose";

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
    }
})

let Order = mongoose.model("Order", orderSchema, "orders")

export default Order