const { populate } = require("../models/Product");

module.exports.addProduct= async function (req, res) {
  console.log(req.file)
  const url = `${req.protocol}://${req.get('host')}`;
  console.log(req.file);
  const { file } = req;

    try {
      const existProduct = await Product.findOne({ name: req.body.name });
      if (existProduct) {
        res.status(400).send({ msg: "product exist" });
      } else {
        const newProduct = new Product({
          ...req.body,user:req.user._id
        });
    newProduct.pic = `${url}/${file.path}`;

        await newProduct.save();
        res.send({ msg: "product added" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  exports.getALL=async function (req, res) {
    // console.log(req.query.price)
    try {
      // const price = req.query.price || 0
      const allProduct = await Product.find({
        $and: [
          { price: { $gte: req.query.price || 0 } },
          { name: { $regex: req.query.name || "" } },
        ],
      }).populate("user","fullName");
      res.send({ allProduct });
    } catch (error) {
      console.log(error);
    }
  }