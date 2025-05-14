const productschema = require("../model/product_schema");
const wishlistschema = require("../model/wishlist_schema");
const registerschema = require("../model/register_schema");

exports.addwishlist = async (req, res) => {
  const user = req.user.userId;
  const productId = req.params.id;

  try {
    const item = await productschema.findOne({ _id: productId });
    const wishlist = await wishlistschema.findOne({ user: user });
    if (!item) return res.status(404).json({ error: "error to load product" });
    const price = item.price;
    const productName = item.productname;

    if (wishlist) {
      const newproduct = await wishlistschema.findOne({
        "product.productId": productId,
      });
      if (newproduct)
        return res
          .status(404)
          .json({ error: "product already added to wishlist" });
      wishlist.product.push({ productId, productName, price });
      await wishlist.save();
      res.status(200).json({ message: "product added to existing wishlist" });
    } else {
      const wishlist = await wishlistschema.create({
        user: user,
        product: [{ productId, productName, price }],
      });
      return res.status(200).json({ message: `product added to wishlist` });
    }
  } catch (error) {
    res.status(400).json({ error: "error to create wishlist" });
  }
};

exports.getwishlist = async (req, res) => {
  const user = req.user.userId;
  try {
    const userwishlist = await wishlistschema.findOne({ user: user });
    if (!userwishlist)
      return res.status(404).json({ error: "error to load wishlist" });
    res.status(200).json({ message: "wishlist:", userwishlist });
  } catch (error) {
    res.status(400).json({ error: "unable to load server" });
  }
};

exports.deletewishlist = async (req, res) => {
  const user = req.user.userId;
  try {
    const userwishlist = await wishlistschema.findOneAndDelete({ user: user });
    if (!userwishlist)
      return res.status(404).json({ error: "user have no wishlist" });
    res.status(200).json({ message: "wishlist deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "unable to load server" });
  }
};

exports.removeproductfromwishlist = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.id;

  try {
    const product = await wishlistschema.findOne({
      user: userId,
      "product.productId": productId,
    });
    if (!product)
      return res.status(400).json({ error: "no product in wishlist" });
    const removeproduct = await wishlistschema.updateOne(
      { user: userId },
      { $pull: { product: { productId: productId } } },
    );
    if (!removeproduct)
      return res.status(404).json({ error: "error to laod data" });
    if (removeproduct.modifiedCount === 1)
      res.status(200).json({ message: ` removed from wishlist` });
  } catch (error) {
    res.status(400).json({ error: "error to remove product from wishlist" });
  }
};
