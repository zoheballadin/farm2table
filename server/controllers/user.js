import express from "express";
import sendMail from "../mailer.js";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import {generateToken, isAuthenticated} from "../middleware/auth/index.js"

const router = express.Router();

router.post("/register", async(req,res)=>{
    try {
        let findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
          return res.status(409).json({ error: "User already exists" });
        }
        req.body.password = await bcrypt.hash(req.body.password, 12);
  
        
  
        let user = new User(req.body);
        await user.save();
        await sendMail({
          text: "Welcome to Farm2Table! ",
          subject: "New User",
          receiver: req.body.email,
        });
        return res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})
    }
})

router.post("/login",  async (req, res) => {
    try {
      let { email, password } = req.body;
      let findUser = await User.findOne({ email: email });
      if (!findUser) {
        return res.status(401).json({ error: "User does not exist" });
      }
  
      let match = await bcrypt.compare(password, findUser.password); //comparing hashed password
      if (!match) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
  
      
      let payload = {
        id: findUser._id,
        role: findUser.role,
      };
      let token = generateToken(payload);
      return res.status(200).json({
        message: "Logged in successfully",
        token,
        role: findUser.role,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

router.delete("/delete", isAuthenticated, async(req,res)=>{
    let user = await User.findById(req.payload.id)
    if(!user){
        return res.status(401).json({error: "User not found"})
    }

    await User.deleteOne({_id: req.payload.id})
    return res.status(200).json({message: "User deleted successfully"})
})


export default router