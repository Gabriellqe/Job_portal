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
} = require("../middlewares/authToken");

router
  .route("/")
  .post(isAuthenticatedAdmin, postBlogCategory)
  .get(getAllBlogCategory);
router
  .route("/:id")
  .get(getBlogCategory)
  .put(isAuthenticatedAdmin, updateBlogCategory)
  .delete(isAuthenticatedAdmin, deleteBlogCategory);

module.exports = router;
