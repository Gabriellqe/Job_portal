const router = require("express").Router();

const {
  createCourse,
  getAllCourses,
  getCourse,
  getCoursesByCategory,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const {
  isAuthenticated,
  isAuthenticatedAdmin,
  isAuthenticatedBoth,
} = require("../middlewares/authToken");

router.route("/").post(isAuthenticatedBoth, createCourse).get(getAllCourses);
router.route("/:slug").get(getCourse);
router.route("/category/:category").get(getCoursesByCategory);
router
  .route("/:id")
  .patch(isAuthenticatedBoth, updateCourse)
  .delete(isAuthenticatedBoth, deleteCourse);

module.exports = router;
