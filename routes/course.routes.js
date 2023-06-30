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
  /*   isAuthenticated,
  isAuthenticatedAdmin,
  isAuthenticatedBoth, */
  restricTo,
} = require("../middlewares/authToken");

router
  .route("/")
  .post(restricTo("admin", "instructor"), createCourse)
  .get(getAllCourses);
router.route("/:slug").get(getCourse);
router.route("/category/:category").get(getCoursesByCategory);
router
  .route("/:id")
  .patch(restricTo("admin", "instructor"), updateCourse)
  .delete(restricTo("admin", "instructor"), deleteCourse);
router
  .route("/instructor/allcourses")
  .get(restricTo("admin", "instructor"), getParticularInstructorCourse);

/* Lessons */

router
  .route("/lesson/:courseId")
  .post(restricTo("admin", "instructor"), createLesson);
router
  .route("/lesson/:courseId/:lessonId")
  .delete(restricTo("admin", "instructor"), deleteLesson);
router
  .route("/lessons/:courseId")
  .get(restricTo("admin", "instructor"), getAllCourseLesson);
router
  .route("/lesson/:lessonId")
  .get(restricTo("admin", "instructor"), getALesson);
router
  .route("/lesson/:lessonId")
  .patch(restricTo("admin", "instructor"), updateLesson);

module.exports = router;
