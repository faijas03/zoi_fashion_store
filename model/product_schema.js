const { required, number } = require("joi");
const mongoose = require("mongoose");
const { type } = require("os");

const addproducts = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const addedproducts = mongoose.model("products", addproducts);
module.exports = addedproducts;
