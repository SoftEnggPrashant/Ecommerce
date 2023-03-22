const router = require('express').Router();
const {getAllProducts,CreateProduct, updateProduct, deleteProduct, productDetails, createProductReview, getProductReviews, deleteReview,getAllCategoryProduct}  = require('../controllers/productController');
const { isAuthenticatedUser,authrizeRoles } = require('../middleware/auth');


router.route("/products").get(getAllProducts);

router.route("/categoryproducts").get(getAllCategoryProduct);

router.route("/admin/products/new").post(isAuthenticatedUser,authrizeRoles("admin"),CreateProduct);

router.route("/admin/products/:id").put(isAuthenticatedUser,authrizeRoles("admin"),updateProduct);

router.route("/admin/products/delete/:id").put(isAuthenticatedUser,authrizeRoles("admin"),deleteProduct);

router.route("/products/details/:id").get(productDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);

module.exports = router;