const express = require('express');
const cors = require('cors');

const app = express();

const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());


// Routes imports

const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//Middleware for Errors
app.use(errorMiddleware);


module.exports = app;