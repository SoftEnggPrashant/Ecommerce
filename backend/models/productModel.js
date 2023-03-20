const mongoose = require('mongoose');

// Create Product Shema

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : [true,"please Enter the product name"],
            trim : true
        },
        description : {
            type : String,
            required : [true,"please Enter the description"]
        },
        price : {
            type : Number,
            required : [true,"please Enter the product price"],
            maxLength :[8,"price can not exceed of 8 character"]
        },
        ratings : {
            type : Number,
            default :0
        },
        images : [
            {
                public_id : {
                    type : String,
                    required : true
                },
                url : {
                    type : String,
                    required : true
                }
            }
        ],
        category : {
            type : String,
            required : [true,"please Enter the product catagory"]
        },
        stock : {
            type : Number,
            required : [true,"Please Enter product stock"],
            maxLength : [4,"stock cannot exceed 4 character"],
            default : 1
        },
        numOfReviews : {
            type : Number,
            defualt : 0
        },
        reviews : [
            {
                user : {
                    type : mongoose.Schema.ObjectId,
                    ref : "User",
                    required : true
                },
                name : {
                    type : String,
                    required : true
                },
                rating : {
                    type : Number,
                    required : true
                },
                comment : {
                    type : String,
                    required : true
                }
            }
        ],
        user : {
            type : mongoose.Schema.ObjectId,
            ref : "User",
            required : true
        },
        createdAt : {
            type : Date,
            default : Date.now()
        }
    }
)

module.exports = mongoose.model("product",productSchema);