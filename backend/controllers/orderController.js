const Order = require('../models/orderModels');
const Errorhandler = require('../utils/errorhandler');
const catchAsyncError = require('../middleware/catchAsyncErrors');
const Product = require('../models/productModel');

// Create new Order
exports.newOrder = catchAsyncError( async (req,res,next)=>{

    const {shippingInfo,paymentInfo,itemsPrice,taxPrice,shippingPrice,tatalPrice,orderItems} = req.body;

    const order = await Order.create(
        {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            tatalPrice,
            paidAt : Date.now(),
            user : req.user._id
        }
    )

    res.status(201).json(
        {
            success : true,
            order
        }
    )
})

// Get single Order

exports.getSingleOrder = catchAsyncError(async (req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next( new Errorhandler("Order not found with thid id",404));
    }

    res.status(200).json(
        {
            success : true,
            order
        }
    )
})

// Get logged in user order

exports.myOrders = catchAsyncError( async(req,res,next)=>{

    const orders = await Order.find({user : req.user._id});


    res.status(200).json(
        {
            success : true,
            orders
        }
    )

})

// Get all Orders -- admin

exports.getAllOrders = catchAsyncError( async (req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json(
        {
            success : true,
            totalAmount,
            orders
        }
    )
})

//Update order status -- admin

exports.updateOrder = catchAsyncError( async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next( new Errorhandler("Order not found with thid id",404));
    }

    if(order.orderStatus === "Delivered"){
        return next( new Errorhandler( "You have Already Delivered this order",404));
    }

    order.orderItems.forEach(async(order)=>{
        await updateStock(order.product,order.quantity)
    })

    order.orderStatus = req.body.status;
    
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave : false });

    res.status(200).json(
        {
            success : true
        }
    )
})

async function updateStock(id,quantity){

    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave : false})
}

// Delete Order -- admin

exports.deleteOrder = catchAsyncError( async (req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        next( new Errorhandler("Order not exits",404));
    }

    await order.remove();

    res.status(200).json(
        {
            success : true
        }
    )
})