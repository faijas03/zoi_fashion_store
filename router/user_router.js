const express=require("express")
const router = express.Router()
const usercontroller=require("../controller/usercontroller")
const profilecontroller = require("../controller/profilecontroller")
const validation = require("../controller/validation")

router.post("/register",usercontroller.registered)

router.post("/login",usercontroller.logined)

router.get("/profile",validation.jwtvalidation,profilecontroller.getprofile)

router.post("/forgetpassword",usercontroller.forgetpasswordverify)

router.put("/forgetpassword/passwordupdation",usercontroller.forgetpasswordupdated)

router.put("/updateprofile",validation.jwtvalidation,profilecontroller.profileupdate)

module.exports=router;