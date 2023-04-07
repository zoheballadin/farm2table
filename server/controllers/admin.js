import express from 'express'
import {generateToken, isAuthenticated} from "../middleware/auth/index.js"
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt'
import User from '../models/User.js';
const adminRoute = express.Router()

adminRoute.post('/login',async(req,res)=>{
    try {
        let { email, password } = req.body;
        let adminFound = await Admin.findOne({ email: email });
        if (!adminFound) {
          return res.status(401).json({ error: "Admin does not exist" });
        }
    
        let match = await bcrypt.compare(password, adminFound.password); //comparing hashed password
        if (!match) {
          return res.status(401).json({ error: "Incorrect Password" });
        }
    
        
        let payload = {
          id: adminFound._id,
          role: adminFound.role,
        };
        let token = generateToken(payload);
        return res.status(200).json({
          message: "Logged in successfully",
          token,
          role: adminFound.role,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
      }
})

adminRoute.get('/requests',isAuthenticated,async(req,res)=>{
  try {
    const requests = await Admin.find({_id : req.payload.id}).populate('requests')
    console.log(req.payload.id)
    res.status(200).json({requests : requests[0].requests})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });

  }
})
adminRoute.post('/isapprove',isAuthenticated,async(req,res)=>{
  try {
    const res2 = await Admin.updateOne({},{
      $pull : {
        requests : req.body.sellerId
      }
    })

    if(!req.body.isApprove){
      const result = await User.deleteOne({_id : req.body.sellerId});
      return     res.status(200).json({msg : 'Seller Removed'})
    }
    const result = await User.updateOne({_id : req.body.sellerId},{
      $set : {isApprove : true},
    })
    
    res.status(200).json({msg : 'Seller Approved'})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });

  }
})
adminRoute.get('/fetchsellers',async (req,res)=>{
  try {
    if(!req.query.text){
      console.log(req.query.text)
      const sellers = await User.find({role : 'seller'})
      return     res.status(200).json({sellers })
    }
    let textReg = new RegExp( req.query.text, 'ig');
    const sellers = await User.find({ fullname: { $regex: textReg },role : 'seller' })
    res.status(200).json({sellers })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" });
  }
})
export default adminRoute