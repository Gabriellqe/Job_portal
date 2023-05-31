const videoCatModel = require("../models/videoCat.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const { default: slugify } = require("slugify");

const postVideoCategory = asyncHandler(async (req, res, next) => {
  try {
    if (!req.body.title) {
      return next(new ErrorHandler("Please provide a title", 400));
    }
    req.body.slug = slugify(req.body.title.toLowerCase());
    const newVideoCat = await videoCatModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "Video Category created successfully",
      data: newVideoCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

const getAllVideoCategory = asyncHandler(async (req, res, next) => {
  try {
    const allVideoCat = await videoCatModel.find();

    res.status(200).json({
      success: true,
      message: "Video Category fetched successfully",
      data: allVideoCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

const getVideoCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const videoCat = await videoCatModel.findById(id);
    if (!videoCat) {
      return next(new ErrorHandler("Video Category not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Video Category fetched successfully",
      data: videoCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

const updateVideoCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const videoCat = await videoCatModel.findById(id);
    if (!videoCat) {
      return next(new ErrorHandler("Video Category not found", 404));
    }

    if (req.body.title) {
      req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const updateVideoCat = await videoCatModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Video Category updated successfully",
      data: updateVideoCat,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

const deleteVideoCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const videoCat = await videoCatModel.findById(id);
    if (!videoCat) {
      return next(new ErrorHandler("Video Category not found", 404));
    }
    await videoCatModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Video Category deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 403));
  }
});

module.exports = {
  postVideoCategory,
  getAllVideoCategory,
  getVideoCategory,
  updateVideoCategory,
  deleteVideoCategory,
};
