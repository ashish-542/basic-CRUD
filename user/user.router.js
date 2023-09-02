const express=require("express");
const router=express.Router();
const checkSession=require("../auth/middleware/check-session");
const userController=require("./user.controller");

router.post("/add",checkSession,userController.addUser);

router.post("/list",checkSession,userController.getUsers);

router.post("/get",checkSession,userController.getUser);

router.post("/delete",checkSession,userController.deleteUser);

router.post("/edit",checkSession,userController.editUser);

module.exports=router;