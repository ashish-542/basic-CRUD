const passport=require("passport");
function checkSession(req,res,next){
    if(req.isAuthenticated()){
        console.log("session checked");
        next();
    }else{
        res.redirect("/");
    }
}
module.exports=checkSession;