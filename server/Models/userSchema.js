const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 fullName: {
    type: String, required: true
 },
 email:{
    type: String, required: true, unique: true
 },
 password:{
    type: String, required: true
 },
 isAdmin:{
    type: Boolean, required: true,
    default: false
 },
 address:{
    type: String
 }
//  orders:[{
//     type:mongoose.Schema.Types.ObjectId, ref: 'Order' 
//  }],
    
})

const User = mongoose.model("User", userSchema)
module.exports = User