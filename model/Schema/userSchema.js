const mongoose=require('../connection');
const Schema=mongoose.Schema;
const jwt=require('jsonwebtoken')
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true})
userSchema.methods.generateToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
console.log(err)
    }
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;