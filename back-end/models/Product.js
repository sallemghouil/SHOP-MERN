const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
  name:  { type: String, uppercase: true, trim: true, required: true },
  qte : Number,
  price : Number,
  createdOn : {type : Date , default : Date.now},
  pic: String,
  user:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
});

module.exports = Product = mongoose.model('product', productSchema);