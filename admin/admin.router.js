const express=require("express");
const router=express.Router();
const adminController=require("./admin.controller");
const checkSession=require("../auth/middleware/check-session");
router.post("/signup",adminController.signup);

router.get("/dashboard",checkSession,adminController.dashboard);

router.get("/",adminController.getLogin);
router.post("/login",adminController.login);

router.get("/logout",checkSession,adminController.logout);

module.exports=router;