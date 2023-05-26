const router = require("express").Router();
const {
  postTutorial,
  getAllTutorial,
  getTutorial,
  updateTutorial,
  deleteTutorial,
} = require("../controllers/tutorial.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router.route("/").post(isAuthenticatedAdmin, postTutorial).get(getAllTutorial);
router.route("/:slug/:type").get(getTutorial);
router
  .route("/:id")
  .put(isAuthenticatedAdmin, updateTutorial)
  .delete(isAuthenticatedAdmin, deleteTutorial);

module.exports = router;
