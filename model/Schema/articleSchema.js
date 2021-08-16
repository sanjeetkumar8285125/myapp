const mongoose=require('../connection');
const Schema=mongoose.Schema;
const articleSchema=new Schema({
    articleHeading:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:[{
        type:Object,
        required:true
    }],
    url:{
        type:String,
        required:true
    },
    image:{
    type:String,
    required:true
    }

},{timestamps:true})

const articleModel=mongoose.model('article',articleSchema);
module.exports=articleModel;