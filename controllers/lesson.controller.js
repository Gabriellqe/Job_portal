const lessonModel = require("../models/lesson.model");
const courseModel = require("../models/course.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");

const createLesson = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const { title, content, videoUrl } = req.body;
  try {
    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }

    const lesson = await lessonModel.create({
      title,
      content,
      videoUrl,
      slug: slugify(title, { lower: true }),
    });

    const courseUpdateLesson = await courseModel.findByIdAndUpdate(
      courseId,
      { $push: { lessons: lesson._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      lesson,
      courseUpdateLesson,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteLesson = asyncHandler(async (req, res, next) => {
  const { courseId, lessonId } = req.params;
  try {
    const course = await courseModel.findByIdAndUpdate(
      courseId,
      { $pull: { lessons: lessonId } },
      { new: true }
    );

    if (!course) {
      return next(new ErrorHandler("Course not found", 404));
    }
    const lesson = await lessonModel.findByIdAndDelete(lessonId);
    if (!lesson) {
      return next(new ErrorHandler("Lesson not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
      lesson,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getALesson = asyncHandler(async (req, res, next) => {
  const { lessonId } = req.params;
  try {
    const lesson = await lessonModel.findById(lessonId);
    if (!lesson) {
      return next(new ErrorHandler("Lesson not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Lesson found successfully",
      lesson,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllCourseLesson = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const lessonsByCourse = await courseModel
      .find()
      .where("_id")
      .equals(courseId)
      .select("lessons");
    if (!lessonsByCourse) {
      return next(new ErrorHandler("Lesson not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Lessons by course found successfully",
      lessonsByCourse,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateLesson = asyncHandler(async (req, res, next) => {
  const { lessonId } = req.params;
  const { title, content, videoUrl } = req.body;
  try {
    const lesson = await lessonModel.findByIdAndUpdate(
      lessonId,
      {
        title,
        content,
        videoUrl,
        slug: slugify(title, { lower: true }),
      },
      { new: true }
    );
    if (!lesson) {
      return next(new ErrorHandler("Lesson not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      lesson,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createLesson,
  deleteLesson,
  getALesson,
  getAllCourseLesson,
  updateLesson,
};
