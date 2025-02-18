const cartschema = require("../model/cart_schema");
const addressschema = require("../model/address_schema")
const orderschema  = require("../model/order_schema")

exports.placeorder = async (req,res) =>{
    const userId = req.user.userId;

    try {
        const cart = await cartschema.findOne({user:userId}).populate("items.itemid")
        if(!cart||cart.items.length === 0) return res.status(404).json({error:"user cart is empty"})
           
            
        const address = await addressschema.findOne({userId:userId}) 
        if(!address) return res.status(404).json({error:"your forget to add address "})
            const addId= address._id 
        const neworder = new orderschema({
            user:userId,
            userAddress:addId,
            items:cart.items.map(item =>({
                productId:item.itemid._id,
                productName:item.itemid.name,
                price:item.itemid.price,
                quantity:item.quantity
                })),
            totalBill:cart.bill,
            orderStatus:"pending"
            })    
            
        await neworder.save() 
        await cartschema.findOneAndUpdate({ user: userId }, { items: [], bill: 0 });
        res.status(200).json({message:"order placed"})
    } catch (error) {
        res.status(400).json({error:"server on maintenance"})
    }
}



exports.getorder = async(req,res) =>{
    const orderId = req.params.id
    try {
        const order = await orderschema.findById(orderId)
        if(!order) return res.status(404).json({error:"there is no order in your order history"})
            const address = await addressschema.findById(order.userAddress)
        
        res.status(200).json({message:"oders are",order,address:address})    
    } catch (error) {
        res.status(400).json({error:"server on maintenance"})

    }

}


exports.cancelorder = async(req,res) =>{
    const orderId = req.params.id
    try {
        const order = await orderschema.findByIdAndDelete(orderId)
        if(!order) return res.status(404).json({error:"there is no order in your order history"})        
        res.status(200).json({message:`order cancelled with orderId: ${orderId}`})    
    } catch (error) {
        res.status(400).json({error:"server on maintenance"})

    }

}

exports.getallorderbyadmin = async(req,res) =>{
    try {
        const orders = await orderschema.find()
        if(!orders) return res.status(404).json({error:"error to load errors"})
        res.status(200).json({message:"orders are:",orders})    
    } catch (error) {
        res.status(400).json({error:"server on maintenance"})
    }

}


exports.getorderbyadmin = async(req,res) =>{
    const orderId = req.params.id
    try {
        const order = await orderschema.findById(orderId)
        if(!order) return res.status(404).json({error:"there is no order in this id"})
            const address = await addressschema.findById(order.userAddress)
        
        res.status(200).json({message:"oders are",order,address:address})    
    } catch (error) {
        res.status(400).json({error:"server on maintenance"})

    }

}


exports.updateorderbyadmin = async (req,res) =>{
    try {   
        const updateorder = await orderschema.findByIdAndUpdate(req.params.id,req.body, {new:true})
        if(!updateorder) return res.status(404).json({error:"unable to find order to update"})
        res.status(200).json({message:"order status  updated succesfully"})
    } catch (error) {
        res.status(400).send({error:"server error"})
    }
}



exports.cancelorderbyadmin = async(req,res) =>{
    const orderId = req.params.id
    try {
        const order = await orderschema.findByIdAndDelete(orderId)
        if(!order) return res.status(404).json({error:"there is no order in this id"})        
        res.status(200).json({message:`order cancelled with orderId: ${orderId}`})    
    } catch (error) {
        res.status(400).json({error:"server on maintenance"})

    }

}