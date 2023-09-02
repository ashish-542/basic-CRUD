const session=require('express-session');
const passport =require('passport');
const passportLocalMongoose =require('passport-local-mongoose');
const adminModel=require("./admin.schema");
const userModel=require("../user/user.schema");
const { getUsers } = require('../user/user.controller');
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

async function dashboard(req,res){
    const users=await getUsers(req,res);
    res.render("dashboard",{users:users});
}
module.exports.dashboard=dashboard;

function getLogin(req,res){
    res.render("login");
}
module.exports.getLogin=getLogin;

function login(req, res) {
    console.log(req.body);
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
            return res.redirect("dashboard");
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