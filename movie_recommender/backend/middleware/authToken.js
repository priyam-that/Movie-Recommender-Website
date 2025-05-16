const jwt = require('jsonwebtoken')

async function authToken(req, res, next) { // middleware function
    try {
        const token = req.cookies?.token  // Retrieves the token from the user's cookies

        if(!token){
            return res.status(401).json({
                message: "user not looged in",
                error: true,
                success: false,
            })
        }
                // The token is verified using the secret key
            jwt.verify(token,process.env.TOKEN_SECRET_KEY, function(err, decoded) {
                console.log("authToken middleware working ");  
            console.log(err)    
            console.log("decoded",decoded)

            if(err){
                console.log("error auth", err)
            }
            req.userId = decoded?._id  //If the token is valid, the user ID (_id) from the decoded token is attached to the req object for use in subsequent middleware

            next()
        });
        
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data:[],
            error: true,
            success: false,
        });
    }
}
module.exports = authToken