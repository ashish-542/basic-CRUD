const passport=require("passport");
function checkSession(req,res,next){
    if(req.isAuthenticated()){
        console.log("session checked");
        next();
    }else{
        res.status(401).json({
            message:"Unauthorized"
        })
    }
}
module.exports=checkSession;