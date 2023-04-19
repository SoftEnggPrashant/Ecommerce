const router = require('express').Router();

const { addToCart, getCart, deleteFromCart } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middleware/auth');


router.route('/addtoCart/new').post(isAuthenticatedUser,addToCart);
router.route('/getCart/:id').get(isAuthenticatedUser,getCart);
router.route('/deleteCart/:id').delete(isAuthenticatedUser,deleteFromCart);

module.exports = router