const Product = require('../models/productModel');
const Errorhandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');


// Create Product  Only admin

exports.CreateProduct = catchAsyncErrors( async (req,res,next)=>{

    req.body.user = req.user.id;

    const product = await Product.create(req.body)

    res.status(201).json(
        {
            success : true,
            product
        }

    );
});

// Get all products

exports.getAllProducts = catchAsyncErrors( async (req,res)=>{

    const resultPerPage = 5;

    const productCount = await Product.countDocuments();

    const apifeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);

    const products = await apifeature.query;

    res.status(200).json(
        {
            success : true,
            products
        });
});

// Update Product

exports.updateProduct  = catchAsyncErrors( async (req,res,next)=>{

    let product = await Product.findById(req.params.id);
    
    if(!product){

        //**************constom error handler class ********** */

        return next(new Errorhandler("product not found",404));


        //******************* build in error handing***********/
        /*return res.status(500).json(
            {
                success : false,
                message : "product not found"
            }
        ); */
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
        product
    })
});

// Delete Product 

exports.deleteProduct = catchAsyncErrors( async (req,res,nex)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json(
            {
                success : false,
                message : "Product not found"
            }
        )
    }

    await product.remove();

    res.status(200).json(
        {
            success : true,
            message : "Product Deleted successfully"
        }
    )

});

// Get Product Details

exports.productDetails = catchAsyncErrors( async (req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json(
            {
                success : false,
                message : "Product not Found"
            }
        )
    }

    res.status(200).json(
        {
            success : true,
            product,
            productCount
        }
    )
});

// Create New Review or update the review 

exports.createProductReview = catchAsyncErrors( async (req,res,next)=>{

    const{rating,comment,productId} = req.body;


    const review = {

        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment

    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

    if(isReviewed){

        product.reviews.forEach((rev) => {
            
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating
                rev.comment = comment
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // average of reviews

    let avg = 0;

    product.reviews.forEach(rev => {
                    avg += rev.rating }
    )

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforSave: false });

    res.status(200).json(
        {
            success : true
        }
    )
})

// Get all Reviews of a single product

exports.getProductReviews = catchAsyncErrors( async (req,res,next)=>{

    const product = await Product.findById(req.query.id);

    if(!product){
        return next( new Errorhandler("Product Not Found",404));
    }

    res.status(200).json(
        {
            success : true,
            reviews : product.reviews,
        }
    )
})

// Delete Review

exports.deleteReview = catchAsyncErrors( async (req,res,next)=>{

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next( new Errorhandler("Product Not Found !",404))
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString())

    let avg = 0;

    reviews.forEach((rev)=>{
        avg += rev.rating;
    })

    const ratings =  avg/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })


    res.status(200).json(
        {
            success : true
        }
    )
})



//module.exports = {getAllProducts,CreateProduct,updateProduct,deleteProduct,productDetails}; this another method to export