const express=require("express")
const router = express.Router()
const adminjwtvalidation = require("../middlewares/admin_jwtvalidation")
const couponcontroller = require("../controller/couponcontroller")


router.post("/admin/coupon/post",adminjwtvalidation.jwtvalidation,couponcontroller.creatcoupon)

router.put("/admin/coupon/update/:id",adminjwtvalidation.jwtvalidation,couponcontroller.updatecoupon)

router.delete("/admin/coupon/delete/:id",adminjwtvalidation.jwtvalidation,couponcontroller.deletecoupon)

router.get("/admin/coupon/get",adminjwtvalidation.jwtvalidation,couponcontroller.getcoupon)



module.exports = router