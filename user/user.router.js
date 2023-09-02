const express=require("express");
const router=express.Router();
const checkSession=require("../auth/middleware/check-session");
const userController=require("./user.controller");

router.post("/add",checkSession,userController.addUser);

router.post("/list",checkSession,userController.getUsers);

module.exports=router;