const blogModel = require("../models/blog.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");

const createBlog = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  try {
    if (!title) {
      return next(new ErrorHandler("Please provide title", 400));
    }

    req.body.slug = slugify(title.toLowerCase());

    const newBlog = await blogModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

const getBlogs = asyncHandler(async (req, res, next) => {
  try {
    const allBlogs = await blogModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All blogs found",
      data: allBlogs,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getBlogById = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  try {
    const getBlog = await blogModel.findOne({ slug });
    if (!getBlog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Blog found",
      data: getBlog,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await blogModel.findById(id);
    if (!blog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    await blogModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: {},
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    if (!title) {
      return next(new ErrorHandler("Please provide title", 400));
    }
    req.body.slug = slugify(title.toLowerCase());

    const updateBlog = await blogModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateBlog) {
      return next(new ErrorHandler("Blog not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updateBlog,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
};
