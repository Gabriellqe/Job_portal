const router = require("express").Router();
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const { restricTo } = require("../middlewares/authToken");

router.route("/").post(restricTo("admin"), createProject).get(getAllProjects);
router
  .route("/:id")
  .get(restricTo("admin"), getProject)
  .patch(restricTo("admin"), updateProject)
  .delete(restricTo("admin"), deleteProject);

module.exports = router;
