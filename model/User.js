//Import npm pakage
const mongoose = require('mongoose');

//Define a schema for name,email,password and date
const userSchema = new mongoose.Schema({
   name : { type:String, require:true, min:6, max:255},
   email: {
      type:String, required : true, min:6, max:255
   },
   password : {
      type:String, required:true, max:1024, min:6
   },
   date: {
      type:Date, default: Date.Now
   }
});

//Export this so it is available in other files
//Note user vill be called users in collection in the db
module.exports = mongoose.model('User', userSchema);