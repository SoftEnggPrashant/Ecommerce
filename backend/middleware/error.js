const Errorhandler = require('../utils/errorhandler')


module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal server error";

    // wrong mongodb id Error known as cast errors

    if(err.name === "CastError"){

        const message = `Resource not found. Invalid ${err.path}`;
        err = new Errorhandler(message,400);
    }

    // mongoose duplicate key erro

    if(err.code === 11000){

        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;

        err = new Errorhandler(message,400);
    }

    // Wrong JWT error

    if(err.name == "JsonWebTokenError"){
        const message = "json web token is Invalid , try again";

        err = new Errorhandler(message,400);
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}