const reviewModel = require("../models/review.model");
const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");

//create review
const createReview = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { comment, color } = req.body;
  if (!comment || !color) {
    return next(new ErrorHandler("Please provide all the fields", 400));
  }
  try {
    const newReview = await reviewModel.create({
      name: _id,
      comment,
      color,
    });
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get all reviews
const getAllReviews = asyncHandler(async (req, res, next) => {
  try {
    const reviews = await reviewModel.find().populate("name");
    res.status(200).json({
      success: true,
      message: "All reviews",
      data: reviews,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//get review by id
const getReviewById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await reviewModel.findById(id);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Review",
      data: review,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
//update review status
const updateReviewStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { isApproved } = req.body;
  try {
    const review = await reviewModel.findByIdAndUpdate(
      id,
      { isApproved },
      { new: true }
    );
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Review status updated successfully",
      data: review,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//delete review
const deleteReviewById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await reviewModel.findByIdAndDelete(id);
    if (!review) {
      return next(new ErrorHandler("Review not found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  deleteReviewById,
  updateReviewStatus,
};
