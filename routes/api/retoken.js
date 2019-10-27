const express = require("express");
const router = express.Router();
const User = require("./../../Models/User");
const jwt = require('jsonwebtoken');
const auth = require('./../../middleware');
const config = require('config');

router.post('/', auth, (req, res) => {
    const token = req.header('x-auth-token');
    jwt.sign({
            id: req.id,
            email: req.email,
            role: 'user'
        },
        config.get("jwtSecret"),
        {expiresIn: 3600},
        (err, refreshToken) => {
            if (err) throw err;
            jwt.sign({
                    id: req.id,
                    email: req.email,
                    role: 'user'
                },
                config.get("jwtSecretAccess"),
                {expiresIn: 3600},
                (err, accessToken) => {
                    if (err) throw err;
                    User.findOneAndUpdate({
                        'sessions.fingerPrint': req.body.fingerPrint,
                        'sessions.token': token
                    }, {$set: {'sessions.$.token': refreshToken}}, function (err) {
                        if (err) {
                            console.log(err);
                            return res.send(err);
                        }
                        return res.json({

                            newAccessToken: accessToken,
                            newRefreshToken: refreshToken
                        });
                    });
                });
        });
});

module.exports = router;
