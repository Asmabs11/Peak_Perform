const express = require("express");
const app = express();
require("dotenv").config();
const connectDb =  require("./Config/connectDb")
app.use(express.json())
const userRoute = require("./Routes/userRoute")
app.use("/users", userRoute)
const productRoute = require("./Routes/productRoute")
app.use("/products", productRoute)
const orderRoute = require("./Routes/orderRoute")
app.use("/orders", orderRoute)
connectDb()

app.get('/' , (req, res)=>{
    res.send("<h1>Server connected</h1>")
})

app.listen(process.env.PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`server is running on http://localhost:${process.env.PORT}`)
);
