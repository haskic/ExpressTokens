const express = require("express");
const router = express.Router();
const User = require("./../../Models/User");
const auth = require('./../../middleware');

router.post('/', auth, (req, res) => {
    let {fingerPrint} = req.body;
    console.log(fingerPrint);
    console.log(req.header('x-auth-token'));
    User.findOneAndUpdate({'email': req.user.email}, { $pull: {'sessions': {'token': req.header('x-auth-token'),'fingerPrint': fingerPrint}}},function(err){
        if(err){
            return res.send(err);
        }
        return res.json({
            info: "logout success"
        });
    });
});

module.exports = router;
