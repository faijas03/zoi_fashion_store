const express=require("express")
const router = express.Router()
const categoriescontroller = require("../controller/categorycontroller")
const validation = require("../middlewares/jwtvalidation")

router.get("/categories",validation.jwtvalidation,categoriescontroller.getallcategory)

module.exports = router