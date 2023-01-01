const router = require('express').Router();
const {registerUser,loginUser, logOut, forgotPassword, resetPassword, 
       getUserDetails, updatePassword, updateProfile, 
       getAllUser, getSingleUser, updateUserRole, deleteUser} = require('../controllers/userController');


const { isAuthenticatedUser, authrizeRoles } = require('../middleware/auth');


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logOut);

router.route("/me").get( isAuthenticatedUser, getUserDetails);

router.route("/password/update").put( isAuthenticatedUser,updatePassword);

router.route("/me/update").put(isAuthenticatedUser,updateProfile);

router.route("/admin/users").get(isAuthenticatedUser,authrizeRoles("admin"),getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser,authrizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authrizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authrizeRoles("admin"),deleteUser);


module.exports = router;