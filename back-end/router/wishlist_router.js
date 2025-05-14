const express = require("express");
const router = express.Router();
const validation = require("../middlewares/jwtvalidation");
const wishlistcontroller = require("../controller/wishlistcontroller");

router.post(
  "/user/wishlist/post/:id",
  validation.jwtvalidation,
  wishlistcontroller.addwishlist,
);

router.get(
  "/user/wishlist/get",
  validation.jwtvalidation,
  wishlistcontroller.getwishlist,
);

router.delete(
  "/user/wishlist/delete",
  validation.jwtvalidation,
  wishlistcontroller.deletewishlist,
);

router.put(
  "/user/wishlist/remove/:id",
  validation.jwtvalidation,
  wishlistcontroller.removeproductfromwishlist,
);

module.exports = router;
