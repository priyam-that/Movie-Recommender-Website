// user logout function
async function userLogout(req,res){
    try{
        res.clearCookie("token") //It removes the cookie named "token" from the user's browser to end session

        res.json({
            message : "Logged out successfully",
            error : false,
            success : true,
            data : []
        })
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}


module.exports = userLogout