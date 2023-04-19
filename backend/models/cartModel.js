const mongoose = require('mongoose');


const CartSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'user',
    },
    cartProduct:{
        type : mongoose.Schema.ObjectId,
        required: true,
        ref: 'cartProduct',
    }
});

module.exports = mongoose.model('cartProduct',CartSchema);