const express = require("express");
const router = express.Router();
const profilecontroller = require("../controller/profilecontroller");
const validation = require("../middlewares/jwtvalidation");

router.get("/profile", validation.jwtvalidation, profilecontroller.getprofile);

router.put(
  "/updateprofile",
  validation.jwtvalidation,
  profilecontroller.profileupdate,
);

module.exports = router;
