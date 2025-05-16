const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs');

// user sign up function
async function userSignUpController(req,res){ 
    try{
      const {email, password , name} = req.body  // destructuring

       const user = await userModel.findOne({email}) // user already exist

       if(user){
        throw new Error("Already user exist")
       }

      if(!email){
        throw new Error("Please provide email")
      }
      
      if(!password){
        throw new Error("Please provide password")
      }
      if(!name){
        throw new Error("Please provide name")
      }

      // A salt is generated using bcrypt, and the password is hashed using the 10 round salt
      const salt = bcrypt.genSaltSync(10); 
      const hashPassword =await bcrypt.hashSync(password, salt);

    if(!hashPassword){
        throw new Error("Something is wrong")
    }
    // Combines the request body with the hashed password to prepare the payload
    const payload ={ 
        ...req.body, 
        password : hashPassword
    }
      //Creates a new instance of the userModel with the payload and saves it to the database
      const userData = new userModel(payload) 
      const saveUser = await userData.save()

      res.status(201).json({
        data : saveUser,
        success : true,
        error : false,
        message : "User created Successfully !"
      })
    }catch(err){
       
        res.json({
            message : err.message || err ,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignUpController