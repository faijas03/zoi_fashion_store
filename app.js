const express=require("express")
const app=express()
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const connectDB=require("./db/config")
const bodyparser=require("body-parser")
const userrouter=require('./router/user_router')

dotenv.config()

connectDB()
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }))

app.use("/user",userrouter)
let port = process.env.PORT
app.listen(port,()=>{
    console.log(`running on ${port}`)
})