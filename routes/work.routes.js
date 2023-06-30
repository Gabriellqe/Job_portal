const Router = require("express").Router();

const {
  postWorkDetails,
  getAllWorksDetails,
  getAWorkDetail,
  updateWorkDetails,
  deleteWorkDetails,
} = require("../controllers/workWithUs.controller");

const { restricTo } = require("../middlewares/authToken");

Router.route("/")
  .post(restricTo("admin"), postWorkDetails)
  .get(getAllWorksDetails);
Router.route("/:id")
  .patch(restricTo("admin"), updateWorkDetails)
  .delete(restricTo("admin"), deleteWorkDetails)
  .get(getAWorkDetail);

module.exports = Router;
