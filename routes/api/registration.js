const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('./../../Models/User');
const role = "user";

router.post('/', (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    const newUser = new User({
        name,
        email,
        password,
        role
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(() => {
                res.json({
                    info: "User was registrated",
                    isRegistrated: true
                });
            });

            // jwt.sign({
            //         id: newUser.id,
            //     },
            //     "zhakar",
            //     {expiresIn: 3600},
            //     (err, token) => {
            //         if (err) throw err;
            //
            //     })
        })
    })
});
module.exports = router;