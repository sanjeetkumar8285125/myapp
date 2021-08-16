const mongoose=require('mongoose');
const config=require('./config');
mongoose.connect(config.dbURL,{poolSize:config.poolSize,useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{
console.log("connection created")
}).catch((err)=>{
console.log(`error in connection ${err}`);
})
module.exports=mongoose;