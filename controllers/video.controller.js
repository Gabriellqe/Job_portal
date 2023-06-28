const videoModel = require("../models/video.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const slugify = require("slugify");

const createVideo = asyncHandler(async (req, res, next) => {
  const { title } = req.body;

  try {
    if (!title) {
      return next(new ErrorHandler("Please provide title", 400));
    }

    req.body.slug = slugify(title.toLowerCase());

    const newVideo = await videoModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Video created successfully",
      data: newVideo,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getVideos = asyncHandler(async (req, res, next) => {
  try {
    const allVideos = await videoModel.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "All videos found",
      data: allVideos,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getVideoById = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  try {
    const getVideo = await videoModel.findOne({ slug });
    if (!getVideo) {
      return next(new ErrorHandler("Video not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Video found",
      data: getVideo,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteVideo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const video = await videoModel.findById(id);
    if (!video) {
      return next(new ErrorHandler("Video not found", 404));
    }
    await videoModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      data: {},
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateVideo = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    if (!title) {
      return next(new ErrorHandler("Please provide title", 400));
    }
    req.body.slug = slugify(title.toLowerCase());

    const updateVideo = await videoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateVideo) {
      return next(new ErrorHandler("Video not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: updateVideo,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createVideo,
  getVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
};
