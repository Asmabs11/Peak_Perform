const express = require("express");
const router = express.Router();
const Order = require("../Models/orderSchema");
const Product = require("../Models/productSchema"); // Assuming you have a Product model


router.post("/addOrder", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

   
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

  
    const totalPrice = product.price * quantity;

    
    const newOrder = new Order({
      userId,
      product: productId,
      name: product.name,
      quantity,
      price: product.price,
      image: product.image,
      totalPrice,
    });

   
    await newOrder.save();
    res.status(201).json({ msg: "Order placed successfully", newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});


router.get("/allOrders", async (req, res) => {
  try {
    const orders = await Order.find().populate("product"); // Populate the product data
    res.status(200).json({ msg: "Orders fetched", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
