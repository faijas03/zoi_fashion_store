const express = require("express");
const router = express.Router();
const forgetpassword = require("../controller/forgetpasswordcontroller");

router.post("/forgetpassword", forgetpassword.forgetpasswordverify);

router.put(
  "/forgetpassword/passwordupdation",
  forgetpassword.forgetpasswordupdated,
);

module.exports = router;
