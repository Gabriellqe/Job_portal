const router = require("express").Router();

const {
  createBookSession,
  getAllBookSessions,
  getBookSession,
  updateBookSession,
  deleteBookSession,
} = require("../controllers/bookSession.controller");

const { restricTo } = require("../middlewares/authToken");

router
  .route("/")
  .post(restricTo("admin"), createBookSession)
  .get(getAllBookSessions);
router
  .route("/:id")
  .get(restricTo("admin"), getBookSession)
  .patch(restricTo("admin"), updateBookSession)
  .delete(restricTo("admin"), deleteBookSession);

module.exports = router;
