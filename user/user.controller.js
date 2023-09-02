const bcrypt = require('bcryptjs');
const userModel=require("./user.schema");

async function addUser(req,res){
    const user={
        name:req.body.name,
        phone:req.body.phone,
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password, 8),
        owner:req.user._id
    }
    const checkUserExsist=await userModel.exists({username:user.username});
    if(checkUserExsist){
        return res.render("message",{
            msg:"User Already Exists"
        })
    }
    else{
        const newUser=new userModel(user);
        await newUser.save();
        return res.render("message",{
            msg:"User Saved Successfully"
        })
    }
}
module.exports.addUser=addUser;

async function getUsers(req,res){
    return await userModel.find({owner:req.user._id});
}
module.exports.getUsers=getUsers;