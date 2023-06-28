const courseModel = require("../models/course.model");
const lessonModel = require("../models/lesson.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");

const createCourse = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { title, description, price, category } = req.body;
  let instructor = null;

  try {
    if (title) {
      slug = slugify(title.toLowerCase());
    }
    if (_id) {
      instructor = _id;
    }

    const course = new courseModel({
      title,
      slug,
      description,
      price,
      category,
      instructor,
    });

    if (course) {
      const createdCourse = await course.save();
      res.status(201).json(createdCourse);
    } else {
      res.status(400);
      throw new Error("Invalid course data");
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllCourses = asyncHandler(async (req, res, next) => {
  try {
    const courses = await courseModel.find();
    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getCourse = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  try {
    const course = await courseModel.findOne({ slug });
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Single Course fetched successfully",
      data: course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getCoursesByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params;
  try {
    const courses = await courseModel.find({ category });
    res.status(200).json({
      success: true,
      message: "Courses fetched by Category successfully",
      data: courses,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getParticularInstructorCourse = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  try {
    const course = await courseModel.find({ instructor: _id });
    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateCourse = await courseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateCourse) {
      return next(new ErrorHandler("Course not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updateCourse,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteCourse = await courseModel.findByIdAndDelete(id);
    if (!deleteCourse) {
      return next(new ErrorHandler("Course not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deleteCourse,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  getCoursesByCategory,
  getParticularInstructorCourse,
  updateCourse,
  deleteCourse,
};
