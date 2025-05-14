const productschema = require("../model/product_schema");
const cartschema = require("../model/cart_schema");
const registerschema = require("../model/register_schema");
const { it } = require("node:test");

exports.addtocart = async (req, res) => {
  const userId = req.user.userId;
  const { itemid, quantity, size } = req.body;

  try {
    const item = await productschema.findOne({ _id: itemid });
    const cart = await cartschema.findOne({ user: userId });
    if (!item) return res.status(404).json({ error: "error to load product" });
    const price = item.price;
    const name = item.productname;
    if (cart) {
      const itemindex = cart.items.findIndex(
        (item) => item.itemid == itemid && item.size === size,
      );
      if (itemindex > -1) {
        let product = cart.items[itemindex];
        product.quantity += Number(quantity);
        cart.bill = cart.items.reduce((acc, pro) => {
          return acc + pro.quantity * pro.price;
        }, 0);
        cart.items[itemindex] = product;
        await cart.save();
        res.status(200).json({ message: "product added to existing" });
      } else {
        cart.items.push({ itemid, name, quantity, price, size });
        cart.bill = cart.items.reduce((acc, pro) => {
          return acc + pro.quantity * pro.price;
        }, 0);

        await cart.save();
        res.status(200).json({ message: "product added to cart" });
      }
    } else {
      const newcart = await cartschema.create({
        user: userId,
        items: [{ itemid, name, quantity, price, size }],
        bill: quantity * price,
      });
      res.status(200).json({ message: "created new cart" });
    }
  } catch (error) {
    res.status(400).json({ error: "error to create cart" });
  }
};

exports.getcart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const username = await registerschema.findOne(
      { _id: userId },
      { username: 1, _id: 0 },
    );
    console.log(username);
    if (!username) return res.status(404).json({ error: "error to load user" });
    const usercart = await cartschema.findOne({ user: userId });
    if (!usercart)
      return res.status(404).json({ error: "error to fetch user cart" });
    res.status(200).json({ message: `${username} cart is`, usercart });
  } catch (error) {
    res.status(400).json({ error: "error to load cart" });
  }
};

exports.removefromcart = async (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.id;

  try {
    const productname = await productschema.findOne({ _id: productId });
    if (!productname)
      return res.status(404).json({ error: "error to find product" });
    const product = await cartschema.findOne({
      user: userId,
      "items.itemid": productId,
    });
    if (!product) return res.status(400).json({ error: "no product in cart" });
    const removeproduct = await cartschema.updateOne(
      { user: userId },
      { $pull: { items: { itemid: productId } } },
    );
    if (!removeproduct)
      return res.status(404).json({ error: "error to laod data" });
    const cart = await cartschema.findOne({ user: userId });
    cart.bill = cart.items.reduce((acc, pro) => {
      return acc + pro.quantity * pro.price;
    }, 0);
    await cartschema.findOneAndUpdate(
      { user: userId },
      { $set: { bill: cart.bill } },
      { new: true },
    );
    if (removeproduct.modifiedCount === 1)
      res
        .status(200)
        .json({ message: `${productname.productname} removed from cart` });
  } catch (error) {
    res.status(400).json({ error: "error to remove product from cart" });
  }
};

exports.deletecart = async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await cartschema.findOneAndDelete({ user: userId });
    if (!cart) return res.status(404).json({ error: "unable to load cart" });
    res.status(200).json({ message: "cart deleted succesfully" });
  } catch (error) {
    res.status(400).json({ error: "error to delete cart" });
  }
};

exports.updatequantity = async (req, res) => {
  const userId = req.user.userId;
  const productid = req.params.id;
  try {
    const updatecart = await cartschema.findOneAndUpdate(
      { user: userId, "items.itemid": productid },
      { $set: { "items.$.quantity": req.body.quantity } },
      { new: true },
    );
    if (!updatecart) return res.status(404).json({ error: "error to load " });
    const cart = await cartschema.findOne({ user: userId });
    cart.bill = cart.items.reduce((acc, pro) => {
      return acc + pro.quantity * pro.price;
    }, 0);
    await cartschema.findOneAndUpdate(
      { user: userId },
      { $set: { bill: cart.bill } },
      { new: true },
    );

    res.status(200).json({ message: "quantity updated" });
  } catch (error) {
    res.status(400).json({ error: "unable to load" });
  }
};
