const express = require("express");
const router = express.Router();
const User = require("../Models/userSchema")
const isAuth = require("../Middleware/isAuth");
const isAdmin = require("../Middleware/isAdmin");


router.get("/allAdmins", isAuth, async (req, res) => {
  try {
    const admins = await User.find({isAdmin: true});
    res.status(200).json({ msg: "Admins fetched", admins });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.put("/updateAdmin/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({_id: id})
    if (user.isAdmin) {
        res.status(403).json("this user is already admin")
    } else {
        const updatedUser = await User.findByIdAndUpdate({_id: id}, {isAdmin: true}, {new:true})
        res.send({msg: 'admin', updatedUser})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});
router.put("/updatedAdmin/:id", isAuth, isAdmin, async (req, res) => {
    try {
      const id = req.params.id
      const user = await User.findOne({_id: id})
      if (!user.isAdmin) {
          res.status(403).json("this user is not admin")
      } else {
          const updatedUser = await User.findByIdAndUpdate({_id: id}, {isAdmin: false}, {new:true})
          res.send({msg: 'user', updatedUser})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  });



module.exports = router;
