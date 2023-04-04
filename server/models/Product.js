import mongoose from "mongoose";

let productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 40,
    },
    price: {
      type: Number,
      required: true,
      maxLength: 70,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["fruits", "vegetables"]        //fruits and vegetables
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

let Product = mongoose.model("Product", productSchema, "products");

export default Product;
