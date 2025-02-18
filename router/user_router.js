const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const validation = require("../middlewares/jwtvalidation");
const blacklistjwt = require("../middlewares/blacklist jwt");

router.post("/register", usercontroller.registered);

router.post("/login", usercontroller.logined);

router.post("/logout", validation.jwtvalidation, blacklistjwt.blacklistjwt);

module.exports = router;
