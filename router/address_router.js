const express=require("express")
const router = express.Router()
const addresscontroller = require("../controller/addresscontroller")
const validation = require("../middlewares/jwtvalidation")


router.post("/profile/addaddress",validation.jwtvalidation,addresscontroller.addaddress)

module.exports=router;