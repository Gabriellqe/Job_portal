const router = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").delete(isAuthenticatedAdmin, deleteUser);
router.route("/").get(isAuthenticatedAdmin, getAllUser);
router.route("/update").patch(isAuthenticatedAdmin, updateUser);

module.exports = router;
