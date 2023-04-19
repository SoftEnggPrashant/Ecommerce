const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CartSchema = require("../models/cartModel");
const Product = require("../models/productModel");

exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.body.userId;
  const ProductId = req.body.ProductId;

  if (!userId && !ProductId) {
    return Errorhandler("Please enter the credentials", 501);
  }

  const cart = await CartSchema.create({
    user: userId,
    cartProduct: ProductId,
  });

  res.status(200).json({
    success: true,
    cart,
  });
});

exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  const idsArray = [];

  if (!userId) {
    return Errorhandler("Enternal Server Error ", 501);
  }

  const cartData = await CartSchema.find({ user: userId });
  cartData.forEach((element) => {
    idsArray.push(element.cartProduct);
  });

  const carts = await Product.find({ _id: idsArray });

  res.status(200).json({
    success: true,
    carts,
  });
});

exports.deleteFromCart = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  if (!productId) {
    return Errorhandler("Please Login with your existing credentials", 402);
  }

  await CartSchema.deleteOne({ cartProduct : productId });

  res.status(200).json({
    success: true,
    message: "Cart Remove Successfully",
  });
});
