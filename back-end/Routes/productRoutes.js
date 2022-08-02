const express = require("express");
const Product = require("../models/Product");
const { addProduct, getALL } = require("../controllers/productCont");
const isAuth = require("../middleweares/passport");
const router = express.Router();
const upload=require("../utils/multer")
router.post("/add",upload("products").single("file") ,isAuth() , addProduct);

router.get("/", getALL);

//DELETE ONE PRODUCT

router.delete("/:id", async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (!result.deletedCount) {
      return res.status(400).send({ msg: "product already deleted" });
    }
    res.send({ msg: "product successfully deleted" });
  } catch (error) {
    console.log(error);
  }
});

//UPDATE ONE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    if (!result.modifiedCount) 
    {return res.status(400).send({msg:"no things to update"});}
      res.send({msg:"product update"})
  } catch (error) {
    console.log(error);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const oneProduct = await Product.findOne({ _id: req.params.id });
    res.send(oneProduct);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;