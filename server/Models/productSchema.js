const { stringify } = require("ajv");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ["men", "women", "Kids" ,"accessories"],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
