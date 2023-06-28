const blogCatModel = require("../models/blogCat.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const { default: slugify } = require("slugify");

const postBlogCategory = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(new ErrorHandler("Please provide a title", 400));
    }
    req.body.slug = slugify(req.body.title.toLowerCase());
    const newBlogCat = await blogCatModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Blog Category created successfully",
      data: newBlogCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllBlogCategory = asyncHandler(async (req, res, next) => {
  try {
    const allBlogCat = await blogCatModel.find();

    res.status(200).json({
      success: true,
      message: "Blog Category fetched successfully",
      data: allBlogCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getBlogCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const blogCat = await blogCatModel.findById(id);
    if (!blogCat) {
      return next(new ErrorHandler("Blog Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Blog Category fetched successfully",
      data: blogCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateBlogCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const blogCat = await blogCatModel.findById(id);
    if (!blogCat) {
      return next(new ErrorHandler("Blog Category not found", 404));
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateBlogCat = await blogCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog Category updated successfully",
      data: updateBlogCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteBlogCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const blogCat = await blogCatModel.findById(id);
    if (!blogCat) {
      return next(new ErrorHandler("Blog Category not found", 404));
    }
    await blogCatModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Blog Category deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  postBlogCategory,
  getAllBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
