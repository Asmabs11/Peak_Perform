const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors")
app.use(cors())
const connectDb =  require("./Config/connectDb")
app.use(express.json())
const userRoute = require("./Routes/userRoute")
app.use("/users", userRoute)
const productRoute = require("./Routes/productRoute")
app.use("/products", productRoute)
const orderRoute = require("./Routes/orderRoute")
app.use("/orders", orderRoute)
const adminRoute = require("./Routes/adminRoute")
app.use("/admin", adminRoute)
const uploadRoutes = require("./Routes/uploadsRoute"); 
app.use("/uploads", uploadRoutes);

connectDb()

app.get('/' , (req, res)=>{
    res.send("<h1>Server connected</h1>")
})

app.listen(process.env.PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is running on http://localhost:${process.env.PORT}`)
);
