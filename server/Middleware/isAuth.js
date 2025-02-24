const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");

const isAuth = async (req, res, next) => {
  try {
    var token = req.headers["authorization"];
    if (!token) {
      res.send("no token");
    } else {
      var decoded = await jwt.verify(token, process.env.secret_key);
      var user = await User.findOne({ email: decoded.email });
      if (user) {
        req.user = user;
        next();
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json("Internal server error")
  }
};


module.exports = isAuth;
