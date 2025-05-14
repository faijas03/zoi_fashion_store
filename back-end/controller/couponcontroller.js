const couponschema = require("../model/coupon_schema");
const cartschema = require("../model/cart_schema");

exports.creatcoupon = async (req, res) => {
  const { code, discount, expiresAt, productId, minOrderAmount } = req.body;
  try {
    if (code || discount || expiresAt || productId || minOrderAmount) {
      const newcoupon = await couponschema({
        code,
        discount,
        expiresAt,
        productId,
        minOrderAmount,
      });
      await newcoupon.save();
      res.status(200).json({ message: "coupon created succesfully" });
    } else {
      res.status(404).json({ error: "error to load data" });
    }
  } catch (error) {
    res.status(400).json({ error: "server error" });
  }
};

exports.updatecoupon = async (req, res) => {
  try {
    const updateproduct = await couponschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updateproduct)
      return res.status(404).json({ error: "unable to find coupon" });
    res.status(200).json({ message: "coupon updated successfully" });
  } catch (error) {
    res.status(400).send({ error: "unable to update coupon" });
  }
};

exports.deletecoupon = async (req, res) => {
  try {
    const deleteproduct = await couponschema.findByIdAndDelete(req.params.id, {
      new: true,
    });
    if (!deleteproduct)
      return res.status(404).json({ error: "unable to find coupon" });
    res.status(200).json({ message: "coupon deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: "unable to delete coupon" });
  }
};

exports.getcoupon = async (req, res) => {
  try {
    const getcoupon = await couponschema.find({});
    if (!getcoupon)
      return res.status(404).json({ error: "unable to find coupon" });
    res.status(200).json({ message: "these are coupons", getcoupon });
  } catch (error) {
    res.status(400).send({ error: "unable to fetch coupon" });
  }
};

exports.applycoupon = async (req, res) => {
  const userId = req.user.userId;
  try {
    const { code } = req.body;

    const coupon = await couponschema.findOne({ code });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon code" });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    const cart = await cartschema
      .findOne({ user: userId })
      .populate("items.itemid");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let discountAmount = 0;
    let updatedTotal = 0;

    cart.items.forEach((item) => {
      let productTotal = item.itemid.price * item.quantity;

      if (item.itemid._id.toString() === coupon.productId.toString()) {
        let discount = (productTotal * coupon.discount) / 100;
        discountAmount += discount;
        productTotal -= discount;
      }

      updatedTotal += productTotal;
    });

    cart.bill = updatedTotal;
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      discountAmount,
      updatedTotal,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
