const express = require("express")
const router = express.Router()
const Product = require("../Models/productSchema")
const isAuth = require("../Middleware/isAuth")
const isAdmin = require("../Middleware/isAdmin")


router.get("/allProducts", async (req, res)=>{
    try {
        const result = await Product.find()
        if (result.length == 0){
            res.status(404).json("Products not found")
        }else {
        res.send({msg:"list of products", result})}
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

router.post("/addProduct", async (req, res)=>{
//router.post("/addProduct", isAuth, isAdmin, async (req, res)=>{
    try {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image:req.body.image,
            brand:req.body.brand,
            category: req.body.category
        }
        await Product.create(newProduct)
        res.send({msg:"Product created", newProduct})
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

router.delete("/deleteProduct/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const result = await Product.findByIdAndDelete({_id: id})
        if (result.length == 0){
            res.status(404).json("product not found")
        }else {
        res.send({msg: "Product deleted", result})}
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")}
    })

    router.put("/updateProduct/:id", async (req, res)=>{
        try {
            const id = req.params.id
            const result = await Product.findByIdAndUpdate({_id:id}, {...req.body},{new :true})
            res.send({msg:"product updated", result})
        } catch (error) {
            console.log(error)
            res.status(500).json("Internal server error")
        }
    })
    router.get("/findCategory/:category", async (req, res)=>{
        try {
        const category = req.params.category
        const result = await Product.find({category:category})
        if (result.length === 0) {
            return res.status(404).json({ msg: "No products found in this category" });
          }
          res.status(200).json({ msg: "Products found", result });
        } catch (error) {
          console.error(error);
          res.status(500).json("Internal server error" );
        }
    })

module.exports = router