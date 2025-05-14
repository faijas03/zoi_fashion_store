const express = require("express");
const router = express.Router();
const adminjwtvalidation = require("../middlewares/admin_jwtvalidation");
const usermanagementcontroller = require("../controller/usermanagementcontroller");
const { jwtvalidation } = require("../middlewares/jwtvalidation");

router.get(
  "/admin/getallusers",
  adminjwtvalidation.jwtvalidation,
  usermanagementcontroller.getallusers,
);

router.get(
  "/admin/getuserdetails/:id",
  adminjwtvalidation.jwtvalidation,
  usermanagementcontroller.getuserdetails,
);

router.patch(
  "/admin/useractivatio/:id",
  adminjwtvalidation.jwtvalidation,
  usermanagementcontroller.activatedeactivateaccount,
);

router.delete(
  "/admin/userdelete/:id",
  adminjwtvalidation.jwtvalidation,
  usermanagementcontroller.deleteuser,
);
module.exports = router;
