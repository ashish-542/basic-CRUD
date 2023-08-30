function addUser(req,res){
    const userData={
        name:req.body.name,
        phone:req.body.phone,
        username:req.body.username,
        
    }
}
module.exports.addUser=addUser;