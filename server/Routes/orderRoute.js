const express = require("express");
const router = express.Router();
const Order = require("../Models/orderSchema");
const Product = require("../Models/productSchema"); 


router.post("/addOrder", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
   
    const product = await Product.findById(productId);
    console.log(req.body)
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
    const orders = await Order.find().populate("product"); 
    res.status(200).json({ msg: "Orders fetched", orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
router.post("/checkout", async (req, res) => {
  try {
    const { userId, cardItems, totalPrice } = req.body;
    const newOrder = new Order({
      user: userId,
      products: cardItems,
      totalPrice,
      orderDate: new Date(),
    });
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Checkout failed", error });
  }
});


module.exports = router;
