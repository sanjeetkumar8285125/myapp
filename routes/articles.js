const express=require('express');
const router=express.Router();
const multer=require('multer');
const articleModel=require('../model/Schema/articleSchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/article/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

  const fileFilter=(req,file,cb)=>{
if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg'){
cb(null,true);
}
else{
    cb(null,false);
}
  }
const upload = multer({ 
    storage: storage,
    limits:{
        fileSize:1024 *1024
    },
    fileFilter:fileFilter
 })

router.post('/article',upload.single('image'),async (req,res)=>{
    
    try{
        const heading=req.body.articleHeading;
        const desc=req.body.desc;
        const category=req.body.category;
        const url=req.body.url;
        const image=req.file.path;
        console.log(req.body)
        const article=new articleModel({
            articleHeading:heading,desc,category,url,image
        })
        const catData=await article.save();
        res.status(201).json({message:"article added SuccessFully",success:true,data:catData})
    }catch(err){
        console.log(err);
        res.status(400).json({message:"some error Occured",success:false,error:err})
    }
})


module.exports=router;
