const app = require("./app");
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


// Handling uncaught Exceptions

process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception ");
    process.exit(1);
})

//config configration for database connect url in config file
dotenv.config({path:"backend/config/config.env"});

//Database connect this function must be call before configration 
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})

//unhandled promise rejection || handle this errro don't need to catch block for database connection

process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promeise Rejection `)

    server.close(()=>{
        process.exit(1);
    })
})
