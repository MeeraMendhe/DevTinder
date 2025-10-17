const jwt = require('jsonwebtoken');
const User = require("../Model/User");


const adminAuth=(req,res,next)=>{
    let token="12345";
    let authToken="12345";
    if(token!==authToken)
    {
        res.status(401).send("Admin is not autharized");
    }else
    {
        next()
    }
}

const userAuth=async(req,res,next)=>{
   const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }
    const decoded =jwt?.verify(token, "DEVTinder@2710%MM");
    const user=await User.findById(decoded?._id);
    if(!user)
    {
        throw new Error("User is not found!!!!!")
    }
    
    req.user=user;
    next()
}

module.exports={adminAuth,userAuth}