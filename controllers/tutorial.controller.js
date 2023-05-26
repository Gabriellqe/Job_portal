const tutorialModel = require("../models/tutorial.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const { default: slugify } = require("slugify");

const postTutorial = asyncHandler(async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }
    const newTutorial = await tutorialModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Tutorial created successfully",
      data: newTutorial,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllTutorial = asyncHandler(async (req, res, next) => {
  try {
    const getAllTutorial = await tutorialModel.find({}).sort({ createdAt: -1 });
    if (!getAllTutorial) {
      return next(new ErrorHandler("No tutorial found", 404));
    }
    res.status(200).json({
      success: true,
      message: "All tutorial found",
      data: getAllTutorial,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getTutorial = asyncHandler(async (req, res, next) => {
  const { slug, type } = req.params;
  try {
    const getTutorial = await tutorialModel.findOne({
      slug,
      tutorialCategorySlug: type,
    });
    if (!getTutorial) {
      return next(new ErrorHandler("Tutorial not found", 404));
    }

    const tutorialTopics = await tutorialModel
      .find({
        tutorialCategorySlug: type,
      })
      .select("topicName title slug tutorialCategorySlug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Tutorial found",
      data: getTutorial,
      topics: tutorialTopics,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateTutorial = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    if (req.body.tutorialCategory) {
      req.body.tutorialCategorySlug = slugify(
        req.body.tutorialCategory.toLowerCase()
      );
    }

    const updateTutorial = await tutorialModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Tutorial updated successfully",
      data: updateTutorial,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
const deleteTutorial = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteTutorial = await tutorialModel.findByIdAndDelete(id);
    if (!deleteTutorial) {
      return next(new ErrorHandler("Tutorial not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Tutorial deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  postTutorial,
  getAllTutorial,
  getTutorial,
  updateTutorial,
  deleteTutorial,
};
