const router = require("express").Router();
const {
  postVideoCategory,
  getAllVideoCategory,
  getVideoCategory,
  updateVideoCategory,
  deleteVideoCategory,
} = require("../controllers/videoCat.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router
  .route("/")
  .post(isAuthenticatedAdmin, postVideoCategory)
  .get(getAllVideoCategory);
router
  .route("/:id")
  .get(getVideoCategory)
  .put(isAuthenticatedAdmin, updateVideoCategory)
  .delete(isAuthenticatedAdmin, deleteVideoCategory);

module.exports = router;
