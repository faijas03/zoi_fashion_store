const express = require("express");
const app = express();
const dotenv = require("dotenv");
// const jwt = require("jsonwebtoken")
const { connectDB, importProducts } = require("./db/config");
const bodyparser = require("body-parser");
const userrouter = require("./router/user_router");
const adminrouter = require("./router/admin_router");
const profilerouter = require("./router/profile_router");
const addaddress = require("./router/address_router");
const forgetpassword = require("./router/forgetpassword_router");
const productrouter = require("./router/product_router");
const usermangement = require("./router/usermanagement_router");
const categories = require("./router/category_router");
const cart = require("./router/cart_router");
const wishlist = require("./router/wishlist_router");
const coupon = require("./router/coupon_router");
const order = require("./router/order_router");
const cors = require("cors");

dotenv.config();
connectDB();
importProducts();
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userrouter);
app.use("/admin", adminrouter);
app.use(profilerouter);
app.use(addaddress);
app.use(forgetpassword);
app.use(productrouter);
app.use(usermangement);
app.use(categories);
app.use(cart);
app.use(wishlist);
app.use(coupon);
app.use(order);

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`running on ${port}`);
});
