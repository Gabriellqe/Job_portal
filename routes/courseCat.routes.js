const router = require("express").Router();
const {
  postCourseCategory,
  getAllCourseCategory,
  getCourseCategory,
  updateCourseCategory,
  deleteCourseCategory,
} = require("../controllers/courseCat.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
  isAuthenticatedBoth,
} = require("../middlewares/authToken");

router
  .route("/")
  .post(isAuthenticatedBoth, postCourseCategory)
  .get(getAllCourseCategory);
router
  .route("/:id")
  .get(getCourseCategory)
  .put(isAuthenticatedBoth, updateCourseCategory)
  .delete(isAuthenticatedBoth, deleteCourseCategory);

module.exports = router;
