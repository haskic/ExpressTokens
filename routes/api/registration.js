const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
            newUser.save().then(user => {
                res.json({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
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