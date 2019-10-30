const jwt = require("jsonwebtoken");
const config = require("config");


function authCook(req,res,next) {
    const token = req.header('x-auth-token');
    console.log("DECODED");

    if (!token)
        console.log('NO TOKEN');
        return res.status(401).json({msg: "No token, authorization denied"});

    try{
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        console.log("DECODED",decoded);
        req.user = decoded;
        next();
    }
    catch (e) {
        console.log('TOKEN NOT VALID');

        res.status(400).json({msg: 'Token is not valid'});
    }

}


module.exports = authCook;