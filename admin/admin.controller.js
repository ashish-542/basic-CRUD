const session=require('express-session');
const passport =require('passport');
const passportLocalMongoose =require('passport-local-mongoose');
const adminModel=require("./admin.schema");

function signup(req,res){
    const adminData={
        username:req.body.username,
        name:req.body.name
    }
    console.log(adminData,req.body);
    adminModel.register(adminData,req.body.password,(err,user)=>{
        if(err){
            console.log("ERROR ",err);
        }else{
             passport.authenticate("local")(req,res,function(){
                console.log("Registered successfully");
                res.status(201).json({
                    "message":"registered successfully"
                })
             })
        }
    })
}
module.exports.signup=signup;

function dashboard(req,res){
    res.status(200).json({
        message:"Dashboad opened"
    });
}
module.exports.dashboard=dashboard;

function login(req, res) {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            console.log("ERROR ", err);
            return res.status(401).json({
                message: "UnAuthorized"
            });
        }
        if (!user) {
            return res.status(401).json({
                message: "UnAuthorized"
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log("ERROR ", err);
                return res.status(401).json({
                    message: "UnAuthorized"
                });
            }
            return res.status(200).json({
                message: "Login Successfully"
            });
        });
    })(req, res);
}
module.exports.login = login;

function logout(req,res){
    req.logout(function(err) {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({
                message: "Error during logout"
            });
        }
        res.status(200).json({
            message: "Logged out successfully"
        });
    });
};

module.exports.logout=logout;