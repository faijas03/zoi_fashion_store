const productschema = require("../model/product_schema")
const productvalidation = require("../validation/productvalidation")
exports.productsadd = async (req,res)=>{
    try {
        const {error} = productvalidation.validateproductschema.validate(req.body,{abortEarly:false})
    if(error){
        return res.status(400).json({errors:error.details.map( (err) => err.message ) })
    }
     
    const{
        productname,
        price,
        category,
        description,
        image
    } = req.body


    const newproduct = await productschema({
        productname,
        price,
        category,
        description,
        image
    });
    await newproduct.save()
    res.status(200).json({message:"product successfully"})

    } catch (error) {
        res.status(404).json({error:"unable to add products"})
    }
    
}


exports.getallproducts = async (req,res) =>{
    try {
        const product = await productschema.find()
        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}

exports.updateproduct = async (req,res) =>{
    try {
        const updateproduct = await productschema.findByIdAndUpdate(req.params.id,req.body, {new:true})
        if(!updateproduct) return res.status(404).json({error:"unable to find product to update"})
        res.status(200).json({message:"product updated succesfully"})
    } catch (error) {
        res.status(400).send({error:"unable to update product"})
    }
}

exports.deleteproduct = async (req,res) =>{
    try {
        const deletedproduct = await productschema.findByIdAndDelete(req.params.id,{new:true})
        if(!deletedproduct) return res.status(404).json({error:"error to find product to delete"})
        res.status(200).json({message:"product deleted succesfully"})    
    } catch (error) {
        res.status(400).json({error:"unable to delete product"})
    }
}