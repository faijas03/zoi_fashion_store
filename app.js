const express=require("express")
const app=express()
const dotenv = require("dotenv")
// const jwt = require("jsonwebtoken")
const connectDB=require("./db/config")
const bodyparser=require("body-parser")
const userrouter=require('./router/user_router')
const adminrouter = require("./router/admin_router")
const profilerouter = require("./router/profile_router")
const addaddress = require("./router/address_router")
const forgetpassword = require("./router/forgetpassword_router")
const productrouter = require("./router/product_router")
dotenv.config()

connectDB()
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }))

app.use("/user",userrouter)
app.use("/admin",adminrouter)
app.use(profilerouter)
app.use(addaddress)
app.use(forgetpassword)
app.use(productrouter)


let port = process.env.PORT
app.listen(port,()=>{
    console.log(`running on ${port}`)
})