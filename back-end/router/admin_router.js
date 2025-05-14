const express = require("express");
const router = express.Router();
const admincontroller = require("../controller/admincontroller");
// const adminjwtvalidation = require("../middlewares/admin_jwtvalidation")

router.post("/login", admincontroller.adminlogined);

module.exports = router;
