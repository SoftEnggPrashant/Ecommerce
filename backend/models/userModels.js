const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true,"Please Enter your Name"],
            maxLength : [30,"Cannot exceed 30 character"],
            minLength : [4,"Name shoud have more than 4 characters"]
        },
        email : {
            type : String,
            required : [true,"Please Enter your email"],
            unique : true,
            validate : [validator.isEmail,"Please Enter valid email"]
        },
        password : {
            type : String,
            required : [true,"Please Enter your password"],
            minLength : [8,"Password shoud be greater than 8 character"],
            select : false
        },
        avatar : {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        },
        role : {
            type : String,
            default : "user"
        },
        resetPasswordToken : String,
        resetPasswordExpire : Date
    }
);
// hashed the password using pre fucntion this function work as save event 
userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// Genrate the json web token for this method
userSchema.methods.getJWTToken = function(){

    return jwt.sign({id : this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    });
}

// Compare Password

userSchema.methods.comparePassword = async function(enterdPassword){

    return await bcrypt.compare(enterdPassword,this.password);
}

// Genrating and Password reset token

userSchema.methods.getResetPasswordToken =  function(){

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("user",userSchema);