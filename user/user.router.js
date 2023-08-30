const express=require("express");
const router=express.Router();
const checkSession=require("../auth/middleware/check-session");
const userController=require("./user.controller");

router.post("add_user",checkSession,userController.addUser);

module.exports=router;