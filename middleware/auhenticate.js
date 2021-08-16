const jwt=require('jsonwebtoken')
const userModel=require('../model/Schema/userSchema')
const authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.jwttoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY)
        const rootuser=await userModel.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootuser){
throw new Error("user not found")
        }
        else{
req.token=token
req.user=rootuser
req.userID=rootuser._id
next();
        }
    }catch(err){
        res.status(401).send('Unauthorized:No token provided. First Sign In')
    }

}


module.exports=authenticate;
