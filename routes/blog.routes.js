const router = require("express").Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
} = require("../controllers/blog.controller");
const { isAuthenticatedAdmin } = require("../middlewares/authToken");

router.route("/").post(isAuthenticatedAdmin, createBlog).get(getBlogs);
router.route("/:slug").get(getBlogById);
router
  .route("/:id")
  .patch(isAuthenticatedAdmin, updateBlog)
  .delete(isAuthenticatedAdmin, deleteBlog);

module.exports = router;
