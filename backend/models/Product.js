const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number },
  images: { type: String },
  historicalSold: { type: String },
  isFreeship: { type: Boolean, required: true },
  discount: { type: Number },
  categories: { type: String, required: true },
  ISBN: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product
