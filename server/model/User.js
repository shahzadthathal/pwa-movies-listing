const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  favoriteItemsArr:[],
  
  image:{
    type:String,
    default:''
  },
  bio:{
    type:String,
    default:''
  },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);