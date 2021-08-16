const mongoose=require('../connection');
const Schema=mongoose.Schema;
const categorySchema=new Schema({
    categoryName:{
        type:String,
        required:true
    },
    image:{
    type:String,
    required:true
    }

},{timestamps:true})

const categoryModel=mongoose.model('category',categorySchema);
module.exports=categoryModel;