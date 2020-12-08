const jwt = require("jsonwebtoken");
let secret = process.env.JWT_SECRET

exports.verifyUser = (req, res, next)=>{
    let accessToken = req.header("Authorization");
    if (accessToken && accessToken.startsWith("Bearer ")) {
        // Remove Bearer from string
        accessToken = accessToken.slice(7, accessToken.length);
    }
    try {
        let decoded = jwt.verify(accessToken, secret)
        req.user = decoded;
        return next();
    } catch (error) {
        return res.status(401).json({
            message:error.message
        });
    }
}