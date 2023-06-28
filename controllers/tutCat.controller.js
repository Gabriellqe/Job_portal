const tutCatModel = require("../models/tutCat.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const { default: slugify } = require("slugify");

const postTutorialCategory = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(new ErrorHandler("Please provide a title", 400));
    }
    req.body.slug = slugify(req.body.title.toLowerCase());
    const newTutCat = await tutCatModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Tutorial Category created successfully",
      data: newTutCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllTutorialCategory = asyncHandler(async (req, res, next) => {
  try {
    const allTutCat = await tutCatModel.find();

    res.status(200).json({
      success: true,
      message: "Tutorial Category fetched successfully",
      data: allTutCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getTutorialCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const tutCat = await tutCatModel.findById(id);
    if (!tutCat) {
      return next(new ErrorHandler("Tutorial Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Tutorial Category fetched successfully",
      data: tutCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateTutorialCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const tutCat = await tutCatModel.findById(id);
    if (!tutCat) {
      return next(new ErrorHandler("Tutorial Category not found", 404));
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateTutCat = await tutCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Tutorial Category updated successfully",
      data: updateTutCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteTutorialCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const tutCat = await tutCatModel.findById(id);
    if (!tutCat) {
      return next(new ErrorHandler("Tutorial Category not found", 404));
    }
    await tutCatModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Tutorial Category deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  postTutorialCategory,
  getAllTutorialCategory,
  getTutorialCategory,
  updateTutorialCategory,
  deleteTutorialCategory,
};
