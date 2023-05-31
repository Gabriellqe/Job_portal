const router = require("express").Router();
const {
  createVideo,
  getVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
} = require("../controllers/video.controller");
const { isAuthenticatedAdmin } = require("../middlewares/authToken");

router.route("/").post(isAuthenticatedAdmin, createVideo).get(getVideos);
router.route("/:slug").get(getVideoById);
router
  .route("/:id")
  .patch(isAuthenticatedAdmin, updateVideo)
  .delete(isAuthenticatedAdmin, deleteVideo);

module.exports = router;
