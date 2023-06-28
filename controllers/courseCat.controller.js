const courseCatModel = require("../models/courseCat.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const { default: slugify } = require("slugify");

const postCourseCategory = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(new ErrorHandler("Please provide a title", 400));
    }
    req.body.slug = slugify(req.body.title.toLowerCase());
    const newCourseCat = await courseCatModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Course Category created successfully",
      data: newCourseCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllCourseCategory = asyncHandler(async (req, res, next) => {
  try {
    const allCourseCat = await courseCatModel.find();

    res.status(200).json({
      success: true,
      message: "Course Category fetched successfully",
      data: allCourseCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getCourseCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const courseCat = await courseCatModel.findById(id);
    if (!courseCat) {
      return next(new ErrorHandler("Course Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course Category fetched successfully",
      data: courseCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateCourseCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const courseCat = await courseCatModel.findById(id);
    if (!courseCat) {
      return next(new ErrorHandler("Course Category not found", 404));
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateCourseCat = await courseCatModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Course Category updated successfully",
      data: updateCourseCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteCourseCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const courseCat = await courseCatModel.findById(id);
    if (!courseCat) {
      return next(new ErrorHandler("Course Category not found", 404));
    }
    await courseCatModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Course Category deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  postCourseCategory,
  getAllCourseCategory,
  getCourseCategory,
  updateCourseCategory,
  deleteCourseCategory,
};
