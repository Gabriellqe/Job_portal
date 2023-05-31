const router = require("express").Router();
const {
  createDoc,
  getDocs,
  getDocById,
  deleteDoc,
  updateDoc,
} = require("../controllers/documentation.controller");
const { isAuthenticatedAdmin } = require("../middlewares/authToken");

router.route("/").post(isAuthenticatedAdmin, createDoc).get(getDocs);
router.route("/:slug").get(getDocById);
router
  .route("/:id")
  .patch(isAuthenticatedAdmin, updateDoc)
  .delete(isAuthenticatedAdmin, deleteDoc);

module.exports = router;
