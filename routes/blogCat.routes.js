const router = require("express").Router();
const {
  postBlogCategory,
  getAllBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blogCat.controller");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
  restricTo,
} = require("../middlewares/authToken");

router
  .route("/")
  .post(restricTo("admin"), postBlogCategory)
  .get(getAllBlogCategory);
router
  .route("/:id")
  .get(getBlogCategory)
  .put(restricTo("admin"), updateBlogCategory)
  .delete(restricTo("admin"), deleteBlogCategory);

module.exports = router;
