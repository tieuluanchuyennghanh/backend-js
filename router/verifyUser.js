const jwt = require("jsonwebtoken");


exports.verifyUser = (req, res, next)=>{
    const secret = process.env.JWT_SECRET
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
        console.log("here")
        return res.json({
            data:null
        });
    }
}