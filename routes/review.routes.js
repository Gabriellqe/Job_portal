const router = require("express").Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById,
  updateReviewStatus,
} = require("../controllers/review.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router.route("/").post(isAuthenticated, createReview).get(getAllReviews);
router
  .route("/:id")
  .get(getReviewById)
  .patch(isAuthenticatedAdmin, updateReviewStatus)
  .delete(isAuthenticated, deleteReviewById);

module.exports = router;
