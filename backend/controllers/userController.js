const Errorhandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User  = require('../models/userModels');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a User

exports.registerUser = catchAsyncErrors(async (req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop: 'scale',
    })

    const {name,email,password} = req.body;

    const user  = await User.create({
        name,email,password,
        avatar : {
            public_id : myCloud.public_id,
            url : myCloud.secure_url
        }
    });

    sendToken(user,200,res);
});

// Login user

exports.loginUser = catchAsyncErrors( async (req,res,next)=>{

    const{email,password} = req.body;

    //cheking for email and password both

    if(!email || !password){
        return next(new Errorhandler("Please Enter email & password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new Errorhandler("Invalid username and password"),401);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new Errorhandler("Invalid username and password",401));
    }

    sendToken(user,200,res);
})

//Logout user

exports.logOut = catchAsyncErrors( async (req,res,nex)=>{

    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged Out"
    });
})

// Forgot Password  Not work

exports.forgotPassword = catchAsyncErrors( async (req,res,next)=>{

    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next( new Errorhandler("User not found",404));
    }

    // Get ResetPassword Token

    const resetToken = await user.getResetPasswordToken();

    await user.save({validateBeforeSave : false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n  ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it `;

    console.log(resetPasswordUrl);

    try {

        await sendEmail(
            {
                email : user.email,
                subject : "Ecommerce Password Recovery",
                message
            }
        )

        res.status(200).json({
            success : true,
            message : `Email send to ${user.email} successfully`
        })
        
    } catch (error) {
        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next( new Errorhandler(error.message,500));
    }

});


// Reset Password  Not work

exports.resetPassword = catchAsyncErrors( async (req,res,next)=>{

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user =  await User.findOne(
        {
            resetPasswordToken,
            resetPasswordExpire : {$gt : Date.now()}
        }
    );

    if(!user){
        return next( new Errorhandler("Reset passsword token has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassowrd){
        return next (new Errorhandler("Password doen't match",400));
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);
})

// Get user Details

exports.getUserDetails = catchAsyncErrors( async (req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json(
        {
            success : true,
            user
        }
    )
})

// Update the password

exports.updatePassword = catchAsyncErrors( async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next( new Errorhandler("old Password is incorrect ",400));
    }

    if(req.body.newPossword !== req.body.confirmPassowrd){
        return next (new Errorhandler("Password doesn't match",400));
    }

    user.password = req.body.newPossword;

    await user.save();

    sendToken(user,200,res);
})

// update profile

exports.updateProfile = catchAsyncErrors( async(req,res,next)=>{

    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    // we will add the cludenary later

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,
        {
            new : true,
            runValidators : true,
            useFindAndModify : false
        })

    res.status(200).json(
        {
            success : true,
        }
    )
})

// Get all users(Admin)

exports.getAllUser = catchAsyncErrors( async (req,res,next)=>{

    const users = await User.find();

    res.status(200).json(
        {
            success : true,
            users
        }
    )
})

// Get User details only (Admin)

exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next( new Errorhandler(`user does not exits with id ${req.params.id}`));
    }

    res.status(200).json(
        {
            success : true,
            user
        }
    )
})

// Update User Role -- only Admin

exports.updateUserRole = catchAsyncErrors(async (req,res,next)=>{

    const updateUserDate = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,updateUserDate,
        {
            new : true,
            runValidators : true,
            useFindAndModify : false
        })

    res.status(200).json(
        {
            success : true,
        }
    )
})

// Delete User -- Admin

exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next( new Errorhandler(`User does not exits with id : ${req.params.id}`,400));
    }

    await user.remove();

    res.status(200).json(
        {
            success : true,
            message : "User Deleted Successfully "
        }
    )
})

