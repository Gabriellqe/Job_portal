const router = require("express").Router();
const { createUser, getUser } = require("../controllers/user.controller");

router.route("/").post(createUser).get(getUser);

module.exports = router;
