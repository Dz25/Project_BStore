const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("../products.js");
const URL = "mongodb://localhost:27017/booksDB";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const productsData = await Product.find({});
    res.send(JSON.stringify(productsData));
  } catch (error) {
    res.send(error);
  }
});

productRouter.get("/seed", async (req, res) => {
  try {
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
  } catch (error) {
    res.send(error);
  }
});

productRouter.get("/:_id", async (req, res) => {
  const product = await Product.findById(req.params._id);
  console.log(product);
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.status(404).send({ message: "Product not found." });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = new Product({
      itemName: req.body.itemName,
      price: req.body.price,
      images: req.body.images,
      isFreeship: req.body.isFreeship,
      discount: 0,
      categories: req.body.categories,
      ISBN: req.body.ISBN,
    });
    await mongoose.connect(URL);
    await product.save((err) => {
      if (err) console.log("Error: ", err);
      else res.send(product);
    });
  } catch (error) {
    res.send(error);
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const { itemName, price, images, isFreeship, discount, categories, ISBN } =
      req.body;
    let _id = req.params.id;
    _id = mongoose.Types.ObjectId(_id);
    console.log(_id);
    await mongoose.connect(URL);
    await Product.findByIdAndUpdate(
      { _id: _id },
      { itemName, price, images, isFreeship, discount, categories, ISBN },
      (err, doc) => {
        if (err) res.send(`ERROR: err`);
        else if (doc == null) {
          console.log(`No matching document could be found.`);
          return res.send(`No matching document could be found.`);
          
        } else {
          console.log(`Document updated successfully. ${doc}`);
          return res.send(`Document updated successfully. ${doc}`);
        }
      
      }
    ).clone()
  } catch (error) {
    return res.status(403).send(error);
  }
});

productRouter.delete("/:id", async (req, res) => {
  let _id = req.params.id;
  _id = mongoose.Types.ObjectId(_id);
  try {
    console.log(_id);

    await mongoose.connect(URL);
    await Product.findByIdAndDelete({ _id: _id }, (err, doc) => {
      if (err) res.send(`ERROR: err`);
      else if (doc == null) {
        console.log(`No matching document could be found.`);
        res.status(404).send(`No matching document could be found.`);
      } else {
        console.log(`Document deleted successfully. ${doc}`);
        res.send(`Document deleted successfully. ${doc}`);
      }
      mongoose.connection.close();
    }).clone()
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = productRouter;
