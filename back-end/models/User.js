const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true, required: true },
  age: Number,
  email: { type: String, lowerCase: true },
  password: { type: String },
  isBanned: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ["client", "admin", "superAdmin"],
    default: "client",
  },
  createdOn: { type: Date, default: Date.now },
  pic: String,
});

module.exports = User = mongoose.model("user", userSchema);