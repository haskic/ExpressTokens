const express = require("express");
const router = express.Router();
const User = require("./../../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("config");

router.post('/', (req, res) => {
    let {email, password,fingerPrint} = req.body;
    User.findOne({'email': email}
        , function (error, result) {
            if (error) throw error;
        }).then(result => {
        if (!result) {
            res.send({
                error: "User was not found please sign up"
            })
        } else {
            bcrypt.compare(password, result.password, (err, resul) => {
                if (resul) {
                    jwt.sign({
                            id: result.id,
                            email: result.email,
                            role: 'user'
                        },
                        config.get("jwtSecret"),
                        {expiresIn: 3600},
                        (err, token) => {
                            if (err) throw err;
                            User.updateOne({email: email}, {$push: {sessions: {'token': token, 'fingerPrint': fingerPrint}}}, (err, response) => {
                                if (err) throw err;
                                jwt.sign({
                                        id: result.id,
                                        email: result.email,
                                        role: 'user'
                                    },
                                    config.get("jwtSecretAccess"),
                                    {expiresIn: 3600},
                                    (err, accessToken) => {
                                        if (err) throw err;
                                        res.send({
                                            info: "token was updated",
                                            refreshToken: token,
                                            accessToken: accessToken
                                        });
                                    });

                            })
                        });
                } else {
                    res.send({
                        error: "Invalid password"
                    })
                }
            })

        }
    });

});

module.exports = router;
