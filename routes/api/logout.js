const express = require("express");
const router = express.Router();
const User = require("./../../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('./../../middleware');

router.post('/', auth, (req, res) => {
    let {fingerPrint} = req.body;
    console.log(fingerPrint);
    console.log(req.header('x-auth-token'));
    User.findOneAndUpdate({'email': req.user.email}, { $pull: {'sessions': {'token': req.header('x-auth-token'),'fingerPrint': fingerPrint}}},function(err,model){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json({
            info: "logout success"
        });
    });
});

module.exports = router;
