
const addressvalidate = require("../validation/addressvalidation")
const addressschema = require("../model/address_schema")


exports.addaddress = async (req,res) =>{
    try {
        const userId = req.user.userId;
        console.log(`profile${userId}`);
        
       const { error } = addressvalidate.validateaddress.validate(req.body,{abortEarly:false})
       if(error){
           return res.status(400).json({errors:error.details.map( (err) => err.message ) })
       } 

       const {
        street,
        city,
        state,
        postal
    } = req.body;
    const addressfields = {} 
    if(street||state||postal||city){
        addressfields.street = street
        addressfields.state = state
        addressfields.postal = postal
        addressfields.city = city
     }
     if(Object.keys(addressfields).length>0){
        await addressschema.findOneAndUpdate({userId: userId },addressfields,{new:true,upsert: true,runValidators:true})
    }
    res.status(200).json({message:"Adress added succesfully"})
    } catch (error) {
        
    }
}
