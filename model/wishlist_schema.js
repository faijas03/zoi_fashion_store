const { string } = require("joi")
const mongoose = require("mongoose")


const wishlist = new mongoose.Schema({
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"registeredusers",
            required :true 
        },

    product:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"products",
            required:true
        },
        productName:String,
        price:{
            type:Number,
            require:true
        }
    }]
},{ timestamps: true })

const wishlistschema = mongoose.model("wishlist",wishlist)
module.exports = wishlistschema