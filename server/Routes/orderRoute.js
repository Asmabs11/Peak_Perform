const express = require("express")
const router = express.Router()
const Order = require("../Models/orderSchema")


router.get("/allOrders", async (req, res)=>{
    try {
        const result = await Order.find()
        if (result.length == 0){
            res.status(404).json("Orders not found")
        }else {
        res.send({msg:"list of Orders", result})}
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

router.post("/addOrder", async (req, res)=>{
    try {
        const newOrder = {
            product: req.body.product,
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            image:req.body.image,
            totalPrice:req.body.totalPrice
        }
        await Order.create(newOrder)
        res.send({msg:"Order created", newOrder})
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})
router.delete("/deleteOrder/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const result = await Order.findByIdAndDelete({_id: id})
        if (result.length == 0){
            res.status(404).json("order not found")
        }else {
        res.send({msg: "Order deleted", result})}
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")}
    })

    router.put("/updateOrder/:id", async (req, res)=>{
        try {
            const id = req.params.id
            const result = await Order.findByIdAndUpdate({_id:id}, {...req.body},{new :true})
            res.send({msg:"Order updated", result})
        } catch (error) {
            console.log(error)
            res.status(500).json("Internal server error")
        }
    })
module.exports = router