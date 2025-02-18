const registerschema = require("../model/register_schema");
const addressschema = require("../model/address_schema")

exports.getallusers = async(req,res) =>{
 try {
    const user = await registerschema.find({},{_id:0,username:1})
    if(!user) return res.status(404).json({error:"no users available"})
    
     res.status(200).json({message:`these all are users :${user}`})   
 } catch (error) {
    res.status(400).json({error:"unable to fetch all users"})
 }   
}

exports.getuserdetails = async(req,res) =>{
    try {
        const user = await registerschema.findById(req.params.id)
       
        
        if(!user) return res.status(404).json({error:"error to fetch user by id"})

        const address = await addressschema.findOne({userId:req.params.id})
        
        res.status(200).json({success:"true",user,address})
    } catch (error) {
        res.status(400).json({error:"unable to find user"})
    }
}

exports.activatedeactivateaccount = async (req,res) =>{
    try {
        const user = await registerschema.findById(req.params.id)
        if(!user) return res.status(404).json({error:"unable to fetch user"})
            user.isactivate=!user.isactivate
        await user.save()
        
        res.status(200).json({
            message:"user activation passed"
            ,isactive:user.isactivate
        })
    } catch (error) {
        res.status(400).json({error:"unable to access user activate"})
    }
}

exports.deleteuser = async(req,res) =>{
    try {
        const user = await registerschema.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).json({error:"unable to find user"})
        res.status(200).json({message:`${user.username} account deleted succesfully`})    
    } catch (error) {
        res.status(400).json({error:"error to load data"})
    }
}