const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, },
    password: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now() },
    lastLogin: { type: Date } 
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
