/** @format */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: { type: String, required: true, lowercase: true },
  lname: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true, lowercase: true },
  avatar: { type: String, required: true, default: "default.png" },
  role: { type: Number, required: true, default: 349 },
});

module.exports = mongoose.model("userSchema", userSchema)