// models/Image.js
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  filename: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Image", ImageSchema);
