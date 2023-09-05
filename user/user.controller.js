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
    const checkUserExsist=await userModel.exists({username:user.username,owner:req.user._id});
    if(checkUserExsist){
       res.json({
        status:400
       });
    }
    else{
        try{
        const newUser=new userModel(user);
        await newUser.save();
        const data={
            name:newUser.name,
            phone:newUser.phone,
            username:newUser.username,
            id:newUser._id,
            status:201
        }
        return res.json(data);
    }catch(error){
        console.log(error);
        let errors = {};
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
            const data={
                errors:errors,
                status:400
            }
            return res.json(data);
          }
    }
}
module.exports.addUser=addUser;

async function getUsers(req,res){
    return await userModel.find({owner:req.user._id});
}
module.exports.getUsers=getUsers;

async function getUser(req,res){
    console.log("BODY ",req.body);
    const user= await userModel.findOne({_id:req.body.id,owner:req.user._id});
    console.log("User found ",user);
    if(user!=undefined){ res.json({
        status:200,
        user:user
    });
    }else{
        res.json({
            status:400,
        });
    }
}
module.exports.getUser=getUser;

async function deleteUser(req,res){
    console.log("BODY ",req.body);
    const user= await userModel.deleteOne({_id:req.body.id,owner:req.user._id});
    console.log("User found ",user);
    if(user.acknowledged){ 
        res.json({
        status:200,
    });
    }else{
        res.json({
            status:400,
        });
    }
}
module.exports.deleteUser=deleteUser;

async function editUser(req,res){
    console.log(req.body);
    const user= await userModel.findOne({_id:req.body.id,owner:req.user._id});
    console.log("User found ",user);
    if(user!=undefined){ 
       const editedUser=await userModel.findByIdAndUpdate({_id:user._id},{
            name:req.body.name,
            username:req.body.username,
            phone:req.body.phone
        },{
            new:true
        });
        console.log(editedUser);
        res.json({
        status:200,
        user:editedUser    
    });
    }else{
        res.json({
            status:400,
        });
    }
}
module.exports.editUser=editUser;