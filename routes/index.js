var express = require('express');
var router = express.Router();
const categoryModel=require('../model/Schema/CategorySchema');
const authenticate=require('../middleware/auhenticate');
const fetch=require('node-fetch')

// router.get('/article',async(req,res)=>{
// const categoryData=await categoryModel.find();
// console.log(categoryData);
// res.status(200).render('Article',{category:categoryData});
// })

router.get('/article',authenticate,async(req,res)=>{
const response=await fetch('https://rapid-reads-ash.herokuapp.com/api/categories');
const categoryData=await response.json();
console.log(categoryData)
res.status(200).render('Article',{category:categoryData.data});
})

router.get('/category',authenticate,function(req, res, next) {
  res.render('category');
 });

 router.get('/',(req,res)=>{
res.render('index');
})
module.exports = router;