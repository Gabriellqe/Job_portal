const router = require("express").Router();

const {
  createCourse,
  getAllCourses,
  getCourse,
  getCoursesByCategory,
  getParticularInstructorCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const {
  createLesson,
  deleteLesson,
  getALesson,
  getAllCourseLesson,
  updateLesson,
} = require("../controllers/lesson.controller");

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
router
  .route("/instructor/allcourses")
  .get(isAuthenticatedBoth, getParticularInstructorCourse);

/* Lessons */

router.route("/lesson/:courseId").post(isAuthenticatedBoth, createLesson);
router
  .route("/lesson/:courseId/:lessonId")
  .delete(isAuthenticatedBoth, deleteLesson);
router.route("/lessons/:courseId").get(isAuthenticated, getAllCourseLesson);
router.route("/lesson/:lessonId").get(isAuthenticatedBoth, getALesson);
router.route("/lesson/:lessonId").patch(isAuthenticatedBoth, updateLesson);

module.exports = router;
