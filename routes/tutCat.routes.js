const router = require("express").Router();
const {
  postTutorialCategory,
  getAllTutorialCategory,
  getTutorialCategory,
  updateTutorialCategory,
  deleteTutorialCategory,
} = require("../controllers/tutCat.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router
  .route("/")
  .post(isAuthenticatedAdmin, postTutorialCategory)
  .get(getAllTutorialCategory);
router
  .route("/:id")
  .get(getTutorialCategory)
  .put(isAuthenticatedAdmin, updateTutorialCategory)
  .delete(isAuthenticatedAdmin, deleteTutorialCategory);

module.exports = router;
