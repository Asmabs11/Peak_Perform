const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({

product:{
    type: String, required: true
},
name:{
    type: String, required: true
},
quantity:{
    type: Number, required: true
},
price:{
    type: Number, required: true
},
image:{
    type: String, required: true
},
totalPrice:{
    type: Number, required: true
}

})


const Order = mongoose.model("Order", orderSchema)
module.exports = Order