const router = require('express').Router();

const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authrizeRoles } = require('../middleware/auth');

router.route("/order/new").post( isAuthenticatedUser,newOrder);

router.route("/order/:id").get( isAuthenticatedUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);

router.route("/admin/orders").get(isAuthenticatedUser,authrizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser,authrizeRoles("admin"),updateOrder).delete(isAuthenticatedUser,authrizeRoles("admin"),deleteOrder);


module.exports = router;