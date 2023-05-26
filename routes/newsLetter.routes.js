const router = require("express").Router();
const {
  getAllSubscribers,
  subscribeNewsLetter,
  unsubscribeNewsLetter,
} = require("../controllers/newsLetter.controller");

router.route("/").post(subscribeNewsLetter).get(getAllSubscribers);
router.route("/:id").delete(unsubscribeNewsLetter);

module.exports = router;
