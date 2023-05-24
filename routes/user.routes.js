const router = require("express").Router();
const {
  createUser,
  getUser,
  loginUser,
} = require("../controllers/user.controller");

router.route("/register").post(createUser);
router.route("/").get(getUser);
router.route("/login").post(loginUser);

module.exports = router;
