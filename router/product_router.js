const express=require("express")
const router = express.Router()
const adminjwtvalidation = require("../middlewares/admin_jwtvalidation")
const products = require("../controller/productscontroller")
const validation = require("../middlewares/jwtvalidation")

router.post("/admin/product/aad",adminjwtvalidation.jwtvalidation,products.productsadd)
router.get("/admin/product/all",adminjwtvalidation.jwtvalidation,products.getallproducts)

router.put("/admin/product/update/:id",adminjwtvalidation.jwtvalidation,products.updateproduct)

router.delete("/admin/product/delete/:id",adminjwtvalidation.jwtvalidation,products.deleteproduct)

router.get("/user/product/all",validation.jwtvalidation,products.getallproducts)

router.get("/user/product/:id",validation.jwtvalidation,products.getproductbyid)

module.exports=router;