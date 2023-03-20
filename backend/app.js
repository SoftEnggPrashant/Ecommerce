const express = require('express');
const cors = require('cors');

const app = express();

const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
app.use(cors());


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