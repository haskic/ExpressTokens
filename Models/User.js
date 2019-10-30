const mongoose = require("mongoose");
const Word = require('./Word');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    sessions: [{
        token: String,
        fingerPrint: String
    }],
    words: [Word.schema]
});


module.exports = mongoose.model('user',UserSchema);