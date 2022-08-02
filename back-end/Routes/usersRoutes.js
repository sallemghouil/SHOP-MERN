const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerRules, validator } = require("../middleweares/validator");
const isAuth = require("../middleweares/passport");
const isSuperAdmin=require("../middleweares/isSuperAdmin")
const router = express.Router();

//register new user

router.post("/register", registerRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).send({ msg: "user already exist , please login" });
    }
    const newUser = new User({ ...req.body });
    const hashedPassword = await bcrypt.hash(password, 10);
    //&newUser={...newUser,password:hashedPassword}==>>erroooooooooooooooooooor
    //console.log(hashedPassword)
    newUser.password = hashedPassword;
    //console.log(newUser instanceof User) ==>true
    await newUser.save();
    newUser.password=undefined
    res.send({ user: newUser });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const isMatched = await bcrypt.compare(password, existUser.password);
    if (!isMatched) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const payload = { _id: existUser._id };
    const token = await jwt.sign(payload, process.env.privateKey);
    existUser.password=undefined
    res.send({ user: existUser, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get("/current", isAuth(), (req, res) => {
  res.send(req.user);
});
//get all users only for superAmin

router.get("/allUsers", isAuth(),isSuperAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;