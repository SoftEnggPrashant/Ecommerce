const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL).then((data)=>{
        console.log(`Database is connected : ${data.connection.host}`);
    })
}

module.exports = connectDatabase;