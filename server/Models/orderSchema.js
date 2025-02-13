const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
        required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderTime: {
    type: Date,
    default: Date.now, 
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
