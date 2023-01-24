const jwt  = require("jsonwebtoken");
const User = require("../models/userModel")


const requireAuth =async(req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error:"Authorization token needed"});
        return
    }


    const token = authorization.split(' ')[1];

    try{
       const {_id}= jwt.verify(token,process.env.SECRET);
        req.user  =await User.findOne({_id}).select("_id");
    
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({error:"User not authorized"});
    }
}

module.exports = requireAuth