const express = require('express');
const router = express.Router();
const bcrypt=require('bcrypt');
const userModel=require('../model/Schema/userSchema');
const checkEmail=require('../middleware/checkEMail');
const authenticate=require('../middleware/auhenticate');

/* GET home page. */


router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/register',checkEmail,async(req,res)=>{
  try{
      const {name,email,password}=req.body
      if(!name || !email || !password){
          return res.json({message:"Please filled all details"});
      }
      const encryptPassword=bcrypt.hashSync(password,10);
      const userdata=new userModel({
      name,
      email,
      password:encryptPassword
  })
  const user=await userdata.save();
  res.status(201).json({message:"user registered SuccessFully",success:true,data:{userId:user._id,name:user.name,email:user.email}})
  }catch(err){
      console.log(err)
      res.status(400).json({message:"Some error occured",success:false,error:err})
      
  }
})
router.post('/login',async(req,res)=>{
  try{
      const {email,password}=req.body;
      console.log(email);
      console.log(password)
      if(!email || !password){
        res.send("Please fill all field")  
       }

      const user= await userModel.findOne({email:email})
      if(!user){
  res.send("user not registered")
      }
      else{
          const isMatched=await bcrypt.compareSync(password,user.password)
          if(!isMatched){
              res.send("Invalid credentials")
          }
          else{
              const token=await user.generateToken();
              console.log(token)
              res.cookie('jwttoken',token,{
                  expires:new Date(Date.now()+ 86400000)  
              })
             res.redirect('/category')
          }
      }
  }catch(err){
      console.log(err);
      res.redirect('/login');
  }

})

router.get('/logout',authenticate,async(req,res)=>{
  res.clearCookie('jwttoken')
  console.log("Logout Successfully");
  await req.user.save();
res.render('login');
})

module.exports = router;
