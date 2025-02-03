const registerschema = require("../model/register_shema")
const validation = require("./validation")
const addressschema = require("../model/address_schema")
const { object } = require("joi")


exports.getprofile = async (req,res)=>{
    try {
        
        const user = await registerschema.findById(req.user.userId).select("-password")
        if(!user) return res.status(404).json({error:"user not found"})
        const useraddress =  await addressschema.findOne({userId:req.user.userId})
    
        console.log(req.user.userId);
        res.status(200).json({
            success:true,
            message:"user profile fetched succesfully",
            data:{user,useraddress}
        })
    } catch (error)  {
       res.status(400).json({error:"sesrver error,cant fetch data"}) 
    }
}


exports.profileupdate = async (req,res) =>{
    try {
    const userId = req.user.userId;
     console.log(`profile${userId}`);
     
    const { error } = validation.validateupdateprofile.validate(req.body,{abortEarly:false})
    if(error){
        return res.status(400).json({errors:error.details.map( (err) => err.message ) })
    }
     
    const {
        name,
        phone,
        username,
        gender,
        street,
        city,
        state,
        postal
    } = req.body;

    const userfields = {}
    const addressfields = {} 
    console.log("333");
    if(name) userfields.name=name
    if(phone) userfields.phone = phone
    if(username) userfields.username = username
    if(gender) userfields.gender =  gender
    if(street||state||postal||city){
       addressfields.street = street
       addressfields.state = state
       addressfields.postal = postal
       addressfields.city = city
    }
    let updateuser ;
    if(Object.keys(userfields).length>0){
        updateuser = await registerschema.findByIdAndUpdate(userId,userfields,{ new: true, runValidators: true })
    }
    if(Object.keys(addressfields).length>0){
        await addressschema.findOneAndUpdate({userId: userId },addressfields,{new:true,upsert: true,runValidators:true})
    }
    res.status(200).json({message:"profile updated succesfully"})

        
    } catch (error) {
        res.status(400).json({message:"profile updation failed"})
    }
} 
