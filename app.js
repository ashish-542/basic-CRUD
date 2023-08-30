const dotenv=require("dotenv");
dotenv.config();
const {PORT,DB_URI,SESSION_SECRET}=process.env;
const express=require("express");
const mongoose= require("mongoose");
const app=express();
const session =require('express-session');
const passport =require('passport');
const passportLocalMongoose =require('passport-local-mongoose');
const path=require("path");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
const adminRouter=require("./admin/admin.router");
app.use("/",adminRouter);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
mongoose.connect(DB_URI,({
    family:4,
    useNewUrlParser:true
}));

mongoose.connection.on("error",(err)=>{
    console.log("ERROR ",err);
});

mongoose.connection.on("connected",()=>{
    console.log("Database connected successfully");
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})