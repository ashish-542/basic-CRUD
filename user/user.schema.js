const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone: {
        type: Number,
        trim: true,
        required: [true, 'Phone number is mandatory and should be of length 10'],
        validate: {
            validator: function (value) {
                // Check if phone number is exactly 10 digits
                return String(value).length === 10;
            },
            message: 'Phone number should be exactly 10 digits.',
        },
    },
    username: {
        type: String,
        required: [true, 'Username is mandatory'],
        unique: true, // Optional: Ensure uniqueness of usernames
        validate: {
            validator: function (value) {
                // Define a regular expression pattern for a valid email address
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(value);
            },
            message: 'Please provide a valid email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory'],
        validate: {
            validator: function (password) {
                // Define your password regex pattern here
                const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
                return passwordPattern.test(password);
            },
            message: 'Password must contain at least one letter, one number, and be at least 8 characters long.',
        },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
