const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const LocalStrategy = require("passport-local").Strategy;
const adminSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String
}, {
    timestamps: true
});

adminSchema.plugin(passportLocalMongoose);

const adminModel = mongoose.model("Admin", adminSchema);

passport.use(new LocalStrategy(adminModel.authenticate()));

passport.serializeUser(function (user, done) {
    console.log("Serializing user:", user);
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        console.log("Deserializing user with ID:", id);
        const admin = await adminModel.findById(id);
        if (!admin) {
            console.log("User not found");
            return done(null, false);
        }
        console.log("Deserialized user:", admin);
        done(null, admin);
    } catch (err) {
        console.error("Error deserializing user:", err);
        done(err, null);
    }
});



module.exports = adminModel;
