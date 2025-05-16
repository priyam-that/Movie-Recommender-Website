const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// user sign in function
async function userSignInController(req,res){
    try{
        const { email , password} = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
             throw new Error("Please provide password")
        }
        
        const user = await userModel.findOne({email}) 

       if(!user){
            throw new Error("User not found")
       }

       const checkPassword = await bcrypt.compare(password,user.password) // check password

       console.log("checkPassoword",checkPassword)

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *7 });
        const tokenOption={
            httpOnly : true,
            secure : true
        }
        // sent cookie to the client
        res.cookie("token",token,tokenOption).json({
            message : "Login Sucessfully",
            data : token,
            success : true,
            error : false
        })
       }else{
        throw new Error("Please check Password")
       }
    }catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignInController