const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    sessions: [{
        token: String,
        fingerPrint: String
    }]
});


module.exports = User = mongoose.model('user',UserSchema);