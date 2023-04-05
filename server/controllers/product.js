import express, { text } from "express";
import multer from "multer";
import { isAuthenticated, isSeller } from "../middleware/auth/index.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets");
  },
  filename: function (req, file, cb) {
    let ext = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/add",
  isAuthenticated,
  isSeller,
  upload.single("productImage"),
  async (req, res) => {
    try {
      let findUser = await User.findById(req.payload.id);
      if (!findUser) {
        return res.status(401).json({ error: "User does not exist" });
      }
      
      if (req.file) req.body.imageUrl = `/api/assets/${req.file.filename}`;
      req.body.seller = req.payload.id;
      let product = new Product(req.body);
      await product.save();
      return res.status(200).json({message: "Product added successfully"})
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal server error"})
    }
  }
);

router.get("/", async(req,res)=>{
    try {
        
        let products = await Product.find(req.query).populate("seller")
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.get("/:productId", async(req,res)=>{
    try {
        let id = req.params.productId
        let product = await Product.findById(id).populate("seller")
        if(!product){
            return res.status(400).json({error: "Product does not exist"})
        }
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.delete("/:productId", async(req,res)=>{
    try {
        let id = req.params.productId
        let product = await Product.findById(id)
        if(!product){
            return res.status(400).json({error: "Product does not exist"})
        }
        await Product.findByIdAndRemove(id)
        return res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})
router.post('/search',async(req,res)=>{
  try {
    let textReg = new RegExp(req.body.text)
    let result = await Product.find({name :{$regex : textReg}}).populate('seller')
    console.log(result)
    res.status(200).json({result})
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error"})
  }
})

export default router;
