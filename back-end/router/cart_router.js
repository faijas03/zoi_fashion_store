const express = require("express");
const router = express.Router();
const cartcontroller = require("../controller/cartcontroller");
const validation = require("../middlewares/jwtvalidation");
const couponcontroller = require("../controller/couponcontroller");

router.post(
  "/user/cart/post",
  validation.jwtvalidation,
  cartcontroller.addtocart,
);

router.get("/user/cart/get", validation.jwtvalidation, cartcontroller.getcart);

router.delete(
  "/user/cart/remove/:id",
  validation.jwtvalidation,
  cartcontroller.removefromcart,
);

router.delete(
  "/user/cart/delete",
  validation.jwtvalidation,
  cartcontroller.deletecart,
);

router.put(
  "/user/cart/updatequantity/:id",
  validation.jwtvalidation,
  cartcontroller.updatequantity,
);

router.put(
  "/user/cart/couponapply",
  validation.jwtvalidation,
  couponcontroller.applycoupon,
);

module.exports = router;
