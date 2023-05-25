const router = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
  getUser,
  blockUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router
  .route("/:id")
  .delete(isAuthenticatedAdmin, deleteUser)
  .get(isAuthenticated, getUser);

router.route("/").get(isAuthenticatedAdmin, getAllUser);
router.route("/update").patch(isAuthenticatedAdmin, updateUser);
router.route("/block/:id").patch(isAuthenticatedAdmin, blockUser);
router.route("/update-password").patch(isAuthenticated, updatePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").patch(resetPassword);
module.exports = router;
