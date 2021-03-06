const jwt = require("jsonwebtoken");
const config = require("config");


function auth(req,res,next) {
    const token = req.header('x-auth-token');
    if (!token)
        return res.status(401).json({msg: "No token, authorization denied"});

    try{
        console.log(token)
        const decoded = jwt.verify(token, config.get("jwtSecretAccess"));
        req.user = decoded;
        next();
    }
    catch (e) {
        console.log("AHAHAHHHA")
        res.status(400).json({msg: 'Token is not valid'});
    }

}


module.exports = auth;