const workModel = require("../models/workWithUs.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

const postWorkDetails = asyncHandler(async (req, res, next) => {
  try {
    const workDetail = await workModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "Details posted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllWorksDetails = asyncHandler(async (req, res, next) => {
  try {
    const workDetails = await workModel.find();
    if (!workDetails) {
      return next(new ErrorHandler("Details not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: workDetails,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAWorkDetail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const workDetail = await workModel.findById(id);
    if (!workDetail) {
      return next(new ErrorHandler("Details not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: workDetail,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateWorkDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const workDetail = await workModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!workDetail) {
      return next(new ErrorHandler("Details not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Details updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const deleteWorkDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const workDetail = await workModel.findByIdAndDelete(id);
    if (!workDetail) {
      return next(new ErrorHandler("Details not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Details deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  postWorkDetails,
  getAllWorksDetails,
  getAWorkDetail,
  updateWorkDetails,
  deleteWorkDetails,
};
