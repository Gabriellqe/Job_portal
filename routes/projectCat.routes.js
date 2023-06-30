const router = require("express").Router();
const {
  createProjectCat,
  getAllProjectCats,
  getProjectCat,
  updateProjectCat,
  deleteProjectCat,
} = require("../controllers/projectCat.controller");
const { restricTo } = require("../middlewares/authToken");

router
  .route("/")
  .post(restricTo("admin"), createProjectCat)
  .get(getAllProjectCats);
router
  .route("/:id")
  .get(restricTo("admin"), getProjectCat)
  .patch(restricTo("admin"), updateProjectCat)
  .delete(restricTo("admin"), deleteProjectCat);

module.exports = router;
