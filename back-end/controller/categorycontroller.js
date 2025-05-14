const productschema = require("../model/product_schema");

exports.getallcategory = async (req, res) => {
  try {
    const category = await productschema.distinct("category");

    if (!category)
      return res.status(404).json({ error: "error to find categories" });
    res.status(200).json({ message: `these all are categories :${category}` });
  } catch (error) {
    res.status(400).send({ error: "error to fetch categories" });
  }
};
