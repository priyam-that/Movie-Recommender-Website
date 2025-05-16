const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : String,
    profilePic : String,
    tokens: { 
        type: Number, 
        default: 0 
    },  
},{
    timestamps: true
})

// Creates a model named user based on the userSchema
const userModel = mongoose.model("user",userSchema)  

module.exports = userModel