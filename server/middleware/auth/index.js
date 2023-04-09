import jwt from "jsonwebtoken";
import config from "config"

const generateToken = (payload) =>{
  try {
    const token = jwt.sign(payload, config.get("JWT_KEY"), {expiresIn: "24h"})
    return token
  } catch (error) {
    console.error(error)
    return
  }
}


const isAuthenticated = (req, res, next) => {
  try {
    console.log(req.headers);
    let token = req.headers["auth-token"];
    console.log(token)
    let payload = jwt.verify(token, config.get("JWT_KEY"));
    req.payload = payload;
    return next()
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid Token / Token Expired" });
  }
};


const isAdmin = (req,res,next) =>{
  try {
    if(req.payload.role != "admin"){
      return res.status(400).json({error: "Unauthorized"})
    }
    next()
  } catch (error) {
    console.log(error)
  }
}
const isSeller = (req,res,next) =>{
  try {
    if(req.payload.role != "seller"){
      return res.status(400).json({error: "Unauthorized"})
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export {isAuthenticated, generateToken, isAdmin, isSeller}