const router = require("express").Router();
const {
  createcontact,
  getAllcontacts,
  getcontactById,
  deletecontactById,
  updatecontactStatus,
} = require("../controllers/contact.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router.route("/").post(isAuthenticated, createcontact).get(getAllcontacts);
router
  .route("/:id")
  .get(getcontactById)
  .patch(isAuthenticatedAdmin, updatecontactStatus)
  .delete(isAuthenticated, deletecontactById);

module.exports = router;
