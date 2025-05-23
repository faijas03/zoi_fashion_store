const { error } = require("console");
const productschema = require("../model/product_schema");
const productvalidation = require("../validation/productvalidation");
const { array } = require("joi");

exports.productsadd = async (req, res) => {
  try {
    const { error } = productvalidation.validateproductschema.validate(
      req.body,
      {
        abortEarly: false,
        allowUnknown: true, // allow extra fields (like files)
      },
    );
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { productname, price, category, description, size } = req.body;
    const imageUrls = req.files.map((file) => `/public/${file.filename}`);
    const sizeArray = Array.isArray(size) ? size : [size];
    const newproduct = await productschema({
      productname,
      price,
      category,
      description,
      image: imageUrls,
      size: sizeArray,
    });

    await newproduct.save();
    res.status(200).json({ message: "product successfully" });
  } catch (error) {
    res.status(404).json({ error: "unable to add products" });
  }
};

exports.getallproducts = async (req, res) => {
  try {
    const product = await productschema.find();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const existingproduct = await productschema.findById(req.params.id);
    const images = existingproduct.image || [];
    if (req.body.image && Array.isArray(req.body.image)) {
      if (images.length >= 4) {
        images = req.body.image.slice(0, 4);
      } else {
        images = [...images, ...req.body.image].slice(0, 4);
      }
    }

    const updateproduct = await productschema.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: images },
      { new: true },
    );
    if (!updateproduct)
      return res
        .status(404)
        .json({ error: "unable to find product to update" });
    res.status(200).json({ message: "product updated succesfully" });
  } catch (error) {
    res.status(400).send({ error: "unable to update product" });
  }
};

exports.deleteproduct = async (req, res) => {
  try {
    const deletedproduct = await productschema.findByIdAndDelete(
      req.params.id,
      { new: true },
    );
    if (!deletedproduct)
      return res.status(404).json({ error: "error to find product to delete" });
    res.status(200).json({ message: "product deleted succesfully" });
  } catch (error) {
    res.status(400).json({ error: "unable to delete product" });
  }
};

exports.getproductbyid = async (req, res) => {
  try {
    const product = await productschema.findById(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ error: `There is no product with id :${req.params.id}` });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: "error to fecth data" });
  }
};
