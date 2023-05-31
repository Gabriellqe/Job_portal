const router = require("express").Router();
const {
  postDocCategory,
  getAllDocCategory,
  getDocCategory,
  updateDocCategory,
  deleteDocCategory,
} = require("../controllers/docCat.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
} = require("../middlewares/authToken");

router
  .route("/")
  .post(isAuthenticatedAdmin, postDocCategory)
  .get(getAllDocCategory);
router
  .route("/:id")
  .get(getDocCategory)
  .put(isAuthenticatedAdmin, updateDocCategory)
  .delete(isAuthenticatedAdmin, deleteDocCategory);

module.exports = router;
