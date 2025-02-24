const express = require("express")
const router = express.Router()
const User = require("../Models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const isAuth = require("../Middleware/isAuth")

router.post("/addUser", async (req, res)=>{
    try {
        const newUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: req.body.isAdmin,
            address: req.body.address
        }
        const mailValid = await User.findOne({email: newUser.email})
        if (mailValid){
            res.status(401).json("this email existed")
        }else{
            const saltRounds = 10
            const cryptedPassword = await bcrypt.hash(newUser.password, saltRounds)
            newUser.password = cryptedPassword
        }
        await User.create(newUser)
        const payload={
            email: newUser.email
        }
        const token = await jwt.sign(payload, process.env.secret_key,{
            expiresIn: "72h"
        })
        res.send({msg:"User created", newUser , token})
        
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

router.post("/login", async (req, res)=>{
    const credentials= {
        email: req.body.email,
        password:req.body.password
    }
    const user = await User.findOne({email: credentials.email})
    
    if (!user){
        res.status(404).json("user not found")
    } else {
        const isMatch = await bcrypt.compare(credentials.password, user.password)
        if (!isMatch){
            res.status(401).json("wrong password")
        } else {
            const payload={
                email: user.email
            }
            const token = await jwt.sign(payload, process.env.secret_key,{
                expiresIn: "72h"
            })
            res.send({msg:"User connected", user , token})
        }
    }
})
 
router.delete("/deleteUser/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const result = await User.findByIdAndDelete({_id: id})
        if (result.length == 0){
            res.status(404).json("user not found")
        }else {
        res.send({msg: "User deleted", result})}
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

router.put("/updateUser/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const result = await User.findByIdAndUpdate({_id:id}, {...req.body},{new :true})
        res.send({msg:"user updated", result})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
})

router.get("/isAuth", isAuth, (req, res) => {
    res.send({ user: req.user });
});




module.exports = router