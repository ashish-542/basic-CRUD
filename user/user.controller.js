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
       res.json({
        status:400
       });
    }
    else{
        const newUser=new userModel(user);
        await newUser.save();
        const data={
            name:newUser.name,
            phone:newUser.phone,
            username:newUser.username,
            status:201
        }
        return res.json(newUser);
    }
}
module.exports.addUser=addUser;

async function getUsers(req,res){
    return await userModel.find({owner:req.user._id});
}
module.exports.getUsers=getUsers;