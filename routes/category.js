const express=require('express');
const router=express.Router();
const multer=require('multer');
const categoryModel=require('../model/Schema/CategorySchema');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/category/')
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

router.post('/addCategory',upload.single('image'),async (req,res)=>{
    
    try{
        const categoryName=req.body.categoryName;
        const image=req.file.path;
        const category=new categoryModel({
            categoryName:categoryName,
            image:image
        })
        const catData=await category.save();
        res.status(201).json({message:"Category added SuccessFully",success:true,data:catData})
    }catch(err){
        console.log(err);
        res.status(400).json({message:"some error Occured",success:false,error:err})
    }
})



module.exports=router;
