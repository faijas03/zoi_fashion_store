const mongoose = require("mongoose");
const axios = require("axios");
const Product = require("../model/product_schema");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/zoi_fashion_store", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

const importProducts = async () => {
  try {
    const res = await axios.get(
      "https://dummyjson.com/products/category/womens-dresses?limit=30",
    );

    const formatted = res.data.products.map((p) => ({
      productname: p.title,
      price: p.price,
      category: "Dresses",
      description: p.description,
      image: p.images,
      size: ["S", "M", "L"], // default sizes
    }));

    await Product.insertMany(formatted);
    console.log("Products imported successfully 🎉");
    mongoose.disconnect(); // close DB after import
  } catch (err) {
    console.error("Failed to import products ❌", err);
    mongoose.disconnect();
  }
};

module.exports = { connectDB, importProducts };
