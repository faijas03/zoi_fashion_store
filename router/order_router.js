const express = require("express");
const router = express.Router();
const validation = require("../middlewares/jwtvalidation");
const ordercontroller = require("../controller/ordercontroller");
const adminjwtvalidation = require("../middlewares/admin_jwtvalidation");

router.post(
  "/user/order",
  validation.jwtvalidation,
  ordercontroller.placeorder,
);

router.get(
  "/user/order/getorders/:id",
  validation.jwtvalidation,
  ordercontroller.getorder,
);

router.delete(
  "/user/order/cancel/:id",
  validation.jwtvalidation,
  ordercontroller.cancelorder,
);

router.get(
  "/admin/order/get",
  adminjwtvalidation.jwtvalidation,
  ordercontroller.getallorderbyadmin,
);

router.get(
  "/admin/order/getorders/:id",
  validation.jwtvalidation,
  ordercontroller.getorderbyadmin,
);

router.put(
  "/admin/order/update/:id",
  validation.jwtvalidation,
  ordercontroller.updateorderbyadmin,
);

router.delete(
  "/admin/order/delete/:id",
  validation.jwtvalidation,
  ordercontroller.cancelorderbyadmin,
);

module.exports = router;
