const express = require("express");
const router = express.Router();
const User = require("./../../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("config");
const authCook = require("./../../middleCookies")

router.post('/co', (req, res) => {
    console.log("?CO")
    let {fingerPrint} = req.body;
    const oldToken = req.header('x-auth-token');
    User.findOne({
            'sessions.fingerPrint': fingerPrint,
            'sessions.token': oldToken
        }
        , function (error) {
            if (error) throw error;
        }).then(result => {
        if (!result) {
            console.log("ZHAKAR result")
            res.status(401).send();
        } else {

            jwt.sign({
                    id: result.id,
                    email: result.email,
                    role: 'user'
                },
                config.get("jwtSecret"),
                {expiresIn: 3600},
                (err, refreshToken) => {
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
                            User.findOneAndUpdate({
                                'sessions.fingerPrint': fingerPrint,
                                'sessions.token': oldToken
                            }, {$set: {'sessions.$.token': refreshToken}}, function (err) {
                                if (err) {
                                    console.log(err);
                                    return res.send(err);
                                }
                                return res.status(200).send({
                                    info: "token was updated",
                                    isLogin: true,
                                    accessToken: accessToken,
                                    refreshToken: refreshToken,
                                    email: "alexander.speek@gmail.com"
                                });
                            });
                        });
                });
        }
    });
});

router.post('/', (req, res) => {
    let {email, password, fingerPrint} = req.body;
    console.log("?/")

    User.findOne({'email': email}
        , function (error) {
            if (error) throw error;
        }).then(result => {
        if (!result) {
            res.status(401).send();
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
                            User.updateOne({email: email}, {
                                $push: {
                                    sessions: {
                                        'token': token,
                                        'fingerPrint': fingerPrint
                                    }
                                }
                            }, (err) => {
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
                                            isLogin: true,
                                            refreshToken: token,
                                            accessToken: accessToken
                                        });
                                    });

                            })
                        });
                }
            })
        }
    });
});

module.exports = router;
