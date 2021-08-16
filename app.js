var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv/config')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));
app.use('/',require('./routes/category'));
app.use('/',require('./routes/articles'));
app.listen(process.env.PORT || 3000,(err)=>{
  if(err){
console.log("error in server");
  }
  else{
console.log("Server is running on port 3000")
  }
})


